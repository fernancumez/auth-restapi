import express, { Application } from "express";
import config from "./config";
import passport from "passport";
import morgan from "morgan";
import cors from "cors";

import passportMiddleware from "./middlewares/passport";
import specialRoutes from "./routes/special.routes";
import welcomeRoutes from "./routes/welcome.routes";
import authRoutes from "./routes/auth.routes";

import { createAdmin, createRoles } from "./libs/initialSetup";

const app: Application = express();
createRoles();
createAdmin();

// Settings
app.set("port", parseInt(config.PORT));

// Middlewares
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(passport.initialize());
passport.use(passportMiddleware);
app.use(express.urlencoded({ extended: false }));

// Routes
app.use(welcomeRoutes);
app.use("/api", authRoutes);
app.use("/api", specialRoutes);

export default app;
