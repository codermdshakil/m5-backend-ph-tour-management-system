import AppError from "../../errorHelpers/appError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { tourSearchableFields } from "./tour.constant";
import { ITour } from "./tour.interface";
import { Tour } from "./tour.model";

// create
const createTour = async (payload: ITour) => {
  const existingTour = await Tour.findOne({ title: payload.title });

  if (existingTour) {
    throw new AppError(400, "A tour with this title already exists.");
  }

  const tour = await Tour.create(payload);

  return tour;
};


// get all tours
// const getAllToursOld = async (query: Record<string, string>) => {
//   const filter = query;
//   const searchTerm = query.searchTerm || "";
//   const sort = query.sort || "-createdAt";
//   const page = Number(query.page) || 1;
//   const limit = Number(query.limit) || 10;
//   const skip = (page - 1) * limit;

//   // field filtering
//   const fields = query.fields?.split(",").join(" ") || "";

//   for (const field of excludeField) {
//     delete filter[field];
//   }

//   // raw filtering
//   // const tours = await Tour.find(filter);

//   // raw searching

//   // ##  search just based one field that is title
//   // const tours = await Tour.find({
//   //     title:{$regex:searchTerm, $options:"i"}
//   // });

//   // ## search just based on multiple field that is  title , description, location

//   const searchQuery = {
//     $or: tourSearchableFields.map((field) => ({
//       [field]: { $regex: searchTerm, $options: "i" },
//     })),
//   };

//   // calculate meta data
//   const totalTours = await Tour.countDocuments();
//   const totalPage = Math.ceil(totalTours / limit);

//   const metaData = {
//     page: page,
//     limit: limit,
//     totalPage: totalPage,
//     totalTours: totalTours,
//   };

//   //   handle page if greater
//   if (page > totalPage) {
//     throw new AppError(
//       StatusCodes.NOT_FOUND,
//       "Page is greather then total Page!"
//     );
//   }

//   // One way Qury method
//   //   const tours = await Tour.find(searchQuery)
//   //     .find(filter)
//   //     .sort(sort)
//   //     .select(fields)
//   //     .skip(skip)
//   //     .limit(limit);

//   // Another way query method
//   const filterQuery = Tour.find(filter);
//   const tours = filterQuery.find(searchQuery);
//   const allTours = await tours
//     .sort(sort)
//     .select(fields)
//     .skip(skip)
//     .limit(limit);

//   return {
//     data: allTours,
//     meta: metaData,
//   };
// };


// get all tours
const getAllTours = async (query: Record<string, string>) => {
  const queryBuilder = new QueryBuilder(Tour.find(), query);
  // implement filter method
  const tours = await queryBuilder.search(tourSearchableFields).filter().modelQuery;
  
 

  return {
    data: tours,
    // meta: metaData,
  };
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
  deleteTour,
};
