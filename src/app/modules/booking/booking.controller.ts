import { Request, Response } from "express";
import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sentResponse } from "../../utils/sendResponse";
import { BookingService } from "./booking.service";
 
const createBooking = catchAsync(async (req: Request, res: Response) => {

    const  decodedToken = req.user as JwtPayload;

    const booking = await BookingService.createBooking(req.body, decodedToken.userId);

    sentResponse(res, {
        statusCode: 201,
        success: true,
        message: "Booking created successfully",
        data: booking,
    });

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