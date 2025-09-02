import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { User } from "./user.model";

const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email } = req.body;

    const user = await User.create({ name, email });

    res.status(StatusCodes.CREATED).json({
      messsage: "User created successfully!",
      user,
    });

  } catch (err: any) {

    console.log(err);
    res.status(StatusCodes.BAD_REQUEST).json({
      message: `Soemthing want wrong! ${err.message}`,
      err,
    });

  }
};


export const UserControllers = {
  createUser
}