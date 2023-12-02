import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import useFetch from "../../hooks/useFetch";

import "./newHotel.scss";
import { useNavigate } from "react-router-dom";

const NewTaxi = () => {
  // State for form data
  const navigate=useNavigate()
  const [formData, setFormData] = useState({
    makeAndModel: "",
    type: "",
    photo: "", // Added for file input
    seats: 0,
    largeBags: 0,
    smallBags: 0,
    price: 0,
    cancellationPolicy: "Free cancellation",
    contactEmail: "",
    phoneNo: "",
  });


  const [hotelImage, setHotelImage] = useState(null);

  const handleImageChange = (e) => {
    setHotelImage(e.target.files[0]);
  };
  
  const handleUpload = async (e) => 
  {
    e.preventDefault();
    try {
      const imageFormData = new FormData();
      imageFormData.append("file", hotelImage);
      const imageResponse = await axios.post(
        "http://localhost:8800/api/upload",
        imageFormData
      );
      const imageUrl =  hotelImage.name; // Assuming the server responds with the image URL
      console.log(imageUrl);

      // Update the formData with the uploaded image URL
      setFormData({
        ...formData,
        photo: imageUrl,
      });

    } catch (error) {
      
    }
  }
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Upload taxi photo
    
      // Send a POST request to create a new taxi
      const response = await axios.post(
        "http://localhost:8800/api/taxi",
        formData
      );

      // Handle the response as needed
      console.log(response.data);

      // Reset the form data after submission
      setFormData({
        makeAndModel: "",
        type: "",
        photo: null,
        seats: 0,
        largeBags: 0,
        smallBags: 0,
        price: 0,
        cancellationPolicy: "Free cancellation",
        contactEmail: "",
        phoneNo: "",
      });
      navigate('/taxi')
    } catch (error) {
      console.error("Error creating taxi:", error);
    }
  };
console.log(formData)
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Add New Taxi</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form onSubmit={handleSubmit}>
              <div className="formInput">
                <label htmlFor="makeAndModel">Make and Model</label>
                <input
                  type="text"
                  id="makeAndModel"
                  value={formData.makeAndModel}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      makeAndModel: e.target.value,
                    })
                  }
                />
              </div>
              <div className="formInput">
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
              <div className="formInput">
                <label htmlFor="photo">Photo</label>
                <input
                  type="file"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleImageChange}
                />
                <button onClick={handleUpload}>Upload Image</button>
              </div>
              <div className="formInput">
                <label htmlFor="seats">Seats</label>
                <input
                  type="number"
                  id="seats"
                  value={formData.seats}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      seats: e.target.value,
                    })
                  }
                />
              </div>
              <div className="formInput">
                <label htmlFor="largeBags">Large Bags</label>
                <input
                  type="number"
                  id="largeBags"
                  value={formData.largeBags}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      largeBags: e.target.value,
                    })
                  }
                />
              </div>
              <div className="formInput">
                <label htmlFor="smallBags">Small Bags</label>
                <input
                  type="number"
                  id="smallBags"
                  value={formData.smallBags}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      smallBags: e.target.value,
                    })
                  }
                />
              </div>
              <div className="formInput">
                <label htmlFor="price">Price</label>
                <input
                  type="number"
                  id="price"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      price: e.target.value,
                    })
                  }
                />
              </div>
              <div className="formInput">
                <label htmlFor="cancellationPolicy">Cancellation Policy</label>
                <input
                  type="text"
                  id="cancellationPolicy"
                  value={formData.cancellationPolicy}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      cancellationPolicy: e.target.value,
                    })
                  }
                />
              </div>
              <div className="formInput">
                <label htmlFor="contactEmail">Contact Email</label>
                <input
                  type="text"
                  id="contactEmail"
                  value={formData.contactEmail}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contactEmail: e.target.value,
                    })
                  }
                />
              </div>
              <div className="formInput">
                <label htmlFor="phoneNo">Phone Number</label>
                <input
                  type="text"
                  id="phoneNo"
                  value={formData.phoneNo}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      phoneNo: e.target.value,
                    })
                  }
                />
              </div>
              <button type="submit">Create Taxi</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewTaxi;
