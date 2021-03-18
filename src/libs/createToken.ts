import jwt from "jsonwebtoken";
import config from "../config";
import { IUser } from "../models/types/users.types";

export function createToken(savedUser: IUser): string {
  const payload = { id: savedUser.id, email: savedUser.email };
  const options = { expiresIn: 86400 };

  return jwt.sign(payload, config.JWT_SECRET, options);
}
