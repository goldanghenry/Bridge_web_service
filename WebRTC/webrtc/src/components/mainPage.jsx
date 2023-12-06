import "./mainPage.scss";
import React from "react";
import logoImg from "../images/bridge.png";
import Deaf from "../images/deaf.png";
import Computer from "../images/computer.png";
import Communication from "../images/communication.avif";
import Message from "../images/message.png";
import Hand from "../images/hand.png";
import Speaking from "../images/speaking.png";
import leftArrow from "../images/left-arrow.png";
import rightArrow from "../images/right-arrow.png";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";

function MainPage() {
  const navigate = useNavigate();

  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(false);
  const [isCenterVisible, setIsCenterVisible] = useState(false);
  const [isInfo1Visible, setIsInfo1Visible] = useState(false);
  const [isInfo2Visible, setIsInfo2Visible] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");

  const targetRefLeft = useRef(null);
  const targetRefRight = useRef(null);
  const targetRefCenter = useRef(null);
  const targetRefInfo1 = useRef(null);
  const targetRefInfo2 = useRef(null);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const checkLoginStatus = async () => {
      try {
        const response = await fetch(
          "https://bridgepeople.site/api/auth/status",
          {
            //수정필요
            credentials: "include", // 쿠키를 포함시키기 위해 필요
          }
        );
        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(data.isLoggedIn);
          setUsername(data.username || ""); // username이 undefined가 아닌지 확인
        } else {
          setIsLoggedIn(false);
          setUsername("");
        }
      } catch (error) {
        console.error("Error checking login status", error);
        setIsLoggedIn(false);
        setUsername("");
      }
    };
    checkLoginStatus();

    const handleIntersectionLeft = (entries) => {
      const entry = entries[0];
      setIsLeftVisible(entry.isIntersecting);
    };

    const handleIntersectionRight = (entries) => {
      const entry = entries[0];
      setIsRightVisible(entry.isIntersecting);
    };

    const handleIntersectionCenter = (entries) => {
      const entry = entries[0];
      setIsCenterVisible(entry.isIntersecting);
    };

    const handleIntersectionInfo1 = (entries) => {
      const entry = entries[0];
      setIsInfo1Visible(entry.isIntersecting);
    };

    const handleIntersectionInfo2 = (entries) => {
      const entry = entries[0];
      setIsInfo2Visible(entry.isIntersecting);
    };

    const observerLeft = new IntersectionObserver(
      handleIntersectionLeft,
      options
    );
    const observerRight = new IntersectionObserver(
      handleIntersectionRight,
      options
    );
    const observerCenter = new IntersectionObserver(
      handleIntersectionCenter,
      options
    );
    const observerInfo1 = new IntersectionObserver(
      handleIntersectionInfo1,
      options
    );
    const observerInfo2 = new IntersectionObserver(
      handleIntersectionInfo2,
      options
    );

    const currentTargetLeft = targetRefLeft.current;
    const currentTargetRight = targetRefRight.current;
    const currentTargetCenter = targetRefCenter.current;
    const currentTargetInfo1 = targetRefInfo1.current;
    const currentTargetInfo2 = targetRefInfo2.current;

    if (currentTargetLeft) {
      observerLeft.observe(currentTargetLeft);
    }

    if (currentTargetRight) {
      observerRight.observe(currentTargetRight);
    }

    if (currentTargetCenter) {
      observerCenter.observe(currentTargetCenter);
    }

    if (currentTargetInfo1) {
      observerInfo1.observe(currentTargetInfo1);
    }

    if (currentTargetInfo2) {
      observerInfo2.observe(currentTargetInfo2);
    }

    // cleanup 함수
    return () => {
      if (currentTargetLeft) {
        observerLeft.unobserve(currentTargetLeft);
      }
      if (currentTargetRight) {
        observerRight.unobserve(currentTargetRight);
      }
      if (currentTargetCenter) {
        observerCenter.unobserve(currentTargetCenter);
      }
      if (currentTargetInfo1) {
        observerInfo1.unobserve(currentTargetInfo1);
      }
      if (currentTargetInfo2) {
        observerInfo2.unobserve(currentTargetInfo2);
      }
    };
  }, []);

  const NavigateToWait = () => {
    navigate("/wait");
  };

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://bridgepeople.site/api/auth/logout",
        {
          //수정 필요
          credentials: "include",
        }
      );
      if (response.ok) {
        setIsLoggedIn(false);
        setUsername("");
        Swal.fire({
          title: "로그아웃 완료",
          icon: "success",
        }).then(() => {
          navigate("/");
        });
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout", error);
    }
  };

  return (
    <div>
      <div className="head">
        <div className="logo">
          <img className="logoImage" src={logoImg} alt="bridge-logo-img"></img>
        </div>
        <div className="title">Bridge</div>
        <div className="startButton-div2">
          {isLoggedIn ? (
            <div className="join-login">
              <span className="userName">{`${username}님`}</span> /{" "}
              <span className="a-join" onClick={() => handleLogout()}>
                로그아웃
              </span>
            </div>
          ) : (
            <div className="join-login">
              {/* href 대신에 onClick을 사용하여 SPA(Single Page Application) 동작을 유지합니다. */}
              <span className="a-login" onClick={() => navigate("/login")}>
                로그인
              </span>{" "}
              /{" "}
              <span className="a-join" onClick={() => navigate("/join")}>
                회원가입
              </span>
            </div>
          )}
          <button className="startButton2" onClick={NavigateToWait}>
            회의 시작
          </button>
        </div>
      </div>
      <div className="body">
        <div className="intro">
          <div className="intro-left">
            <div className="intro-title">Bridge</div>
            <div className="intro-subtitle">
              청각장애인과 소통할 수 있는 화상회의 서비스
            </div>
            <div className="startButton-div">
              <button className="startButton" onClick={NavigateToWait}>
                회의 시작
              </button>
            </div>
          </div>
          <div className="intro-right">
            <img className="deaf-image" src={Deaf} alt="deaf.png" />
          </div>
        </div>
        <div className="info">
          <div
            ref={targetRefInfo1}
            className={`info-1 ${isInfo1Visible ? "visible" : ""}`}
          >
            <div className="text-div1">
              <div className="text-1">
                청각장애인과 비장애인<br></br>최초의 소통 공간
              </div>
              <div className="text-2">
                Bridge를 통해 소통의 장벽이
                <br /> 없는 세상이 되기 바랍니다.
              </div>
            </div>
            <div className="img-div1">
              <img
                className="communication-image"
                src={Communication}
                alt="communication.png"
              />
            </div>
          </div>
          <div
            ref={targetRefInfo2}
            className={`info-2 ${isInfo2Visible ? "visible" : ""}`}
          >
            <div className="text-div2">
              <div className="text-1">
                수화 인식 AI<br></br> 정확한 인식율
              </div>
              <div className="text-2">
                카메라로 수화를 인식하여<br></br> 텍스트로 변환해 보여줍니다.
              </div>
            </div>
            <div className="img-div2">
              <img
                className="computer-image"
                src={Computer}
                alt="computer.png"
              />
            </div>
          </div>
        </div>
        <div className="manual">
          <div
            ref={targetRefLeft}
            className={`left ${isLeftVisible ? "visible" : ""}`}
          >
            <div className="left-up">
              <div className="img-hand">
                <img className="hand-img" src={Hand} alt="hand.png" />
              </div>
              <div className="arrow1">
                <img
                  className="right-arrow"
                  src={rightArrow}
                  alt="right-arrow.png"
                />
              </div>
            </div>
            <div className="left-down">
              수화를 하면 문장이<br></br>메세지로 전달됩니다
            </div>
          </div>
          <div
            ref={targetRefCenter}
            className={`center ${isCenterVisible ? "visible" : ""}`}
          >
            <img src={Message} alt="message.png" className="messageImage" />
          </div>
          <div
            ref={targetRefRight}
            className={`right ${isRightVisible ? "visible" : ""}`}
          >
            <div className="right-up">
              음성으로 말하면 문장이<br></br>메세지로 전달되게 됩니다
            </div>
            <div className="right-down">
              <div className="arrow2">
                <img
                  className="left-arrow"
                  src={leftArrow}
                  alt="left-arrow.png"
                />
              </div>
              <div className="img-sound">
                <img className="sound-img" src={Speaking} alt="sound.png" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="end">
        <div className="end-center">
          <div className="up">
            <div className="logo">
              <img
                className="logoImage"
                src={logoImg}
                alt="bridge-logo-img"
              ></img>
            </div>
            <div className="title">Bridge</div>
            <div className="up-right">
              <div className="service">서비스 이용약관</div>
              <div className="personal-info">개인정보 이용약관</div>
            </div>
          </div>
          <div className="line"></div>
          <div className="down">
            <div className="down-up">
              브릿지팀 | 053-950-5550 | bridge@knu.ac.kr
            </div>
            <div className="down-center">
              41566 대구광역시 북구 대학로 80 / IT대학 융복합관 317호(건물번호 :
              415)
            </div>
            <div className="down-down">
              ⓒ 2023 BridgeTeam, Inc. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
