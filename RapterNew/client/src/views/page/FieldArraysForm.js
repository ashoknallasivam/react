import React, { Component } from 'react';
import { Row, Col, Card, Tab,Tabs } from 'react-materialize';
import { Link, withRouter } from 'react-router-dom';
import SimpleForm from './SimpleForm';
import ElementType from './ElementType';
import Select from 'react-select';
import env from './controls.json';
import PageJsonadd from './pagejsonadd';
//const scaryAnimals = env;

const fields = [
      { name: 'name', label: 'Name', type: 'text', value: 'Ashok', placeholder: 'Enter Name1' },
      { name: 'age', label: 'Age', type: 'number', placeholder: 'Enter age' },
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
      },
    ]

	

	
	
class Pages extends Component {
	
     constructor(props) {
        super(props);
		this.state = {
			jsonEditor: '',
			controls: null,
        };
	  this.CreatePage = this.CreatePage.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
	  
    }	
	
	  componentDidMount() {
		//this.props.test();
	  }
	 
    handleChange(e) {
        const { name, value } = e.target;
        //this.setState({ [name]: value });
    }
	
    handleSubmit(e) {
 		e.preventDefault();
		this.setState({ submitted: true });
		//const { controls } = this.state;
		//alert(controls);
		
    } 
	
   CreatePage(event){
	 
	  this.props.viewEditor();
	}
	
	componentWillReceiveProps(nextProps) {
	  if (this.props.editor !== nextProps.editor) {
		this.setState({
		  jsonEditor: nextProps.editor
		});
	  }
	  
	}
	

   render(props) {
	   
	  	   const customStyles = { input: styles => {  return { ...styles, height: '1.7em'};  }}
	  	   const { schema, submitted, controls } = this.state;
		  
           let inputfield;

		if (controls == 'text') {
			
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
		} else if(controls == 'number')  {
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
			  <Row >
				   <Col className="input-field center">	   
				    <h4>Dynamic Pages</h4>
				   </Col>
				 </Row>
	      <form className="col-md-4" onSubmit={this.handleSubmit} >
	             <Row className="margin">
				  
               {/* <Col className="input-field p-0" s={2}>
			   
                <Select styles={customStyles} options={scaryAnimals} onChange={opt => this.setState({ controls: opt.value }) } required/>
               
			   </Col> */}
			   <Col className="input-field p-0" s={2}>
			   
                <button className="btn waves-light" type="submit" name="action" >Create Page</button>
               </Col>

             </Row> 
			 </form>
			 
			 
			 		 {submitted == true ? (
					 
				<div>
				
				
			   <Row id="login-page">
					<Col className="z-depth-4 " s={12} m={6} l={4} xl={4}>
						
						<ElementType fields={fields}/>
						{/*<NewForm/>*/}
						
					   
				   </Col>
				   <Col className="z-depth-4 " s={12} m={6} l={4} xl={6}>
						<PageJsonadd {...this.props}/>
				   </Col>
			   </Row>
			  </div>
           ) : (
          ''
          )}
		 
            <Col className="p-0" s={2}>
				 {/*<SimpleForm fields={fields} controls={controls} onSubmit={() =>{}}/>*/}
			  </Col>
			  </div>
		 );

		 
	}

}

export default Pages;
