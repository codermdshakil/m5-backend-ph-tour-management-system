import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { IDivision } from "./division.interface";
import { Divistion } from "./division.model";

// create division
const createDivision = async (payload: Partial<IDivision>) => {
  const { name, slug, ...rest } = payload;

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

// get all user
const getAllDivision = async () => {
  const users = await Divistion.find({});
  const totalUsers = await Divistion.countDocuments();

  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

const updateDivision = async (divisionId: string,payload: Partial<IDivision>) => {
  const ifDivisionExist = await Divistion.findById(divisionId);

  // check user exist or not
  if (!ifDivisionExist) {
    throw new AppError(StatusCodes.NOT_FOUND, "Division not found!");
  }

  const newUpdatedUser = await Divistion.findByIdAndUpdate(divisionId, payload, {
    new: true,
    runValidators: true,
  });

  return newUpdatedUser;
};

export const DivisionServices = {
  createDivision,
  getAllDivision,
  updateDivision,
};
