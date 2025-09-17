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

// update tourType
const updateTourType = async (tourId:string, payload:Partial<ITourType>) => {

  const isTourTypeExist = await TourType.findById(tourId);

  if(!isTourTypeExist){
    throw new AppError(400, "Tour Type is not Found!")
  }

  const updatedTourType = await TourType.findByIdAndUpdate(
    tourId,
    { $set: payload },
    { new: true, runValidators: true }
  );

  return updatedTourType;
};

// delete tourType
const deleteTourType = async (tourId: string) => {
  const deletedTourType = await TourType.findByIdAndDelete(tourId);

  if (!deletedTourType) {
    throw new AppError(404, "Tour Type not found!");
  }

  return deletedTourType;
};


export const TourTypeServices = {
  createTourType,
  getAllTourTypes,
  updateTourType,
  deleteTourType
};
