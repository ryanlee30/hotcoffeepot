import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
import ChoosingPage from "./components/ChoosingPage";
import LobbyPage from "./components/LobbyPage";
import JudgingPage from "./components/JudgingPage";
import ViewingPage from "./components/ViewingPage";
import WaitingPage from "./components/WaitingPage";
import ResultsPage from "./components/ResultsPage";

import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button'

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
      timer: "30",
      hasJoined: false,
      gameState: "lobby",
      userData: null,
      userListData: null,
      isJudge: false
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

  renderPage(gameState){
    switch(gameState){
      case "lobby":
        return(<LobbyPage timer={this.state.timer} userListData={this.state.userListData} socket={socket} hasJoined={this.state.hasJoined}/>);
      case "upload":
        return(this.state.isJudge ?
          <WaitingPage timer={this.state.timer} userListData={this.state.userListData} socket={socket} hasJoined={this.state.hasJoined}/> :
          <ChoosingPage timer={this.state.timer} userListData={this.state.userListData} socket={socket} hasJoined={this.state.hasJoined}/>);
      case "review":
        return(this.state.isJudge ?
          <JudgingPage timer={this.state.timer} userListData={this.state.userListData} socket={socket} hasJoined={this.state.hasJoined}/> :
          <ViewingPage timer={this.state.timer} userListData={this.state.userListData} socket={socket} hasJoined={this.state.hasJoined}/>);
      case "results":
        return(<ResultsPage timer={this.state.timer} userListData={this.state.userListData} socket={socket} hasJoined={this.state.hasJoined}/>);
      default:
        return(<h1>UNKNOWN GAME STATE</h1>)
    }
  }

  componentDidMount() {
    socket.emit("request userListData")
    
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
      console.log("new game state: " + newState)
      this.setState({
        gameState: newState
      })
    })
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div>
          {
            this.renderPage(this.state.gameState)
          }
          <Button onClick={this.startTimer}>Start timer</Button>
          <Button onClick={this.nextGameState}>Next game state (DEBUG)</Button>
          <Button onClick={this.nextJudge}>Next judge (DEBUG)</Button>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;