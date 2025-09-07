import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../User/user.interface";
import { AuthController } from "./auth.controller";



const router = Router();

router.post("/login", AuthController.creadentialsLogin);
router.post("/refresh-token", AuthController.getNewAccessToken);
router.post("/logout", AuthController.logout);
router.post("/reset-password",checkAuth(...Object.values(Role)) ,AuthController.resetPassword);

router.get("/google", async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("google", { scope: ["profile", "email"]})(req, res, next)
})

// api/v1/auth/google/callback?state=/booking
router.get("/google/callback", passport.authenticate("google", { failureRedirect: "/login" }), AuthController.googleCallbackController)

export const AuthRoutes = router;
