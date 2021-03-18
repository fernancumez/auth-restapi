import User from "../models/users.model";
import { NextFunction, Request, Response } from "express";

export const checkDuplicateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = await User.findOne({ email: req.body.email });

    if (email)
      return res
        .status(400)
        .json({ message: "Email is invalid or already taken" });

    next();
  } catch (error) {
    return res.status(400).json({ error });
  }
};
