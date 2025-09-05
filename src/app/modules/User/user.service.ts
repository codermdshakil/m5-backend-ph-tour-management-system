import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";

// create a user
const createUser = async (payload: Partial<IUser>) => {
  // distructure
  const { email, password, ...rest } = payload;

  // find user
  const isUserExist = await User.findOne({ email });

  // check user exist
  if (isUserExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "User Already Exist");
  }
  // auth provider
  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  // create user
  const user = await User.create({
    email,
    password,
    auths: [authProvider],
    ...rest,
  });

  console.log(user, 'user from services');

  // return response 
  return user;
};

// getall users
const getAllUser = async () => {
  const users = await User.find({});
  const totalUsers = await User.countDocuments();

  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

export const UserServices = {
  createUser,
  getAllUser,
};
