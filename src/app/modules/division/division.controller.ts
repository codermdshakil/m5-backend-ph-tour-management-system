import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { sentResponse } from "../../utils/sendResponse";
import { DivisionServices } from "./division.serviecs";

// create
const createDivision = catchAsync(async (req: Request, res: Response) => {
    const result = await DivisionServices.createDivision(req.body);
    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: "Division created",
        data: result,
    });
});

// get alls division
const getAllDivisions = catchAsync(async (req: Request, res: Response) => {
    const result = await DivisionServices.getAllDivisions();
    sentResponse(res, {
        statusCode: 200,
        success: true,
        message: "Divisions retrieved",
        data: result.data,
        meta: result.meta,
    });
});

// get single division
const getSingleDivision = catchAsync(async (req: Request, res: Response) => {
    const slug = req.params.slug
    const result = await DivisionServices.getSingleDivision(slug);
    sentResponse(res, {
        statusCode: 200,
        success: true,
        message: "Divisions retrieved",
        data: result.data,
    });
});

// update
const updateDivision = catchAsync(async (req: Request, res: Response) => {
    const id = req.params.id;

    const result = await DivisionServices.updateDivision(id, req.body);
    sentResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division updated",
        data: result,
    });
});

// delete
const deleteDivision = catchAsync(async (req: Request, res: Response) => {
    const result = await DivisionServices.deleteDivision(req.params.id);
    sentResponse(res, {
        statusCode: 200,
        success: true,
        message: "Division deleted",
        data: result,
    });
});

export const DivisionController = {
    createDivision,
    getAllDivisions,
    getSingleDivision,
    updateDivision,
    deleteDivision,
};