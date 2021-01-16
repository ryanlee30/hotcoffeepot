import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import UploadPage from "./components/UploadPage";
const ENDPOINT = "http://127.0.0.1:4001";

function App() {
  const [timer, setTimer] = useState("");
  const socket = socketIOClient(ENDPOINT);

  useEffect(() => {
    socket.on("timer", time => {
      setTimer(time);
    });
  }, []);

  function startTimer() {
    socket.emit("start", "");
  }

  return (
    <div>
      <UploadPage/>
      <p>{timer}</p>
      <button onClick={startTimer}>Start!</button>
    </div>
  );
}

export default App;