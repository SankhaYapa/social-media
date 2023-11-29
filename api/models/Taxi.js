import mongoose from "mongoose";

const TaxiSchema = new mongoose.Schema({
  makeAndModel: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  seats: {
    type: Number,
    required: true,
  },

  largeBags: {
    type: Number,
    required: true,
  },
  smallBags: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  cancellationPolicy: {
    type: String,
    default: "Free cancellation",
  },

  contactEmail: {
    type: String,
    required: true,
  },
  phoneNo: {
    type: String,
    required: true,
  },
});

const Taxi = mongoose.model("Taxi", TaxiSchema);

export default Taxi;
