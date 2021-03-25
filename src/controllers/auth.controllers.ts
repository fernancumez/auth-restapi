import { Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import config from "../config";
import bcrypt from "bcrypt";

import User from "../models/users.model";
import Role from "../models/roles.models";
import { IUser } from "../models/types/users.types";
import { IRoles } from "../models/types/roles.types";

import { createToken } from "../libs/createToken";
import * as nodemailer from "../libs/nodeMailer";

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const newUser: IUser = new User(req.body);

    // checking for roles
    if (req.body.roles) {
      const foundRoles = await Role.find({ name: { $in: req.body.roles } });
      newUser.roles = foundRoles.map((role) => role._id);
    } else {
      const role: IRoles | null = await Role.findOne({ name: "user" });
      role ? (newUser.roles = [role._id]) : null;
    }

    // Encrypt password
    const salt: string = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(req.body.password, salt);

    await nodemailer.sendConfirmationEmail(
      newUser.username,
      newUser.email,
      createToken(newUser)
    );

    await newUser.save();

    return res.status(201).json({
      message: "User register successfully! Please check your email",
      user: newUser,
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array() });

    const findUser = await User.findOne({ email: req.body.email });
    if (!findUser) {
      return res.status(400).json({ error: "The user does not exist" });
    }

    //check if password matches
    const correctPassword = await bcrypt.compare(
      req.body.password,
      findUser.password
    );

    if (!correctPassword)
      return res.status(400).json({ error: "The password isn´t correct" });

    if (!findUser.isVerified)
      return res.status(401).json({
        message:
          "Your account has not been verified. Please activate your account.",
      });

    return res
      .status(200)
      .json({ message: "SignIn successfully", token: createToken(findUser) });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const confirmEmail = async (req: Request, res: Response) => {
  try {
    const user: any = jwt.verify(req.params.token, config.JWT_SECRET);
    await User.findByIdAndUpdate(user.id, { isVerified: true });
    return res.status(200).json({ message: "Account activated!" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
