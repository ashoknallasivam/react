import React, { Component } from 'react';
import * as otplib from 'otplib';

const secret = 'KBJVUJDPMESESUSK';


class Otp extends React.Component {
	
  constructor(props) {
	 
    super(props);
    this.state = {
      token: otplib.authenticator.generate(secret)
    };

  }
  
  componentDidMount() {
	 
    this.intervalID = setInterval(
      () => this.fetchOtp(),
      10000
    );
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }  
  
 fetchOtp() {

    this.setState({
      token: otplib.authenticator.generate(secret)
    });
  } 
 
  render() {
    return (
      <p className="App-clock">{this.state.token}</p>
    );
  }

}

export default Otp;