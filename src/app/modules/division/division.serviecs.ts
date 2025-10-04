import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { QueryBuilder } from "../../utils/QueryBuilder";
import { divisionSearchableFields } from "./division.constant";
import { IDivision } from "./division.interface";
import { Division } from "./division.model";

// create division
const createDivision = async (payload: IDivision) => {

    const existingDivision = await Division.findOne({ name: payload.name });
    if (existingDivision) {
        throw new Error("A division with this name already exists.");
    }
    const division = await Division.create(payload);

    return division
};


// get all division
const getAllDivisions = async (query: Record<string, string>) => {

   const queryBuilder = new QueryBuilder(Division.find(), query);
   
     // implement filter method
     const divisions = await queryBuilder
       .search(divisionSearchableFields)
       .filter()
       .sort()
       .fields()
       .paginate();
   
   
     const [data, meta] = await Promise.all([
       divisions.build(),
       queryBuilder.getMeta(),
     ]);


    // const divisions = await Division.find({});
    // const totalDivisions = await Division.countDocuments();


    return {
        data: data,
        meta:  meta
    }
};

// single division get
const getSingleDivision = async (slug: string) => {
    const division = await Division.findOne({ slug });
    return {
        data: division,
    }
};


// update division
const updateDivision = async (id: string, payload: Partial<IDivision>) => {

    const existingDivision = await Division.findById(id);
    if (!existingDivision) {
        throw new Error("Division not found.");
    }

    const duplicateDivision = await Division.findOne({
        name: payload.name,
        _id: { $ne: id },
    });

    if (duplicateDivision) {
        throw new Error("A division with this name already exists.");
    }

    const updatedDivision = await Division.findByIdAndUpdate(id, payload, { new: true, runValidators: true })

    return updatedDivision

};

// delete a division
const deleteDivision = async (id: string) => {

  const deletedDivision = await Division.findByIdAndDelete(id);

  if (!deletedDivision) {
    throw new AppError(StatusCodes.NOT_FOUND, "Division not found!");
  }
  return deletedDivision;
};

export const DivisionServices = {
  createDivision,
  getAllDivisions,
  getSingleDivision,
  updateDivision,
  deleteDivision

};
