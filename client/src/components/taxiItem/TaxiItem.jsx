import { Link } from "react-router-dom";
import "./taxiItem.css";
import ChatIcon from '@mui/icons-material/Chat';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LuggageIcon from '@mui/icons-material/Luggage';
import MailIcon from '@mui/icons-material/Mail';

const TaxiItem = ({ item }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className="searchItem">
      <img src={PF+"taxi/"+item.photo} alt="" className="siImg" />
      <div className="siDesc">
        <h1 className="siTitle">{item.makeAndModel}-({item.type})</h1>
        <span className="siDistance"></span>
        <span className="siTaxiOp"></span>
        <span className="siSubtitle">
        
        </span>
        <div className="">
         <div> <span className="siCancelOp"><PermIdentityIcon className="icon"></PermIdentityIcon>{item.seats} seats</span></div>
        <div><span className="siCancelOp"><LuggageIcon className="icon"></LuggageIcon>LargeBags{item.largeBags},SmallBages{item.smallBags}</span></div></div>
       
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
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">Contact Now</button>
         
          </Link>
        </div>
        <div className="contact">
           <span className="contacticon"><MailIcon></MailIcon>{item.phoneNo}</span>
           <span>|</span>
           <span className="contacticon"><MailIcon></MailIcon>{item.contactEmail}</span>
        </div>
      </div>
    </div>
  );
};

export default TaxiItem;
