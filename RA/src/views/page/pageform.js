import React, { Component } from 'react';
import { Row, Col, Card, Tab,Tabs } from 'react-materialize';
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';

class PageJson extends Component {
	
     constructor(props) {
        super(props);
        
        // reset login status
        this.state = {
			tenantId: '1',
            
        };
        
     
	  
    }	
	
	
	
	
  componentDidMount() {
	  	 	  
	
	
		 
  }
  
  componentWillReceiveProps(newProps){
	  
		 if (newProps.pageJson) {
		
			//alert(JSON.stringify(newProps.pageJson));
		 }
		
	}  
	
	
	   render() {
	   
	   	if(this.props.pageJson )
        {
			//alert(JSON.stringify(this.props.pageJson));
			 return ( 
			
				<div >
				<JSONPretty id="json-pretty" data={this.props.pageJson}></JSONPretty>
				</div>

			 );
				
		}	else {return '';}
	
   }

}


export default PageJson;
