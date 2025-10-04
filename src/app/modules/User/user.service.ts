import bcryptjs from "bcryptjs";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/appError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { userSearchableFields } from "./user.constant";
import { IAuthProvider, IUser, Role } from "./user.interface";
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

  // hashed password
  const hashPassword = await bcryptjs.hash(
    password as string,
    parseInt(envVars.BCRYPT_SALT_ROUND)
  );

  // auth provider
  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  // create user
  const user = await User.create({
    email,
    password: hashPassword,
    auths: [authProvider],
    ...rest,
  });

  // return response
  return user;
};

// update user
const updateUser = async ( userId: string, payload: Partial<IUser>, decodedToken: JwtPayload) => {


  /**
   *
   * email - cannot update
   * name, phone, password, address,
   * password - re hashing,
   * only Admin, Super Admin isDelete, isVerified....
   * promoting to superadmin - only super admin can do it
   *
   */

  const ifUserExist = await User.findById(userId);

  // check user exist or not
  if (!ifUserExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "User not found!");
  }

  if (payload.role) {
    // check users if normal user || guide then they can't updates
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(StatusCodes.FORBIDDEN, "You are not Authorized!!");
    }

    // admin can't make super admin
    if (payload.role === Role.SUPER_ADMIN && decodedToken.role === Role.ADMIN) {
      throw new AppError(StatusCodes.FORBIDDEN, "You are not Authorized!!");
    }
  }

  if (payload.isActive || payload.isDeleted || payload.isVerified) {
    if (decodedToken.role === Role.USER || decodedToken.role === Role.GUIDE) {
      throw new AppError(StatusCodes.FORBIDDEN, "You are not Authorized!!");
    }
  }

  // re - hash password
  if (payload.password) {
    payload.password = await bcryptjs.hash(
      payload.password,
      parseInt(envVars.BCRYPT_SALT_ROUND)
    );
  }

  const newUpdatedUser = await User.findByIdAndUpdate(userId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdatedUser;
};

// getall users
const getAllUser = async (query : Record<string, string>) => {
   
  const queryBuilder = new QueryBuilder(User.find(), query);
  
    // implement filter method
    const users = await queryBuilder
      .search(userSearchableFields)
      .filter()
      .sort()
      .fields()
      .paginate();
  
    const [data, meta] = await Promise.all([
      users.build(),
      queryBuilder.getMeta(),
    ]);

  return {
    data: data,
    meta: meta
  };
};

export const UserServices = {
  createUser,
  updateUser,
  getAllUser,
};
