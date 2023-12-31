import "./rightbar.css";
import { Users } from "../../dummyData";
import Online from "../online/Online";
import { useContext, useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove, Star } from "@mui/icons-material";
import { LinearProgress } from "@mui/material";
export default function Rightbar({ user }) {
 const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );
  const [loading, setLoading] = useState(true);
// useEffect(()=>{
//   setFollowed(currentUser.followings.includes(user?.id));
// },[currentUser,user.id]);

const [hotels, setHotels] = useState([]);

useEffect(() => {
  const fetchHotels = async () => {
    try {
      const response = await axios.get("http://localhost:8800/api/hotels");
      setHotels(response.data);
      setLoading(false); 
    } catch (error) {
      console.error("Error fetching hotels:", error);
    }
  };

  fetchHotels();
}, []);

console.log(hotels)
  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("http://localhost:8800/api/users/friends/" + user._id);
        setFriends(friendList.data);
        setLoading(false); 
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put(`http://localhost:8800/api/users/${user._id}/unfollow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`http://localhost:8800/api/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <span className="birthdayText">Find Things to Do by interest</span>
        </div>
        <span className="tag">
          Collections of Kandy's best bookable experiences
        </span>

        <div className="rightbarInterests">
          <div className="Intrest">
            <img className="IntrestImg" src={PF + "outdoor.png"} alt="" />
            <span className="IntersetText">Outdoor</span>
          </div>
          <div className="Intrest">
            <img className="IntrestImg" src={PF + "drink.png"} alt="" />
            <span className="IntersetText">Food & Drink</span>
          </div>
          <div className="Intrest">
            <img className="IntrestImg" src={PF + "mandala.png"} alt="" />
            <span className="IntersetText">Art & Culture</span>
          </div>
          <div className="Intrest">
            <img className="IntrestImg" src={PF + "reef.png"} alt="" />
            <span className="IntersetText">By the Water</span>
          </div>
          <div className="Intrest">
            <img className="IntrestImg" src={PF + "browsing.png"} alt="" />
            <span className="IntersetText">Browse All</span>
          </div>
          {/* <img className="IntrestImg" src={PF + "/drink.png"} alt="" />
         
         
          */}
        </div>
        <div className="birthdayContainer">
          <span className="birthdayText">Top experiences on Kandy Booking</span>
        </div>
        {loading && <LinearProgress />} 
        <div className="rightbarExperience">
        {hotels.map((hotel) => (
          <div className="Experience" key={hotel._id}>
            <Link to={`/singlehotels/${hotel._id}`} style={{ textDecoration: "none" }}>
              <img className="ExperienceImg"src={PF+hotel.photos[0]} alt="" />
              <span className="ExperienceText">{hotel.name}</span>
              {/* Include other hotel information */}
              <div className="Rating">
                {/* Display hotel rating */}
                <Star style={{ color: "yellow" }} /> <Star style={{ color: "yellow" }} /> <Star /> <Star />
                <span>{hotel.rating}</span>
              </div>
              <span className="IntersetText">{`from $${hotel.cheapestPrice} per adult`}</span>
            </Link>
          </div>
        ))}

        </div>

        
      </>
    );
  };

  const ProfileRightbar = () => {
    return (
      
      <>{loading && <LinearProgress />} 
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
        )}
     
        <h4 className="rightbarTitle">User friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link
              to={"/profile/" + friend.username}
              style={{ textDecoration: "none" }}
            >
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF +friend.profilePicture
                      : PF + "avatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}
