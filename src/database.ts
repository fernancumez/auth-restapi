import mongoose, { ConnectionOptions } from "mongoose";
import config from "./config/config";

const dbOptions: ConnectionOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  user: config.DB.USER,
  pass: config.DB.PASSWORD,
};

mongoose.connect(config.DB.URI, dbOptions);

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("Mongodb connection stablished");
});

connection.on("error", (err) => {
  console.log("Mongodb connection error:", err);
  process.exit();
});
