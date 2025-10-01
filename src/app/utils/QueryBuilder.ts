import { Query } from "mongoose";
import { excludeField } from "../constants";

// Build a QueryBuilder
export class QueryBuilder<T> {
  public modelQuery: Query<T[], T>;
  public readonly query: Record<string, string>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, string>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  // Filter methods
  filter(): this {
    // get filter from query
    const filter = { ...this.query };

    // remove other properties except filter
    for (const field of excludeField) {
      delete filter[field];
    }
    // filter method implement
    this.modelQuery = this.modelQuery.find(filter);
    return this;
  }

  // search method
  search(searchableField: string[]): this {
    // get searchTerm
    const searchTerm = this.query.searchTerm || "";

    // based on searchTerm searching on fields
    const searchQuery = {
      $or: searchableField.map((field) => ({
        [field]: { $regex: searchTerm, $options: "i" },
      })),
    };

    // search method
    this.modelQuery = this.modelQuery.find(searchQuery);

    return this;
  }

  // Sort method
  sort(): this {
    const sort = this.query.sort || "-createdAt";
    this.modelQuery = this.modelQuery.sort(sort);
    return this;
  }

  // fields method
  fields(): this {
    const fields = this.query.fields?.split(",").join(" ") || "";
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }

  // paginate method
  paginate(): this {
    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10;
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);

    return this;
  }

  // build method
  build(){
    return this.modelQuery;
    
  }
}
