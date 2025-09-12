import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { JwtPayload } from "jsonwebtoken";
import passport from "passport";
import { envVars } from "../../config/env";
import AppError from "../../errorHelpers/appError";
import { catchAsync } from "../../utils/catchAsync";
import { clearAuthCookie } from "../../utils/clearCookie";
import { sentResponse } from "../../utils/sendResponse";
import { setAuthCookie } from "../../utils/setCookie";
import { createUserTokens } from "../../utils/userTokens";
import { AuthServices } from "./auth.services";

// login with email password with jwt / google login
const creadentialsLogin = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    // const loginInfo = await AuthServices.creadentialsLogin(req.body);

    passport.authenticate("local", async (err: any, user: any, info: any) => {
      // set accessToken and refreshToken

      if (err) {
        // return next(err);
        console.log("from err");
        return next(new AppError(402, err));
      }

      if (!user) {
        console.log("from !user");
        return next(new AppError(401, info.message));
      }

      const userTokens = await createUserTokens(user);

      // delete user password property
      // delete user.toObject().password;
      const { password, ...rest } = user;

      // using
      setAuthCookie(res, userTokens);

      sentResponse(res, {
        success: true,
        statusCode: StatusCodes.OK,
        message: "User Logged In Successfully!",
        data: {
          accessToken: userTokens.accessToken,
          refreshToken: userTokens.refreshToken,
          user: rest,
        },
      });
    })(req, res, next);

    // set accessToken to cookie
    // res.cookie("accessToken", loginInfo.accessToken, {
    //   httpOnly:true,
    //   secure:false
    // });

    // set refreshToken to cookie
    // res.cookie("refreshToken", loginInfo.refreshToken, {
    //   httpOnly:true,
    //   secure:false
    // });

    // set accessToken and refreshToken
    // setAuthCookie(res, loginInfo);

    // sentResponse(res, {
    //   success: true,
    //   statusCode: StatusCodes.OK,
    //   message: "User Logged In Successfully!",
    //   data: loginInfo,
    // });
  }
);

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
    const user = req.user;

    if (!user) {
      throw new AppError(StatusCodes.NOT_FOUND, "User Not Found");
    }

    const tokenInfo = createUserTokens(user);
    setAuthCookie(res, tokenInfo);

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
