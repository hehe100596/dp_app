import { Router } from "express";
import mongoose, { Schema } from "mongoose";

const DataSchema = new Schema(
  {
    name: String,
    org: String,
    cat: String,
    level: String,
    length: String,
    author: String
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

router.post("/createNewCourse", (req, res) => {
  let course = new Course();

  const { name, org, cat, level, length, author } = req.body;

  course.name = name;
  course.org = org;
  course.cat = cat;
  course.level = level;
  course.length = length;
  course.author = author;

  course.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

export default router;
