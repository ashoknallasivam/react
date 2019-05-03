import React, { Component, Fragment } from 'react';
import { Row, Input, Tab, Tabs, Button, Modal, Col } from 'react-materialize';
import LoadingSpinner from './loadingSpinner';
import JSONInput from "react-json-editor-ajrm/index";
import locale from "react-json-editor-ajrm/locale/en";
import PagePreview from './pagePreview';
import DynamicControls from './dynamicControls';
import uuid from 'uuid';
import './pages.scss';


class PagesTab extends Component {

	constructor(props) {
		super(props);

		this.state = {
			editor: '',
			applicationMode: '',
			selectedPage: '',
			pages: '',
			selectedLocation:'',
            
		};

		this.CreatePage = this.CreatePage.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.getData = this.getData.bind(this);
		this.showDynamicForm = this.showDynamicForm.bind(this);
		this.jsonValue = this.jsonValue.bind(this);
		//alert('Constructor called')
		//console.log(this.props.pages);
	}

	componentDidMount() {
		this.setState({
			pages: this.props.pages,
			tenantId: this.props.tenantId,
			selectedLocation: this.props.selectedLocation,
			applicationMode: this.props.applicationMode
		});
		//alert('did mount called')
		//console.log(this.props.pages);
	}

	componentWillReceiveProps(nextProps) {

		if(nextProps.pages != undefined )
		{
					
			this.setState({ pages: nextProps.pages }, () => {
				this.updatePageIndex(); // Call back function as SetState is Asynch
			});
			
			this.setState({
					tenantId: nextProps.tenantId,
					selectedLocation: nextProps.selectedLocation,
					applicationMode: nextProps.applicationMode
			});
	   }
		
	}
	
	
	updatePageIndex() {
		
		this.state.pages.map((item, index) => {
			
            		this.state.pageId == item._id ?

					this.setState({
						selectedPage: index
					}) : ''
					
		});
	}
	
	

	// Set state editor with value as 'Add'
	CreatePage(event) {

		const schema = {
			  key: '',
			  collection: '',
			  title: '',
			  subtitle: '',
			  layout: [
				
			  ]
			};

		this.setState({

			pageId: uuid.v4(),
			statusFlag: 'new',
			pageJson: schema,
			editor: 'Add',
			selectedPage: ''



		});
	}

	// Function to get data from child component
	getData(dynamicJSON,key,collection,title,subtitle) {

		//console.log(dynamicJSON);

		let recipesCopy = JSON.parse(JSON.stringify(this.state.pageJson));
		recipesCopy.layout = dynamicJSON;
		recipesCopy.key = key;
		recipesCopy.collection = collection;
		recipesCopy.title = title;
		recipesCopy.subtitle = subtitle;

        this.setState({ pageJson: recipesCopy  }, () => {
			this.handleSave(); // Call back function as SetState is Asynch
		})


        		
		//console.log(this.state.pageJson);


	}

	handleChange(e) {
		const { name, value } = e.target;

		const rowData = [];
		const rowIndex = [];
		this.state.pages.map((item, index) => (

			value == index ?

				rowData.push({
					key: item.key,
					collection: item.collection,
					title: item.title,
					subtitle: item.subtitle,
					layout: item.layout,

				}) : ''


		));

		var newStatus;
		newStatus = this.state.pages[value]['statusFlag'] == undefined ? "modified" : this.state.pages[value]['statusFlag'];
		this.setState({
			pageId: this.state.pages[value]['_id'],
			statusFlag: newStatus,
			selectedLocation: this.state.selectedLocation,
			pageJson: rowData[0],
			editor: 'Edit',
			selectedPage: value
		});


	}

	jsonValue(e, data) {
		// console.log("Json: " + e.plainText);
		//alert(JSON.stringify(e.json));
		
		this.setState({ pageJson: JSON.parse(e.json) }, () => {
			this.handleSave(); // Call back function as SetState is Asynch
		})
	}
	
	
	handleSave() {
      //alert('SAVE');
       if (this.state.pageJson) {

			//let newJson = {'_id': uuid.v4(),'statusFlag':'new','location':this.state.selectedLocation.id, ...this.state.pageJson};
			let newJson = { '_id': this.state.pageId, 'statusFlag': this.state.statusFlag, 'location': this.state.selectedLocation.id, ...this.state.pageJson };
			this.props.actions.SavePages(this.state.tenantId, newJson);
			this.props.SavePages(newJson)
			//console.log(newJson);		
		}
        this.setState({
			pageJson: this.state.pageJson,
			
    	});
				
		

	}


	handleSubmit(e) {

		e.preventDefault();
		  
		if (this.state.pageJson) {

			//let newJson = {'_id': uuid.v4(),'statusFlag':'new','location':this.state.selectedLocation.id, ...this.state.pageJson};
			let newJson = { '_id': this.state.pageId, 'statusFlag': this.state.statusFlag, 'location': this.state.selectedLocation.id, ...this.state.pageJson };
			this.props.actions.SavePages(this.state.tenantId, newJson);
			this.props.SavePages(newJson)
			//console.log(newJson);		
		}

	}

	showDynamicForm(event) {
		//console.log(event);
		//alert('dynamic Form');
		this.setState({ addForm: 'Edit' });
	}

	render() {


		var jEditor = '';
		var viewOnly = '';
		const { pageJson } = this.state;


		viewOnly = this.state.applicationMode == 'EDIT' || this.state.applicationMode == 'CREATE' ? false : true;

		var dynamicForm = '';
		var previewPage = '';

    			
		if (this.state.editor == 'Edit' || this.state.editor == 'Add' ) {
			dynamicForm = <DynamicControls 
								sendData={this.getData} 
								pageJson={pageJson} 
								pages={this.props.pages} 
								selectedPage={this.state.selectedPage} 
								mode={this.state.editor} applicationMode={this.state.applicationMode} />;
								
			previewPage = <PagePreview 
								sendData={this.getData} 
								pageJson={pageJson} 
								pages={this.props.pages} 
								selectedPage={this.state.selectedPage} 
								mode={this.state.editor} />;
			
            jEditor = <Tabs className='tab-demo z-depth-1'>
					   <Tab title={<i className="orgIcon material-icons" title='JSON Schema' >code</i>} active>
						   <div style={{ maxWidth: "1400px", maxHeight: "100%" }}>
									<Row className="margin">
										<Col className="input-field p-0" s={12}>
											<JSONInput
												placeholder={pageJson} // data to display
												theme="light_mitsuketa_tribute"
												id='json_content'
												locale={locale}
												onChange={this.jsonValue}
												height="340px"
												width="500px"
												onKeyPressUpdate={false}
												viewOnly={viewOnly}
											/>
										</Col>
									</Row>
							</div></Tab>
							<Tab  disabled={true} title={<i className="orgIcon material-icons" title='Preview' >launch</i>} >{previewPage}</Tab>
				   </Tabs>			
		}

		const rowData = [];
		const rowIndex = [];
		var dropDown = '';
		if (this.props.pages) {

			this.props.pages.map((item, index) => (

				rowData.push({
					id: item._id,
					title: item.title,
					collection: item.collection,
					key: item.key,
					index: index

				})


			));
            if (this.props.pages.length > 0 ) {
				dropDown= <div>
							<select defaultValue='' s={12} id='page_id' type='select' onChange={this.handleChange} >
											  <option value='' >Select Page</option>
											  {rowData.map(itemval => {
												  var selected='';
												  if(itemval.index === this.state.selectedPage )
												  {
													  selected = 'selected';
													  
												  }
												  
												return <option value={itemval.index} selected={selected}>{itemval.key}</option>

											  })}
								</select>
								</div>
			} else {
				dropDown = <div><p>No pages to display. Create a new page</p></div>
			}
		
			return (
               <div className="switch mb-3 mt-3">
				<Row>
					<Col s={6}>
						<div className='col s12 m12 l12 xl12 mb-2' >
							<Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={12} >
								<Row>
									<Col s={8} className='z-depth-8 mr-0'>
										{dropDown}
									</Col>
									
									{viewOnly == false ? (
										<Col s={4} className='z-depth-8 mr-0'>

											<Button className='btn btn btn_primary otherButtonAddDetUpt iconButton mt-8' name="addOrg" onClick={this.CreatePage}>
												<i className="material-icons" title='Add Page'>
													add_circle</i><span>Add Pages</span>
											</Button>
										</Col>
									) : ('')
									}
								</Row>
							</Col>
							<Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={12} >
								{dynamicForm}
							</Col>
						</div>
					</Col>
					<Col s={6} >
						{jEditor}
					</Col>
				 </Row>
                </div>
			
			 
				

			);

		} else { return <p className="pl-2"><Row className='m-0'>{/*<LoadingSpinner />*/}No data to display</Row></p>; }



	}
}
export default PagesTab;