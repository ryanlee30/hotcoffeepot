import React, { Component } from 'react';
// import { Text } from '@material-ui/core';
import UserList from './Userlist'
import Timer from './Timer'
import Header from './Header'
import '../styles.scss';

class WaitingPage extends Component {
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
                <Header title='WAITING'/>
                <div class="horizontalStack">
                    <UserList data={this.props.userListData}/>
                    <div class="verticalStack">
                        <h1>Waiting for other players to finish choosing videos</h1>
                    </div>
                    <Timer remainingTime={this.props.timer} totalTime={30}/>
                </div>
            </div>
        );
    }
  }
  
  export default WaitingPage
  