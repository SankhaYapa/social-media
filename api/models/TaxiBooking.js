import mongoose from "mongoose";

const TaxiBookingSchema = new mongoose.Schema({
  startLocation: {
    type: String,
    required: true,
  },
  endLocation: {
    type: String,
    required: true,
  },
  
  travelerName: {
    type: String,
    required: true,
  },
  travelerEmail: {
    type: String,
    required: true,
  },
  specialRequests: {
    type: String,
  },
});

export default mongoose.model("TaxiBooking", TaxiBookingSchema);
