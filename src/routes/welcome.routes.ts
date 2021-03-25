import { Router } from "express";
const router = Router();

import { welcome } from "../controllers/welcome.controllers";

router.route("/").get(welcome);
router.route("/api").get(welcome);

export default router;
