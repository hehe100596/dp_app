import { Router } from "express";

import testing from "./modules/testing";
import users from "./modules/users";
import courses from "./modules/courses";
import modules from "./modules/modules";
import invites from "./modules/invites";

const router = Router();

router.use("/testing", testing);
router.use("/users", users);
router.use("/courses", courses);
router.use("/modules", modules);
router.use("/invites", invites);

export default router;
