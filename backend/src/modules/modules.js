import { Router } from "express";
import mongoose, { Schema } from "mongoose";

import { Course } from "./courses";

const DataSchema = new Schema(
  {
    name: String,
    org: String,
    type: String,
    author: String,
    access: [String],
    content: [
      {
        data: String,
        rqmt: String,
        points: Number
      }
    ]
  },
  { timestamps: true }
);
const Module = mongoose.model("Module", DataSchema);
const router = Router();

router.post("/getMyModules", (req, res) => {
  const { user } = req.body;

  Module.find({ author: user }, (err, data) => {
    if (err) return res.json({ success: false, error: err });

    return res.json({ success: true, data: data });
  });
});

router.post("/getAccessibleModules", (req, res) => {
  const { user } = req.body;

  Module.find({ access: { $in: [user] } }, (err, data) => {
    if (err) return res.json({ success: false, error: err });

    return res.json({ success: true, data: data });
  });
});

router.post("/createNewModule", (req, res) => {
  let module = new Module();

  const { name, author, withAccess } = req.body;

  module.name = name;
  module.author = author;

  module.access.push(withAccess);

  module.save(err => {
    if (err) return res.json({ success: false, error: err });

    return res.json({ success: true });
  });
});

router.post("/deleteModules", (req, res) => {
  const { selectedModules } = req.body;

  const modules = Module.deleteMany({ _id: { $in: selectedModules } });
  const courses = Course.updateMany(
    {},
    {
      $pull: { content: { module: { $in: selectedModules } } }
    }
  );

  Promise.all([modules, courses])
    .then(result => {
      return res.json({ success: true });
    })
    .catch(err => {
      return res.send(err);
    });
});

export default router;
