import { Router } from "express";
import mongoose, { Schema } from "mongoose";

const DataSchema = new Schema(
  {
    user: String,
    course: String
  },
  { timestamps: true }
);
const Access = mongoose.model("Access", DataSchema);
const router = Router();

router.post("/getAccessibleCourses", (req, res) => {
  const { user } = req.body;

  Access.aggregate(
    [
      { $match: { user: user } },
      { $addFields: { courseId: { $toObjectId: "$course" } } },
      {
        $lookup: {
          from: "courses",
          localField: "courseId",
          foreignField: "_id",
          as: "accessibleCourses"
        }
      },
      { $unwind: "$accessibleCourses" },
      { $replaceRoot: { newRoot: "$accessibleCourses" } }
    ],
    (err, data) => {
      if (err) return res.json({ success: false, error: err });

      return res.json({ success: true, data: data });
    }
  );
});

router.post("/giveAccess", (req, res) => {
  let access = new Access();

  const { user, course } = req.body;

  access.user = user;
  access.course = course;

  access.save(err => {
    if (err) return res.json({ success: false, error: err });
    return res.json({ success: true });
  });
});

export default router;
