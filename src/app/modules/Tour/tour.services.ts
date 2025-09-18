import AppError from "../../errorHelpers/appError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { tourSearchableFields } from "./tour.constant";
import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";

// create
const createTour = async (payload: ITour) => {
    const existingTour = await Tour.findOne({ title: payload.title });

    if (existingTour) {
        throw new AppError(400,"A tour with this title already exists.");
    }

    const tour = await Tour.create(payload)

    return tour;
};

// get all tours
const getAllTours = async (query: Record<string, string>) => {


    const queryBuilder = new QueryBuilder(Tour.find(), query)

    const tours = await queryBuilder
        .search(tourSearchableFields)
        .filter()
        .sort()
        .fields()
        .paginate()


    const [data, meta] = await Promise.all([
        tours.build(),
        queryBuilder.getMeta()
    ])


    return {
        data,
        meta
    }
};

// update
const updateTour = async (id: string, payload: Partial<ITour>) => {

    const existingTour = await Tour.findById(id);

    if (!existingTour) {
        throw new Error("Tour not found.");
    }
    const updatedTour = await Tour.findByIdAndUpdate(id, payload, { new: true });

    return updatedTour;
};

// delete
const deleteTour = async (id: string) => {
    return await Tour.findByIdAndDelete(id);
};


export const TourServices = {
  createTour,
  getAllTours,
  updateTour,
  deleteTour

};
