import dotenv from "dotenv";
import { IConfig } from "./types";
const { NODE_ENV } = process.env;

if (NODE_ENV !== "production") dotenv.config();

const devConfig: IConfig = {
  PORT: `${process.env.PORT}`,
  NODE_ENV: `${process.env.NODE_ENV}`,
  DATABASE_URL: `${process.env.DATABASE_URL}`,
  JWT_SECRET: `${process.env.JWT_SECRET}`,
  GMAIL_USERNAME: `${process.env.GMAIL_USERNAME}`,
  GMAIL_PASSWORD: `${process.env.GMAIL_PASSWORD}`,
  HOST_NAME: `${process.env.HOST_NAME}`,
};
export default devConfig;
