import React, { Component } from 'react';
import Header from "./Header"
import Timer from './Timer'
import UserList from './Userlist'
import VideoDisplay from './VideoDisplay'

class ViewingPage extends Component {
  constructor(props) {
    super(props);
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
        <Header title='VIEWING'/>
        <div class="horizontalStack">
          <UserList data={this.props.userListData}/>
          <VideoDisplay isJudging={false} isChoosing={false} socket={this.props.socket}/>
          <Timer remainingTime={this.props.timer} totalTime={30}/>
        </div>
      </div>
    );
  }
}

export default ViewingPage
