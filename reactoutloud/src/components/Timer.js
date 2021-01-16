import React, { Component } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress'
import '../styles.scss';

class Timer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
        <div style={{display: 'grid', width: '100px', height: '100px'}}>
            <h1 style={{gridColumn: 1, gridRow: 1, textAlign: 'center', paddingTop: '5px'}}>{this.props.remainingTime}</h1>
            <CircularProgress variant="determinate" value={-100 * this.props.remainingTime/this.props.totalTime} style={{gridColumn: 1, gridRow: 1, width: '100%', height: '100%', color: '#00A6ED'}}/>
        </div>
    );
  }
}

export default Timer;