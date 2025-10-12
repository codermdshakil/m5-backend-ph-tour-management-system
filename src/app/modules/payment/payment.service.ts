import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { BOOKING_STATUS } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { PAYMENT_STATUS } from "./payment.interface";
import { Payment } from "./payment.model";

const initPayment = async (bookingId: string) => {};

const successPayment = async (query: Record<string, string>) => {
  // update booking status to CONFIRM
  // update payment status to PAID

  // here we work with two collection sot that I need to use Transaction and Rollback
  // transaction rollback initialaise

  const session = await Booking.startSession();
  session.startTransaction();

  try {

    // Update Payment Status To PAID
    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      { status: PAYMENT_STATUS.PAID },
      {  new: true, runValidators: true, session: session }
    );

     // Update Booking Status To Complete
     await Booking.findByIdAndUpdate(
      updatedPayment?.booking,
      { status:BOOKING_STATUS.COMPLETE },
      { new: true, runValidators: true, session: session }
    )
      .populate("user", "name email phone address")
      .populate("tour", "title costFrom")
      .populate("payment");

    

    // transaction rollback commit
    await session.commitTransaction(); // transaction
    session.endSession();

    return {
        success:true,
        message:"Payment Completed SuccessFully!!"
    };

  } catch (error) {
    await session.abortTransaction(); // transaction rollback
    session.endSession();
    throw new AppError(StatusCodes.BAD_REQUEST, "Error Occured when trying to Payment");
  }
};

const failPayment = async (query: Record<string, string>) => {
  // update booking status to FAIL
  // update payment status to FAIL
};

const cancelPayment = async (query: Record<string, string>) => {
  // update booking status to CANCEL
  // update payment status to CANCEL
};

export const PaymentService = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
};
