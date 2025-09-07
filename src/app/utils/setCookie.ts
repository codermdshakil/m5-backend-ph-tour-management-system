import { Response } from "express";

export interface AuthTokens {
  accessToken?: string;
  refreshToken?: string;
}


// set accessToken and refreshToken
export const setAuthCookie = (res: Response, tokenInfo: AuthTokens) => {
  if (tokenInfo.accessToken) {
    // set accessToken to cookie
    res.cookie("accessToken", tokenInfo.accessToken, {
      httpOnly: true,
      secure: false,
    });
  }

  if (tokenInfo.refreshToken) {
    // set accessToken to cookie
    res.cookie("refreshToken", tokenInfo.refreshToken, {
      httpOnly: true,
      secure: false,
    });
  }
};
