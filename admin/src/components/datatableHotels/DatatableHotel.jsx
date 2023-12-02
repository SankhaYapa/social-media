import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./datatable.scss";

const DatatableHotel = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/hotels/");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const path = useLocation().pathname;

  // Define columns for the DataGrid
  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "type", headerName: "Type", width: 200 },
    { field: "city", headerName: "City", width: 150 },
    { field: "address", headerName: "Address", width: 150 },
    { field: "distance", headerName: "Distance", width: 150 },
    { field: "rooms", headerName: "Rooms", width: 150 },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params) => (
        <button onClick={() => handleDelete(params.row._id)} className="deleteButton">Delete</button>
        
      ),
    },
    // Add more columns as needed
  ];

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/hotels/${id}`);
      // Update the local state after deleting the user
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/hotels/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        loading={loading}
        rows={users}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
        getRowId={(user) => user._id} // Specify the getRowId function
      />
    </div>
  );
};

export default DatatableHotel;
