import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/appError";
import { catchAsync } from "../../utils/catchAsync";
import { clearAuthCookie } from "../../utils/clearCookie";
import { sentResponse } from "../../utils/sendResponse";
import { setAuthCookie } from "../../utils/setCookie";
import { createUserTokens } from "../../utils/userTokens";
import { AuthServices } from "./auth.services";

// login with email password with jwt
const creadentialsLogin = catchAsync(async (req: Request, res: Response) => {
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
    data: loginInfo,
  });
});

// refresh token implement
const getNewAccessToken = catchAsync(async (req: Request, res: Response) => {
  // get refreshToken from cookies
  const refreshToken = req.cookies.refreshToken;

  const tokenInfo = await AuthServices.getNewAccessToken(
    refreshToken as string
  );

  // set cookie
  setAuthCookie(res, tokenInfo.accessToken);

  sentResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "New Access Token retrived Successfully!",
    data: tokenInfo.accessToken,
  });
});

// logout
const logout = catchAsync(async (req: Request, res: Response) => {
  // clear accessToken and refreshToken
  clearAuthCookie(res);

  sentResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "User logout successfully!",
    data: null,
  });
});

// reset password
const resetPassword = catchAsync(async (req: Request, res: Response) => {
  const newPassword = req.body.newPassword;
  const oldPassword = req.body.oldPassword;

  const decoredToken = req.user;

  const newUpdatedPassword = await AuthServices.resetPassword(
    newPassword,
    oldPassword,
    decoredToken as JwtPayload
  );

  console.log(newUpdatedPassword, "newUpdatedPassword");

  sentResponse(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: "Password changed successfully!",
    data: null,
  });
});

// google callback controller
const googleCallbackController = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    
    // let redirectTo = req.query.state ? (req.query.state as string) : "";
    // if (redirectTo.startsWith("/")) {
    //   redirectTo = redirectTo.slice(1);
    // }

    // // /booking => booking , => "/" => ""

    const user = req.user;

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "User Not Found");
    }

    const tokenInfo = createUserTokens(user);

    setAuthCookie(res, tokenInfo);

    // res.redirect(`${envVars.FRONTEND_URL}/${redirectTo}`);
    res.redirect(envVars.FRONTEND_URL);
  }
);

export const AuthController = {
  creadentialsLogin,
  getNewAccessToken,
  logout,
  resetPassword,
  googleCallbackController,
};
