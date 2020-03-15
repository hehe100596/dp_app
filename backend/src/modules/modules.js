import { Router } from "express";
import mongoose, { Schema } from "mongoose";

const DataSchema = new Schema(
  {
    name: String,
    courses: [String]
  },
  { timestamps: true }
);
export const Module = mongoose.model("Module", DataSchema);
const router = Router();

router.post("/createNewModule", (req, res) => {
  let module = new Module();

  const { name } = req.body;

  module.name = name;

  module.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

export default router;
