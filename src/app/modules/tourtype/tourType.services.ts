import AppError from "../../errorHelpers/appError";
import { ITourType } from "./tourtype.interface";
import { TourType } from "./tourtype.model";


// create tour type
const createTourType = async (payload: Partial<ITourType>) => {

  const {name} = payload;

  const isTourTypeExist = await TourType.findOne({name});

  if(isTourTypeExist){
    throw new AppError(400, "TourType already Exist");
  }


  const tourType = await TourType.create({name});

  return tourType;
};

export const TourTypeServices = {
  createTourType
}