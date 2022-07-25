import React, { useEffect, useState } from "react";
import "./MainPage.css";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import SendIcon from "@mui/icons-material/Send";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import db from "./firebase";
import firebase from "firebase/compat/app";
import { Link } from "react-router-dom";
import Authentication from "./Authentication";
import { useAuthContext } from "./ContextAPIAuth";
import { auth } from "./firebase";

const MainPage = () => {
  const [input, setInput] = useState("");
  const [chats, setChats] = useState([]);
  const [seed, setSeed] = useState("");

  const {
    username,
    user,
    setUser,
    setUsername,
    setEmail,
    setPassword,
    setLogin,
    setSignUp,
  } = useAuthContext();

  const userSignedOut = () => {
    setLogin(false);
    setSignUp(false);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("chatroom").add({
      username: user.displayName,
      chat: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  const authSignOut = () => {
    auth.signOut().catch((error) => alert(error.message));
    setUsername("");
    setEmail("");
    setPassword("");
  };

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  useEffect(() => {
    db.collection("chatroom")
      .orderBy("timestamp", "asc")
      .onSnapshot((snapshot) =>
        setChats(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    // console.log(chats);
  }, []);

  // TODO: Fix blank username when sign up & Insert more info for the chatbox

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      console.log("On auth state changed!");
      // User is already signed/logged in
      if (authUser) {
        setUser(authUser);

        if (authUser.displayName) {
          console.log(user);
          // If there is a display name already, do not update the username
        } else {
          // return authUser.updateProfile({
          //   displayName: username,
          // });
          authUser.updateProfile({
            displayName: username,
          });
          setUser(authUser);
          console.log(user);
        }
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, username]);

  return user ? (
    <div className="mainPage">
      {/* LOGIN / SIGN UP */}
      {/* HEADER PROFILE: Avatar, Username, Icons */}
      <div className="mainPage__header">
        <Avatar
          alt="Avatar Dicebar"
          src={`https://avatars.dicebear.com/api/human/${seed}.svg`}
        />
        <div className="mainPage__headerInfo">
          <h1 className="mainPage__username">{user?.displayName}</h1>
          <p className="mainPage__status">Online</p>
        </div>
        <div className="mainPage__headerOptions">
          <IconButton>
            <DarkModeIcon />
          </IconButton>
          <Link to="/">
            <IconButton>
              <LogoutIcon
                onClick={() => {
                  authSignOut();
                  userSignedOut();
                }}
              />
            </IconButton>
          </Link>
        </div>
      </div>
      {/* CHAT ROOM / SPACE */}
      <div className="mainPage__chatSpace">
        {chats.map((chat) => (
          <p
            key={chat.id}
            className={`${
              user.displayName === chat.data.username &&
              "mainPage__chatReceiver"
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
  ) : (
    <Authentication />
  );
};

export default MainPage;
