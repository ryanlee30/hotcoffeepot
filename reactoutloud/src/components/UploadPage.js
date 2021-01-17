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
        <Header title='REACTION'/>
        <div class="horizontalStack">
          <UserList/>
          <VideoDisplay isJudging={true}/>
          <Timer remainingTime={this.props.timer} totalTime={30}/>
        </div>
      </div>
    );
  }
}

export default UploadPage
