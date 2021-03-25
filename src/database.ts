import { connect, connection, ConnectionOptions } from "mongoose";
import { createAdmin, createRoles } from "./libs/initialSetup";
import config from "./config";

export const startConnection = async (): Promise<void> => {
  try {
    const connectionOptions: ConnectionOptions = {
      useCreateIndex: true,
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    };

    await connect(config.DATABASE_URL, connectionOptions);
    console.log("database connected!");
    console.log(connection.name);

    createRoles();
    createAdmin();
  } catch (error) {
    console.error(error);
  }
};
