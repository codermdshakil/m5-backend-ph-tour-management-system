import { Response } from "express";

interface IMeta {
  total:number;
}

interface TResponse<T> {
  statusCode:number;
  success:boolean;
  message:string;
  data: T,
  meta?:IMeta
};

export const sentResponse = <T>(res: Response, responseData: TResponse<T>) => {

  res.status(responseData.statusCode).json({
    success:responseData.success,
    statusCode:responseData.statusCode,
    messsage:responseData.message,
    data:responseData.data,
    meta:responseData.meta
  });
  
};



