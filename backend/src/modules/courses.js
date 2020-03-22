import { Router } from "express";
import mongoose, { Schema } from "mongoose";

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
    },
    content: [
      {
        module: String,
        resultPoints: Number,
        unlockPoints: Number
      }
    ]
  },
  { timestamps: true }
);
export const Course = mongoose.model("Course", DataSchema);
const router = Router();

router.post("/getCourseWithAccess", (req, res) => {
  const { course, user } = req.body;

  Course.findOne({ _id: course, access: user }, "_id", (err, data) => {
    if (err) return res.json({ success: false, error: err });

    return res.json({ success: true, data: data });
  });
});

router.post("/giveAccess", (req, res) => {
  const { course, user } = req.body;

  Course.updateOne(
    { _id: course },
    { $push: { access: user } },
    (err, data) => {
      if (err) return res.json({ success: false, error: err });

      return res.json({ success: true, data: data });
    }
  );
});

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

  Course.deleteMany({ _id: { $in: selectedCourses } }, err => {
    if (err) return res.send(err);

    return res.json({ success: true });
  });
});

export default router;
