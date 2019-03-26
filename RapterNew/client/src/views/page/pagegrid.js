import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/page.actions';
import { Row, Col, Card, Tab,Tabs,Input } from 'react-materialize';
import {AgGridReact} from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
//import "ag-grid-enterprise";
import LoadingSpinner from './loadingSpinner';

class PageGrid extends Component {
	
     constructor(props) {
        super(props);
        
        // reset login status
        this.state = {
			tenantId: '1',
            ttoId: '1',
            ltoId: '2',
			id: ''
        };
        
     this.RowSelected = this.RowSelected.bind(this);
	 this.handleChange = this.handleChange.bind(this);
	 
    }

     handleChange(e) {
        const { name, value } = e.target;
		//alert(value);
        this.setState({ [name]: value }, () => console.log(name, value));
		this.props.getPage(value);
		
    }	
	
	
	RowSelected(event){
		if(event.node.isSelected()){
		  const id  = event.node.id;
		   //alert(id)
		  this.props.getPage(id);
		} 
    
	}
	
  componentWillMount() {
	  	 	  
	  const params = {
            tenantId: this.state.tenantId,
            ttoId: this.state.ttoId,
			ltoId: this.state.ltoId
	  }
	 localStorage.removeItem('bounds');
	 this.props.createBounds({ params });
	
		 
  }

	 
	
	render() {
	   
	   
	   const columnDefs = [
				{headerName: "Title", field: "title", sortable:true, filter:true, width: 250 },
				{headerName: "Collection", field: "collection", sortable:true, filter:true, width: 150 }
				

             ];
			 
			 const rowData = [];
			 const rowIndex = [];
	   
	   	if(this.props.pageContent)
        {
					 
			 this.props.pageContent.map((item, index) => (
				 
					 rowData.push({
						id : item._id,
						title: item.title, 
						collection: item.collection
						
					})
					
					
			 ));
			
			
			 return ( 
				
				<div>
				   <Input s={12} name='pages' type='select' label='Pages' onChange={this.handleChange}>
							 {rowData.map(itemval => {
							   return   <option value={itemval.id}>{itemval.title}-{itemval.collection}</option>
							  
							   })}
     			   </Input>
               
				
				
				
				{/*<div style={{ height: '330px', width: '400px' }} className="ag-theme-balham"><AgGridReact
						columnDefs={columnDefs}
		rowData={rowData} rowSelection= 'single' getRowNodeId={(data) => data.id} onRowClicked={this.RowSelected} animateRows={true}>
				</AgGridReact></div>*/}
				</div>

			 );
				
		}	else {return <LoadingSpinner />;}
	
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

export default connect(mapStateToProps, actions)(PageGrid);
