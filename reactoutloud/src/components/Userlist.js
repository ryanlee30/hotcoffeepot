import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import YouTube from 'react-youtube';
import Timer from './Timer'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Userbutton from './Userbutton'

let SimonObj = {
    name: "Simon",
    score: 6,
    slotNumber: '1',
    isJudge: false
}

let SeanObj = {
    name: "Sean",
    score: 6,
    slotNumber: '2',
    isJudge: true
}

class UserList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedIndex: -1,
        data: [SimonObj, SeanObj]
      };
    }
  
    render() {        
        const handleListItemClick = (index) => {
            this.setState({
                selectedIndex: index
            })
        };

        return (
            <div id="userList">
                <List component="nav">
                {Object.keys(this.state.data).map(key => {
                    return (
                        <Userbutton data={this.state.data[key]} id={key} key={key} onClick={() => handleListItemClick(key)} selected={this.state.selectedIndex === key}/>
                    );
                    })}
                </List>
            </div>
        );
    }
  }
  
  export default UserList
  