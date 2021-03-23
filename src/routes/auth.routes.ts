import { Router } from "express";

import { signIn, signUp } from "../controllers/auth.controllers";
import {
  checkDuplicateEmail,
  checkRolesExisted,
} from "../middlewares/verifySignUp";
import {
  validateSignInFields,
  validateSignUpFields,
} from "../middlewares/fieldValidations";

const router = Router();

router.post("/signin", [...validateSignInFields], signIn);
router
  .route("/signup")
  .post(
    [...validateSignUpFields, checkDuplicateEmail, checkRolesExisted],
    signUp
  );

export default router;
