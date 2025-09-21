import AppError from "../../errorHelpers/appError";
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
const getAllTours = async (query: Record<string,string>) => {

    const filter = query;
    const searchTerm = query.searchTerm || "";

    delete filter["searchTerm"];

    console.log(filter, "hit filter");
    console.log(searchTerm, "hit searchTerm");


    // raw filtering 
    // const tours = await Tour.find(filter);

    // raw searching

    // ##  search just based one field that is title
    // const tours = await Tour.find({
    //     title:{$regex:searchTerm, $options:"i"}
    // });

    // ## search just based on multiple field that is  title , description, location 

   
    const searchQuery = {
        $or:tourSearchableFields.map((field) => ( {[field]:{$regex:searchTerm, $options:"i"}}))
    } 


    const tours = await Tour.find(searchQuery).find(filter);


    const totalTours = await Tour.countDocuments();
    return {
        data:tours,
        meta:{
            total:totalTours
        }
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
