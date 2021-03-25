import User from "../models/users.model";
import { ROLES } from "../models/roles.models";
import { NextFunction, Request, Response } from "express";

export const checkDuplicateEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const email = await User.findOne({ email: req.body.email });

    if (email)
      return res.status(400).json({ error: "The email already taken" });

    next();
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const checkRolesExisted = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        return res.status(400).json({
          error: `Role ${req.body.roles[i]} does not exist`,
        });
      }
    }
  }

  next();
};
