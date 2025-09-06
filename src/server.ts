import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";

let server: Server;

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);

    console.log("Successfully mongodb connected with server!!");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server is runing on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.log(error, "Someting want wrong in server!!");
  }
};


// IFFE function use to called both function Instantly!
(async () => {
  await startServer();
  await seedSuperAdmin();
})();

/**
 * Additional Error handle
 *
 * 1. unhandled rejection error
 * 2. uncaught exception error
 * 3. signal termination or sigterm
 *
 * */

// 1. unhandled rejection error - if any promise related error occured then this will hit
process.on("unhandledRejection", (err) => {
  console.log("Unhandled Rejection Detected.. Server shutting down!", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// Promise.reject(new Error("I forgot to catch handle this promise!"))

//  2. uncaught exception error - Local development if any error that developer don't handle then this will hit
process.on("uncaughtException", (err) => {
  console.log("Uncaught Exception Detected.. Server shutting down!", err);

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit(1);
});

// throw Error("I fotgot to handle this local error ")

// 3. signal termination or sigterm - cloud provider if anything could provider shutting down server then this SIGTERM hit
process.on("SIGTERM", () => {
  console.log("Sigterm Detected.. Server shutting down!");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit();
});

// when menually server close using user then this hit
process.on("SIGINT", () => {
  console.log("SIGINT Detected.. Server shutting down!");

  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }

  process.exit();
});
