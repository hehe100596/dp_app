import { Router } from "express";

import testing from "./modules/testing";

const router = Router();

router.use("/testing", testing);

export default router;
