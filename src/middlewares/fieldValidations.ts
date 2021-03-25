import { check } from "express-validator";

export const validateSignUpFields = [
  check("username", "A username is required").not().isEmpty(),
  check("email", "The email address format is not valid").isEmail(),
  check(
    "password",
    "Your password must have a minimum of 8 characters and a maximum of 128 characters"
  ).isLength({ min: 6, max: 128 }),
];

export const validateSignInFields = [
  check("email", "The email address format is not valid").isEmail(),
  check("password", "A password is required").not().isEmpty(),
];
