import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { IDivision } from "./division.interface";
import { Divistion } from "./division.model";

const createDivision = async (payload: Partial<IDivision>) => {


  const { name,slug, ...rest } = payload;

  const isDivisionExist = await Divistion.findOne({ slug });

  // check  deivision exist
  if (isDivisionExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Division Already Exist");
  }

   // create 
    const division = await Divistion.create({
      name,
      slug,
      ...rest,
    });
  
    // return response
    return division;
};

export const DivisionServices = {
  createDivision,
};
