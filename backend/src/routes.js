import { Router } from "express";

import testing from "./modules/testing";
import users from "./modules/users";

const router = Router();

router.use("/testing", testing);
router.use("/users", users);

export default router;
