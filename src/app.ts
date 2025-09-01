
import express, { Application, Request, Response } from 'express';

const app: Application = express();

app.use(express.json());


app.get("/", (req : Request, res:Response) => {
  res.json({message:"Welcome to Tour management Systen backend Server!!"})
});


export default app;
