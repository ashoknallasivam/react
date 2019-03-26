import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/page.actions';
import { Row, Col, Card, Tab,Tabs,Modal } from 'react-materialize';
import JSONInput from "react-json-editor-ajrm/index";
import locale from "react-json-editor-ajrm/locale/en";
import LoadingSpinner from './loadingSpinner';
import DynamicForm from './dynamicform';

class PageJson extends Component {
	
     constructor(props) {
        super(props);
        
        // reset login status
        this.state = {
			tenantId: '1',
			json: '',
			jsonEditor: '',
            pageId:''
        };
		
     this.jsonValue = this.jsonValue.bind(this);   
     this.handleSubmit = this.handleSubmit.bind(this);
	 this.showModal = this.showModal.bind(this);
     this.id = 'yo'
	  
    }

    showModal (event) {
    //$(`#${this.id}`).modal('open');

    this.setState({
	     pageId: this.props.pageId
		});

    }



	
	jsonValue(e, data) {
		// console.log("Json: " + e.plainText);
		//alert(JSON.stringify(e.json));
		
        this.setState({ 
          json: e.json
        });
        
		//this.props.updateJson(JSON.parse(e.json));
	   
      }	
	
	
	handleSubmit(e) {
		
        e.preventDefault();
               
        if (this.state.json) {
			this.props.updatePage(this.state.json,this.props.pageId);
			
        }
		
    }	
	
	
	
  componentDidMount() {
	  	 	  
	
	
		 
  }
  

	
	componentWillReceiveProps(nextProps) {
	 
	}	
	

	renderAlert() {
		if (this.props.pageStatus) {
		  return (
			<div className="alert alert-danger">
			  <strong>{this.props.pageStatus}</strong> 
			</div>
		  );
		}
	  }	
	
	
	   render() {
		
	   	var dynamicForm = '';
   	    if (this.state.pageId != '')
	    {
	    	
			dynamicForm =  <DynamicForm pageId={this.state.pageId}/> ;
		}  
        
	   	if(this.props.pageContent)
        {
		
			return ( 
			    
				
				
            <Row id="login-page">
			   <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={6} >
				 
				 
        <Modal id={this.id} modalOptions={ { dismissible: true, inDuration: 30 } }><p>test</p></Modal>
      
				 <div style={{ maxWidth: "1400px", maxHeight: "100%" }}>
				
						<form className="col-md-4" onSubmit={this.handleSubmit} >
						<Row className="margin">
						  <Col className="input-field p-0" s={12}>
							<JSONInput
							  placeholder={this.props.pageJson} // data to display
							  theme="light_mitsuketa_tribute"
							  id = 'json_content'
							  locale={locale}
							  onChange={this.jsonValue}
							  colors={{
								string: "#990099" // overrides theme colors with whatever color value you want
							  }}
							  height="280px"
							  width="450px"
							  onKeyPressUpdate = {false}
							/>
							</Col>
							
						</Row>
						<Row className="center submit-container">
						 <button className="btn " type="submit" name="action">Update</button> {this.renderAlert()}
						 <button className="btn " type="button" name="action" onClick={this.showModal}>Preview</button> 
						</Row>
						
						
						</form>	
				
				</div>

				 
			   </Col>
			   <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={6} >
				   {dynamicForm}
			   </Col>
			   </Row>
			   
			 );
		} else {return <LoadingSpinner />;}

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

export default connect(mapStateToProps, actions)(PageJson);