import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark, faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import "./reservemanual.css";
const ReserveManual = ({ setOpen, hotelId }) => {
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [openDate, setOpenDate] = useState(false);
  const [roomData, setRoomData] = useState([]);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRoomData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8800/api/hotels/room/${hotelId}`
        );
        setRoomData(response.data);
      } catch (error) {
        console.error("Error fetching room data:", error.message);
      }
    };

    fetchRoomData();
  }, [hotelId]);

  // Form state
  const [formData, setFormData] = useState({
    guestName: "",
    guestEmail: "",
    specialRequests: "",
   
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleRoomSelection = (event) => {
    const selectedRoomId = event.target.value;
    const selectedRoom = roomData.find((room) => room._id === selectedRoomId);
    setSelectedRoom(selectedRoom);
  };

  const handleDateChange = (ranges) => {
    setDates([ranges.selection]);
  };

  const handleCloseDateRange = () => {
    setOpenDate(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission (send data to server, etc.)
    const reservationData = {
      roomId: selectedRoom._id,
      rooms: selectedRoom ? [selectedRoom] : [], // Include selected room in an array
      startDate: dates[0].startDate,
    endDate: dates[0].endDate,
      guestName: formData.guestName,
      guestEmail: formData.guestEmail,
      specialRequests: formData.specialRequests,
      
    };
console.log(selectedRoom)
    // Example: Send reservationData to the server
    try {
      const response = await axios.post(
        "http://localhost:8800/api/hotels/reserve",
        reservationData
      );

      // Handle success (e.g., show success message)
      console.log("Reservation successful:", response.data);

      // Close the form
      setOpen(false);
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error("Reservation error:", error.message);
    }
  };

  return (
    <div className="reserve">
      <div className="rContainer">
        <FontAwesomeIcon
          icon={faCircleXmark}
          className="rClose"
          onClick={() => setOpen(false)}
        />
    
        <form className="reserveForm" onSubmit={handleSubmit}>
          <div className="rItem">
            <label htmlFor="roomSelection">Select Room:</label>
            <select
              id="roomSelection"
              name="roomSelection"
              onChange={handleRoomSelection}
              value={selectedRoom ? selectedRoom._id : ""}
            >
              <option value="" disabled>
                Select a room
              </option>
              {roomData.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.title} - {item.price}
                </option>
              ))}
            </select>
          </div>
          <div className="rItem">
            <label htmlFor="guestName">Guest Name:</label>
            <input
              type="text"
              id="guestName"
              name="guestName"
              value={formData.guestName}
              onChange={handleInputChange}
            />
          </div>
          <div className="rItem">
            <label htmlFor="guestEmail">Guest Email:</label>
            <input
              type="email"
              id="guestEmail"
              name="guestEmail"
              value={formData.guestEmail}
              onChange={handleInputChange}
            />
          </div>
          <div className="rItem">
            <label htmlFor="specialRequests">Special Requests:</label>
            <textarea
              id="specialRequests"
              name="specialRequests"
              value={formData.specialRequests}
              onChange={handleInputChange}
             
            />
          </div>
  
          <div className="rItem">
            <label htmlFor="dateRange" onClick={() => setOpenDate(false)}>
              Select Dates:
            </label>
            <div className="headerSearchItem">
              <FontAwesomeIcon icon={faCalendarDays} className="headerIcon" />
              <span
                onClick={() => setOpenDate(!openDate)}
                className="headerSearchText"
              >{`${format(dates[0].startDate, "MM/dd/yyyy")} to ${format(
                dates[0].endDate,
                "MM/dd/yyyy"
              )}`}</span>
              {openDate && (
                <DateRange
                  editableDateInputs={true}
                  onChange={handleDateChange}
                  moveRangeOnFirstSelection={false}
                  ranges={dates}
                  className="date"
                  onClose={handleCloseDateRange}
                  minDate={new Date()}
                />
              )}
            </div>
          </div>
          <button className="rButton" type="submit">
            Reserve Now!
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReserveManual;
