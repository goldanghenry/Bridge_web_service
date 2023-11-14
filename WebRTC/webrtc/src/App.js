import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "./App.css";

function App() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  const [receivedMessages, setReceivedMessages] = useState([]);

  const peerConnectionConfig = {
    iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
  };
  const peerConnection = useRef(new RTCPeerConnection(peerConnectionConfig));

  const sendMessage = () => {
    if (socket && message) {
      const messageObject = { text: message, sender: "me" };
      socket.emit("chatMessage", messageObject);
      setReceivedMessages((prevMessages) => [...prevMessages, messageObject]);
      setMessage("");
    }
  };

  useEffect(() => {
    const newSocket = io("https://localhost:3001", {
      withCredentials: true,
      secure: true,
    });

    setSocket(newSocket);

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
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

    newSocket.on("chatMessage", (messageObject) => {
      setReceivedMessages((prevMessages) => [
        ...prevMessages,
        { ...messageObject, sender: "them" },
      ]);
    });

    return () => {
      newSocket.close();
    };
  }, []);

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
    <div className="App">
      <video ref={localVideoRef} autoPlay playsInline />
      <video ref={remoteVideoRef} autoPlay playsInline />
      <button onClick={startCall}>Start Call</button>
      {/* 채팅 인터페이스 추가 */}
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
    </div>
  );
}

export default App;
