import React, { Component, Fragment } from 'react';
import { Row, Input, Button, Modal, Col } from 'react-materialize';
import LoadingSpinner from './loadingSpinner';
import PageEdit from './pageEdit';
import PageAdd from './pageAdd';
import JSONInput from "react-json-editor-ajrm/index";
import locale from "react-json-editor-ajrm/locale/en";


class PagesTab extends Component {

  constructor(props) {
		super(props);

		this.state = {
			editor: ''
		};
		
	   this.CreatePage = this.CreatePage.bind(this);
	   this.handleChange = this.handleChange.bind(this);
	   this.getData = this.getData.bind(this);
    }

    componentDidMount() {
      this.setState({
			bounds: this.props.bounds,
			pages: this.props.pages,
			tenantId:this.props.tenantId,
			selectedLocation:this.props.selectedLocation
	  });
    }
   
    componentWillReceiveProps(nextProps) {
	  this.setState({
			bounds: nextProps.bounds,
			pages: nextProps.pages,
			tenantId:nextProps.tenantId,
			selectedLocation:nextProps.selectedLocation
	  });
	}
	
	// Set state editor with value as 'Add'
    CreatePage(event){
	  this.setState({editor: 'Add' });
	}
	
	// Function to get data from child component
	getData(pageJSON){
       //console.log(pageJSON);
	  //Send the data to store via action 
	  this.props.actions.SavePages(this.state.tenantId,pageJSON)
      
    }
	
	handleChange(e) {
		const { name, value } = e.target;
		
		this.setState({ 
          pageId: this.props.pages[value]['_id']
        });

		//Removing _id from the JSON Schema
		delete this.props.pages[value]['_id'];
		
		this.setState({ 
          editor: 'Edit',
		  [name]: value,
		  pageJSON: this.props.pages[value]
        });
		
    }	
	
	 
	
    render(){
		
		var jEditor = '';
		const { pageId,pageJSON,tenantId,selectedLocation } = this.state;
    
		if (this.state.editor == 'Edit')
		{
			jEditor = <PageEdit pageId={pageId} pageJson={pageJSON} tenantId={tenantId} sendData={this.getData} selectedLocation={selectedLocation}/> ;
		}
		if (this.state.editor == 'Add')
		{
			jEditor = <PageAdd tenantId={tenantId} sendData={this.getData} selectedLocation={selectedLocation}/> ;
		}
			 
		const rowData = [];
		const rowIndex = [];
	   
	   	if(this.state.pages)
        {
					 
			 this.state.pages.map((item, index) => (
				 
					 rowData.push({
						id : item._id,
						title: item.title, 
						collection: item.collection,
						index: index
						
					})
					
					
			 ));
			
			
			 return ( 
	
				<Row className='m-0'>
				    <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={12} >&nbsp;</Col>
					<div >
					<div className='col s12 m12 l12 xl12 mb-2' >
					 <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={12} >
					 <Row>
					  <Col s={6} className='z-depth-8 mr-0'>
						<Input s={12} name='page_id' id='page_id' type='select' className="pl-0" label='Pages' onChange={this.handleChange}>
							  <option value=''>Select Page</option>
							 {rowData.map(itemval => {
							   return   <option value={itemval.index}>{itemval.title}-{itemval.collection}</option>
							  
							   })}
						 </Input> 
		    		  </Col>
					  <Col s={2} className='z-depth-8 mr-0'><a class="btn-floating btn-small grey" onClick={this.CreatePage}><i class="material-icons">add</i></a></Col>
					 </Row>
					</Col>
				  
				   <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={12} >
						{jEditor}
				   </Col>
				  
				   </div>
				   </div>
				   </Row>
              
			 );
				
		}	else {return <Row><LoadingSpinner /></Row>;}
		
		
       
    }
}
export default PagesTab;