import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken";
import AppError from "../../errorHelpers/appError";
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

  const accessToken = jwt.sign(jwtPayload, "secret", { expiresIn: "1d" });

  return {
    accessToken,
  };
};

export const AuthServices = {
  creadentialsLogin,
};
