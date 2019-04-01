import React from "react";
import ReactDOM from "react-dom";
import { Row, Col, Tab,Tabs,Input,Icon } from 'react-materialize';
import env from './text.json';

class Text extends React.Component {
  constructor(props) {

    super(props);
	
	
	this.state = {
       schema: env  
	
    };
   
    
  }



  render(){

  	return (<div>hello</div>);
  } 
}

export default Text;