import { Router } from "express";
import mongoose, { Schema } from "mongoose";

const DataSchema = new Schema(
  {
    mail: String,
    pass: String,
    token: String
  },
  { timestamps: true }
);
const User = mongoose.model("User", DataSchema);
const router = Router();

router.post("/getUserToken", (req, res) => {
  const { mail, pass } = req.body;

  User.findOne({ mail: mail, pass: pass }, "token", (err, data) => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: data });
  });
});

router.post("/createDefaultUser", (req, res) => {
  let user = new User();

  user.mail = "abc@abc.com";
  user.pass = "abc";
  user.token = "abc_token";
  user.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

export default router;
