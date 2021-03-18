import { Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../models/users.model";
import { IUser } from "../models/types/users.types";
import { createToken } from "../libs/createToken";

export const signUp = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ msg: "Please. Send your email and password" });
    }

    const newUser: IUser = new User(req.body);

    // Encrypt password
    const salt: string = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(req.body.password, salt);

    await newUser.save();

    return res.status(201).json(newUser);
  } catch (error) {
    return res.status(400).json({ error });
  }
};

export const signIn = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    if (!req.body.email || !req.body.password) {
      return res
        .status(400)
        .json({ msg: "Please. Send your email and password" });
    }

    const findUser = await User.findOne({ email: req.body.email });
    if (!findUser) {
      return res.status(400).json({ msg: "The user does not exist" });
    }

    //check if password matches
    const correctPassword = await bcrypt.compare(
      req.body.password,
      findUser.password
    );

    if (!correctPassword)
      return res.status(400).json({ error: "The password isn´t incorrect" });

    return res
      .status(200)
      .json({ message: "SignIn successfully", token: createToken(findUser) });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
