import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import useFetch from "../../hooks/useFetch";

import "./newHotel.scss";
import { useNavigate } from "react-router-dom";

const NewHotel = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    city: "",
    address: "",
    distance: "",
    photos: [],
    title: "",
    desc: "",
    rating: 0,
    rooms: [],
    cheapestPrice: 0,
    featured: false,
  });
  const [hotelImage, setHotelImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e) => {
    setHotelImage(e.target.files[0]);
  };
  
  const handleUpload = async (e) =>{
    e.preventDefault();
    try {
      const imageFormData = new FormData();
      imageFormData.append("file", hotelImage);
      const imageResponse = await axios.post(
        "http://localhost:8800/api/upload",
        imageFormData
      );
      
      const imageUrl = imageResponse.data;
  
      setFormData({
        ...formData,
        photos: [imageUrl],
      });
    } catch (error) {
      
    }
  }
  console.log(formData)
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      setLoading(true);
  
      // Upload hotel image
     
  

        const response = await axios.post(
    "http://localhost:8800/api/hotels",
    formData
          );
          console.log(response.data);
       // Send a POST request to create a new hotel
    
  
    
      // navigate("/hotels");
  
      setLoading(false);
      setFormData({
        name: "",
        type: "",
        city: "",
        address: "",
        distance: "",
        photos: [],
        title: "",
        desc: "",
        rating: 0,
        rooms: [],
        cheapestPrice: 0,
        featured: false,
      });
      navigate('/hotels')
    } catch (error) {
      console.error("Error creating hotel:", error);
      setLoading(false);
      // Handle the error as needed, e.g., show a message to the user
    }
  };
  

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Hotel</h1>
        </div>
        <div className="bottom">
          <div className="right">
        <form onSubmit={handleSubmit}>
          <div className="formInput" >
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />
          </div>
          <div className="formInput" >
            <label htmlFor="type">Type</label>
            <input
              type="text"
              id="type"
              value={formData.type}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  type: e.target.value,
                })
              }
            />
          </div>
          <div className="formInput" >
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={formData.city}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  city: e.target.value,
                })
              }
            />
          </div>
          <div className="formInput" >
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              value={formData.address}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  address: e.target.value,
                })
              }
            />
          </div>
          <div className="formInput" >
            <label htmlFor="distance">Distance</label>
            <input
              type="text"
              id="distance"
              value={formData.distance}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  distance: e.target.value,
                })
              }
            />
          </div>
          <div className="formInput" >
            <label htmlFor="photos">Photos</label>
            <input
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleImageChange}
            />
            <button onClick={handleUpload}>Upload Image</button>
            
          </div>
          <div className="formInput" >
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
            />
          </div>
          <div className="formInput" >
            <label htmlFor="desc">Description</label>
            <input
              type="text"
              id="desc"
              value={formData.desc}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  desc: e.target.value,
                })
              }
            />
          </div>
          <div className="formInput" >
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              id="rating"
              value={formData.rating}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rating: e.target.value,
                })
              }
            />
          </div>
          <div className="formInput" >
            <label htmlFor="rooms">Rooms</label>
            <input
              type="text"
              id="rooms"
              value={formData.rooms}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  rooms: e.target.value.split(',').map(room => room.trim()),
                })
              }
            />
          </div>
          <div className="formInput" >
            <label htmlFor="cheapestPrice">Cheapest Price</label>
            <input
              type="number"
              id="cheapestPrice"
              value={formData.cheapestPrice}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  cheapestPrice: e.target.value,
                })
              }
            />
          </div>
          {/* <div className="formInput" >
            <label htmlFor="featured">Featured</label>
            <input
              type="checkbox"
              id="featured"
              checked={formData.featured}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  featured: e.target.checked,
                })
              }
            />
          </div> */}
         <button type="submit" disabled={loading}>
                {loading ? "Uploading..." : "Create Hotel"}
              </button>
        </form>
        </div>
        </div>
      </div>
    </div>
  );
};

export default NewHotel;

