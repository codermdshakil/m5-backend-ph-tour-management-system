import { Response } from "express";

export const clearAuthCookie = (res:Response) => {
   // clear accessToken from cookie
    res.clearCookie("accessToken", {
      httpOnly:true,
      secure:false,
      sameSite:"lax"
    });
    
    // clear refreshToken from cookie
    res.clearCookie("refreshToken", {
      httpOnly:true,
      secure:false,
      sameSite:"lax"
    });

}