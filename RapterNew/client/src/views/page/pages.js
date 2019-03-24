import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Tab,Tabs } from 'react-materialize';
import { Link, withRouter } from 'react-router-dom';
import PageGrid from './pagegrid';
import PageJson from './pagejson';
import ElementType from './ElementType';
import * as actions from '../../actions';

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
    var jEditor = '';
    var dynamicForm = '';
   	if (this.props.editor == 'Edit')
	    {
	    	jEditor = 
	    	<Col className="z-depth-4 mr-0" s={12} m={6} l={4} xl={4} >
	    		<PageJson /> 
	    	</Col>;

	    	dynamicForm = 
	    	<Col className="z-depth-4 mr-0" s={12} m={6} l={4} xl={4} >
	    		<ElementType/>
	    	</Col>;
    	
	    }
	   
	return (	   
		<Row id="login-page">
		   <Col className="z-depth-4 mr-0" s={12} m={6} l={4} xl={4} >
			<PageGrid /> 
		   </Col>
		   {jEditor}{dynamicForm}
				
		</Row>
       )

       


	 






	}

}


function mapStateToProps(state) {
  return { bounds: state.page.bounds, 
  pageContent: state.page.pages, 
  pageJson: state.page.pagejson , 
  pageId: state.page.pageid, 
  pageStatus: state.page.pagestatus, 
  editor: state.page.editor };
}

export default connect(mapStateToProps, actions)(Pages);
