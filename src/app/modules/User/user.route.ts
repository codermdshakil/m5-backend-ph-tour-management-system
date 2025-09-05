import { NextFunction, Request, Response, Router } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import AppError from "../../errorHelpers/appError";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { Role } from "./user.interface";
import { createUserZodSchema } from "./user.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  UserControllers.createUser
);

router.get(
  "/all-users",
  async (req: Request, res: Response, next: NextFunction) => {
    try {

      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "No Token Recived!");
      }

      const verifiedToken = jwt.verify(accessToken, "secret");

      if(!verifiedToken){
        console.log(verifiedToken, 'not verified ');
        throw new AppError(403, `You are not Authorized! ${verifiedToken}`);
      }

      console.log(verifiedToken, 'token ');
      
      if ((verifiedToken as JwtPayload).role !== Role.ADMIN) {
        throw new AppError(403, "You are not permitted to view this route!");
      }



      next();
    } catch (error) {
      next(error);
    }
  },
  UserControllers.getAllUsers
);

export const UserRoutes = router;
