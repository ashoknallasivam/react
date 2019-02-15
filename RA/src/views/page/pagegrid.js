import React, { Component } from 'react';
import { Row, Col, Card, Tab,Tabs } from 'react-materialize';
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
			
				<div style={{ height: '330px', width: '450px' }} className="ag-theme-balham">
					<AgGridReact
						columnDefs={columnDefs}
		rowData={rowData} rowSelection= 'single' getRowNodeId={(data) => data.id} onRowClicked={this.RowSelected} animateRows={true}>
					</AgGridReact>
				</div>

			 );
				
		}	else {return <LoadingSpinner />;}
	
   }

}


export default PageGrid;
