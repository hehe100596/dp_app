import { Router } from "express";

import testing from "./modules/testing";
import users from "./modules/users";
import courses from "./modules/courses";
import modules from "./modules/modules";

const router = Router();

router.use("/testing", testing);
router.use("/users", users);
router.use("/courses", courses);
router.use("/modules", modules);

export default router;
