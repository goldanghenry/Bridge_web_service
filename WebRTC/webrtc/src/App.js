import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import "./App.css";

function App() {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const [socket, setSocket] = useState(null);
  // const peerConnection = new RTCPeerConnection();
  const peerConnection = useRef(new RTCPeerConnection());

  useEffect(() => {
    // const newSocket = io('https://localhost:3000', { secure: true });
    const newSocket = io("https://localhost:3001", {
      withCredentials: true,
      secure: true,
    });

    setSocket(newSocket);

    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        localVideoRef.current.srcObject = stream;
        stream.getTracks().forEach((track) => {
          peerConnection.current.addTrack(track, stream);
        });
      })
      .catch((error) => console.error("Error accessing media devices.", error));

    peerConnection.onicecandidate = (event) => {
      if (event.candidate) {
        newSocket.emit("candidate", event.candidate);
      }
    };

    peerConnection.ontrack = (event) => {
      remoteVideoRef.current.srcObject = event.streams[0];
    };

    newSocket.on("offer", async (offer) => {
      await peerConnection.current.setRemoteDescription(
        new RTCSessionDescription(offer)
      );
      const answer = await peerConnection.current.createAnswer();
      await peerConnection.setLocalDescription(
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
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      newSocket.close();
    };
  }, []);

  const startCall = async () => {
    if (!peerConnection.current) {
      console.error("peerConnection.current is not defined.");
      return;
    }

    try {
      const offer = await peerConnection.current.createOffer();
      await peerConnection.current.setLocalDescription(
        new RTCSessionDescription(offer)
      );
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
    </div>
  );
}

export default App;
