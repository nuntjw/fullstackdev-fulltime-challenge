import IO from 'socket.io-client'

let io

const getClient = () => {
  if (io) return io
  return IO('http://10.0.0.83:8000')
}

export {
  getClient,
}
