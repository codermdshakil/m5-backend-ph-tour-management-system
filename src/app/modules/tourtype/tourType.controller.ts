import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sentResponse } from "../../utils/sendResponse";
import { TourTypeServices } from "./tourType.services";


// create tour type
const createTourType = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {

    // get response
    const tourType = await TourTypeServices.createTourType(req.body);


    // sent response
    sentResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Successfully TourType Created!",
      data: tourType,
    });
  }
);

export const TourTypeController = {
  createTourType
}
