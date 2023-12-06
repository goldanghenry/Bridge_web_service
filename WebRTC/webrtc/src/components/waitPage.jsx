import "./waitPage.scss";
import React, { useRef, useEffect } from "react";
import logoImg from "../images/bridge.png";
import { useNavigate } from "react-router-dom";

function WaitPage() {
  const localVideoRef = useRef(null);

  const Navigate = useNavigate();

  const NavigateToMeeting = () => {
    Navigate("/meeting");
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
      })
      .catch((error) => console.error("Error accessing media devices.", error));
  }, []);

  return (
    <div className="pageBackground">
      <div className="head">
        <div className="logo">
          <img className="logoImage" src={logoImg} alt="bridge-logo-img"></img>
        </div>
        <div className="title">Bridge</div>
      </div>
      <div className="body">
        <div className="videoSpot">
          <video className="video" ref={localVideoRef} autoPlay playsInline />
        </div>
        <div className="textButtonSpot">
          <div className="text">회의에 참가하시겠습니까 ?</div>
          <div className="joinButtonDiv">
            <button
              className="joinButton"
              onClick={NavigateToMeeting}
              type="button"
            >
              회의참가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WaitPage;
