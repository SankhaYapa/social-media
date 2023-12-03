import "./taxi.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-date-range";
import SearchItem from "../../components/searchItem/SearchItem";
import useFetch from "../../hooks/useFetch";
import Topbar from "../../components/topbar/Topbar";
import TaxiItem from "../../components/taxiItem/TaxiItem";
import Contact from "../../components/contact/Contact";

import ChatIcon from '@mui/icons-material/Chat';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LuggageIcon from '@mui/icons-material/Luggage';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone'
import { AuthContext } from "../../context/AuthContext";
const Taxi = () => {
  const [openModal, setOpenModal] = useState(false);
    const { data, loading, error, reFetch } = useFetch(
      `http://localhost:8800/api/taxi`
    );
  
    const handleClick = () => {
      reFetch();
    };
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
 
    const handleEmailClick = () => {
      // You can implement the logic to open an email client here
      console.log(`Opening email to ${data.contactEmail}`);
    };
    const navigate=useNavigate();
    const { user } = useContext(AuthContext);
    const handlePhoneClick = () => {
      if (user) {
        setOpenModal(true);
      } else {
        navigate("/login");
      }
  };
  
  return (
    <div>
      <Topbar/>
      <Header type="list" />
      <div className="listContainer">
        <div className="listWrapper">
        
          <div className="listResult">
            {loading ? (
              "loading"
            ) : (
              <>
                {data.map((item) => (
                    <div className="searchItem">
                    <img src={PF+item.photo} alt="" className="siImg" />
                    <div className="siDesc">
                      <h1 className="siTitle">{item.makeAndModel}-({item.type})</h1>
                      {/* <span className="siDistance"></span>
                      <span className="siTaxiOp"></span>
                      <span className="siSubtitle"></span> */}
                      <div className="">
                       <div> <span className="siCancelOp"><PermIdentityIcon className="icon"></PermIdentityIcon>{item.seats} seats</span></div>
                      <div><span className="siCancelOp"><LuggageIcon className="icon"></LuggageIcon>LargeBags{item.largeBags},SmallBages{item.smallBags}</span></div>
                      </div>
                     <br/>
                      <span className="siCancelOpSubtitle">
                        You can cancel later, so lock in this great price today!
                      </span>
                    </div>
                    <div className="siDetails"><div className="siRating">
                        <span> </span>
                        {/* <button></button> */}
                      </div>
                      <div className="siDetailTexts">
                        <span className="siPrice">${item.price}</span>
                        <span className="siTaxOp">Price for 3 days</span>
                      <div>
                      <button className="siCheckButton" onClick={handlePhoneClick}>
                            Contact Now
                          </button>
                      </div>
                         
                       
                      </div>
                      <div className="contact">
                    <span className="contacticon" onClick={handlePhoneClick}>
                      <PhoneIcon />
                      
                      <a  style={{textDecoration:"none"}}href={`tel:${item.phoneNo}`}>{item.phoneNo}</a>
              
              
                    </span>
                    <span>|</span>
                    <span className="contacticon" onClick={handleEmailClick}>
                      <MailIcon />
                      <a style={{textDecoration:"none"}} href={`mailto:${item.contactEmail}`}>{item.contactEmail}</a>
                    </span>
                  </div>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      {openModal && <Contact setOpen={setOpenModal} />}
    </div>
  );
};

export default Taxi;
