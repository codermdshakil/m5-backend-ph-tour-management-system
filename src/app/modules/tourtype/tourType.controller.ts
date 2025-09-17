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

// get all tour types
const getAllTourTypes = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await TourTypeServices.getAllTourTypes();

    sentResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Get All Tour Types successfully!",
      data: result.data,
      meta: result.meta,
    });
  }
);

// update tour type
const updateTourType = catchAsync(async(req:Request, res:Response, next:NextFunction) => {

  const tourId = req.params.id;
  const updatedTourType = await TourTypeServices.updateTourType(tourId, req.body);

  sentResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Updated tourType successfully!",
      data:updatedTourType,
    });

})

export const TourTypeController = {
  createTourType,
  getAllTourTypes,
  updateTourType
};
