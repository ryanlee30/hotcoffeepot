import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import YouTube from 'react-youtube';
import Timer from './Timer'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Userbutton from './Userbutton'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT);

class UserList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedIndex: -1,
        data: []
      };
    }

    componentDidMount() {
        socket.on("joinData", data => {
            this.setState({
                data: data,
            })
        });
    }

    joinGame() {
        socket.emit("join", "hello");
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
                <button onClick={this.joinGame}>Join</button>
            </div>
        );
    }
  }
  
  export default UserList
  