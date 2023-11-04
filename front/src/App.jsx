import './App.scss';
import React from 'react';
import LoginPage from './components/loginPage.jsx';
import MainPage from './components/mainPage.jsx';
import JoinPage from './components/joinPage.jsx';
import WaitPage from './components/waitPage.jsx';
import MeetPage from './components/meetingPage.jsx';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Routes>
        <Route path="meetingPage" element={<MeetPage />} />
        <Route path="waitPage" element={<WaitPage />} />
        <Route path="joinPage" element={<JoinPage />} />
        <Route path="mainPage" element={<MainPage />} />
        <Route path="loginPage" element={<LoginPage />} />
      </Routes>
      <div>HIHIHIHIHIHI</div>
    </div>
  );
}

export default App;