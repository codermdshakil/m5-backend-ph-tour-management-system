import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";

const router = Router();


router.post("/register", validateRequest(createUserZodSchema), UserControllers.createUser);
router.get("/all-users",checkAuth("ADMIN", "SUPER_ADMIN"),UserControllers.getAllUsers);


export const UserRoutes = router;
