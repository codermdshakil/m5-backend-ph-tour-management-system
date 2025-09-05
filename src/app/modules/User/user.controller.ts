import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sentResponse } from "../../utils/sendResponse";
import { UserServices } from "./user.service";

// create user using normal function with try catch

// create a user
// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // handle createUser from user.service file
//     const user = await UserServices.createUser(req.body);

//     res.status(StatusCodes.CREATED).json({
//       messsage: "User created successfully!",
//       user,
//     });
//   } catch (err: any) {
//     next(err);
//   }
// };

// create user using catchAsync
const createUser = catchAsync(async (req: Request, res: Response) => {

  const user = await UserServices.createUser(req.body)

  sentResponse(res, {
    success: true,
    statusCode: StatusCodes.CREATED,
    message: "Successfully User Created!",
    data: user,
  });
});

// get all user data
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserServices.getAllUser();

  sentResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Get All users successfully!",
    data: result.data,
    meta:result.meta 
  });

});

export const UserControllers = {
  createUser,
  getAllUsers,
};

// Steps:
// route matching -> UserRoutes -> UserController.createUser -> UserServices.createUser

// Steps
// 1. user.interface.ts -> create user Shape
// 2. user.model.ts -> create user model
// 3. user.route.ts -> here handle all routes like POST, GET, PUT, PATCH, DELETE
// 4. user.controller.ts ->
// 5. user.services.ts
