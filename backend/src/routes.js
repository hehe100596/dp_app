import { Router } from "express";

import testing from "./modules/testing";
import users from "./modules/users";
import courses from "./modules/courses";
import access from "./modules/access";

const router = Router();

router.use("/testing", testing);
router.use("/users", users);
router.use("/courses", courses);
router.use("/access", access);

export default router;
