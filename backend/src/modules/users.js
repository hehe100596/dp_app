import { Router } from "express";
import mongoose, { Schema } from "mongoose";
import * as bcrypt from "bcrypt";

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

router.post("/getUserToken", async (req, res) => {
  const { mail, pass } = req.body;

  User.findOne({ mail: mail }, "pass token", (err, data) => {
    if (err) return res.json({ success: false, error: err });

    if (data) {
      bcrypt.compare(pass, data.pass, async function(err, ans) {
        if (ans) {
          return res.json({ success: true, data: data });
        } else {
          return res.json({ success: false, error: err });
        }
      });
    } else return res.json({ success: true, data: data });
  });
});

router.post("/getUserMail", (req, res) => {
  const { mail } = req.body;

  User.findOne({ mail: mail }, "mail", (err, data) => {
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

router.post("/createNewUser", async (req, res) => {
  let user = new User();

  const { mail, pass } = req.body;

  const hashedPass = await bcrypt.hash(pass, 10);
  const token = await bcrypt.hash(mail, 10);

  user.mail = mail;
  user.pass = hashedPass;
  user.token = token;
  user.save(err => {
    if (err) return res.json({ success: false, error: err });

    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: mail,
      from: "dp_app@info.com",
      subject: "Registration Complete",
      text:
        "You were successfully registered on DP App.\n" +
        "If it was not you, contact us here: XXX"
    };
    sgMail.send(msg);

    return res.json({ success: true });
  });
});

router.post("/changePassword", async (req, res) => {
  const { mail, token, pass } = req.body;

  const hashedPass = await bcrypt.hash(pass, 10);

  User.updateOne({ token: token }, { pass: hashedPass }, err => {
    if (err) return res.json({ success: false, error: err });

    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: mail,
      from: "dp_app@info.com",
      subject: "Password Changed",
      text:
        "Your password was successfully changed on DP App.\n" +
        "If it was not you who changed it, contact us here: XXX"
    };
    sgMail.send(msg);

    return res.json({ success: true });
  });
});

router.post("/deleteUser", (req, res) => {
  const { mail, token } = req.body;

  User.deleteOne({ token: token }, err => {
    if (err) return res.send(err);

    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const msg = {
      to: mail,
      from: "dp_app@info.com",
      subject: "Account Deleted",
      text:
        "Your account was successfully deleted from DP App.\n" +
        "If it was not you who did it, contact us here: XXX"
    };
    sgMail.send(msg);

    return res.json({ success: true });
  });
});

export default router;
