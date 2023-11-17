import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useContext, useState } from "react";
import { SearchContext } from "../../context/SearchContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { format } from "date-fns";
import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const ReserveManual = ({ setOpen, hotelId }) => {
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [openDate, setOpenDate] = useState(false);

  const [dates, setDates] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);
  const { data, loading, error } = useFetch(
    `http://localhost:8800/api/hotels/room/${hotelId}`
  );

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
      rooms: selectedRooms, // Add logic to update selectedRooms based on user selection
      dates,
      guestName: formData.guestName,
      guestEmail: formData.guestEmail,
      specialRequests: formData.specialRequests,
    };

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
        <span>Select your rooms:</span>
        {data.map((item) => (
          <div className="rItem" key={item._id}>
            <div className="rItemInfo">
              <div className="rTitle">{item.title}</div>
              <div className="rDesc">{item.desc}</div>
              <div className="rMax">
                Max people: <b>{item.maxPeople}</b>
              </div>
              <div className="rPrice">{item.price}</div>
            </div>
            <div className="rSelectRooms">{/* Add logic to allow users to select rooms */}</div>
          </div>
        ))}
        <form className="reserveForm" onSubmit={handleSubmit}>
          {/* ... Existing form fields ... */}
          <div className="rItem">
            <label htmlFor="dateRange"  onClick={()=> setOpenDate(false)}>Select Dates:</label>
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
