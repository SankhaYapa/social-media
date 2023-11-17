import "./sidebar.css";

import { Users } from "../../dummyData";
import CloseFriend from "../closeFriend/CloseFriend";
import RssFeedIcon from '@mui/icons-material/RssFeed';
import ChatIcon from '@mui/icons-material/Chat';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import GroupsIcon from '@mui/icons-material/Groups';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import HelpIcon from '@mui/icons-material/Help';
import WorkIcon from '@mui/icons-material/Work';
import EventIcon from '@mui/icons-material/Event';
import SchoolIcon from '@mui/icons-material/School';
import HotelIcon from '@mui/icons-material/Hotel';
import FollowTheSignsIcon from '@mui/icons-material/FollowTheSigns';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import { Link } from "react-router-dom";
import Guiders from "../guiders/Guiders";
import { useEffect, useState } from "react";
import axios from "axios";
import { LinearProgress } from "@mui/material";
export default function Sidebar() {
  const [guiders, setGuiders] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchGuiders = async () => {
      try {
        // Replace the URL with the actual endpoint to fetch guiders
        const response = await axios.get("http://localhost:8800/api/users/getGuiders");
        
        setGuiders(response.data);
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching guiders:", error.message);
      }
    };

    fetchGuiders();
  }, []);
  console.log(guiders)
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
        <Link to="/" style={{textDecoration:"none"}}>
          <li className="sidebarListItem">
          
            <RssFeedIcon className="icon" />
            <span className="sidebarListItemText">Feed</span>
          </li>
          </Link>
          <Link to="/messenger" style={{textDecoration:"none"}}>
          <li className="sidebarListItem">
           <ChatIcon className="icon"></ChatIcon>
            <span className="sidebarListItemText">Chats</span>
          </li>
          </Link>
          <Link to="/messenger" style={{textDecoration:"none"}}>
          <li className="sidebarListItem">
          <PlayCircleIcon className="icon"></PlayCircleIcon> 
            <span className="sidebarListItemText">Videos</span>
          </li>
          </Link>
          <Link to="/hotel" style={{textDecoration:"none"}}>
          <li className="sidebarListItem">
          <HotelIcon className="icon"></HotelIcon> 
            <span className="sidebarListItemText">Hotels</span>
          </li></Link>
          <Link to="/guiders" style={{textDecoration:"none"}}>
          <li className="sidebarListItem">
           <FollowTheSignsIcon className="icon"></FollowTheSignsIcon>
            <span className="sidebarListItemText">Guiders</span>
          </li>
          </Link>
          <Link to="/taxi" style={{textDecoration:"none"}}>
          <li className="sidebarListItem">
          <LocalTaxiIcon className="icon"></LocalTaxiIcon>
            <span className="sidebarListItemText">Hire Taxi</span>
          </li>
        </Link>
        </ul>
      
        <hr className="sidebarHr" />
        <ul className="sidebarFriendList">
          <span>Connect with your Guider</span>
          {loading && <LinearProgress />} 
          {guiders.map((u) => (
            <Guiders key={u.id} guider={u} />
          ))}
        </ul>
      </div>
    </div>
  );
}
