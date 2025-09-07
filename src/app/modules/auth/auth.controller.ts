import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sentResponse } from "../../utils/sendResponse";
import { setAuthCookie } from "../../utils/setCookie";
import { AuthServices } from "./auth.services";



const creadentialsLogin =  catchAsync(async (req: Request, res: Response) => {

  const loginInfo = await AuthServices.creadentialsLogin(req.body);

  // set accessToken to cookie
  // res.cookie("accessToken", loginInfo.accessToken, {
  //   httpOnly:true,
  //   secure:false
  // });


  // set accessToken to cookie
  // res.cookie("refreshToken", loginInfo.refreshToken, {
  //   httpOnly:true,
  //   secure:false
  // });


  
  // set accessToken and refreshToken 
  setAuthCookie(res, loginInfo);


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
  const refreshToken = req.cookies.refreshToken;

  const tokenInfo = await AuthServices.getNewAccessToken(refreshToken as string);

    // set accessToken to cookie
  // res.cookie("accessToken", tokenInfo.accessToken, {
  //   httpOnly:true,
  //   secure:false
  // });

  // set cookie
  setAuthCookie(res, tokenInfo.accessToken);

  sentResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User Logged In Successfully!",
    data: tokenInfo.accessToken
  });
  
});

export const AuthController = {
  creadentialsLogin,
  getNewAccessToken
}
