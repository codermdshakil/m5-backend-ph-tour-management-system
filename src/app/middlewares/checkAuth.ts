import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/appError";
import { IsActive } from "../modules/User/user.interface";
import { User } from "../modules/User/user.model";
import { verifyToken } from "../utils/jwt";

export const checkAuth =
  (...authRoles: string[]) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const accessToken = req.headers.authorization;

      if (!accessToken) {
        throw new AppError(403, "No Token Recived!");
      }

      // verified token
      const verifiedJWTToken = verifyToken(
        accessToken,
        envVars.JWT_ACCESS_SECRET
      ) as JwtPayload;


      // check user 
      const isUserExist = await User.findOne({ email: verifiedJWTToken.email });

      // check user exist or not
      if (!isUserExist) {
        throw new AppError(StatusCodes.BAD_REQUEST, "User does not exist!");
      }

      // check user block or inactive
      if (
        isUserExist.isActive === IsActive.BLOCKED ||
        isUserExist.isActive === IsActive.INACTIVE
      ) {
        throw new AppError(
          StatusCodes.BAD_REQUEST,
          `User is ${isUserExist.isActive}!`
        );
      }

      // check user delete?
      if (isUserExist.isDeleted) {
        throw new AppError(StatusCodes.BAD_REQUEST, `User is deleted!`);
      }

      if (!authRoles.includes(verifiedJWTToken.role)) {
        throw new AppError(403, "You are not permitted to view this route!");
      }

      req.user = verifiedJWTToken;

      next();
    } catch (error) {
      next(error);
    }
  };
