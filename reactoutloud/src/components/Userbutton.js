import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import YouTube from 'react-youtube';
import Timer from './Timer'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import GavelIcon from '@material-ui/icons/Gavel';
import AccessibilityIcon from '@material-ui/icons/Accessibility';

class UserList extends Component {
    bgColor = this.props.data.isJudge ? "red" : "blue"
    render() {        
        return (
            <div id="userButton">
                <ListItem button selected={this.props.selected} onClick={this.props.onClick} style={{backgroundColor: this.props.data.isJudge ? "#8472C0" : "#62A786"}}>
                    <ListItemIcon style={{color: "white"}}>
                        { this.props.data.isJudge ? <GavelIcon/> : <AccessibilityIcon/>}
                    </ListItemIcon>
                    <ListItemText primary={this.props.data.name} style={{color: "white"}}/>
                    <ListItemText primary={this.props.data.score} style={{color: "white", textAlign: "right"}}/>
                </ListItem>
            </div>
        );
    }
  }
  
  export default UserList
  