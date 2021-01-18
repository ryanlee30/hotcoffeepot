import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'
import '../styles.scss';

class Timer extends Component {
  render() {
    return(
        <div style={{display: 'grid', width: '100px', height: '100px', justifyItems: 'center'}}>
            <h1 style={{gridColumn: 1, gridRow: 1, textAlign: 'center', paddingTop: '5px'}}>{this.props.remainingTime}</h1>
            <CircularProgress variant="determinate" value={-100 * this.props.remainingTime/this.props.totalTime} style={{gridColumn: 1, gridRow: 1, width: '100px', height: '100px', color: '#00A6ED'}}/>
        </div>
    );
  }
}

export default Timer;