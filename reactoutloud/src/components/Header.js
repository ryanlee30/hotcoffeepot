import React, { Component } from 'react';

const colormapping = {
  "UPLOAD": "#848484",
  "WAITING": "#848484",
  "JUDGING": "#8472C0",
  "WINNER": "#FDE74C"
}

class Header extends Component {
  constructor(props) {
    super(props);
    if (this.props.title in colormapping){
      this.state={"bgColor": colormapping[this.props.title]}
    }
    else{
      this.state={"bgColor": "red"}
    }
  }

  render() {
    return (
      <header style={{backgroundColor: this.state.bgColor, padding: '10px'}}>
        <div>
          <h1 style={{paddingLeft: '25px', color: 'white'}}>{this.props.title}</h1>
        </div>
      </header>
    );
  }
}

export default Header;