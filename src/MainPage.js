import React, { useEffect, useState } from "react";
import "./MainPage.css";
import Avatar from "@mui/material/Avatar";
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
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  signOut,
} from "firebase/auth";

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
    const auth = getAuth();
    signOut(auth).catch((error) => alert(error.message));
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
  }, []);

  // TODO: Fix blank username when sign up & Insert more info for the chatbox!
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (authUser) => {
      // User is already signed/logged in
      if (authUser) {
        setUser(authUser);

        if (authUser.displayName) {
          // If there is a display name already, do not update the username
        } else {
          return updateProfile(auth.currentUser, {
            displayName: username,
          });
        }
      } else {
        // User is signed out
        setUser(null);
      }
    });

    return () => {
      unsubscribe();
    };
  }, [user, setUser, username]);

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
          {/* Fix the firebase onAuthStateChange Bug! */}
          <h1 className="mainPage__username">
            {user.displayName === null ? username : user?.displayName}
          </h1>
          <p className="mainPage__status">Online</p>
        </div>
        <div className="mainPage__headerOptions">
          <Link className="mainPage__headerSignOutLink" to="/">
            <LogoutIcon
              onClick={() => {
                authSignOut();
                userSignedOut();
              }}
            />
          </Link>
        </div>
      </div>
      {/* TODO: Set the default position of the chat space at the latest message or at the very bottom */}
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
            <span className="chat__username">
              {user.displayName === chat.data.username
                ? "You"
                : `${chat.data.username}`}
            </span>
            {chat.data.chat}
            <span className="chat__timestamp">
              {new Date(chat.data.timestamp?.toDate()).toUTCString()}
            </span>
          </p>
        ))}
      </div>
      {/* FOOTER: Input message, send button, Icons */}
      <div className="mainPage__footer">
        <div className="mainPage__footerOptions">
          <AddIcon />
          <AddPhotoAlternateIcon />
          <AttachFileIcon />
        </div>
        <form className="mainPage__formInput">
          <input
            value={input}
            type="text"
            placeholder="Type a message here..."
            onChange={(event) => setInput(event.target.value)}
          />
          <button type="submit" onClick={sendMessage} disabled={!input}>
            <SendIcon />
          </button>
        </form>
      </div>
    </div>
  ) : (
    <Authentication />
  );
};

export default MainPage;
