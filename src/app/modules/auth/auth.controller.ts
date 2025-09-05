import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sentResponse } from "../../utils/sendResponse";
import { AuthServices } from "./auth.services";



const creadentialsLogin =  catchAsync(async (req: Request, res: Response) => {

  const loginInfo = await AuthServices.creadentialsLogin(req.body);

  sentResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User Logged In Successfully!",
    data: loginInfo
  });
  
});

export const AuthController = {
  creadentialsLogin
}
