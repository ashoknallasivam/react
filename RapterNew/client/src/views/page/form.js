import React, { Component } from 'react';
import { Row, Col, Card, Tab,Tabs} from 'react-materialize';
import { Link, withRouter } from 'react-router-dom';
import SimpleForm from './SimpleForm';
import Modal from './modal';
import env from './controls.json';
import PageJsonadd from './pagejsonadd';
import Input from './input';
import Label from './label';
import Button from './button';
import Datalist from './datalist';
//import Checkbox from './checkbox';
//import Radio from './radio';
//import Select from './select';
import Textarea from './textarea';
import Test from './test';

const scaryAnimals = env;

const fields = [
      { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter Name' },
     /* { name: 'age', label: 'Age', type: 'number', placeholder: 'Enter age' },
      { name: 'email', label: 'Email', type: 'email', placeholder: 'Enter Email' },
      { name: 'employed', label: 'Employed', type: 'checkbox' },
      {
        name: 'favouriteColors',
		label: 'Color',
        type: 'select',
        options: [
          { label: 'Red', value: 'red' },
          { label: 'Yellow', value: 'yellow' },
          { label: 'Green', value: 'green' },
        ],
      },*/
    ]

class Pages extends Component {
	
     constructor(props) {
        super(props);
		this.state = {
			jsonEditor: '',
            controls: null,
        };
		
	  this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
	  
    }	
	
	  componentDidMount(){
        console.log();
        
    }
	  
    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
		
		
    }
	
	
    handleSubmit(e) {
        
       
		e.preventDefault();
		this.setState({ submitted: true });
		const { controls } = this.state;
		alert(controls);
		console.log(this.state);
        
    }  
	

   render(props) {
	    const { submitted, controls } = this.state;
		
          
		   return ( 
			 <div>
			    
			 	 
			 <Row >
				   <Col className="input-field p-0" s={4}>
					<Test/>
					</Col>
				 </Row> 
			 
			 
			 
			 
			 
		 {submitted == true ? (
			 
			<Row >
				 
				   <Col className="input-field p-0" s={4}>
                   

				   
				   </Col>
				    <Col className="z-depth-4 " s={12} m={6} l={4} xl={6}>
						<PageJsonadd {...this.props}/>
					</Col>
				   
				 </Row> 
			 
			 
         
           ) : (
          ''
          )}
			 

			  
			  </div>
		 );
	 
		 
	}

}

export default Pages;
