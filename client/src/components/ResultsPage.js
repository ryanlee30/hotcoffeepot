import React, { Component } from 'react';
// import { Text } from '@material-ui/core';
import UserList from './Userlist'
import Timer from './Timer'
import Header from './Header'
import '../styles.scss';

class ResultsPage extends Component {
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
                <Header title='RESULTS' prompt={this.props.prompt}/>
                <div class="horizontalStack">
                    <UserList data={this.props.userListData}/>
                    <div class="verticalStack">
                        <h1>SOMEONE WON</h1>
                    </div>
                    <Timer remainingTime={this.props.timer} totalTime={30}/>
                </div>
            </div>
        );
    }
  }
  
  export default ResultsPage
  