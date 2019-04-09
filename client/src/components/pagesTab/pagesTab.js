import React, { Component, Fragment } from 'react';
import { Row, Input, Button, Modal, Col } from 'react-materialize';
import LoadingSpinner from './loadingSpinner';
import JSONInput from "react-json-editor-ajrm/index";
import locale from "react-json-editor-ajrm/locale/en";
import PagePreview from './pagePreview';
import DynamicControls from './dynamicControls';
import uuid from 'uuid';



class PagesTab extends Component {

	constructor(props) {
		super(props);

		this.state = {
			editor: '',
			applicationMode: '',
			selectedPage: '',
			pages: this.props.pages,
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

		nextProps.pages.map((item, index) => (

			this.state.pageId == item._id ?

				this.setState({
					selectedPage: index
				}) : ''


		));

		this.setState({
			pages: nextProps.pages,
			tenantId: nextProps.tenantId,
			selectedLocation: nextProps.selectedLocation,
			applicationMode: nextProps.applicationMode
		});
		//alert('WillReceiveProps called')
		//console.log(nextProps);
	}

	// Set state editor with value as 'Add'
	CreatePage(event) {

		const schema = {

		}

		this.setState({

			pageId: uuid.v4(),
			statusFlag: 'new',
			pageJson: schema,
			editor: 'Edit',
			selectedPage: ''



		});
	}

	// Function to get data from child component
	getData(dynamicJSON) {

		//console.log(dynamicJSON);

		let recipesCopy = JSON.parse(JSON.stringify(this.state.pageJson))
		recipesCopy.layout = dynamicJSON

		this.setState({ pageJson: recipesCopy })

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
		this.setState({ pageJson: JSON.parse(e.json) });

	}


	handleSubmit(e) {

		e.preventDefault();
		//alert('Submit');   
		if (this.state.pageJson) {

			//let newJson = {'_id': uuid.v4(),'statusFlag':'new','location':this.state.selectedLocation.id, ...this.state.pageJson};
			let newJson = { '_id': this.state.pageId, 'statusFlag': this.state.statusFlag, 'location': this.state.selectedLocation.id, ...this.state.pageJson };
			this.props.actions.SavePages(this.state.tenantId, newJson)
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

		if (viewOnly == false) {
			dynamicForm = <DynamicControls sendData={this.getData} pageJson={pageJson} pages={this.props.pages} selectedPage={this.state.selectedPage} />;
		}


		if (this.state.editor == 'Edit') {


			jEditor =
				<Row className='m-0'>
					<Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={6} >
						{dynamicForm}

					</Col>
					<Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={6} >
						<div style={{ maxWidth: "1400px", maxHeight: "100%" }}>
							<form className="col-md-4" onSubmit={this.handleSubmit} >
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


								{viewOnly == false ? (
									<Row >
										<Col s={4}>
											<button className="btn " type="submit" name="action">Submit</button>


											{/*<Modal header="Modal Header" trigger={trigger}>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
										{dynamicForm}
										 </Modal>*/}
										</Col>
										<Col s={4}>
											{/* <button className="btn " type="submit" name="action" onClick={this.showDynamicForm}>Add</button>*/}

										</Col>
									</Row>

								) : ('')

								}

							</form>
						</div>
					</Col>



				</Row>

		}

		const rowData = [];
		const rowIndex = [];

		if (this.state.pages) {

			this.state.pages.map((item, index) => (

				rowData.push({
					id: item._id,
					title: item.title,
					collection: item.collection,
					index: index

				})


			));

			const trigger = <Button>Open Modal</Button>;
			return (

				<Row className='m-0'>
					<Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={12} >&nbsp;</Col>
					<div >
						<div className='col s12 m12 l12 xl12 mb-2' >
							<Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={12} >
								<Row>
									<Col s={6} className='z-depth-8 mr-0'>
										<Input s={12} name='page_id' id='page_id' type='select' className="pl-0" label='Pages' onChange={this.handleChange} value={this.state.selectedPage} >
											<option value=''>Select Page</option>
											{rowData.map(itemval => {
												return <option value={itemval.index}>{itemval.title}-{itemval.id}</option>

											})}
										</Input>
									</Col>
									{viewOnly == false ? (
										<Col s={2} className='z-depth-8 mr-0'>

											<Button className='orgIcon col s12 m2 l2 xl2 mt-8' name="addOrg" onClick={this.CreatePage}>
												<i className="material-icons" title='Add Page'>
													add_circle</i>
											</Button>


										</Col>
									) : ('')
									}
								</Row>
							</Col>

							<Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={12} >
								{jEditor}
							</Col>

						</div>
					</div>
				</Row>

			);

		} else { return <Row><LoadingSpinner /></Row>; }



	}
}
export default PagesTab;