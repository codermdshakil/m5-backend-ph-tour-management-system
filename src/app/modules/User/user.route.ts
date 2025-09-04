import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";

const router = Router();
const passwordRegex =
  /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={}[\]|:;"'<>,.?/~`]).{8,}$/;

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
