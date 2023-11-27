import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MeetingPage from "./components/MeetingPage";
import MainPage from "./components/MainPage";

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
