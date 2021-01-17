import React, { Component } from 'react';
import List from '@material-ui/core/List';
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
        data: [SimonObj, SeanObj, null]
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
  