import React, { useState } from "react";
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

const MainPage = () => {
  const [input, setInput] = useState("");

  const sendMessage = (event) => {
    event.preventDefault();
    console.log(input);

    setInput("");
  };

  return (
    <div className="mainPage">
      {/* HEADER PROFILE: Avatar, Username, Icons */}
      <div className="mainPage__header">
        <Avatar />
        <div className="mainPage__headerInfo">
          <h1 className="mainPage__username">John Doe</h1>
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
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">
          Hello world! This is my reply to you my friend!
        </p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
        <p className="mainPage__chat">Hello world!</p>
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
