import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZodSchema } from "./user.validation";

const router = Router();

router.post(
  "/register",
  async (req: Request, res: Response, next: NextFunction) => {
   
    req.body = await createUserZodSchema.parseAsync(req.body);
    console.log(req.body, 'from hit');

    // next();
  },
  UserControllers.createUser
);

router.get("/all-users", UserControllers.getAllUsers);

export const UserRoutes = router;
