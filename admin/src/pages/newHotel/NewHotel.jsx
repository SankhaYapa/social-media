// import React, { useState } from "react";
// import axios from "axios";
// import Sidebar from "../../components/sidebar/Sidebar";
// import Navbar from "../../components/navbar/Navbar";
// import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
// import { hotelInputs } from "../../formSource";
// import useFetch from "../../hooks/useFetch";

// import "./newHotel.scss";

// const NewHotel = () => {
//   const [files, setFiles] = useState([]);
//   const [info, setInfo] = useState({});
//   const [rooms, setRooms] = useState([]);

//   const { data, loading, error } = useFetch("/rooms");

//   const handleChange = (e) => {
//     setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
//   };

//   const handleSelect = (e) => {
//     const value = Array.from(
//       e.target.selectedOptions,
//       (option) => option.value
//     );
//     setRooms(value);
//   };

//   const handleClick = async (e) => {
//     e.preventDefault();
//     try {
//       const list = await Promise.all(
//         Object.values(files).map(async (file) => {
//           const data = new FormData();
//           data.append("file", file);
//           data.append("upload_preset", "upload");
//           const uploadRes = await axios.post(
//             "http://localhost:8800/api/upload",
//             data
//           );

//           const { url } = uploadRes.data;
//           return url;
//         })
//       );

//       const newHotel = {
//         ...info,
//         rooms,
//         photos: list,
//       };

//       await axios.post("http://localhost:8800/api/hotels", newHotel);
//     } catch (err) {
//       console.log(err);
//     }
//   };
// console.log(info)
//   return (
//     <div className="new">
//       <Sidebar />
//       <div className="newContainer">
//         <Navbar />
//         <div className="top">
//           <h1>Add New Product</h1>
//         </div>
//         <div className="bottom">
//           <div className="left">
//             <img
//               src={
//                 files.length
//                   ? URL.createObjectURL(files[0])
//                   : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
//               }
//               alt=""
//             />
//           </div>
//           <div className="right">
//             <form>
//               <div className="formInput">
//                 <label htmlFor="file">
//                   Image: <DriveFolderUploadOutlinedIcon className="icon" />
//                 </label>
//                 <input
//                   type="file"
//                   id="file"
//                   multiple
//                   onChange={(e) => setFiles(e.target.files)}
//                   style={{ display: "none" }}
//                 />
//               </div>

            
//               <div className="formInput">
//                 <label>Featured</label>
//                 <select id="featured" onChange={handleChange}>
//                   <option value={false}>No</option>
//                   <option value={true}>Yes</option>
//                 </select>
//               </div>
//               <div className="selectRooms">
//                 <label>Rooms</label>
//                 <select id="rooms" multiple onChange={handleSelect}>
//                   {loading
//                     ? "loading"
//                     : data &&
//                       data.map((room) => (
//                         <option key={room._id} value={room._id}>
//                           {room.title}
//                         </option>
//                       ))}
//                 </select>
//               </div>
//               <button type="button" onClick={handleClick}>
//                 Send
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewHotel;
import React, { useState } from "react";
import axios from "axios";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import useFetch from "../../hooks/useFetch";

import "./newHotel.scss";

const NewHotel = () => {
  // State for form data
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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to your backend API to create a new hotel
      const response = await axios.post("http://localhost:8800/api/hotels", formData);

      // Handle the response as needed
      console.log(response.data);

      // Reset the form data after submission
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
    } catch (error) {
      console.error("Error creating hotel:", error);
    }
  };
cons
  return (
    <div className="new">
      <Sidebar />
      <div className="newHotel">
        <Navbar />
        <form onSubmit={handleSubmit}>
          <div>
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
          <div>
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
          <div>
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
          <div>
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
          <div>
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
          <div>
            <label htmlFor="photos">Photos</label>
            <input
              type="text"
              id="photos"
              value={formData.photos}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  photos: e.target.value.split(',').map(photo => photo.trim()),
                })
              }
            />
          </div>
          <div>
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
          <div>
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
          <div>
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
          <div>
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
          <div>
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
          <div>
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
          </div>
          <button type="submit">Create Hotel</button>
        </form>
      </div>
    </div>
  );
};

export default NewHotel;
