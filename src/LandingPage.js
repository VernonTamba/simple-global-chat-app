import React, { useEffect } from "react";
import "./LandingPage.css";
import PublicIcon from "@mui/icons-material/Public";
import ChatIcon from "@mui/icons-material/Chat";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { makeStyles } from "@mui/material";
import { useAuthContext } from "./ContextAPIAuth";

const LandingPage = () => {
  const buttonStyle = {
    fontFamily: '"Poppins", sans-serif',
    fontWeight: "700",
    backgroundColor: "#000",
    marginBlock: "1em",
  };

  const { setLogin, setSignUp } = useAuthContext();

  useEffect(() => {
    setLogin(false);
    setSignUp(false);
  }, []);

  return (
    <div className="landingPage">
      <div className="landingPage__header">
        <h1>Simple Global Chat App</h1>
        <PublicIcon style={{ fontSize: "3em" }} />
        <Link className="landingPage__link" to="/global">
          <Button
            onClick={() => setLogin(true)}
            style={buttonStyle}
            variant="contained"
          >
            Login
          </Button>
        </Link>
      </div>

      <div className="landingPage__signUp">
        <p>No account yet?</p>
        <Link className="landingPage__link" to="/global">
          <Button
            onClick={() => setSignUp(true)}
            style={buttonStyle}
            variant="contained"
          >
            Sign Up
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
