import { Router } from "express";
import { validateRequest } from "../../middlewares/validateRequest";
import { TourTypeController } from "../tourType/tourType.controller";
import { createTourTypeZodSchema, updateTourTypeZodSchema } from "../tourType/tourType.validation";
import { TourController } from "./tour.controller";
import { createTourZodSchema } from "./tour.validation";

const router = Router();

// here CRUD operation for TourType
router.post("/create-tour-type",validateRequest(createTourTypeZodSchema), TourTypeController.createTourType);
router.get("/tour-types", TourTypeController.getAllTourTypes);
router.patch("/tour-types/:id", validateRequest(updateTourTypeZodSchema),TourTypeController.updateTourType);
router.delete("/tour-types/:id",TourTypeController.deleteTourType);

// here CRUD operation for Tour
router.post("/create", validateRequest(createTourZodSchema), TourController.createTour)


export const TourRoutes = router;
