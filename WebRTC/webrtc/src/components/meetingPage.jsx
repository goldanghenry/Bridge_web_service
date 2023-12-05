import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import io from "socket.io-client";
//import "./App.css";
import "./meetingPage.scss";
import logoImg from "../images/bridge.png";
import {
  BsCameraVideoFill,
  BsFillCameraVideoOffFill,
  BsFillMicFill,
  BsFillChatLeftTextFill,
  BsFillMicMuteFill,
} from "react-icons/bs";
import { FaPhoneSlash, FaPhone } from "react-icons/fa6";
import Swal from "sweetalert2";

function MeetingPage() {
  // FRONT CODE
  const [isChatOpen, setChatOpen] = useState(false);
  const [isMicOpen, setMicOpen] = useState(true);
  const [isCameraOpen, setCameraOpen] = useState(true);

  const Navigate = useNavigate();

  const NavigateToMain = () => {
    Swal.fire({
      title: "통화 종료 하시겠습니까 ?",
      showCancelButton: true,
      icon: "question",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Navigate("/");
      }
    });
  };

  const toggleChat = () => {
    console.log(isChatOpen);
    setChatOpen(!isChatOpen);
  };

  const toggleVideo = () => {
    const newCameraState = !isCameraOpen;
    setCameraOpen(newCameraState);
    socket.emit("cameraStatusChanged", newCameraState);
  };

  const toggleMic = () => {
    const newMicState = !isMicOpen;
    setMicOpen(newMicState);
    socket.emit("micStatusChanged", newMicState);
  };

  // FRONT CODE END

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [socket, setSocket] = useState(null);
  //const [message, setMessage] = useState("");
  //const [receivedMessages, setReceivedMessages] = useState([]);

  const peerConnectionConfig = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };
  const peerConnection = useRef(new RTCPeerConnection(peerConnectionConfig));

  // const sendMessage = () => {
  //   if (socket && message) {
  //     const messageObject = { text: message, sender: "me" };
  //     socket.emit("chatMessage", messageObject);
  //     setReceivedMessages((prevMessages) => [...prevMessages, messageObject]);
  //     setMessage("");
  //   }
  // };

  useEffect(() => {
    const newSocket = io("https://bridgepeople.site", {
      withCredentials: true,
      secure: true,
    });

    setSocket(newSocket);

    navigator.mediaDevices
      .getUserMedia({ video: isCameraOpen, audio: isMicOpen })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, stream);
        });
      })
      .catch((error) => console.error("Error accessing media devices.", error));

    // 이벤트 핸들러를 peerConnection.current에 올바르게 설정합니다.
    peerConnection.current.onicecandidate = (event) => {
      if (event.candidate) {
        newSocket.emit("candidate", event.candidate);
      }
    };

    peerConnection.current.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    newSocket.on("offer", async (offer) => {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.current.setLocalDescription(
        new RTCSessionDescription(answer)
      );
      newSocket.emit("answer", answer);
    });

    newSocket.on("answer", async (answer) => {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(answer)
      );
    });

    newSocket.on("candidate", async (candidate) => {
      await peerConnection.current.addIceCandidate(
        new RTCIceCandidate(candidate)
      );
    });

    newSocket.on("cameraStatusChanged", (newCameraState) => {
      setCameraOpen(newCameraState);
    });
    newSocket.on("micStatusChanged", (newMicState) => {
      setMicOpen(newMicState);
    });

    // newSocket.on("chatMessage", (messageObject) => {
    //   setReceivedMessages((prevMessages) => [
    //     ...prevMessages,
    //     { ...messageObject, sender: "them" },
    //   ]);
    // });

    return () => {
      newSocket.off("cameraStatusChanged");
      newSocket.off("micStatusChanged");
      newSocket.close();
    };
  }, [isCameraOpen, isMicOpen]);

  const startCall = async () => {
    try {
      // Offer 생성
      const offer = await peerConnection.current.createOffer();

      // Local description 설정
      await peerConnection.current.setLocalDescription(
        new RTCSessionDescription(offer)
      );

      // Socket을 통해 offer 전송
      socket.emit("offer", offer);
    } catch (error) {
      console.error("Error in startCall:", error);
    }
  };

  return (
    /*<div className="meeting-page">
      <video ref={localVideoRef} autoPlay playsInline />
      <video ref={remoteVideoRef} autoPlay playsInline />
      <button onClick={startCall}>Start Call</button>
      <input
        value={message} // 여기서 message는 현재 입력된 메시지를 나타내는 상태
        onChange={(e) => setMessage(e.target.value)} // 입력 필드가 변경될 때 상태 업데이트
        type="text"
      />
      <button onClick={sendMessage}>Send Message</button>{" "}
      <div>
        {receivedMessages.map((msg, index) => (
          <p
            key={index}
            className={msg.sender === "me" ? "my-message" : "their-message"}
          >
            {msg.sender}: {msg.text}
          </p>
        ))}
      </div>
    </div>*/

    <div className="meetpageBackground">
      <div className="head-body-functions">
        <div className="head">
          <div className="logo">
            <img
              className="logoImage"
              src={logoImg}
              alt="bridge-logo-img"
            ></img>
          </div>
          <div className="title">Bridge</div>
        </div>
        <div className="body1">
          <div className="peer1Video">
            <video
              className="video1"
              ref={localVideoRef}
              autoPlay
              playsInline
            />
          </div>
          <div className="peer2Video">
            <video
              className="video2"
              ref={remoteVideoRef}
              autoPlay
              playsInline
            />
          </div>
        </div>
        <div className="functions">
          <div className="startCallBtnDiv">
            <button onClick={startCall} className="startCallBtn">
              <FaPhone className="startIcon"></FaPhone>
            </button>
          </div>
          <div className="cameraBtnDiv">
            <button onClick={toggleVideo} className="cameraBtn">
              {isCameraOpen ? (
                <BsCameraVideoFill className="cameraIcon" />
              ) : (
                <BsFillCameraVideoOffFill className="cameraIcon" />
              )}
            </button>
          </div>
          <div className="micBtnDiv">
            <button onClick={toggleMic} className="micBtn">
              {isMicOpen ? (
                <BsFillMicFill className="micIcon" />
              ) : (
                <BsFillMicMuteFill className="micIcon" />
              )}
            </button>
          </div>
          <div className="textBtnDiv">
            <button onClick={toggleChat} className="textBtn">
              <BsFillChatLeftTextFill className="textIcon" />
            </button>
          </div>
          <div className="endBtnDiv">
            <button className="endBtn" onClick={NavigateToMain}>
              <FaPhoneSlash className="endIcon"></FaPhoneSlash>
            </button>
          </div>
        </div>
      </div>
      {isChatOpen && (
        <div className="chatBoxOpen">
          <div className="chatBoxstyle">
            <div className="chat-head">회의메세지</div>
            <div className="chatLine"></div>
            <div className="chat-message">
              <div className="user1">
                <div className="user1-name">user1</div>
                <div className="user1-message"></div>
              </div>
              <div className="user2">
                <div className="user2-message"></div>
                <div className="user2-name">user2</div>
              </div>
            </div>
          </div>
        </div>
      )}
      {!isChatOpen && <div className="chatBox"></div>}
    </div>
  );
}

export default MeetingPage;
