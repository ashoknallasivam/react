import React, { Component, Fragment } from 'react';
import { Row, Input, Button, Modal, Col } from 'react-materialize';
import LoadingSpinner from './loadingSpinner';
import inputJson from './text.json';
import Collapsible from 'react-collapsible';

class IntputText extends Component {

  constructor(props) {
		super(props);

		this.state = {
			inputJson: inputJson,
			selected:this.props.selected
		};
		
	  this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);  
    }

    componentDidMount() {
      this.setState({
			inputJson: inputJson,
			selected:this.props.selected
			
	  });
	  //console.log(inputJson);
    }
   
    componentWillReceiveProps(nextProps) {
	   this.setState({
			inputJson: inputJson,
			selected:nextProps.selected
			
	  });
	  //console.log(inputJson);
	}
	
	
	
	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value }, () => console.log(name, value));
		
		
    }


	handleSubmit(e) {
	   
		e.preventDefault();
		
		//console.log('Send this in a POST request:', formPayload);
		//this.props.sendInput(this.state);  
		//console.log(this.props.pageJson);
		console.log(this.state);
		
		if (this.state) {
			
			this.props.sendInput(this.state);
			
		}
			
			
		
		
	 }	
	 

	
	
  render() {
 
  
  return (
   <div style={{ maxWidth: "1400px", maxHeight: "100%" }}>
  
     <form onSubmit={this.handleSubmit} >
     <Row>
	 {this.renderForm()}
    
    
        
    </Row>
	<Row>
	 <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={8} >
         
      <input type="submit" className="btn" value="Submit" />
	  </Col>
    </Row> 
     
    </form>
		
		</div>
		);
	 
	 
	

	
	

  }	 
	

}
export default IntputText;