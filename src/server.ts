import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";

const PORT = 5000;

let server: Server;

const startServer = async () => {
  try {

    await mongoose.connect("mongodb+srv://mongodb:mongodb@cluster0.qo2wzoe.mongodb.net/ph-tour-management-backend?retryWrites=true&w=majority&appName=Cluster0");

    console.log("Successfully mongodb connected with server!!");

    server = app.listen(PORT, () => {
      console.log("Server is runing on port 5000");
    });

  } catch (error) {
    console.log(error, "Someting want wrong in server!!");
  }
};

startServer();
