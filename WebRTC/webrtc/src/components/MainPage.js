// MainPage.js
import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
  return (
    <div>
      <h1>메인 페이지</h1>
      <Link to="/meeting">미팅 페이지로 이동</Link>
    </div>
  );
}

export default MainPage;
