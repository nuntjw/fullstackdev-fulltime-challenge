import env from '../config'
import mongoose from 'mongoose'

const option = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
}

mongoose.Promise = global.Promise

const connect = async () => {
  try {
    await mongoose.connect(env.DB_CONNECTION, option)
    console.info(`Mongoose connection has been connected.`)
  } catch (error) {
    console.warn(`Mongoose could not connect to ${env.DB_CONNECTION}.`, error)
  }
}

export default {
  connect,
}