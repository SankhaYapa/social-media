import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getAllReservedRooms,
  getHotel,
  getHotelRooms,
  getHotels,
  reserveRoom,
  updateHotel,
 
} from "../controllers/hotel.js";
import Hotel from "../models/Hotel.js";
import {verifyAdmin} from "../utils/verifyToken.js"
const router = express.Router();

//CREATE
router.post("/", createHotel);

//UPDATE
router.put("/:id",updateHotel);
//DELETE
router.delete("/:id", deleteHotel);
//GET

router.get("/find/:id", getHotel);
//GET ALL

router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);


router.post("/reserve", reserveRoom);
router.get("/reserved-rooms", getAllReservedRooms);
export default router;
