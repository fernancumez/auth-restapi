import { model, Schema } from "mongoose";
import { IRoles } from "./types/roles.types";

export const ROLES = ["user", "admin", "moderator"];

const roleSchema = new Schema(
  {
    name: String,
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model<IRoles>("Role", roleSchema);
