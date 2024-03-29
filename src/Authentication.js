import React from "react";
import "./Authentication.css";
import { useAuthContext } from "./ContextAPIAuth";
import Button from "@mui/material/Button";
import HomeIcon from "@mui/icons-material/Home";
import { Link } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Authentication = () => {
  const buttonStyle = {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: "700",
    backgroundColor: "#000",
    marginBlock: "0.2em",
    marginTop: "0.5em",
    display: "flex",
    alignItems: "center",
    color: "#fff",
  };

  const buttonStyle_2 = {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: "700",
    marginBlock: "0.2em",
    display: "flex",
    alignItems: "center",
    color: "#000",
    border: "1px solid #000",
    width: "100%",
  };

  const {
    user,
    username,
    setUsername,
    email,
    setEmail,
    password,
    setPassword,
    login,
    signUp,
  } = useAuthContext();

  const clearInputFields = () => {
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const authLogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => alert(error.message));
  };

  const authSignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="authentication">
      {!user && login === false && signUp === false && (
        <div className="authentication__noUser">
          <h1>No user found!</h1>
          <Link to="/">
            <Button
              style={buttonStyle}
              variant="contained"
              startIcon={<HomeIcon />}
            >
              Home
            </Button>
          </Link>
        </div>
      )}
      {login && (
        <div className="authentication__login">
          <h2>Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit" style={buttonStyle} onClick={authLogin}>
            Login
          </Button>
          <Link className="authentication__link" to="/">
            <Button
              onClick={clearInputFields}
              style={buttonStyle_2}
              variant="outlined"
            >
              Back
            </Button>
          </Link>
        </div>
      )}
      {signUp && (
        <div className="authentication__signUp">
          <h2>Sign up</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
          <Button type="submit" style={buttonStyle} onClick={authSignUp}>
            Sign Up
          </Button>
          <Link className="authentication__link" to="/">
            <Button
              onClick={clearInputFields}
              style={buttonStyle_2}
              variant="outlined"
            >
              Back
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Authentication;
