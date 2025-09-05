import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

export const validateRequest = (zodSchema: ZodTypeAny) => async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("old", req.body);
        req.body = await zodSchema.parseAsync(req.body)
        console.log("new ", req.body);
        next()
    } catch (error) {
        next(error)
    }
}