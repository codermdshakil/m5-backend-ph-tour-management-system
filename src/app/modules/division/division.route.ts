import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../User/user.interface";
import { DivisionController } from "./division.controller";
import { createDivisionZodSchema } from "./division.validation";

const router = Router();

router.post("/create", validateRequest(createDivisionZodSchema),checkAuth(Role.ADMIN, Role.SUPER_ADMIN),DivisionController.createDivision)


export const DivisionRoutes = router;




