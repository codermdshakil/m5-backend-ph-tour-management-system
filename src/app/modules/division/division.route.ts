import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { Role } from "../User/user.interface";
import { DivisionController } from "./division.controller";
import { createDivisionZodSchema, updateDivisionZodSchema } from "./division.validation";

const router = Router();

router.post("/create", validateRequest(createDivisionZodSchema),checkAuth(Role.ADMIN, Role.SUPER_ADMIN),DivisionController.createDivision);
router.get("/", checkAuth(Role.SUPER_ADMIN, Role.ADMIN),DivisionController.getAllDivision);
router.patch("/:id", validateRequest(updateDivisionZodSchema), checkAuth(...Object.values(Role)), DivisionController.updateDivision);



export const DivisionRoutes = router;




