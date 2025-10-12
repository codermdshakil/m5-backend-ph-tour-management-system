import { StatusCodes } from "http-status-codes";
import AppError from "../../errorHelpers/appError";
import { BOOKING_STATUS } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { ISSLCommerz } from "../sslCommerz/sslCommerz.interface";
import { SSLService } from "../sslCommerz/sslCommerz.service";
import { PAYMENT_STATUS } from "./payment.interface";
import { Payment } from "./payment.model";

const initPayment = async (bookingId: string) => {
  const payment = await Payment.findOne({ booking: bookingId });

  if (!payment) {
    throw new AppError(
      StatusCodes.NOT_FOUND,
      "Payment Not Found! You have not Booked this Tour!"
    );
  }

  // get booking

  const booking = await Booking.findById(payment.booking);

  // SSLCommerz Payment Implement

  const userAddress = (booking?.user as any).address;
  const userEmail = (booking?.user as any).email;
  const userName = (booking?.user as any).name;
  const userPhone = (booking?.user as any).phone;

  const sslPayload: ISSLCommerz = {
    name: userName,
    email: userEmail,
    address: userAddress,
    phoneNumber: userPhone,
    amount: payment.amount,
    transactionId: payment.transactionId,
  };

  const sslPayment = await SSLService.sslPaymentInit(sslPayload);

  return {
    paymentURL: sslPayment.GatewayPageURL,
    booking: booking,
  };
};

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
      { runValidators: true, session: session }
    );

    // Update Booking Status To Complete
    await Booking.findByIdAndUpdate(
      updatedPayment?.booking,
      { status: BOOKING_STATUS.COMPLETE },
      { runValidators: true, session: session }
    );

    // transaction rollback commit
    await session.commitTransaction(); // transaction
    session.endSession();

    return {
      success: true,
      message: "Payment Completed SuccessFully!!",
    };
  } catch (error) {
    await session.abortTransaction(); // transaction rollback
    session.endSession();
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Error Occured when trying to Payment"
    );
  }
};

const failPayment = async (query: Record<string, string>) => {
  // update booking status to FAIL
  // update payment status to FAIL

  // transaction rollback initialaise

  const session = await Booking.startSession();
  session.startTransaction();

  try {
    // Update Payment Status To FAILED
    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      { status: PAYMENT_STATUS.FAILED },
      { runValidators: true, session: session }
    );

    // Update Booking Status To FAILED
    await Booking.findByIdAndUpdate(
      updatedPayment?.booking,
      { status: BOOKING_STATUS.FAILED },
      { runValidators: true, session: session }
    );

    // transaction rollback commit
    await session.commitTransaction(); // transaction
    session.endSession();

    return {
      success: false,
      message: "Payment Failed!!",
    };
  } catch (error) {
    await session.abortTransaction(); // transaction rollback
    session.endSession();
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Error Occured when trying to Payment"
    );
  }
};

const cancelPayment = async (query: Record<string, string>) => {
  // update booking status to CANCEL
  // update payment status to CANCEL

  // transaction rollback initialaise

  const session = await Booking.startSession();
  session.startTransaction();

  try {
    // Update Payment Status To CANCELLED
    const updatedPayment = await Payment.findOneAndUpdate(
      { transactionId: query.transactionId },
      { status: PAYMENT_STATUS.CANCELLED },
      { runValidators: true, session: session }
    );

    // Update Booking Status To CANCELLED
    await Booking.findByIdAndUpdate(
      updatedPayment?.booking,
      { status: BOOKING_STATUS.CANCEL },
      { runValidators: true, session: session }
    );

    // transaction rollback commit
    await session.commitTransaction(); // transaction
    session.endSession();

    return {
      success: false,
      message: "Payment Canceled!!",
    };
  } catch (error) {
    await session.abortTransaction(); // transaction rollback
    session.endSession();
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Error Occured when trying to Payment"
    );
  }
};

export const PaymentService = {
  initPayment,
  successPayment,
  failPayment,
  cancelPayment,
};
