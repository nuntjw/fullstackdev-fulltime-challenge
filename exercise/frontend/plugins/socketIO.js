import IO from "socket.io-client";

let io;

const getClient = () => {
  if (io) return io;
  io = IO("http://10.0.0.113:8000");
  return io;
};

export { getClient };
