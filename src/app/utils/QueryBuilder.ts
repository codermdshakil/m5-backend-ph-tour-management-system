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
}
