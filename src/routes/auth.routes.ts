import { Router } from "express";

import { confirmEmail, signIn, signUp } from "../controllers/auth.controllers";
import {
  checkDuplicateEmail,
  checkRolesExisted,
} from "../middlewares/verifySignUp";
import {
  validateSignInFields,
  validateSignUpFields,
} from "../middlewares/fieldValidations";

const router = Router();

router.route("/confirm/:token").get(confirmEmail);
router.route("/signin").post([...validateSignInFields], signIn);
router
  .route("/signup")
  .post(
    [...validateSignUpFields, checkDuplicateEmail, checkRolesExisted],
    signUp
  );

export default router;
