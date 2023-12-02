import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./datatable.scss";
import useFetch from "../../hooks/useFetch";

const DatatableRooms = () => {
  const [rooms, setRooms] = useState([]);
  const [loading1, setLoading] = useState(true);
  const [hotelId, setHotelId] = useState(undefined);
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/rooms/");
        setRooms(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching rooms:", error);
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);
  const { data, loading, error } = useFetch("/hotels");
  const getRowId = (room) => room._id;
  const path = useLocation().pathname;

  // Define columns for the DataGrid
  const columns = [
    { field: "title", headerName: "Title", width: 150 },
    { field: "price", headerName: "Price", width: 200 },
    { field: "maxPeople", headerName: "MaxPeople", width: 150 },
    { field: "desc", headerName: "Desc", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <button onClick={() => handleDelete(params.row._id,params.row._id)} className="deleteButton">Delete</button>
      ),
    },
  ];

const handleDelete = async (roomId, hotelId) => {
  try {
    await axios.delete(`http://localhost:8800/api/rooms/${roomId}/${hotelId}`);
    // Update the local state after deleting the room
    setRooms((prevUsers) => prevUsers.filter((user) => user._id !== roomId));
  } catch (error) {
    console.error("Error deleting room:", error);
  }
};

console.log(rooms)
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/rooms/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        loading={loading1}
        rows={rooms}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
        getRowId={getRowId}
      />
    </div>
  );
};

export default DatatableRooms;
