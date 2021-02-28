import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import passport from "passport";

import passportMiddleware from "./middlewares/passport";
import specialRoutes from "./routes/special.routes";
import authRoutes from "./routes/auth.routes";

const app: Express = express();

// Settings
app.set("port", process.env.PORT || 3000);

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);
app.use(express.urlencoded({ extended: false }));

// Routes
app.get("/", (req, res) => {
  res.send(`the api is at http://localhost:${app.get("port")}`);
});

app.use(authRoutes);
app.use(specialRoutes);

export default app;
