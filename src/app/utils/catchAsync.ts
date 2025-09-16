import { NextFunction, Request, Response } from "express";
import { envVars } from "../config/env";

type AsyncHander = (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;

export const catchAsync =
  (fn: AsyncHander) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((err: any) => {
      // check
      if (envVars.NODE_ENV === "development") {
        console.log(err);
      }
      next(err);
    });
  };
