import React, { Component, Fragment } from 'react';
import { Row, Input, Button, Modal, Col } from 'react-materialize';
import LoadingSpinner from './loadingSpinner';
import PageEdit from './pageEdit';
import PageAdd from './pageAdd';

class PagesTab extends Component {
	
	
	constructor(props) {
        super(props);
		this.state = {
			//jsonEditor: ''
            page_id: '',
			editor: ''
        };
	   this.CreatePage = this.CreatePage.bind(this);
	   this.handleChange = this.handleChange.bind(this);
	  
	  
	  
    }

   componentDidMount() {
      console.log(this.props.bounds);
	  console.log(this.props.pages);
	  
   }
   
   componentWillReceiveProps(nextProps) {
	  
	  console.log(this.props.bounds);
	  console.log(this.props.pages);

	  
	}
	
    CreatePage(event){
	 
	  
	  this.setState({ 
          editor: 'Add'
      });
	}
	
	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ 
          editor: 'Edit',
		  [name]: value
		  
        });
		alert(value);
		console.log(this.props.pages[0]);
    }	
	
	 
	
    render(){
		
		var jEditor = '';
		const { page_id } = this.state;
    
		if (this.state.editor == 'Edit')
		{
			
			
			jEditor = <PageEdit page_id={page_id}/> ;
		}
		if (this.state.editor == 'Add')
		{
			jEditor = <PageAdd /> ;
		}
			 
		const rowData = [];
		const rowIndex = [];
	   
	   	if(this.props.pages)
        {
					 
			 this.props.pages.map((item, index) => (
				 
					 rowData.push({
						id : item._id,
						title: item.title, 
						collection: item.collection
						
					})
					
					
			 ));
			
			
			 return ( 
			 
			 <Fragment>
			
          
					<div style={{maxHeight: "100%",height: '600px'}}>
					
					
					
					<Row> <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={6} >&nbsp; </Col> </Row>

					<Row >
					 <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={12} >
					 <Row>
					  <Col s={9} className='z-depth-8 mr-0'>

						<Input s={6} name='page_id' id='page_id' type='select' label='Pages' onChange={this.handleChange}>
									 {rowData.map(itemval => {
									   return   <option value={itemval.id}>{itemval.title}-{itemval.collection}</option>
									  
									   })}
						 </Input>


					  </Col>
					 
					  <Col s={3} className='z-depth-8 mr-0'><button className="btn waves-light" type="button" name="createpage" onClick={this.CreatePage}>Create Page</button></Col>
					 </Row>
					</Col>
				  
				   <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={6} >
					
					{jEditor}
				   </Col>
				   <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={2} >
					 {/*<Modal />*/}
				   </Col>
				   <Col className="z-depth-8 mr-0" s={12} >
					
				   </Col>
				  
				   </Row>
				   </div>
				
               </Fragment>
               
			 );
				
		}	else {return <Row><LoadingSpinner /></Row>;}
		
		
       
    }
}
export default PagesTab;