import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { createNewAccessTokenUsingRefreshToken, createUserTokens } from "../../utils/userTokens";
import { IUser } from "../User/user.interface";
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

  const newAccessToken = await createNewAccessTokenUsingRefreshToken(refreshToken);

  return {
    accessToken:newAccessToken
  }

};

export const AuthServices = {
  creadentialsLogin,
  getNewAccessToken,
};
