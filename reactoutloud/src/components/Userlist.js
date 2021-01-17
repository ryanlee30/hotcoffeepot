import React, { Component } from 'react';
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
<<<<<<< HEAD
        data: []
=======
        data: [SimonObj, SeanObj, null]
>>>>>>> f3cf5b2d1700004e1fc3e35e7f007f54be9c96b7
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
  