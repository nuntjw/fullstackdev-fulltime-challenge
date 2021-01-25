import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema(
  {
    reservedBy: String,
    socketId: String,
    reservedAt: Date,
    hours: Number,
    expiredAt: Date,
    amount: Number,
    change: Number,
    money: Number,
  },
  {
    _id: false,
    versionKey: false,
    timestamps: {
      createdAt: false,
      updatedAt: false,
    },
  }
);

export default reservationSchema;
