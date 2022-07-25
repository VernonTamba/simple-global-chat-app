import React, { useEffect } from "react";
import "./LandingPage.css";
import PublicIcon from "@mui/icons-material/Public";
import ChatIcon from "@mui/icons-material/Chat";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/material";
import { useAuthContext } from "./ContextAPIAuth";
import { auth } from "./firebase";

const LandingPage = () => {
  const buttonStyle = {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: "700",
    backgroundColor: "#000",
    marginBlock: "1em",
  };

  const { user, username, setUser, setLogin, setSignUp } = useAuthContext();

  useEffect(() => {
    setLogin(false);
    setSignUp(false);
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      // User is already signed/logged in
      if (authUser) {
        setUser(authUser);

        if (authUser.displayName) {
          // If there is a display name already, do not update the username
        } else {
          return authUser.updateProfile({
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
  }, [user]);

  return (
    <div className="landingPage">
      <div className="landingPage__header">
        <h1>Simple Global Chat App</h1>
        <PublicIcon style={{ fontSize: "3em" }} />
        {!user && (
          <Link className="landingPage__link" to="/global">
            <Button
              onClick={() => setLogin(true)}
              style={buttonStyle}
              variant="contained"
            >
              Login
            </Button>
          </Link>
        )}
      </div>

      <div className="landingPage__signUp">
        {user ? (
          <p>{`Currently logged in: ${user?.displayName}`}</p>
        ) : (
          <p>No account yet?</p>
        )}
        {user ? (
          <Link className="landingPage__link" to="/global">
            <Button style={buttonStyle} variant="contained">
              Continue
            </Button>
          </Link>
        ) : (
          <Link className="landingPage__link" to="/global">
            <Button
              onClick={() => setSignUp(true)}
              style={buttonStyle}
              variant="contained"
            >
              Sign Up
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
