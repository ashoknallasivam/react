import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, Tab,Tabs } from 'react-materialize';
import { Link, withRouter } from 'react-router-dom';
import PageGrid from './pagegrid';
import PageJson from './pagejson';
import PageJsonadd from './pagejsonadd';
import Modal from './modal';
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
	    	jEditor = <PageJson /> ;
	    	
		}
    if (this.props.editor == 'Add')
	    {
	    	jEditor = <PageJsonadd /> ;
	    	
		}			
	   
	return (
       <div style={{height: '600px'}}>
				 
			   <Row id="login-page">
			   <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={2} >
				 <button className="btn waves-light" type="button" name="createpage" onClick={this.CreatePage}>Create Page</button>{/*<Modal />*/}
			   </Col>
			   <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={6} >
				<PageGrid {...this.props}/>
			   </Col>
			   <Col className="z-depth-8 mr-0" s={12} >
				{jEditor}
			   </Col>
			  
			   </Row>
			   
			  </div>
	
		        
      
            
		
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
