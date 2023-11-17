import "./topbar.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
const { user } = useContext(AuthContext);
const PF = process.env.REACT_APP_PUBLIC_FOLDER;
const location = useLocation();

const isHomePage = location.pathname === "/";
  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{textDecoration:"none"}}>
          <img src={PF + "/logo3.png"} alt="" className="LogoImge" />
        {/* <span className="logo">Kandy Guider</span></div> */}
        </Link>
      </div>
      <div className="topbarCenter">
      {isHomePage && (
          <div className="searchbar">
            <SearchIcon className="searchIcon" />
            <input
              placeholder="Search for friend, post, or video"
              className="searchInput"
            />
          </div>
        )}
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          {/* <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span> */}
        </div>
        <div className="topbarIcons">
          <div className="topbarIconItem">
            <PersonIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconItem">
          <Link to="/messenger" style={{textDecoration:"none"}}>
            <ChatIcon className="iconstop" />
            <span className="topbarIconBadge">2</span>
            </Link>
          </div>
          <div className="topbarIconItem">
            <NotificationsIcon />
            <span className="topbarIconBadge">1</span>
          </div>
          <Link to={`/profile/${user.username}`}>
        <img src={user.profilePicture ? PF+"person/"+user.profilePicture : PF+"person/avatar.jpg"} alt="" className="topbarImg"/>
      </Link>
        </div>
       
      </div>
    </div>
  );
}
