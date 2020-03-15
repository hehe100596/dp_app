import { Router } from "express";
import mongoose, { Schema } from "mongoose";

import { Module } from "./modules";

const DataSchema = new Schema(
  {
    name: String,
    org: String,
    cat: String,
    level: String,
    length: String,
    author: String,
    access: [String],
    config: {
      tmp: String
    }
  },
  { timestamps: true }
);
const Course = mongoose.model("Course", DataSchema);
const router = Router();

router.post("/getMyCourses", (req, res) => {
  const { user } = req.body;

  Course.find({ author: user }, (err, data) => {
    if (err) return res.json({ success: false, error: err });

    return res.json({ success: true, data: data });
  });
});

router.post("/getAccessibleCourses", (req, res) => {
  const { user } = req.body;

  Course.find({ access: { $in: [user] } }, (err, data) => {
    if (err) return res.json({ success: false, error: err });

    return res.json({ success: true, data: data });
  });
});

router.post("/createNewCourse", (req, res) => {
  let course = new Course();

  const { name, org, cat, level, length, author, withAccess, tmp } = req.body;

  course.name = name;
  course.org = org;
  course.cat = cat;
  course.level = level;
  course.length = length;
  course.author = author;

  course.access.push(withAccess);
  course.config.tmp = tmp;

  course.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

router.post("/deleteCourses", (req, res) => {
  const { selectedCourses } = req.body;

  const courses = Course.deleteMany({ _id: { $in: selectedCourses } });
  const modules = Module.updateMany(
    {},
    {
      $pull: { courses: { $in: selectedCourses } }
    }
  );

  Promise.all([courses, modules])
    .then(result => {
      return res.json({ success: true });
    })
    .catch(err => {
      return res.send(err);
    });
});

export default router;
