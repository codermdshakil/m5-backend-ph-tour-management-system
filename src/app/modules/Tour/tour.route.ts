import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { TourTypeController } from "../tourType/tourType.controller";
import { createTourTypeZodSchema, updateTourTypeZodSchema } from "../tourType/tourType.validation";

const router = Router();

router.post("/create-tour-type",validateRequest(createTourTypeZodSchema), TourTypeController.createTourType);
router.get("/tour-types", TourTypeController.getAllTourTypes);
router.patch("/tour-types/:id", validateRequest(updateTourTypeZodSchema),TourTypeController.updateTourType);
router.delete("/tour-types/:id",TourTypeController.deleteTourType);




export const TourRoutes = router;
