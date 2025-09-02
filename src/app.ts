
import cors from "cors";
import express, { Application, Request, Response } from 'express';
import { UserRoutes } from './app/modules/User/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());


// handle user rotues
app.use("/api/v1/user", UserRoutes )


app.get("/", (req : Request, res:Response) => {
  res.json({message:"Welcome to Tour management Systen backend Server!!"})
});


export default app;
