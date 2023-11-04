import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from "./components/loginPage";
import MainPage from "./components/mainPage";
import JoinPage from './components/joinPage';
import WaitPage from './components/waitPage';
import MeetPage from './components/meetingPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="mainPage" element={<MainPage />} />
      <Route path="loginPage" element={<LoginPage />} />
      <Route path="joinPage" element={<JoinPage />} />
      <Route path="waitPage" element={<WaitPage />} />
      <Route path="meetingPage" element={<MeetPage/>}/>
    </Routes>
  </BrowserRouter>
  </React.StrictMode>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
