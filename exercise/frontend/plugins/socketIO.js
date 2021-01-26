import IO from "socket.io-client";

let io;

const getClient = () => {
  if (io) return io;
  io = IO(process.env.SERVICE_URL);
  return io;
};

export { getClient };
