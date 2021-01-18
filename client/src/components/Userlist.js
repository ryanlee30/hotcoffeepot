import React, { Component } from 'react';
import List from '@material-ui/core/List';
import Userbutton from './Userbutton'

const emptyData = [null, null]

class UserList extends Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedIndex: -1,
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
                {
                    this.props.data ? 
                    Object.keys(this.props.data).map(key => {
                        return (
                            <Userbutton data={this.props.data[key]} id={key} key={key} onClick={() => handleListItemClick(key)} selected={this.state.selectedIndex === key}/>
                        );
                    })
                    :
                    Object.keys(emptyData).map(key => {
                        return (
                            <Userbutton data={emptyData[key]} id={key} key={key} onClick={() => handleListItemClick(key)} selected={this.state.selectedIndex === key}/>
                        );
                    })
                }
                </List>
            </div>
        );
    }
  }
  
  export default UserList
  