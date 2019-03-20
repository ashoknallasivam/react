import React, { Component } from 'react';
import { Row, Col, Card, Tab,Tabs} from 'react-materialize';
import { Link, withRouter } from 'react-router-dom';
import SimpleForm from './SimpleForm';
import Modal from './modal';
import Select from 'react-select';
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
	    const customStyles = { input: styles => {  return { ...styles, height: '1.7em'};  }}
	  	const { submitted, controls } = this.state;
		let inputfield;

		if (controls == 1) {
		  inputfield = <div class="row">
					   <Input
						 hasLabel='true'
						 htmlFor='textInput'
						 label='Text input'
						 required='true'
						 type='text'
						/>
						</div>;
		} else if(controls == 2)  {
		  inputfield = <div class="row">
					   <Textarea
						 hasLabel='true'
					 htmlFor='textarea'
						 label='Textarea'
						 required='true'
						/>
					    </div>;
		} else if(controls == 3)  {
		  inputfield = <div class="row">
					   <Input
						 hasLabel='true'
						 htmlFor='numberInput'
						 label='Number input'
						 required='true'
						 type='number'
						 min='0.5'
						 max='100'
						 step='0.5'
						/>
					    </div>;
		} else if(controls == 4)  {
		  inputfield = <div class="row">
					   <Input
						 hasLabel='true'
						 htmlFor='emailInput'
						 label='Email input'
						 required='true'
						 type='email'
						/>
					    </div>;
		} else if(controls == 5)  {
		  inputfield = <div class="row">
					   <Input
						 hasLabel='true'
						 htmlFor='emailInput'
						 label='Email input'
						 required='true'
						 type='email'
						/>
					    </div>;
		}
			
			
			
			
			
			
          
		   return ( 
			 <div>
			    
			 
			 <form className="col-md-4" onSubmit={this.handleSubmit} >
	             <Row className="margin">
				  
                <Col className="input-field p-0" s={2}>
			   
                <Select styles={customStyles} options={scaryAnimals} onChange={opt => this.setState({ controls: opt.value }) } required/>
               
               </Col>
			   <Col className="input-field p-0" s={2}>
			   
                <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.CreatePage}>Add</button>
               </Col>

             </Row> 
			 </form>
			 
			 <Row >
				   <Col className="input-field p-0" s={4}>
					<Test/>
					</Col>
				 </Row> 
			 
			 
			 
			 
			 
		 {submitted == true ? (
			 
			<Row >
				 
				   <Col className="input-field p-0" s={4}>
                   
                  
                  <form method='' action=''>
				  
				
				     {inputfield}
					
						
				
					   </form>
					   {<SimpleForm fields={fields} onSubmit={() =>{}}/>}
				   
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
