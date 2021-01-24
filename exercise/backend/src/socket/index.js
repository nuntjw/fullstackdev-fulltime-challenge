import HTTP from "http";
import IO from "socket.io";
import EVENT from "app/constants/socket";
import {
  emitCurrentState,
  disconnect,
  reserve,
  pending,
  cancelPending,
} from "./lockers";

let io;

const initialServer = (app) => {
  const server = HTTP.Server(app);
  io = IO(server, {
    cors: {
      origin: "*",
    },
  });

  io.on(EVENT.CONNECTION, (socket) => {
    emitCurrentState(io, socket);
    socket.on(EVENT.DISCONNECT, disconnect(io, socket));
    socket.on(EVENT.RESERVE, reserve(io, socket));
    socket.on(EVENT.PENDING, pending(io, socket));
    socket.on(EVENT.CANCEL_PENDING, cancelPending(io, socket));
  });

  return server;
};

export default {
  initialServer,
};
