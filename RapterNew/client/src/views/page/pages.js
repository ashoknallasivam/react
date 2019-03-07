import React, { Component } from 'react';
import { Row, Col, Card, Tab,Tabs } from 'react-materialize';
import { Link, withRouter } from 'react-router-dom';
import PageGrid from './pagegrid';
import PageJson from './pagejson';
import PageJsonadd from './pagejsonadd';
import PageForm from './pageform';
import Modal from './modal';

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
	   
	  	   
	   if (this.state.jsonEditor == 'Add')
	   {
	   
	   
	   return ( 
			 <div>
				
				 <Row >
				   <Col className="input-field center">	   
				   </Col>
				 </Row>
			   <Row id="login-page">
			   <Col className="z-depth-4 mr-0" s={12} m={6} l={4} xl={6} >
				<PageGrid {...this.props}/>
			   </Col>
				<Col className="z-depth-4 " s={12} m={6} l={4} xl={6}>
				<PageJsonadd {...this.props}/>
			   </Col>
			   <Col className="z-depth-4 " s={12} m={6} l={4} xl={6}>
				
			   </Col>
			   </Row>
			  </div>
		 );
	   
	   
	   
       } else if(this.state.jsonEditor == 'Edit'){
		  

		return ( 
			 <div>
				 <Row >
				   <Col className="input-field center">
				   <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.CreatePage}>Create Page</button>

				   </Col>
				 </Row>
				 <Row >
				   <Col className="input-field center">	   
				   </Col>
				 </Row>
			   <Row id="login-page">
			   <Col className="z-depth-4 mr-0" s={12} m={6} l={4} xl={6} >
				<PageGrid {...this.props}/>
			   </Col>
				<Col className="z-depth-4 " s={12} m={6} l={4} xl={6}>
				<PageJson {...this.props}/>
			   </Col>
			  
			   </Row>
			  </div>
		 );



		  
	   } else {
		   return ( 
			 <div>
				 <Row >
				   <Col className="input-field center">
				   <button className="btn waves-effect waves-light" type="submit" name="action" onClick={this.CreatePage}>Create Page</button>
                   <Modal />
				   </Col>
				 </Row>
				 <Row >
				   <Col className="input-field center">	   
				   </Col>
				 </Row>
			   <Row id="login-page">
			   <Col className="z-depth-4 mr-0" s={12} m={6} l={4} xl={6} >
				<PageGrid {...this.props}/>
			   </Col>
			
			   </Row>
			  </div>
		 );
	   }
		 
	}

}

export default Pages;
