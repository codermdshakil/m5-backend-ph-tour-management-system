import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sentResponse } from "../../utils/sendResponse";
import { DivisionServices } from "./division.serviecs";

const createDivision = catchAsync( async (req: Request, res: Response, next: NextFunction) => {


    const division = await DivisionServices.createDivision(req.body);

    sentResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Successfully Division Created!",
      data: division,
    });
  }
);

export const DivisionController = {
  createDivision,
};
