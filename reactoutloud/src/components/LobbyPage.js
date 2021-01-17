import React, { Component } from 'react';
import { TextField, Button, Divider } from '@material-ui/core';
import UserList from './Userlist'
import Timer from './Timer'
import Header from './Header'
import '../styles.scss';

class LobbyPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedIndex: -1,
        data: [null, null, null, null, null, null, null, null, null, null],
        hasJoined: false,
        userName: ""
      };
      this.handleTextFieldChange = this.handleTextFieldChange.bind(this);
      this.joinGame = this.joinGame.bind(this);
    }

    joinGame() {
        this.props.socket.emit("join", this.state.userName);
    }
    
    handleTextFieldChange(event) {
        const target = event.target;    
        this.setState({
          [target.name]: target.value
        });
    }

    render() {
        return (
            <div>
                <Header title='LOBBY'/>
                <div class="horizontalStack">
                    <UserList data={this.props.userListData}/>
                    <div class="verticalStack">
                        <TextField 
                            color="primary"
                            name="userName" 
                            label="name" 
                            variant="outlined" 
                            value={this.state.userName} 
                            onChange={this.handleTextFieldChange} 
                            style={{width: "200px", paddingBottom: "20px", marginTop: "10%" }}/>
                        
                        <Button 
                            color="primary"
                            variant="contained" 
                            onClick={this.joinGame} 
                            disabled={this.props.hasJoined || this.state.userName === ""}
                            style={{width: "200px", color: "white"}}>Join</Button>

                    </div>
                    <Timer remainingTime={this.props.timer} totalTime={30}/>
                </div>
            </div>
        );
    }
  }
  
  export default LobbyPage
  