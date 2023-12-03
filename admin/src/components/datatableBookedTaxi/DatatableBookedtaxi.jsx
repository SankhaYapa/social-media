import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./datatable.scss";
import useFetch from "../../hooks/useFetch";

const DatatableBookedtaxi = () => {
  const [reservedRooms, setReservedRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hotelId, setHotelId] = useState(undefined);

  useEffect(() => {
    const fetchReservedRooms = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/taxi/booking/all");
        setReservedRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reserved rooms:", error);
        setLoading(false);
      }
    };

    fetchReservedRooms();
  }, []);
  console.log(reservedRooms);
  const getRowId = (room) => room._id;
  const path = useLocation().pathname;

  // Define columns for the DataGrid
  const columns = [
    { field: "startLocation", headerName: "startLocation", width: 150 },
    { field: "endLocation", headerName: "endLocation", width: 200 },
    { field: "travelerEmail", headerName: "travelerEmail", width: 250 },
    { field: "travelerName", headerName: "travelerName", width: 250 },
    { field: "specialRequests", headerName: "Special Requests", width: 150 },
    // {
    //   field: "actions",
    //   headerName: "Actions",
    //   width: 300,
    //   renderCell: (params) => (
    //     <>
    //       <button onClick={() => handleAccept(params.row._id)} className="acceptButton">
    //         Accept
    //       </button>
    //       <button onClick={() => handleReject(params.row._id)} className="rejectButton">
    //         Reject
    //       </button>
    //     </>
    //   ),
    // },
  ];

  const handleAccept = async (roomId) => {
    try {
      // Add your logic for accepting the reservation
      console.log(`Accepted reservation for room ${roomId}`);
      // You may want to update the local state or fetch the updated data from the server
    } catch (error) {
      console.error("Error accepting reservation:", error);
    }
  };

  const handleReject = async (roomId) => {
    try {
      // Add your logic for rejecting the reservation
      console.log(`Rejected reservation for room ${roomId}`);
      // You may want to update the local state or fetch the updated data from the server
    } catch (error) {
      console.error("Error rejecting reservation:", error);
    }
  };

  console.log(reservedRooms);

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        
      </div>
      <DataGrid
        loading={loading}
        rows={reservedRooms}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
        getRowId={getRowId}
      />
    </div>
  );
};

export default DatatableBookedtaxi;
