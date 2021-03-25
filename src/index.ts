import app from "./app";
import { startConnection } from "./database";

const main = async (): Promise<void> => {
  try {
    await startConnection();

    app.listen(app.get("port"), () => {
      console.log("Server on port", app.get("port"));
    });
  } catch (error) {
    console.error(error);
  }
};

main();
