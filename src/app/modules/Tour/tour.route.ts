import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { TourTypeController } from "../tourType/tourType.controller";
import { createTourTypeZodSchema } from "../tourType/tourType.validation";

const router = Router();

router.post("/create-tour-type",validateRequest(createTourTypeZodSchema), TourTypeController.createTourType);
router.get("/tour-types", TourTypeController.getAllTourTypes);




export const TourRoutes = router;
