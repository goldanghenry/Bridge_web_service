import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MeetingPage from "./components/meetingPage";
import MainPage from "./components/mainPage";
import LoginPage from "./components/loginPage";
import JoinPage from "./components/joinPage";
import WaitPage from "./components/waitPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/meeting" element={<MeetingPage />} />
        <Route path="/wait" element={<WaitPage />} />
        <Route path="/join" element={<JoinPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
