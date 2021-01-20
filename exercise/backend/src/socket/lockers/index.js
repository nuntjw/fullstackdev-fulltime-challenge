import moment from "moment";
import lockerModel from "app/models/locker";
import EVENT from "app/constants/socket";
import { STATUS } from "app/constants/locker";
import { calculatePrice } from "app/helpers/lockers";

const emitCurrentState = async (io) => {
  io.emit(EVENT.USERS, { count: io.engine.clientsCount });
  const lockers = await lockerModel.find();
  io.emit(EVENT.LOCKERS, { data: lockers });
};

const disconnect = (io) => () => {
  io.emit(EVENT.USERS, { count: io.engine.clientsCount });
};

const reserve = (io) => async (msg) => {
  const now = moment();
  const locker = await lockerModel.findById(msg.lockerId);
  const payload = {
    reservation: {
      reservedBy: msg.reservedBy,
      reservedAt: now.toISOString(),
      hours: msg.reserveHours,
      expiredAt: now.add(msg.reserveHours, "hours").toISOString(),
      amount: calculatePrice(locker.size, msg.reserveHours),
    },
    status: STATUS.RESERVED,
  };
  await lockerModel.update(msg.lockerId, payload);
  const lockers = await lockerModel.find();
  io.emit(EVENT.LOCKERS, { data: lockers });
};

export { emitCurrentState, disconnect, reserve };
