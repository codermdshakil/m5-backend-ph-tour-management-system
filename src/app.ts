import cors from "cors";
import express, { Application, Request, Response } from 'express';
import morgan from "morgan";
import { router } from "./app/routes";


const app: Application = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));


// handle user rotues
app.use("/api/v1", router);



app.get("/", (req: Request, res: Response) => {
  res.json({ message: "Welcome to Tour management Systen backend Server!!" });
});

export default app;
