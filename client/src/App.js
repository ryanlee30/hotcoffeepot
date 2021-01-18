import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import ChoosingPage from "./components/ChoosingPage";
import LobbyPage from "./components/LobbyPage";
import JudgingPage from "./components/JudgingPage";
import ViewingPage from "./components/ViewingPage";
import WaitingPage from "./components/WaitingPage";
import ResultsPage from "./components/ResultsPage";
import OngoingPage from "./components/OngoingPage";

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

const ENDPOINT = "https://proud-zebra-92.loca.lt";
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
      timer: "30",
      hasJoined: false,
      gameState: "lobby",
      userData: null,
      userListData: null,
      isJudge: false,
      prompt: ""
    };

  }

  startTimer() {
    socket.emit("start");
  }

  nextGameState() {
    socket.emit("next gamestate");
  }

  nextJudge() {
    socket.emit("next judge");
  }

  sendVideo() {
    socket.emit("request video")
  }

  renderPage(gameState){
    switch(gameState){
      case "lobby":
        return(<LobbyPage timer={this.state.timer} userListData={this.state.userListData} socket={socket} hasJoined={this.state.hasJoined} prompt={this.state.prompt} userData={this.state.userData}/>);
      case "upload":
        return(this.state.isJudge ?
          <WaitingPage timer={this.state.timer} userListData={this.state.userListData} socket={socket} hasJoined={this.state.hasJoined} prompt={this.state.prompt} userData={this.state.userData}/> :
          <ChoosingPage timer={this.state.timer} userListData={this.state.userListData} socket={socket} hasJoined={this.state.hasJoined} prompt={this.state.prompt} userData={this.state.userData}/>);
      case "review":
        return(this.state.isJudge ?
          <JudgingPage timer={this.state.timer} userListData={this.state.userListData} socket={socket} hasJoined={this.state.hasJoined} prompt={this.state.prompt} userData={this.state.userData}/> :
          <ViewingPage timer={this.state.timer} userListData={this.state.userListData} socket={socket} hasJoined={this.state.hasJoined} prompt={this.state.prompt} userData={this.state.userData}/>);
      case "results":
        return(<ResultsPage timer={this.state.timer} userListData={this.state.userListData} socket={socket} hasJoined={this.state.hasJoined} prompt={this.state.prompt} userData={this.state.userData}/>);
      case "ongoing":
        return(<OngoingPage timer={this.state.timer} userListData={this.state.userListData} socket={socket} hasJoined={this.state.hasJoined} prompt={this.state.prompt} userData={this.state.userData}/>)
      default:
        return(<h1>UNKNOWN GAME STATE</h1>)
    }
  }

  componentDidMount() {
    socket.emit("request userListData")
    socket.emit("request gamestate")

    socket.on("userListData", data => {
      console.log("RECEIVED USERLIST DATA")
      this.setState({
        userListData: data,
      })
      if (this.state.userData != null) {
        socket.emit("request isJudge", this.state.userData.slotNumber)
      }
    });

    socket.on("timer", time => {
      this.setState({
        timer: time
      })
    });

    socket.on("here is prompt", prompt => {
      console.log("RECEIVED PROMPT: " + prompt)
      this.setState({
        prompt: prompt
      })
    })

    socket.on("userData", data => {
      console.log("RECEIVED USER DATA")
      this.setState({
        userData: data,
        hasJoined: true
      })
      socket.emit("request isJudge", this.state.userData.slotNumber)
    });

    socket.on("isJudge", isJudge => {
      console.log(`is current user the judge? ${isJudge}`)
      this.setState({
        isJudge: isJudge
      })
    })

    socket.on("gameState", newState => {
      if (newState != "lobby" && !this.state.hasJoined) {
        this.setState({
          gameState: "ongoing"
        })
      }
      else{
        this.setState({
          gameState: newState
        })
      }
    })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          {
            this.renderPage(this.state.gameState)
          }
          {/* <Button onClick={this.startTimer}>Start timer</Button>
          <Button onClick={this.nextGameState}>Next game state (DEBUG)</Button>
          <Button onClick={this.nextJudge}>Next judge (DEBUG)</Button>
          <Button onClick={this.sendVideo}>Send video (DEBUG)</Button> */}
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;