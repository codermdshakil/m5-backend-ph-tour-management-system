import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Application, Request, Response } from "express";
import expressSession from "express-session";
import morgan from "morgan";
import passport from "passport";
import { globalErrorHandler } from "./app/middlewares/globalErrorHandler";
import { notFoundRoute } from "./app/middlewares/notFoundRoute";
import { router } from "./app/routes";


const app: Application = express();


app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(morgan("dev"));
app.use(passport.initialize());
app.use(passport.session());
app.use(expressSession({
  secret:"your section",
  resave:false,
  saveUninitialized:false
}))



// handle user rotues
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Tour management Systen backend Server!!" });
});


// 404 not found route
app.use(notFoundRoute);

// global error handler
app.use(globalErrorHandler);

export default app;
