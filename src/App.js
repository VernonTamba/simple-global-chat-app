import "./App.css";
import LandingPage from "./LandingPage";
import MainPage from "./MainPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      {/* Todo: Do light/dark theme toggle? */}
      <div className="app">
        <Routes>
          {/* LANDING PAGE */}
          <Route path="/" exact element={<LandingPage />} />
          {/* MAIN PAGE */}
          <Route path="/global" exact element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
