import { Request, Response } from "express";
import { envVars } from "../../config/env";
import { catchAsync } from "../../utils/catchAsync";
import { PaymentService } from "./payment.service";

const initPayment = catchAsync(async (req: Request, res: Response) => {});

const successPayment = catchAsync(async (req: Request, res: Response) => {
  const query = req.query;

  const result = await PaymentService.successPayment(
    query as Record<string, string>
  );

  if(result.success){
    res.redirect(envVars.SSL.SSL_SUCCESS_FRONTEND_URL);
  }

 
});

const failPayment = catchAsync(async (req: Request, res: Response) => {});

const cancelPayment = catchAsync(async (req: Request, res: Response) => {});

export const PaymentController = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
};
