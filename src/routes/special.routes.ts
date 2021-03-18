import { Router } from "express";
import auth from "../middlewares/auth";
import { special } from "../controllers/special.controllers";

const router = Router();

router.route("/special").get(auth, special);

export default router;
