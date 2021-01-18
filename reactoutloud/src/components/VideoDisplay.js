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
      selectedIndex: -1,
      selectedVideo: null,
      videoList: [realEstateObj, coffeePotObj, realEstateObj, realEstateObj, realEstateObj, realEstateObj, test]
    };
  }

  componentDidMount(){
    this.props.socket.emit("request presentation cards");
    this.props.socket.on("play video", videoCard => {
        if (!this.props.isJudging && !this.props.isChoosing){
          this.setState({
            selectedVideo: videoCard
          })
        }
    })
    this.props.socket.emit("request cards", this.props.userData.slotNumber);
    this.props.socket.on("7 userCards", userCards => {
      if (!this.props.isJudging) {
        this.setState({
          videoList: userCards
        })
      }
    })
    this.props.socket.on("everyone submitted", presentationCards => {
      console.log(presentationCards)
      if (this.props.isJudging) {
        this.setState({
          videoList: presentationCards
        })
      }
    })
  }

  render() {
    const handleButtonClick = (index) => {
      console.log('clicked button with index ' + index)
      if (this.props.isJudging) {
        this.props.socket.emit("request video", this.state.videoList[index])
      }
      this.setState({
        selectedIndex: index,
        selectedVideo: this.state.videoList[index]
      })
    };

    const handleVideoEnd = () => {
      this.setState({
        selectedVideo: null
      })
    }

    const submitChoice = (selectedIndex) => {
      console.log("selected index is " + selectedIndex)
      if(!this.props.isJudging){
        this.props.socket.emit("choose card", this.props.userData.slotNumber, this.state.videoList[selectedIndex]);
      }
      else{
        this.props.socket.emit("choose winner", Number(selectedIndex)+1)
      }
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
            this.state.selectedVideo != null ? <YouTube videoId={this.state.selectedVideo.videoID} opts={opts} onEnd={() => handleVideoEnd()}/> : <div style={{backgroundColor: "gray", width: "866px", height: "488px"}}/>
          }
          {
            this.props.isChoosing ? 
            <div className="horizontalStack">
              <ButtonGroup style={{paddingTop: '20px', width: '866px'}}>
                  {Object.keys(this.state.videoList).map(key => {
                      return (
                          this.state.videoList[key] ? 
                          <Button onClick={() => handleButtonClick(key)} variant={this.state.selectedIndex === key ? "outlined" : "contained"}>{this.state.videoList[key].name}</Button> :
                          <Button disabled variant={"outlined"}>Not available</Button>
                      );
                  })}
              </ButtonGroup> 

              <Button color="primary"
                      variant="contained" 
                      disabled={this.state.selectedIndex == -1} 
                      onClick={() => submitChoice(this.state.selectedIndex)} 
                      style={{height: "50px", color: "white"}}>{this.props.isJudging ? "Choose Winner" : "Submit"}</Button>
            </div>
            : <span/>
          }

          
      </div>
    );
  }
}

export default VideoDisplay
