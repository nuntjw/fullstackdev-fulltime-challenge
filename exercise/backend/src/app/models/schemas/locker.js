import mongoose from "mongoose";
import reservationSchema from "./reservation";
import { STATUS, SIZE } from "app/constants/locker";

const lockerSchema = new mongoose.Schema(
  {
    name: String,
    price: {
      firstHour: Number,
      afterHour: Number,
    },
    size: {
      type: String,
      enum: [SIZE.S, SIZE.M, SIZE.L],
    },
    reservation: {
      type: reservationSchema,
      default: null,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const lockerModel = mongoose.model("lockers", lockerSchema, "lockers");

export default lockerModel;
