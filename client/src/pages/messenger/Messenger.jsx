import "./messenger.css";
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { io } from "socket.io-client";
import Guiders from "../../components/guiders/Guiders";
import { LinearProgress } from "@mui/material";
export default function Messenger() {
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  const { user } = useContext(AuthContext);
  const scrollRef = useRef();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/conversations/" + user._id);
        setConversations(res.data);

        // Fetch guiders and filter out those already in a conversation
        const guiderResponse = await axios.get("http://localhost:8800/api/users/getGuiders");
        const guidersNotInConversations = guiderResponse.data.filter(
          (guider) => !conversations.some((c) => c.members.includes(guider._id))
        );
        setGuiders(guidersNotInConversations);
        setLoading(false); 
      } catch (err) {
        console.log(err);
      }
    };
    getConversations();
  }, [user, conversations]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/messages/" + currentChat?._id);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    const receiverId = currentChat.members.find(
      (member) => member !== user._id
    );

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage,
    });

    try {
      const res = await axios.post("http://localhost:8800/api/messages", message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (err) {
      console.log(err);
    }
  };

  const [guiders, setGuiders] = useState([]);
  // useEffect(() => {
  //   const fetchGuiders = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:8800/api/users/getGuiders");
  //       setGuiders(response.data);
  //     } catch (error) {
  //       console.error("Error fetching guiders:", error.message);
  //     }
  //   };

  //   fetchGuiders();
  // }, []);

  const handleGuiderClick = (guider) => {
    const existingConversation = conversations.find(
      (c) => c.members.includes(guider._id)
    );
  
    if (existingConversation) {
      setCurrentChat(existingConversation);
    } else {
      const newConversation = {
        senderId: user._id,
        receiverId: guider._id,
      };
  
      axios.post("http://localhost:8800/api/conversations", newConversation)
        .then((res) => {
          setConversations((prevConversations) => [...prevConversations, res.data]);
          setCurrentChat(res.data);
  
          // Remove the clicked guider from the list
          setGuiders((prevGuiders) => prevGuiders.filter((g) => g._id !== guider._id));
          setLoading(false); 
        })
        .catch((err) => {
          console.error("Error creating conversation:", err.message);
        });
    }
  };
  
  
  console.log(conversations); 
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input placeholder="Search for friends" className="chatMenuInput" />
            {loading && <LinearProgress />} 
            {conversations.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={user} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages.map((m) => (
                    <div key={m._id} ref={scrollRef}>
                      <Message message={m} own={m.sender === user._id} />
                    </div>
                  ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  ></textarea>
                  <button className="chatSubmitButton" disabled={!newMessage.trim()} onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConversationText">
                Open a conversation to start a chat.
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ul className="sidebarFriendList">
              <span>Contact Your Guider</span>
              {loading && <LinearProgress />} 
              {guiders.map((guider) => (
                <div key={guider._id} onClick={() => handleGuiderClick(guider)}>
               <Guiders
      guider={guider}
      setCurrentChat={setCurrentChat}
      conversations={conversations}
    />
                </div>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
