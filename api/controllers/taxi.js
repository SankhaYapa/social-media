import Taxi from '../models/Taxi.js';
import TaxiBooking from '../models/TaxiBooking.js';

export const createTaxi = async (req, res, next) => {
  const newTaxi = new Taxi(req.body);
console.log(newTaxi)
  try {
    const savedTaxi = await newTaxi.save();
    res.status(201).json(savedTaxi);
  } catch (err) {
    next(err);
  }
};

export const updateTaxi = async (req, res, next) => {
  try {
    const updatedTaxi = await Taxi.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTaxi);
  } catch (err) {
    next(err);
  }
};

export const deleteTaxi = async (req, res, next) => {
  try {
    await Taxi.findByIdAndDelete(req.params.id);
    res.status(200).json("Taxi has been deleted.");
  } catch (err) {
    next(err);
  }
};

export const getTaxi = async (req, res, next) => {
  try {
    const taxi = await Taxi.findById(req.params.id);
    res.status(200).json(taxi);
  } catch (err) {
    next(err);
  }
};

export const getTaxis = async (req, res, next) => {
  try {
    const taxis = await Taxi.find()
    res.status(200).json(taxis);
  } catch (err) {
    next(err);
  }
};
export const createTaxiBooking =async (req,res)=>{
  
    try {
      const {
        startLocation,
        endLocation,
      
        travelerName,
        travelerEmail,
        specialRequests,
      } = req.body;
  
      // Create a new taxi booking document
      const taxiBooking = new TaxiBooking({
        startLocation,
        endLocation,
       
        travelerName,
        travelerEmail,
        specialRequests,
      });
  
      // Save the document to the database
      const savedTaxiBooking = await taxiBooking.save();
  
      res.json(savedTaxiBooking);
    } catch (error) {
      console.error("Error creating taxi booking:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
 
}

export const getTaxiBooked=async(req,res)=>{
  try {
    const taxiBookings = await TaxiBooking.find();
    console.log(taxiBookings)
    res.json(taxiBookings);
  } catch (error) {
    console.error("Error fetching taxi bookings:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
}