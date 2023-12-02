import "./topbar.css";
import SearchIcon from '@mui/icons-material/Search';
import PersonIcon from '@mui/icons-material/Person';
import ChatIcon from '@mui/icons-material/Chat';
import NotificationsIcon from '@mui/icons-material/Notifications';
import LogoutIcon from '@mui/icons-material/Logout';  // Import the LogoutIcon
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Topbar() {
  const { user, dispatch } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const location = useLocation();

  const isHomePage = location.pathname === "/";

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    // You may want to redirect the user to the login page or another page after logout.
    // You can use the useHistory hook for this purpose.
  };

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
        <div className="topbarLinks"></div>
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
            <img src={user.profilePicture ? PF+user.profilePicture : PF+"avatar.jpg"} alt="" className="topbarImg"/>
          </Link>
          {/* Logout button */}
          <Link className="topbarIconItem-logout" onClick={handleLogout}>
            <LogoutIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}
