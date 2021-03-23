import { Document } from "mongoose";
import { IRoles } from "./roles.types";

export interface IUser extends Document {
  email: string;
  password: string;
  roles: IRoles[];
}
