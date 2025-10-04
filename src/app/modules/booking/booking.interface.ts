
// User -> Booking(pending) -> Payment(unpaid) -> SSLCommerz -> Booking update = confirm -> payment update = paid

import { Types } from "mongoose";

export enum BOOKING_STATUS {
  PEDNING="PEDNING",
  CANCEL="CANCEL",
  COMPLETE="COMPLETE",
  FAILED="FAILED"
};


export interface IBooking {
  user: Types.ObjectId;
  tour: Types.ObjectId;
  payment?:Types.ObjectId;
  guestCount:number;
  status:BOOKING_STATUS
}
