import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserServices } from "./user.service";

// create a user
const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {

    // handle createUser from user.service file
    const user = await UserServices.createUser(req.body);

    res.status(StatusCodes.CREATED).json({
      messsage: "User created successfully!",
      user,
    });

  } catch (err: any) {
    next(err);
  }
};

export const UserControllers = {
  createUser,
};

// Steps:
// route matching -> UserRoutes -> UserController.createUser -> UserServices.createUser

// Steps
// 1. user.interface.ts -> create user Shape
// 2. user.model.ts -> create user model
// 3. user.route.ts -> here handle all routes like POST, GET, PUT, PATCH, DELETE
// 4. user.controller.ts ->
// 5. user.services.ts
