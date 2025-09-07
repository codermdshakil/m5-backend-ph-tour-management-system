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

// refresh token implement
const getNewAccessToken =  catchAsync(async (req: Request, res: Response) => {

  // get refreshToken from cookies 
  // const refreshToken = req.cookies.refreshToken;
  const refreshToken = req.headers.authorization;

  const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string)

  sentResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User Logged In Successfully!",
    data: tokenInfo
  });
  
});

export const AuthController = {
  creadentialsLogin,
  getNewAccessToken
}
