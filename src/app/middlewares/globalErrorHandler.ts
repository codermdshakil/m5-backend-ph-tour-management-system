import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/appError";
import { handleCastError } from "../helpers/handleCastError";
import { handleDuplicateError } from "../helpers/handleDuplicateError";
import { handlerValidationError } from "../helpers/handleValidationError";
import { handlerZodError } from "../helpers/handleZodError";
import { TErrorSources } from "../interfaces/error.types";

export const globalErrorHandler = (  err: any,  req: Request,  res: Response,  next: NextFunction  ) => {

  // check
  if (envVars.NODE_ENV === "development") {
    console.log(err);
  }
 

  // initial values 
  let statusCode = 500;
  let message = "Something want wrong!";
  let errorSources: TErrorSources[] = [];

  // mongooose - duplicate error handle using code = 11000
  if (err.code === 11000) {
    const simplyfiedError = handleDuplicateError(err);
    statusCode = simplyfiedError.statusCode;
    message = simplyfiedError.message;
  }
  // mongoose - objectId error / CastError handle
  else if (err.name === "CastError") {
    const simplyfiedError = handleCastError(err);
    statusCode = simplyfiedError.statusCode;
    message = simplyfiedError.message;
  }
  // Zod error handle
  else if (err.name === "ZodError") {
    const simplyfiedError = handlerZodError(err);
    statusCode = simplyfiedError.statusCode;
    message = simplyfiedError.message;
    errorSources = simplyfiedError.errorSources as TErrorSources[];
  }
  // mongoose - validation error
  else if (err.name === "ValidationError") {
    const simplyfiedError = handlerValidationError(err);
    statusCode = simplyfiedError.statusCode;
    message = simplyfiedError.message;
    errorSources = simplyfiedError.errorSources as TErrorSources[];
  }
  else if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;

  } else if (err instanceof Error) {
    statusCode = 500;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    err: envVars.NODE_ENV === "development" ? err : null,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
};
