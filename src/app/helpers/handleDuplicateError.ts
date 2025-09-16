import { TGenericErrorResponse } from "../interfaces/error.types";

// handle mongoose duplicate errors
export const handleDuplicateError = (err: any) : TGenericErrorResponse => {
  const matchedArray = err.message.match(/"([^*]*)"/);
  return {
    statusCode: 400,
    message: `${matchedArray[1]} already exist!`,
  };
};

