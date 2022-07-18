import React from "react";
import "./LandingPage.css";
import PublicIcon from "@mui/icons-material/Public";
import ChatIcon from "@mui/icons-material/Chat";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="landingPage">
      <div className="landingPage__header">
        <h1>Simple Global Chat App</h1>
        <PublicIcon style={{ fontSize: "3em" }} />
        {/* <ChatIcon /> */}
        <Link className="landingPage__link" to="/global">
          <Button variant="contained">Login</Button>
        </Link>
      </div>

      <div className="landingPage__signUp">
        <p>No account yet?</p>
        <Link className="landingPage__link" to="/global">
          <Button variant="contained">Sign Up</Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
