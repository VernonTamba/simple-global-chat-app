import React, { useEffect, useState } from "react";
import "./MainPage.css";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HomeIcon from "@mui/icons-material/Home";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import db from "./firebase";
import firebase from "firebase/compat/app";

const MainPage = () => {
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);

  // Temporary user
  const [user, setUser] = useState("Administrator");

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("chatroom").add({
      username: "Administrator",
      chat: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  useEffect(() => {
    db.collection("chatroom").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    console.log(chats);
  }, []);

  return (
    <div className="mainPage">
      {/* HEADER PROFILE: Avatar, Username, Icons */}
      <div className="mainPage__header">
        <Avatar />
        <div className="mainPage__headerInfo">
          <h1 className="mainPage__username">Administrator</h1>
          <p className="mainPage__status">Online</p>
        </div>
        <div className="mainPage__headerOptions">
          <IconButton>
            <HomeIcon />
          </IconButton>
          <IconButton>
            <DarkModeIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
      </div>
      {/* CHAT ROOM / SPACE */}
      <div className="mainPage__chatSpace">
        {chats.map((chat) => (
          <p
            key={chat.id}
            className={`${
              user === chat.data.username && "mainPage__chatReceiver"
            } mainPage__chat`}
          >
            {chat.data.chat}
          </p>
        ))}
      </div>
      {/* FOOTER: Input message, send button, Icons */}
      <div className="mainPage__footer">
        <div className="mainPage__footerOptions">
          <IconButton>
            <AddIcon />
          </IconButton>
          <IconButton>
            <AddPhotoAlternateIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
        </div>
        <form className="mainPage__formInput">
          <input
            value={input}
            type="text"
            placeholder="Type a message here..."
            onChange={(event) => setInput(event.target.value)}
          />
          <button type="submit" onClick={sendMessage}>
            <IconButton>
              <SendIcon />
            </IconButton>
          </button>
        </form>
      </div>
    </div>
  );
};

export default MainPage;
