import { Link } from "react-router-dom";
import "./taxiItem.css";
import ChatIcon from '@mui/icons-material/Chat';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import LuggageIcon from '@mui/icons-material/Luggage';
import MailIcon from '@mui/icons-material/Mail';
import PhoneIcon from '@mui/icons-material/Phone'
const TaxiItem = ({ item }) => {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const handlePhoneClick = () => {
    // You can implement the logic to initiate a phone call here
    console.log(`Calling ${item.phoneNo}`);
  };

  const handleEmailClick = () => {
    // You can implement the logic to open an email client here
    console.log(`Opening email to ${item.contactEmail}`);
  };
  return (
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
          <Link to={`/hotels/${item._id}`}>
          <button className="siCheckButton">Contact Now</button>
         
          </Link>
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
  );
};

export default TaxiItem;
