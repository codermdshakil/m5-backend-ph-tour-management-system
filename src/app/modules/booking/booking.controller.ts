import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
 
const createBooking = catchAsync(async (req: Request, res: Response) => {
   
});

const getUserBookings = catchAsync(
    async (req: Request, res: Response) => {
      
    }
);

const getSingleBooking = catchAsync(
    async (req: Request, res: Response) => { 
    }
);

const getAllBookings = catchAsync(
    async (req: Request, res: Response) => { 
    }
);

const updateBookingStatus = catchAsync(
    async (req: Request, res: Response) => {

        
    }
);


export const BookingController = {
    createBooking,
    getAllBookings,
    getSingleBooking,
    getUserBookings,
    updateBookingStatus,
}