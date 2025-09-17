import AppError from "../../errorHelpers/appError";
import { ITourType } from "./tourtype.interface";
import { TourType } from "./tourtype.model";

// create tour type
const createTourType = async (payload: Partial<ITourType>) => {
  const { name } = payload;

  const isTourTypeExist = await TourType.findOne({ name });

  if (isTourTypeExist) {
    throw new AppError(400, "TourType already Exist");
  }

  const tourType = await TourType.create({ name });

  return tourType;
};

// get all tour types
const getAllTourTypes = async () => {
  const allTours = await TourType.find({});
  const totalTours = await TourType.countDocuments();

  return {
    data: allTours,
    meta: {
      total: totalTours,
    },
  };
};

export const TourTypeServices = {
  createTourType,
  getAllTourTypes,
};
