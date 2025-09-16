import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { catchAsync } from "../../utils/catchAsync";
import { sentResponse } from "../../utils/sendResponse";
import { DivisionServices } from "./division.serviecs";


// create new division
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

// get all divition
const getAllDivision = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
  
  const result = await DivisionServices.getAllDivision();
  
    sentResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Get All divisions successfully!",
      data: result.data,
      meta:result.meta 
    });

  }
);

// get all divition
const updateDivision = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
  
  const divisionId = req.params.id;

  const updatedDivision = await DivisionServices.updateDivision(divisionId, req.body);
  
    sentResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Get All divisions successfully!",
      data: updatedDivision
    });

  }
);

// delete division
const deleteDivision = catchAsync( async (req: Request, res: Response, next: NextFunction) => {
  
  const divisionId = req.params.id;
  const deletedDivision = await DivisionServices.deleteDivision(divisionId);
  
    sentResponse(res, {
      success: true,
      statusCode: StatusCodes.OK,
      message: "Division Deleted successfully!",
      data: deletedDivision
    });

  }
);


 

export const DivisionController = {
  createDivision,
  getAllDivision, 
  updateDivision,
  deleteDivision
};
