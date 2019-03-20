import React, { Component } from 'react';
import { Row, Col, Card, Tab,Tabs } from 'react-materialize';
import { Link, withRouter } from 'react-router-dom';
import SimpleForm from './SimpleForm';
import Modal from './modal';

const fields = [
      { name: 'name', label: 'Name', type: 'text', placeholder: 'Enter Name1' },
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
			jsonEditor: ''
            
        };
	  this.CreatePage = this.CreatePage.bind(this);
	  
    }	
	
	  componentDidMount() {
		//this.props.test();
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
	   
	  	   

		   return ( 
			 <div>
	
				 <Row >
				   <Col className="input-field center">	   
				   
				   <SimpleForm fields={fields} onSubmit={() =>{}}/>
				   </Col>
				 </Row>
			  
			  </div>
		 );

		 
	}

}

export default Pages;
