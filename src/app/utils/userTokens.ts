import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../config/env";
import AppError from "../errorHelpers/appError";
import { IsActive, IUser } from "../modules/User/user.interface";
import { User } from "../modules/User/user.model";
import { generateToken, verifyToken } from "./jwt";

// create user accessToken and refreshToken
export const createUserTokens = (user: Partial<IUser>) => {
  // token
  const jwtPayload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  // generate jwt access token
  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );

  const refreshToken = generateToken(
    jwtPayload,
    envVars.JWT_REFRESH_SECRET,
    envVars.JWT_REFRESH_EXPIRES
  );

  return {
    accessToken,
    refreshToken,
  };
};

// using refreshToken create accessToken
export const createNewAccessTokenUsingRefreshToken = async (refreshToken:string) => {

  const verifiedRefreshToken = verifyToken(refreshToken,envVars.JWT_REFRESH_SECRET) as JwtPayload;

  const isUserExist = await User.findOne({ email: verifiedRefreshToken.email });

  // check user exist or not
  if (!isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User does not exist!");
  }

  // check user block or inactive
  if (isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
      throw new AppError( StatusCodes.BAD_REQUEST, `User is ${isUserExist.isActive}!`);
  }

  // check user delete?
  if (isUserExist.isDeleted) {
    throw new AppError(StatusCodes.BAD_REQUEST, `User is deleted!`);
  }

  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  // get access token
  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_SECRET,
    envVars.JWT_ACCESS_EXPIRES
  );


  return {
    accessToken,
  };
};
