import { Router } from "express";
import { signIn, signUp } from "../controllers/auth.controllers";
import { checkDuplicateEmail } from "../middlewares/verifySignUp";

const router = Router();

router.post("/signin", signIn);
router.route("/signup").post([checkDuplicateEmail], signUp);

export default router;
