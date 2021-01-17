import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import UploadPage from "./components/UploadPage";
import WaitingPage from "./components/WaitingPage";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';

const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT);

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#00A6ED"
    },
    secondary: {
      main: "#62A786"
    },
  },
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      timer: "30"
    };
  }

  startTimer() {
    socket.emit("start");
  }

  componentDidMount() {
    socket.emit("request userData")
    
    socket.on("userListData", data => {
      console.log("RECEIVED USER DATA")
      this.setState({
          data: data,
          hasJoined: true,
      })
    });

    socket.on("timer", time => {
      this.setState({
        timer: time
      })
    });

    socket.on("userData", data => {
      console.log(data);
    });
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          <WaitingPage timer={this.state.timer} userData={this.state.data} socket={socket}/>
          <button onClick={this.startTimer}>Start!</button>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;