import { Document } from "mongoose";
import { IRoles } from "./roles.types";

export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  isVerified: boolean;
  roles: IRoles[];
}
