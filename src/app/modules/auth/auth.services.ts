import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/appError";
import { generateToken, verifyToken } from "../../utils/jwt";
import { createUserTokens } from "../../utils/userTokens";
import { IsActive, IUser } from "../User/user.interface";
import { User } from "../User/user.model";

// user login based on email password with JWT
const creadentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;

  const isUserExist = await User.findOne({ email });

  if (!isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User not found!");
  }

  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    isUserExist.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Incorrect password!");
  }

  // implement here JWT

  const userTokens = createUserTokens(isUserExist);

  // delete password

  const { password: pass, ...rest } = isUserExist.toObject();
  // console.log(isUserExist);

  return {
    accessToken: userTokens.accessToken,
    refreshToken: userTokens.refreshToken,
    user: rest,
  };
};

// get refresh-token
const getNewAccessToken = async (refreshToken: string) => {
  const verifiedRefreshToken = verifyToken(
    refreshToken,
    envVars.JWT_REFRESH_SECRET
  ) as JwtPayload;

  const isUserExist = await User.findOne({ email: verifiedRefreshToken.email });

  // check user exist or not
  if (!isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User does not exist!");
  }

  // check user block or inactive
  if ( isUserExist.isActive === IsActive.BLOCKED ||isUserExist.isActive === IsActive.INACTIVE) {
    throw new AppError(StatusCodes.BAD_REQUEST,`User is ${isUserExist.isActive}!`);
  }

  // check user delete?
  if ( isUserExist.isDeleted) {
    throw new AppError(StatusCodes.BAD_REQUEST,`User is deleted!`);
  }

  const jwtPayload = {
    userId:isUserExist._id,
    email:isUserExist.email,
    role:isUserExist.role
  };

  // get access token 
  const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES);

  return {
    accessToken
  }

};

export const AuthServices = {
  creadentialsLogin,
  getNewAccessToken,
};
