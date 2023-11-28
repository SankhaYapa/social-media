import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./datatable.scss"
const DatatableTaxi = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/taxi/");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);
console.log(users)
  const getRowId = (user) => user._id;
  const path = useLocation().pathname;

  // Define columns for the DataGrid
  const columns = [
    { field: "makeAndModel", headerName: "MakeAndModel", width: 150 },
    { field: "type", headerName: "Type", width: 200 },
    { field: "seats", headerName: "Seats", width: 150 },
    { field: "largeBags", headerName: "LargeBags", width: 150 },
    { field: "smallBags", headerName: "SmallBags", width: 150 },
    { field: "price", headerName: "Price", width: 150 },
    { field: "cancellationPolicy", headerName: "CancellationPolicy", width: 150 },
  
  ];

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/taxi/${id}`);
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
        <Link to={`http://localhost:3000/taxi/new`} className="link">
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
        getRowId={getRowId} // Specify the getRowId function
        onDelete={(selection) => {
          const selectedUserId = selection.data[0].id;
          handleDelete(selectedUserId);
        }}
      />
    </div>
  );
};

export default DatatableTaxi;
