import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/appError";
import { generateToken } from "../../utils/jwt";
import { IUser } from "../User/user.interface";
import { User } from "../User/user.model";

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

  // token
  const jwtPayload = {
    userId: isUserExist._id,
    email: isUserExist.email,
    role: isUserExist.role,
  };

  // generate jwt access token
  const accessToken = generateToken(
    jwtPayload,
    envVars.JWT_ACCESS_TOKEN,
    envVars.JWT_ACCESS_EXPIRES
  );

  return {
    accessToken,
  };
};

export const AuthServices = {
  creadentialsLogin,
};
