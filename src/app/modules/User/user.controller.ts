import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { User } from "./user.model";
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
const createUser = catchAsync( async (req:Request, res:Response) => {
  
  const {name, email} = req.body;
  const user = await User.create({name, email});

  res.status(StatusCodes.CREATED).json({
    success:true,
    message:"Created user successfully!",
    user
  })
})

// with try catch 
// const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
//   try {

//     const users = await UserServices.getAllUser();
//     res.status(StatusCodes.CREATED).json({
//       messsage: "Get All users successfully!",
//       users,
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// wihtout trycatch - using catchAsync where inside this function use try catch

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const users = await UserServices.getAllUser();
  res.status(StatusCodes.OK).json({
    success:true,
    messsage: "Get All users successfully!",
    users,
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
