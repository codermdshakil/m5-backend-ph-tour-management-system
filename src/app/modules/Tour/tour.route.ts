import { Router } from "express";
import { checkAuth } from "../../middlewares/checkAuth";
import { validateRequest } from "../../middlewares/validateRequest";
import { TourTypeController } from "../tourType/tourType.controller";
import { createTourTypeZodSchema, updateTourTypeZodSchema } from "../tourType/tourType.validation";
import { Role } from "../User/user.interface";
import { TourController } from "./tour.controller";
import { createTourZodSchema, updateTourZodSchema } from "./tour.validation";

const router = Router();

/* --------------------- TOURTYPE ROUTES ---------------------- */
router.post("/create-tour-type",validateRequest(createTourTypeZodSchema), TourTypeController.createTourType);
router.get("/tour-types", TourTypeController.getAllTourTypes);
router.patch("/tour-types/:id", validateRequest(updateTourTypeZodSchema),TourTypeController.updateTourType);
router.delete("/tour-types/:id",TourTypeController.deleteTourType);

/* --------------------- TOUR ROUTES ---------------------- */
router.get("/", TourController.getAllTours);
router.post("/create", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), validateRequest(createTourZodSchema), TourController.createTour);
router.patch("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN),  validateRequest(updateTourZodSchema), TourController.updateTour);
router.delete("/:id",checkAuth(Role.ADMIN, Role.SUPER_ADMIN), TourController.deleteTour);



export const TourRoutes = router;
