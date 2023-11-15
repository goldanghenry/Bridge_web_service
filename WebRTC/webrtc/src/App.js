import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MeetingPage from "./MeetingPage";
import MainPage from "./MainPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/meeting" element={<MeetingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
