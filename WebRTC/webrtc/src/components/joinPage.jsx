import "./joinPage.scss";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logoImg from "../images/bridge.png";
import Swal from "sweetalert2";

function JoinPage() {
  // id, password 정의
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isHearingImpaired, setIsHearingImpaired] = useState(false);

  // const realId = "demo";
  // const realPw = "demo";

  const Navigate = useNavigate();

  const handleJoin = async () => {
    if (!name || !id || !password) {
      Swal.fire({
        title: "회원가입 실패",
        text: "모든 필드를 채워주세요.",
        icon: "error",
      });
      return;
    }
    if (password.length < 6) {
      Swal.fire({
        title: "회원가입 실패",
        text: "비밀번호는 6자 이상이어야 합니다.",
        icon: "error",
      });
      return;
    }

    try {
      const response = await fetch("https://bridgepeople.site/join", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: name,
          userid: id,
          password: password,
          isHearingImpaired: isHearingImpaired,
        }),
      });
      const data = await response.text(); // 서버의 응답을 텍스트로 받음

      if (response.ok) {
        Swal.fire({
          title: "회원가입 완료",
          text: "",
          icon: "success",
        }).then(() => {
          goToMain();
        });
      } else {
        Swal.fire({
          title: "회원가입 실패",
          text: "",
          icon: "error",
        });
      }
    } catch (error) {
      Swal.fire("Error", "네트워크 오류", "error");
    }
  };

  const handleCheckboxChange = (event) => {
    setIsHearingImpaired(event.target.checked);
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
        <div className="nameComponents">
          <input
            id="name"
            className="nameInput"
            placeholder="이름을 입력하세요."
            onChange={(e) => {
              setName(e.target.value);
            }}
          ></input>
        </div>
        <div className="idComponents">
          <input
            id="id"
            className="idInput"
            placeholder="아이디를 입력하세요."
            onChange={(e) => {
              setId(e.target.value);
            }}
          ></input>
        </div>
        <div className="pwComponents">
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
        <div className="cbComponents">
          <div className="questionText">나는 청각장애인이다</div>
          <div className="cbDiv1">
            <div className="cbtext">Yes</div>
            <input
              id="Yes"
              className="cb"
              type="checkbox"
              name="deaf"
              value="yes"
              checked={isHearingImpaired === true}
              onChange={handleCheckboxChange} // 체크박스 변경 처리
            ></input>
          </div>
          <div className="cbDiv2">
            <div className="cbtext">No</div>
            <input
              id="No"
              className="cb"
              type="checkbox"
              name="deaf"
              value="no"
              checked={isHearingImpaired === false}
              onChange={handleCheckboxChange} // 체크박스 변경 처리
            ></input>
          </div>
        </div>
        <div className="buttonComponent">
          <button
            type="button"
            className="loginButton"
            onClick={handleJoin}
            // onClick={(e) => {
            //   if (realId === id && realPw === password && name === "호반우") {
            //     Swal.fire({
            //       title: "회원가입 완료",
            //       text: "",
            //       icon: "success",
            //     });
            //     setTimeout(3000);
            //     e.stopPropagation();
            //     goToMain();
            //   } else {
            //     console.log("?");
            //   }
            // }}
          >
            회원가입
          </button>
        </div>
      </div>
    </div>
  );
}

export default JoinPage;
