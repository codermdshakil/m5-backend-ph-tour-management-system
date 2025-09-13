import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/appError";

export const globalErrorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {

  /**
   * Mongoose
   * Zod
   *
   * */ 


  /**
   * Mongoose error handle globally 
   * - duplicate error handle using code = 11000  
   * - objectId error / CastError handle
   * - ValidationError
   * 
   * */ 

  let statusCode = 500;
  let message = "Something want wrong!";

  // duplicate error handle using code = 11000  
  if(err.code === 11000){
    statusCode = 400;
    const matchedArray = err.message.match(/"([^*]*)"/);
    message = `${matchedArray[1]} already exist!`
  }
  // objectId error / CastError handle
  else if(err.name === "CastError"){
    statusCode = 400;
    message = "Invalid mongoDB ObjectId. Please provide a valid Id"
  }
  else if(err.name === "ValidationError"){
    statusCode = 400;
    message = "Validation error Occured!"
  }
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  }
  else if (err instanceof Error){
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    err,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
