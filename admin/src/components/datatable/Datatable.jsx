import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import "./datatable.scss";

const Datatable = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8800/api/users/all");
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const getRowId = (user) => user._id;
  const path = useLocation().pathname;

  // Define columns for the DataGrid
  const columns = [
    { field: "username", headerName: "Username", width: 150 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "isGuider", headerName: "isGuider", width: 150 },
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
      await axios.delete(`http://localhost:8800/api/users/${id}`);
      // Update the local state after deleting the user
      setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };
console.log(users)
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        {/* <Link to={`http://localhost:3000/users/new`} className="link">
          Add New
        </Link> */}
      </div>
      <DataGrid
        loading={loading}
        rows={users}
        columns={columns}
        pageSize={10}
        checkboxSelection
        disableSelectionOnClick
        getRowId={getRowId} // Specify the getRowId function
      />
    </div>
  );
};

export default Datatable;
