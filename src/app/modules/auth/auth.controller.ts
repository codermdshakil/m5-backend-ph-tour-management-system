import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { clearAuthCookie } from "../../utils/clearCookie";
import { sentResponse } from "../../utils/sendResponse";
import { setAuthCookie } from "../../utils/setCookie";
import { AuthServices } from "./auth.services";


// login with email password with jwt
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


  // set cookie
  setAuthCookie(res, tokenInfo.accessToken);

  sentResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "New Access Token retrived Successfully!",
    data: tokenInfo.accessToken
  });
  
});

// logout 
const logout =  catchAsync(async (req: Request, res: Response) => {

  // clear accessToken and refreshToken
  clearAuthCookie(res);

  sentResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User logout successfully!",
    data: null
  });
  
});

// reset password
const resetPassword =  catchAsync(async (req: Request, res: Response) => {

  const newPassword = req.body.newPassword;
  const oldPassword = req.body.oldPassword;

  const decoredToken = req.user;

  const newUpdatedPassword = await AuthServices.resetPassword(newPassword, oldPassword, decoredToken!);

  console.log(newUpdatedPassword, "newUpdatedPassword");
 
  sentResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Password changed successfully!",
    data: null
  });
  
});

export const AuthController = {
  creadentialsLogin,
  getNewAccessToken,
  logout,
  resetPassword
}
