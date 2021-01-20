import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import env from "config";
import mongoose from "database/mongoose";
import router from "app/routes";
import socket from "socket";

mongoose.connect();

const app = express();

app
  .use(cors())
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(router);

const server = socket.initialServer(app);

server.listen(env.PORT, () => {
  console.log(`server running on ${env.PORT}`);
});
