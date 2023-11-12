import "./taxi.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import Topbar from "../../components/topbar/Topbar";
import TaxiItem from "../../components/taxiItem/TaxiItem";

const Taxi = () => {

    const { data, loading, error, reFetch } = useFetch(
      `http://localhost:8800/api/taxi`
    );
  
    const handleClick = () => {
      reFetch();
    };
  return (
    <div>
      <Topbar/>
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
        
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                  <TaxiItem item={item} key={item._id} />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Taxi;
