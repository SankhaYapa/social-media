import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "./reservemanual.css";

const Contact = ({ setOpen, hotelId }) => {
  const [openDate, setOpenDate] = useState(false);
  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    travelerName: "",
    travelerEmail: "",
    startLocation: "",
    endLocation: "",
    specialRequests: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Handle form submission (send data to server, etc.)
    const reservationData = {
      startLocation: formData.startLocation,
      endLocation: formData.endLocation,
      travelerName: formData.travelerName,
      travelerEmail: formData.travelerEmail,
      specialRequests: formData.specialRequests,
    };

    // Example: Send reservationData to the server
    try {
      const response = await axios.post(
        "http://localhost:8800/api/taxi/booking",
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
            <label htmlFor="travelerName">Traveller Name:</label>
            <input
              type="text"
              id="travelerName"
              name="travelerName"
              value={formData.travelerName}
              onChange={handleInputChange}
            />
          </div>
          <div className="rItem">
            <label htmlFor="travelerEmail">Traveller Email:</label>
            <input
              type="email"
              id="travelerEmail"
              name="travelerEmail"
              value={formData.travelerEmail}
              onChange={handleInputChange}
            />
          </div>
          <div className="rItem">
            <label htmlFor="startLocation">Start Location:</label>
            <input
              type="text"
              id="startLocation"
              name="startLocation"
              value={formData.startLocation}
              onChange={handleInputChange}
            />
          </div>
          <div className="rItem">
            <label htmlFor="endLocation">End Location:</label>
            <input
              type="text"
              id="endLocation"
              name="endLocation"
              value={formData.endLocation}
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

          <button className="rButton" type="submit">
            Reserve Now!
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
