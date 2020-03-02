import mongoose, { Schema } from "mongoose";

const DataSchema = new Schema(
  {
    id: Number,
    message: String
  },
  { timestamps: true }
);

export const Data = mongoose.model("Data", DataSchema);
