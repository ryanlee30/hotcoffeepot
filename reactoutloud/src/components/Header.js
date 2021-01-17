import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';


const colormapping = {
  "CHOOSING": "#DB5461",
  "WAITING": "#848484",
  "JUDGING": "#8472C0",
  "VIEWING": "#62A786",
  "RESULTS": "#FDE74C"
}

class Header extends Component {
  constructor(props) {
    super(props);
    if (this.props.title in colormapping){
      this.state={"bgColor": colormapping[this.props.title]}
    }
    else{
      this.state={"bgColor": "gray"}
    }
  }

  render() {
    return (
      <AppBar position="static" style={{backgroundColor: this.state.bgColor}}>
        <div>
          <h1 style={{paddingLeft: '25px', color: 'white'}}>{this.props.title}</h1>
        </div>
      </AppBar>
    );
  }
}

export default Header;