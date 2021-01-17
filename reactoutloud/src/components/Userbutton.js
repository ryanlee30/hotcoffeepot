import React, { Component } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon'
import GavelIcon from '@material-ui/icons/Gavel';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import ClearIcon from '@material-ui/icons/Clear';

class UserList extends Component {
    render() {        
        return (
            <div id="userButton">
                {
                    this.props.data != null ?
                    <ListItem button selected={this.props.selected} onClick={this.props.onClick} style={{backgroundColor: this.props.data.isJudge ? "#8472C0" : "#62A786"}}>
                        <ListItemIcon style={{color: "white"}}>
                            { this.props.data.isJudge ? <GavelIcon/> : <AccessibilityIcon/>}
                        </ListItemIcon>
                        <ListItemText primary={this.props.data.name} style={{color: "white"}}/>
                        <ListItemText primary={this.props.data.score} style={{color: "white", textAlign: "right"}}/>
                    </ListItem>

                    :

                    <ListItem button disabled style={{backgroundColor: "gray"}}>
                        <ListItemIcon style={{color: "white"}}><ClearIcon/></ListItemIcon>
                        <ListItemText primary={"-----"} style={{color:"white"}}/>
                        <ListItemText primary={"--"} style={{color: "white", textAlign: "right"}}/>
                    </ListItem>
                }
                
            </div>
        );
    }
  }
  
  export default UserList
  