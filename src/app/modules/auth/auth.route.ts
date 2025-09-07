import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "../User/user.interface";
import { AuthController } from "./auth.controller";

const router = Router();

router.post("/login", AuthController.creadentialsLogin);
router.post("/refresh-token", AuthController.getNewAccessToken);
router.post("/logout", AuthController.logout);
router.post("/reset-password",checkAuth(...Object.values(Role)) ,AuthController.resetPassword)

export const AuthRoutes = router;
