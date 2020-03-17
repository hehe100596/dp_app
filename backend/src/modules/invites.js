import { Router } from "express";
import mongoose, { Schema } from "mongoose";
import moment from "moment";
import * as bcrypt from "bcrypt";

const DataSchema = new Schema(
  {
    link: String,
    course: String,
    expirationDate: {
      type: Date,
      expires: 0
    }
  },
  { timestamps: true }
);
mongoose.set("useCreateIndex", true);

const Invite = mongoose.model("Invite", DataSchema);
const router = Router();

router.post("/createNewInviteLink", async (req, res) => {
  let invite = new Invite();

  const { course, expiration } = req.body;

  const link = await bcrypt.hash(invite.id, 10);

  invite.link = link;
  invite.course = course;
  invite.expirationDate = moment().add(parseInt(expiration), "minutes");

  invite.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true, data: link });
  });
});

export default router;
