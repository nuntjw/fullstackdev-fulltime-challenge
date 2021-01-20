import HTTP from "http";
import IO from "socket.io";
import EVENT from "app/constants/socket";
import { emitCurrentState, disconnect, reserve } from "./lockers";

let io;

const initialServer = (app) => {
  const server = HTTP.Server(app);
  io = IO(server, {
    cors: {
      origin: "*",
    },
  });

  io.on(EVENT.CONNECTION, (socket) => {
    emitCurrentState(io);
    socket.on(EVENT.DISCONNECT, disconnect(io));
    socket.on(EVENT.RESERVE, reserve(io));
  });

  return server;
};

export default {
  initialServer,
};
