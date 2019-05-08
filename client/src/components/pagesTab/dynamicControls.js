import React from "react";
import ReactDOM from "react-dom";
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';
import PagesTab from './pageTitles';
import ActionControl from './controls/ActionControl';
import AddressControl from './controls/AddressControl';
import ArrayControl from './controls/ArrayControl';
import ButtonControl from './controls/ButtonControl';
import CheckboxControl from './controls/CheckboxControl';
import CheckgroupControl from './controls/CheckgroupControl';
import DateControl from './controls/DateControl';
import EmailControl from './controls/EmailControl';
import FieldsetControl from './controls/FieldsetControl';
import HeadingControl from './controls/HeadingControl';
import LayoutControl from './controls/LayoutControl';
import NumberControl from './controls/NumberControl';
import PanelControl from './controls/PanelControl';
import PasswordControl from './controls/PasswordControl';
import PhoneControl from './controls/PhoneControl';
import RadioControl from './controls/RadioControl';
import SelectControl from './controls/SelectControl';
import SliderControl from './controls/SliderControl';
import SsnControl from './controls/SsnControl';
import StatesControl from './controls/StatesControl';
import StaticControl from './controls/StaticControl';
import StaticpanelControl from './controls/StaticpanelControl';
import TextControl from './controls/TextControl';
import TextareaControl from './controls/TextareaControl';
import TextmaskControl from './controls/TextmaskControl';
import TimeControl from './controls/TimeControl';
import SlidertoogleControl from './controls/SlidertoogleControl';
import ZipControl from './controls/ZipControl';
import elementType from './controls/json/element-type.json';

class dynamicControls extends React.Component {

	constructor(props) {

		super(props);

		this.state = {
			id: 0,
			submitted: false,
			key: this.props.pageJson.key,
			collection: this.props.pageJson.collection,
			title: this.props.pageJson.title,
			subtitle: this.props.pageJson.subtitle,
			layout: [],
			pageJson: this.props.pageJson,
			type: '',
			selected: '',
			data: {},
			values: [],
			items: [],
			pages: this.props.pages,
			selectedPage: this.props.selectedPage,
			mode: this.props.mode,
			isModalOpen: false,
			isModalAttrOpen: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleControlSubmit = this.handleControlSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.handleOpenModal = this.handleOpenModal.bind(this);
		this.handleSchema = this.handleSchema.bind(this);
		this.handleTypeChange = this.handleTypeChange.bind(this);
		this.addClick = this.addClick.bind(this);


		this.removeClick = this.removeClick.bind(this);
	}


	componentDidMount() {

		this.setState({
			type: this.props.type,
			key: this.props.pageJson.key,
			collection: this.props.pageJson.collection,
			title: this.props.pageJson.title,
			subtitle: this.props.pageJson.subtitle,
			layout: this.props.pageJson.layout,
			pageJson: this.props.pageJson,
			pages: this.props.pages,
			selectedPage: this.props.selectedPage,
			mode: this.props.mode,
			applicationMode: this.props.applicationMode,
			values: this.props.pageJson.layout


		});


	}

	componentWillReceiveProps(nextProps) {

		this.setState({
			type: nextProps.type,
			key: nextProps.pageJson.key,
			collection: nextProps.pageJson.collection,
			title: nextProps.pageJson.title,
			subtitle: nextProps.pageJson.subtitle,
			layout: nextProps.pageJson.layout,
			pageJson: nextProps.pageJson,
			pages: nextProps.pages,
			selectedPage: nextProps.selectedPage,
			mode: nextProps.mode,
			applicationMode: nextProps.applicationMode,
			values: nextProps.pageJson.layout


		});

	}


	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
		value != '' ? this.setState({ type: value }) : ''
	}


	handleSchema(schema, idx) {
		//console.log(schema);

		const newControls = this.state.values.map((key, sidx) => {
			if (idx !== sidx) return key;

			return {
				...key,
				...schema
			};

		});

		this.setState({ values: newControls })

	}



	addClick(schema, index) {
		let valueIndex;
		this.state.values.map((data, idx) => {
			if (idx == index) {
				valueIndex = idx
			}
		});

		if (valueIndex > -1) {
			let values = this.state.values;
			values[valueIndex] = schema;
			this.setState({
				values
			})
		}
		else {
			this.setState(prevState => ({ values: [...prevState.values, schema] }))
		}


		this.setState({ isModalOpen: false })

	}



	removeClick(i) {
		let values = [...this.state.values];
		values.splice(i, 1);
		this.setState({ values });
	}

	removeControlsClick(i) {
		let layout = [...this.state.layout];
		layout.splice(i, 1);
		this.setState({ layout });
	}

	handleControlSubmit(e) {

		e.preventDefault();
		//if (this.state.type != '') {

		this.addClick();

		//}

	}

	handleCloseModal = () => {

		this.setState({
			idx: '',
			type: '',
			data: {},
			isModalOpen: false
		})
	};

	handleOpenModal = (e, i) => {
		let data = [];
		if (e.currentTarget.name == "ADD") {
			this.setState({ isModalOpen: true, mode: "ADD" })
		} else if (e.currentTarget.name == "EDIT") {
			data = this.state.values[i];
			console.log("Data",data);
			this.setState({ mode: "EDIT", idx: i, data, type: data.type, isModalOpen: true, })
		}

		// this.setState({ isModalOpen: true,
		//  })
	};


	handleAttrCloseModal = () => {
		let newState = this.state;
		delete newState[data];
		this.setState({
			data: {},
			idx: '',
			type: '',
			isModalAttrOpen: false
		})
	};

	handleAttrOpenModal = (data, idx) => {
		console.log("handlemodal:", data);
		this.setState({
			data: data,
			idx: idx

		});
		this.setState({ type: data.type }, () => {
			return this.addControl(data, idx); // Call back function as SetState is Asynch
		});
		this.setState({ isModalAttrOpen: true })
	};



	handleSubmit(e) {
		e.preventDefault();
		this.props.sendData(this.state.values, this.state.key, this.state.collection, this.state.title, this.state.subtitle);
	}


	renderExistingControl = (idx, data) => {
		const { type } = data;
		return this.controlType(idx, data, type);
	};

	renderNewControl = (idx, data) => {
		const { type } = this.state.values[idx];
		return this.controlType(idx, data, type);
	};

	handleTypeChange(e) {

		const { name, value } = e.target;
		this.setState({ [name]: value }, () => {
			return this.addControl(); // Call back function as SetState is Asynch
		})

	}

	addControl(data, idx) {

		const { type } = this.state;



		switch (type) {

			case 'action-toolbar':
				return (<ActionControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'address':
				return (<AddressControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'array':
				return (<ArrayControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'button':
				return (<ButtonControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'checkbox':
				return (<CheckboxControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'checkbox-group':
				return (<CheckgroupControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'date':
				return (<DateControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'email':
				return (<EmailControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'fieldset':
				return (<FieldsetControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'heading':
				return (<HeadingControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'layout-editor':
				return (<LayoutControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'number':
				return (<NumberControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'panel':
				return (<PanelControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'password':
				return (<PasswordControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'phone':
				return (<PhoneControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'radio':
				return (<RadioControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'select':
				return (<SelectControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'slider':
				return (<SliderControl index={idx} data={data} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'slide-toggle':
				return (<SlidertoogleControl index={idx} data={data} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'ssn':
				return (<SsnControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'states':
				return (<StatesControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'static':
				return (<StaticControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'static-panel':
				return (<StaticpanelControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'text':
				return (<TextControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'textarea':
				return (<TextareaControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'text-mask':
				return (<TextmaskControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'time':
				return (<TimeControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			case 'zip':
				return (<ZipControl index={idx} data={data} type={type} onChange={this.addClick} mode={this.state.editor} close={this.handleCloseModal} />);
			default:
				return <span className="pl-2">Select element type</span>;
		}

		//this.setState({ isModalOpen: false })
	}



	createUI() {
		var renderfields = '';
		var viewOnly = '';
		const { values } = this.state;
		viewOnly = this.state.applicationMode == 'EDIT' || this.state.applicationMode == 'CREATE' ? false : true;

		renderfields = values.map((el, i) => {
			return <li className="collection-item">
				<div key={i}>
					<Row>
						<Col s={3}>
							<h6 className="truncate labelText mb-1" >{el.name}</h6>
						</Col>
						<Col s={6}>
							<h6 className="truncate" style={{ textTransform: 'capitalize'}}><b>{el.type} configuration</b></h6>
						</Col>
						{viewOnly == false ? (
							<Col s={3} >
								<Button type='button' className='orgIcon col s12 m2 l2 xl2' name="deleteOrg" onClick={this.removeClick.bind(this, i)}>
									<i className="material-icons" title='Delete'>delete</i>
								</Button>
								<Button type='button' className='orgIcon col s12 m2 l2 xl2' name="EDIT" onClick={(e) => this.handleOpenModal(e, i)}>
									<i className="material-icons" title='Update'>edit</i>
								</Button>
							</Col>
						) : ('')
						}
					</Row>
				</div>
			</li>;
		});

		return <div>{renderfields}</div>

	}

	render() {

		const { key, collection, title, subtitle, values } = this.state;
		var viewOnly = '';
		viewOnly = this.state.applicationMode == 'EDIT' || this.state.applicationMode == 'CREATE' ? false : true;
		

		return (

			<div key={this.state.selectedPage} >
				<Row>
					<Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={12} >
						<form onSubmit={this.handleSubmit} >

							<Row>
								<label className="required-field"></label>
								<Input s={10} id="key" label="Key" name="key" type="text" value={key} validate onChange={this.handleChange} required
									onKeyPress={(evt) => ((evt.which > 31 && evt.which < 48) || (evt.which > 57 && evt.which < 65) || (evt.which > 90 && evt.which < 97)
										|| (evt.which > 122 && evt.which < 127) || evt.key === '-') && evt.preventDefault()} autoComplete="off"
									readOnly={this.state.applicationMode == "VIEW" ? true : false} />
							</Row>
							<Row>
								<label className="required-field"></label>
								<Input s={10} label="Collection" id="collection" name="collection" type="text" value={collection}
									validate onChange={this.handleChange} required readOnly={this.state.applicationMode == "VIEW" ? true : false} />
							</Row>
							<Row>
								<label className="required-field"></label>
								<Input s={10} label="Title" id="title" name="title" type="text" value={title} validate onChange={this.handleChange}
									required readOnly={this.state.applicationMode == "VIEW" ? true : false} />
							</Row>
							<Row>
								<label className="required-field"></label>
								<Input s={10} label="Sub Title" id="subtitle" name="subtitle" type="text" value={subtitle} validate
									onChange={this.handleChange} required readOnly={this.state.applicationMode == "VIEW" ? true : false} />
							</Row>
							<Row>
								<div><ul className="collection">  {this.createUI()}</ul></div>
							</Row>
							{viewOnly == false ? (
								<Row>
									<Button type="button" className='btn btn btn_primary otherButtonAddDetUpt iconButton' name="ADD" onClick={this.handleOpenModal}>
										<i className="material-icons" title='Add Control' >add_circle</i><span>Add Controls</span>
									</Button>
								</Row>
							) : ('')
							}
							{viewOnly == false ? (
								<Row>
									<Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={8} >
										<Button type="submit " className="btn_secondary otherButtonAddDetUpt mr-2" >Save</Button>
									</Col>
								</Row>
							) : ('')
							}
						</form>
					</Col>
				</Row>



				<Modal className="modal modal-fixed-footer dynamicModal" header={this.state.mode == "ADD" ? "Add an element " : "Update an element"} open={this.state.isModalOpen} modalOptions={{ dismissible: false }} close={this.handleCloseModal} >
					<button className="modal_close" onClick={this.handleCloseModal}><i class="material-icons " >close</i> </button>
					<Row>
						<form onSubmit={this.handleControlSubmit} >
							{this.state.mode == "ADD" &&
								<div className="modal-content">
									<label className="innerDynamicLabel">Element type</label>
									<select className="pl-1" defaultValue="" name='type' id='type' onChange={this.handleTypeChange} value={this.state.type} required s={4}>
										<option value="" >Choose your element</option>
										{elementType.map(itemval => {
											return <option value={itemval.value}>{itemval.label}</option>
										})}
									</select>

									{this.addControl(this.state.data)}

								</div>}
							{this.state.mode == "EDIT" &&
								<div className="row">
									<div className="modal-content dataControl pt-1">
										{this.addControl(this.state.data, this.state.idx)}
									</div>
								</div>
							}

						</form>
					</Row>
				</Modal>
			</div>
		);

	}
}

export default dynamicControls;