import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import Reservation from "../models/Reservation.js";

export const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
console.log(newHotel)
  try {
    const savedHotel = await newHotel.save();
    res.status(200).json(savedHotel);
  } catch (err) {
    next(err);
  }
};
export const updateHotel = async (req, res, next) => {
  try {
    const updatedHotel = await Hotel.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedHotel);
  } catch (err) {
    next(err);
  }
};
export const deleteHotel = async (req, res, next) => {
  try {
    await Hotel.findByIdAndDelete(req.params.id);
    res.status(200).json("Hotel has been deleted.");
  } catch (err) {
    next(err);
  }
};
export const getHotel = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    res.status(200).json(hotel);
  } catch (err) {
    next(err);
  }
};
export const getHotels = async (req, res, next) => {
  const { min, max, ...others } = req.query;
  try {
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min | 1, $lt: max || 999 },
    }).limit(req.query.limit);
    res.status(200).json(hotels);
  } catch (err) {
    next(err);
  }
};
export const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};
export const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "Hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "Apartment" });
    const resortCount = await Hotel.countDocuments({ type: "Resort" });
    const villaCount = await Hotel.countDocuments({ type: "Villa" });
    const cabinCount = await Hotel.countDocuments({ type: "Cabin" });

    res.status(200).json([
      { type: "hotel", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortCount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

export const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);

    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    const list = await Promise.all(
      hotel.rooms.map(async (roomId) => {
        try {
          const foundRoom = await Room.findById(roomId);

          if (foundRoom) {
            return foundRoom;
          }
        } catch (error) {
          console.error(`Error finding room with ID ${roomId}:`, error.message);
          // Handle the error based on your requirements
        }
      })
    );

    res.status(200).json(list.filter((room) => room !== undefined && room !== null));
  } catch (err) {
    console.error("Error fetching hotel rooms:", err.message);
    next(err);
  }
};
export const reserveRoom = async (req, res, next) => {
  try {
    const { roomId, guestName, guestEmail, specialRequests, startDate, endDate } = req.body;

    const room = await Room.findById(roomId);
  
    if (!room) {
      return res.status(404).json({ success: false, message: "Room not found" });
    }

    const reservation = new Reservation({
      roomId,
      guestName,
      guestEmail,
      specialRequests,
      startDate,
      endDate,
    });
console.log(reservation)
    await reservation.save();

    res.status(201).json({ success: true, message: "Reservation created successfully" });
  } catch (err) {
    next(err);
  }
};
export const getAllReservedRooms = async (req, res) => {
  try {
    // Fetch all reservations
    const reservations = await Reservation.find();
console.log(reservations)
    

    res.status(200).json(reservations);
  } catch (error) {
    console.error("Error fetching reserved rooms:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};