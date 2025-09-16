import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";

// create division
const createDivision = async (payload: Partial<IDivision>) => {
  const { name, slug, ...rest } = payload;

  const isDivisionExist = await Division.findOne({ slug });

  // check  deivision exist
  if (isDivisionExist) {
    throw new AppError(StatusCodes.BAD_REQUEST, "Division Already Exist");
  }

  // create
  const division = await Division.create({
    name,
    slug,
    ...rest,
  });

  // return response
  return division;
};

// get all division
const getAllDivision = async () => {
  const users = await Division.find({});
  const totalUsers = await Division.countDocuments();

  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

// update division
const updateDivision = async (divisionId: string,payload: Partial<IDivision>) => {
  const ifDivisionExist = await Division.findById(divisionId);

  // check user exist or not
  if (!ifDivisionExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "Division not found!");
  }

  const newUpdatedUser = await Division.findByIdAndUpdate(divisionId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdatedUser;
};

// delete a division
const deleteDivision = async (divisionId: string) => {


  const ifDivisionExist = await Division.findById(divisionId);

  // check user exist or not
  if (!ifDivisionExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "Division not found!");
  }

  const deletedDivision = await Division.findByIdAndDelete(divisionId);
  return deletedDivision;
  
};

export const DivisionServices = {
  createDivision,
  getAllDivision,
  updateDivision,
  deleteDivision
};
