import React, { Component } from 'react';
import { TextField } from '@material-ui/core';
import List from '@material-ui/core/List';
import Userbutton from './Userbutton'
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:4001";
const socket = socketIOClient(ENDPOINT);


class UserList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedIndex: -1,
        data: [],
        hasJoined: false,
      };
    }

    componentDidMount() {
        socket.on("joinData", data => {
            this.setState({
                data: data,
                hasJoined: true,
            })
        });
    }

    joinGame() {
        socket.emit("join", document.getElementById("outlined-basic").value);
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
                <TextField id="outlined-basic" label="name" variant="outlined"/>
                <button onClick={this.joinGame} disabled={this.state.hasJoined}>Join</button>
            </div>
        );
    }
  }
  
  export default UserList
  