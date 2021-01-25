import moment from "moment";
import lockerModel from "app/models/locker";
import EVENT from "app/constants/socket";
import { calculatePrice } from "app/helpers/lockers";

const emitCurrentLockers = async (io) => {
  const lockers = await lockerModel.find();
  io.emit(EVENT.LOCKERS, { data: lockers });
};

const emitCurrentState = async (io, socket) => {
  io.emit(EVENT.USERS, { count: io.engine.clientsCount });
  emitCurrentLockers(io);
};

const disconnect = (io, socket) => async () => {
  io.emit(EVENT.USERS, { count: io.engine.clientsCount });
  const query = { pendingBy: socket.id };
  const payload = { pendingBy: null };
  await lockerModel.updateMany(query, payload);
  emitCurrentLockers(io);
};

const reserve = (io, socket) => async (msg) => {
  const now = moment();
  const locker = await lockerModel.findById(msg.lockerId);
  const amount = calculatePrice(locker.size, msg.reserveHours);
  if (msg.money < amount) {
    return io.to(socket.id).emit(EVENT.ERROR, {
      error: "not enought money",
    });
  }

  const change = msg.money - amount;
  const payload = {
    reservation: {
      reservedBy: msg.reservedBy,
      reservedAt: now.toISOString(),
      hours: msg.reserveHours,
      expiredAt: now.add(msg.reserveHours, "hours").toISOString(),
      amount,
      money: msg.money,
      change,
    },
  };
  await lockerModel.update(msg.lockerId, payload);
  emitCurrentLockers(io);
};

const pending = (io, socket) => async (msg) => {
  const locker = await lockerModel.findById(msg.lockerId);
  if (!locker) {
    io.to(socket.id).emit(EVENT.ERROR, {
      error: "not found locker",
    });
  } else if (locker.pendingBy && locker.pendingBy !== socket.id) {
    io.to(socket.id).emit(EVENT.ERROR, {
      error: "this locker already pending by other user",
    });
  }
  await lockerModel.update(locker._id, { pendingBy: socket.id });
  emitCurrentLockers(io);
};

const cancelPending = (io, socket) => async (msg) => {
  const payload = { pendingBy: null };
  await lockerModel.update(msg.lockerId, payload);
  emitCurrentLockers(io);
};

export { emitCurrentState, disconnect, reserve, pending, cancelPending };
