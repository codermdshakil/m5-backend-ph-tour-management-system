import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import session from "express-session";
import morgan from "morgan";
import passport from "passport";
import { envVars } from "./app/config/env";
import "./app/config/passport";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFoundRoute } from "./app/middlewares/notFoundRoute";
import { router } from "./app/routes";

const app: Application = express();


app.use(
  session({
    secret: envVars.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));

// handle user rotues
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Tour management Systen backend Server!!" });
});


// global error handler
app.use(globalErrorHandler);

// 404 not found route
app.use(notFoundRoute);



export default app;
