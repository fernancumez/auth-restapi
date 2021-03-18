import dotenv from "dotenv";
import { IConfig } from "./types";
const { NODE_ENV } = process.env;

if (NODE_ENV !== "production") dotenv.config();

const devConfig: IConfig = {
  PORT: `${process.env.PORT}`,
  NODE_ENV: `${process.env.NODE_ENV}`,
  DATABASE_URL: `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.oxbda.mongodb.net/${process.env.DATABASE_NAME}-${process.env.NODE_ENV}?retryWrites=true&w=majority`,
  JWT_SECRET: `${process.env.JWT_SECRET}`,
};
export default devConfig;
