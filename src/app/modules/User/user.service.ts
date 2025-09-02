import { IUser } from "./user.interface";
import { User } from "./user.model";

// create a user
const createUser = async (payload: Partial<IUser>) => {
  const { name, email } = payload;
  const user = await User.create({ name, email });
  return user;
};

// getall users
const getAllUser = async () => {
  const users = await User.find({});
  const totalUsers = await User.countDocuments();

  return {
    data:users,
    meta:{
      total:totalUsers
    }
  };
};

export const UserServices = {
  createUser,
  getAllUser,
};
