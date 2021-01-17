import React, { Component } from 'react';
import YouTube from 'react-youtube';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';

let realEstateObj = {
  id: "cd4-UnU8lWY",
  startTime: 34,
  duration: 2,
  name: "it's free real estate"
}

let coffeePotObj = {
  id: "m42tNGF9h7w",
  startTime: 23,
  duration: 2,
  name: "that's an awfully hot coffee pot"
}

let test = {
  id: "j9XUzV-GQyA",
  startTime: 8,
  duration: 20,
  name: "hey"
}

class VideoDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedVideo: null,
      videoList: [realEstateObj, coffeePotObj, realEstateObj, realEstateObj, realEstateObj, realEstateObj, test]
    };
  }

  render() {
    const handleButtonClick = (index) => {
      this.setState({
        selectedVideo: this.state.videoList[index]
      })
    };

    const handleVideoEnd = () => {
      this.setState({
        selectedVideo: null
      })
    }

    const opts = {
      height: '488',
      width: '866',
      playerVars: {
        autoplay: 1,
        start: this.state.selectedVideo != null ? this.state.selectedVideo.startTime : 0,
        end: this.state.selectedVideo != null ? this.state.selectedVideo.startTime + this.state.selectedVideo.duration + 1 : 0,
        controls: 0,
        disablekb: 1,
        modestbranding: 1,
        showinfo: 0
      },
    };

    return (
      <div>
          {
            this.state.selectedVideo != null ? <YouTube videoId={this.state.selectedVideo.id} opts={opts} onEnd={() => handleVideoEnd()}/> : <div style={{backgroundColor: "gray", width: "866px", height: "488px"}}/>
          }
          <ButtonGroup disabled={!this.props.isChoosing} style={{paddingTop: '20px', width: '866px'}}>
              {Object.keys(this.state.videoList).map(key => {
                  return (
                      <Button onClick={() => handleButtonClick(key)}>{this.state.videoList[key].name}</Button>
                  );
              })}
          </ButtonGroup>
      </div>
    );
  }
}

export default VideoDisplay
