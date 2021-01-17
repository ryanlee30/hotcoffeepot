import React, { Component } from 'react';
import Header from "./Header"
import Timer from './Timer'
import UserList from './Userlist'
import VideoDisplay from './VideoDisplay'

class UploadPage extends Component {
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
        <Header title='REACT'/>
        <div class="horizontalStack">
          <Timer remainingTime={20} totalTime={40}/>
          <VideoDisplay isJudging={true}/>
          <UserList/>
        </div>
      </div>
    );
  }
}

export default UploadPage
