import { NextFunction, Request, Response } from "express";

type AsyncHander = (req:Request, res:Response, next:NextFunction) => Promise<void>

export const catchAsync = (fn: AsyncHander) => (req:Request, res:Response, next:NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch((err:any) => {
    next(err)
  })
}