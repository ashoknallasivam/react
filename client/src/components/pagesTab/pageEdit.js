import React, { Component } from 'react';
import { Row, Col, Card, Tab,Tabs,Modal } from 'react-materialize';
import JSONInput from "react-json-editor-ajrm/index";
import locale from "react-json-editor-ajrm/locale/en";
import LoadingSpinner from './loadingSpinner';
import PagePreview from './pagePreview';
import PageFields from './pageFields';

class PageEdit extends Component {
	
     constructor(props) {
        super(props);
        
        this.state = {
			pageId: this.props.pageId,
			pageJson: this.props.pageJson
        };
		
		 this.jsonValue = this.jsonValue.bind(this);   
		 this.handleSubmit = this.handleSubmit.bind(this);
		 this.showForm = this.showForm.bind(this);
		 this.showModal = this.showModal.bind(this);
		 this.id = 'yo'
	  
    }
	
	//Function to Open Modal
	showModal (event) {
      $(`#${this.id}`).modal('open');
    }
	
	jsonValue(e, data) {
		// console.log("Json: " + e.plainText);
		//alert(JSON.stringify(e.json));
        this.setState({ pageJson: JSON.parse(e.json) });
		
     }	
	
	showForm(event) {
		//console.log(event);
		this.setState({pageId: this.props.pageId});
    	this.setState({addForm: 'Add' });
    }
	
		
	handleSubmit(e) {
		
        e.preventDefault();
               
        if (this.state.pageJson) {
			//this.state.pageJson._id = this.state.pageId
            let newJson = {'_id': this.state.pageId,'statusFlag':'modified','location':this.state.selectedLocation.id, ...this.state.pageJson};
			this.props.sendData(newJson);  
			
        }
		
    }	
	
	
	
  componentDidMount() {
		//alert(this.props.pageId)
		
		this.setState({
		    pageId: this.props.pageId,
			pageJson: this.props.pageJson,
			selectedLocation:this.props.selectedLocation
			
		});
			
	}
	
  componentWillReceiveProps(nextProps) {
    this.setState({
	  pageId: nextProps.pageId,
	  pageJson: nextProps.pageJson,
	  selectedLocation:nextProps.selectedLocation
    });
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
		var addFormfield = '';
		
		if (this.state.addForm == 'Add')
		{
			addFormfield = <PageFields sendData={this.getData}/> ;
		}
		
   	    if (this.state.pageJson != '')
	    {
	    	dynamicForm =  <PagePreview pageJson={this.state.pageJson}/> ;
		}  
        
	   	if(this.state.pageJson)
        {
			return ( 
             <Row className='m-0'>
			   <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={6} >
				 <Modal id={this.id} modalOptions={ { dismissible: true, inDuration: 30 } }> {dynamicForm} </Modal>
				  <div style={{ maxWidth: "1400px", maxHeight: "100%" }}>
					<form className="col-md-4" onSubmit={this.handleSubmit} >
						<Row className="margin">
						  <Col className="input-field p-0" s={12}>
						   <h6> JSON Schema </h6>
							<JSONInput
							  placeholder={this.state.pageJson} // data to display
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
						 <button className="btn " type="submit" name="action">Submit</button> {this.renderAlert()}
						 {/*<button className="btn " type="button" name="action" onClick={this.showModal}>Preview</button>*/} 
						 <button className="btn " type="button" name="action" onClick={this.showForm}>Add Fields</button> 	  
						</Row>
					 </form>	
				</div>
			   </Col>
			   <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={6} > {addFormfield} </Col>
			  </Row>
			);
		} else {return <LoadingSpinner />;}
	   }
}

export default PageEdit;

