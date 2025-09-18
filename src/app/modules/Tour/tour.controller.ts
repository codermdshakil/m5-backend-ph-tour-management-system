import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sentResponse } from "../../utils/sendResponse";
import { TourServices } from "./tour.services";

// create
const createTour = catchAsync(async (req: Request, res: Response) => {
    const result = await TourServices.createTour(req.body);
    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tour created successfully',
        data: result,
    });
});

// get all tourss
const getAllTours = catchAsync(async (req: Request, res: Response) => {

    const query = req.query
    const result = await TourServices.getAllTours(query as Record<string, string>);
    sentResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tours retrieved successfully',
        data: result.data,
        meta: result.meta,
    });
});

// update
const updateTour = catchAsync(async (req: Request, res: Response) => {

    const result = await TourServices.updateTour(req.params.id, req.body);
    sentResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour updated successfully',
        data: result,
    });
});

// delete
const deleteTour = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await TourServices.deleteTour(id);
    sentResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour deleted successfully',
        data: result,
    });
});

export const TourController = {
  createTour,
  getAllTours,
  updateTour,
  deleteTour
}

