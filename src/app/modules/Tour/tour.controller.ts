import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sentResponse } from "../../utils/sendResponse";
import { TourServices } from "./tour.services";

// create
const createTour = catchAsync(async(req:Request, res:Response, next:NextFunction) => {

  const tour = await TourServices.createTour(req.body);

  sentResponse(res, {
      success: true,
      statusCode: StatusCodes.CREATED,
      message: "Successfully Tour Created!",
      data: tour,
    });

});

export const TourController = {
  createTour,
}

