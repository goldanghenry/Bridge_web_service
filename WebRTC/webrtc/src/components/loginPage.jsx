import "./loginPage.scss";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../images/bridge.png";
import Swal from "sweetalert2";

function LoginPage() {
  // id, password 정의
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  // const realId = "demo";
  // const realPw = "demo";
  const Navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await fetch("https://bridgepeople.site/login", {
        //주소 수정필요
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userid: id, password: password }),
        credentials: "include", // 쿠키를 포함시키기 위해 필요
      });

      if (response.ok) {
        Swal.fire({
          title: "로그인 완료",
          text: "로그인에 성공했습니다.",
          icon: "success",
        }).then(() => {
          goToMain();
        });
      } else {
        const errorMsg = await response.text();
        Swal.fire({
          title: "로그인 오류",
          text: errorMsg,
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire({
        title: "오류 발생",
        text: "네트워크 오류가 발생했습니다.",
        icon: "error",
      });
    }
  };

  const goToMain = () => {
    Navigate("/");
  };

  return (
    <div className="background">
      <div className="Components">
        <div className="logo">
          <img className="logoImage" src={logoImg} alt="bridge-logo-img"></img>
        </div>
        <div className="title">Bridge</div>
        <div className="idComponent">
          <input
            id="id"
            className="idInput"
            placeholder="아이디를 입력하세요."
            onChange={(e) => {
              setId(e.target.value);
            }}
          ></input>
        </div>
        <div className="pwComponent">
          <input
            type="password"
            id="pw"
            className="pwInput"
            placeholder="비밀번호를 입력하세요."
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          ></input>
        </div>
        <div className="cbComponent">
          <div className="cb1Div">
            <input
              className="cb"
              type="checkbox"
              name="saveId"
              value="saveId"
            ></input>
            <div className="cbtext">아이디 저장</div>
          </div>
          <div className="cb2Div">
            <input
              className="cb"
              type="checkbox"
              name="autoLogin"
              value="autoLogin"
            ></input>
            <div className="cbtext">자동 로그인</div>
          </div>
        </div>
        {/*<div className="cbComponent">
                    <div className="questionText">나는 청각장애인이다</div>
                    <div className="cbDiv">
                        <text>Yes</text>
                        <input className="cb" type="checkbox" name="deaf" value="yes"></input>
                        <text>No</text>(
                        <input className="cb" type="checkbox" name="deaf" value="no"></input>
                    </div>
                </div>*/}
        <div className="buttonComponent">
          <button type="button" className="loginButton" onClick={handleLogin}>
            로그인
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
