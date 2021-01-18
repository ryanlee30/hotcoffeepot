import React, { Component } from 'react';
import Header from "./Header"
import Timer from './Timer'
import UserList from './Userlist'
import VideoDisplay from './VideoDisplay'

class JudgingPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
    this.handleTextfieldChange = this.handleTextfieldChange.bind(this);
  }

  handleTextfieldChange(event) {
    const target = event.target;    
    this.setState({
      [target.name]: target.value
    });
  }

  render() {
    return (
      <div>
        <Header title='JUDGING' prompt={this.props.prompt}/>
        <div class="horizontalStack">
          <UserList data={this.props.userListData}/>
          <VideoDisplay isJudging={true} isChoosing={true} socket={this.props.socket} userData={this.props.userData}/>
          <Timer remainingTime={this.props.timer} totalTime={30}/>
        </div>
      </div>
    );
  }
}

export default JudgingPage
