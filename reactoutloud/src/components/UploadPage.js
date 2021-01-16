import React, { Component } from 'react';
import Header from "./Header"
import TextField from '@material-ui/core/TextField';
import YouTube from 'react-youtube';
import Timer from './Timer'
import UserList from './Userlist'

class UploadPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      videoID: "",
      youtubeLink: "",
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
    const opts = {
      height: '488',
      width: '866',
      playerVars: {
        autoplay: 1,
        end: 10,
        loop: 1,
      },
    };

    return (
      <div>
        <Header title='REACT'/>
        <div class="horizontalStack">
          <Timer remainingTime={20} totalTime={40}/>
          <UserList/>
          <YouTube
            videoId={this.state.videoID}
            opts={opts}
          />
        </div>
      </div>
    );
  }
}

export default UploadPage
