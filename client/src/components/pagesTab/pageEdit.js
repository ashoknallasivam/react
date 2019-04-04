import React, { Component } from 'react';
import { Row, Col, Card, Tab,Tabs,Modal,Button } from 'react-materialize';
import JSONInput from "react-json-editor-ajrm/index";
import locale from "react-json-editor-ajrm/locale/en";
import LoadingSpinner from './loadingSpinner';
import PagePreview from './pagePreview';
import PageFields from './pageFields';

class PageEdit extends Component {
	
     constructor(props) {
        super(props);
        
		var newStatus;
        newStatus = this.props.pageJson['statusFlag'] == undefined ? "modified" : this.props.pageJson['statusFlag'];
		
        this.state = {
     		pageId: this.props.pageJson['_id'],
			statusFlag : newStatus,
        };
		
		 this.jsonValue = this.jsonValue.bind(this);   
		 this.handleSubmit = this.handleSubmit.bind(this);
		 this.showForm = this.showForm.bind(this);
		
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
            let newJson = {'_id': this.state.pageId,'statusFlag':this.state.statusFlag,'location':this.state.selectedLocation.id, ...this.state.pageJson};
			this.props.sendData(newJson);  
			
        }
		
    }	
	
  
	
  componentDidMount() {
		//alert(this.props.pageId)
		
		
		var newStatus;
        newStatus = this.props.pageJson['statusFlag'] == undefined ? "modified" : this.props.pageJson['statusFlag'];
		
		this.setState({
			pageId: this.props.pageJson['_id'],
			statusFlag : newStatus,
			selectedLocation:this.props.selectedLocation
		});
		
		//Removing _id,statusFlag,location in the JSON Schema if any
		delete this.props.pageJson['_id'];
		delete this.props.pageJson['statusFlag'];
		delete this.props.pageJson['location'];
		
		this.setState({
			pageJson: this.props.pageJson,
			
		});
		
		console.log(this.state)	;
	}
	
  componentWillReceiveProps(nextProps) {
	  
	  var newStatus;
      newStatus = nextProps.pageJson['statusFlag'] == undefined ? "modified" : nextProps.pageJson['statusFlag'];
	  
		this.setState({
			pageJson: nextProps.pageJson,
			pageId: nextProps.pageJson['_id'],
			statusFlag : newStatus,
			selectedLocation:nextProps.selectedLocation
		});
		
		//Removing _id,statusFlag,location in the JSON Schema if any
		delete nextProps.pageJson['_id'];
		delete nextProps.pageJson['statusFlag'];
		delete nextProps.pageJson['location'];
		
		this.setState({
			pageJson: nextProps.pageJson,
			
		});
		
		console.log(this.state)	;
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
        const trigger = <Button>Preview</Button>;
	   	if(this.state.pageJson)
        {
			return ( 
             <Row className='m-0'>
			   <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={6} >
				 
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
							 {/*<Modal header="Modal Header" trigger={trigger}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit.
							{dynamicForm}
							 </Modal>*/}
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

