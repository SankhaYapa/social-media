import "./guiders.css";
import { useNavigate } from "react-router-dom";

export default function Guiders({ guider, setCurrentChat, conversations }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const navigate = useNavigate();

  const handleGuidersClick = () => {
    const existingConversation = conversations.find(
      (c) => c.members.includes(guider._id)
    );

    if (existingConversation) {
      setCurrentChat(existingConversation);
      navigate("/messenger");
    } else {
      // Assuming you have a function to create a new conversation
      createAndNavigateToNewConversation(guider._id);
    }
  };

  // Replace this with your actual function to create a new conversation
  const createAndNavigateToNewConversation = (guiderId) => {
    // Add logic here to create a new conversation with the guider
    // and then set it as the current chat using setCurrentChat
    // setCurrentChat(newConversation);

    // Then navigate to the messenger
    navigate("/messenger");
  };

  return (
    <li className="sidebarFriend" onClick={handleGuidersClick}>
      <img
        className="sidebarFriendImg"
        src={
          guider.profilePicture
            ? PF +  guider.profilePicture
            : PF + "avatar.jpg"
        }
        alt=""
      />
      <div>
      <span className="sidebarFriendName">{guider.username}</span>
        <h6>Expert Guider</h6>
      </div>
     
    </li>
  );
}
