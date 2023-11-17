import React, { useState, useEffect } from "react";
import axios from "axios";
import "./guiders.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { Link, useLocation } from "react-router-dom";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import Topbar from "../../components/topbar/Topbar";

const Guiders = () => {
  const [guiders, setGuiders] = useState([]);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  useEffect(() => {
    // Fetch guiders using Axios
    const fetchGuiders = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/users/getGuiders");
        setGuiders(response.data);
      } catch (error) {
        console.error("Error fetching guiders:", error.message);
      }
    };

    fetchGuiders();
  }, []);

  return (
    <div>
      <Topbar />
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
          {/* Display guiders here */}
          {guiders.map((guider) => (
            <div key={guider._id} className="guiderCard">
              {/* Customize this as per your guider display */}
              <img src={PF+"person/"+guider.profilePicture} alt={guider.username} className="profileimg"/>
              <h3>{guider.username}</h3>
              <Link to={``}>
              <button className="siCheckButton">Contact Now</button>
         
          </Link>
              {/* Add more details or actions as needed */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Guiders;
