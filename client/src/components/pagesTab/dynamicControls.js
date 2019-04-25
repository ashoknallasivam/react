import React from "react";
import ReactDOM from "react-dom";
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal,Collapsible,CollapsibleItem  } from 'react-materialize';
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
			id:0,
			submitted: false,
			key: this.props.pageJson.key,
			collection: this.props.pageJson.collection,
			title: this.props.pageJson.title,
			subtitle: this.props.pageJson.subtitle,
			layout: [],
			pageJson: this.props.pageJson,
			type: '',
			selected: '',
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
		
		//this.removeClick = this.removeClick.bind(this);
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
			mode: this.props.mode


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
			mode: nextProps.mode


		});
      
	}


	componentDidUpdate(prevProps) {
		if (prevProps.selectedPage !== this.props.selectedPage) {

			this.setState({ selectedPage: this.props.selectedPage, values: [], mode: this.props.mode });
		}

       

	}

	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value });
    	value != '' ? this.setState({ type: value }) : ''
 	}
	
	
	

    handleSchema(idx,schema){
		//console.log(schema);
		
		const newControls = this.state.values.map((key, sidx) => {
			if (idx !== sidx) return key;
            			
			return { ...key, 
			...schema
			};

		});
		
	   
		
	   this.setState({ values: newControls }, () => console.log(this.state.values));

		
	}	
	
	
		
	addClick() {
		
			var initialState =  {  
			type: this.state.type,
			name: this.state.name, 
			label: this.state.label, 
			options: { 
				hint: this.state.hint, 
				items: [{  }],
				validation: { requiredIf : { }  
						}
				} 
			}
		
		

		this.setState(prevState => ({ values: [...prevState.values, initialState ] }),() => {
			//this.createTest(); // Call back function as SetState is Asynch
		})

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
	  
      this.setState({ isModalOpen: false })
    }
	
	handleOpenModal = () => {
	
      this.setState({ isModalOpen: true })
    }


	handleAttrCloseModal = () => {
	  
      this.setState({ isModalAttrOpen: false })
    }
	
	handleAttrOpenModal = () => {
	
      this.setState({ isModalAttrOpen: true })
    }



	handleSubmit(e) {

		e.preventDefault();

		if (this.state.mode == 'Edit') {
			
		  	
          const combinedArrays = [...this.state.layout, ...this.state.values];
		  
		  this.props.sendData(combinedArrays,this.state.key,this.state.collection,this.state.title,this.state.subtitle);
		  this.setState({ values: [] });
		  
		} else {
			console.log(this.state.values);	
			const combinedArrays = [...this.state.values];
			this.props.sendData(combinedArrays,this.state.key,this.state.collection,this.state.title,this.state.subtitle);
		}
		
		

	}

    controlType = (idx,data,type) => {
		switch(type) {

			case 'action-toolbar':
			  return (<ActionControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'address':
			  return (<AddressControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'array':
			  return (<ArrayControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'button':
			  return (<ButtonControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 
			case 'checkbox':
			  return (<CheckboxControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'checkbox-group':
			  return (<CheckgroupControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'date':
			  return (<DateControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'email':
			  return (<EmailControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'fieldset':
			  return (<FieldsetControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'heading':
			  return (<HeadingControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'layout-editor':
			  return (<LayoutControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'number':
			  return (<NumberControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'panel':
			  return (<PanelControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'password':
			  return (<PasswordControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'phone':
			  return (<PhoneControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'radio':
			  return (<RadioControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'select':
			  return (<SelectControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'slider':
			  return (<SliderControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'slide-toggle':
			  return (<SlidertoogleControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'ssn':
			  return (<SsnControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'states':
			  return (<StatesControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'static':
			  return (<StaticControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'static-panel':
			  return (<StaticpanelControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'text':
			  return (<TextControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'textarea':
			  return (<TextareaControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'text-mask':
			  return (<TextmaskControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'time':
			  return (<TimeControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'zip':
			
			  //return (<div>{type}</div>);
			  return (<ZipControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			default:
			  return 'No Controls';
		}
	}

	renderExistingControl = (idx,data) => {
		const { type } = data;
		return this.controlType(idx,data,type);
	}
	
	renderNewControl = (idx,data) => {
		const { type } = this.state.values[idx];
	    return this.controlType(idx,data,type);
	}
	
	handleTypeChange(e) {
		
		const { name, value } = e.target;
		this.setState({ [name]: value }, () => {
			return this.addControl(); // Call back function as SetState is Asynch
		})

    }
	
	addControl() {
		
		const {type} = this.state;
		
		switch(type) {

			case 'action-toolbar':
			  return (<ActionControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'address':
			  return (<AddressControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'array':
			  return (<ArrayControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'button':
			  return (<ButtonControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 
			case 'checkbox':
			  return (<CheckboxControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'checkbox-group':
			  return (<CheckgroupControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'date':
			  return (<DateControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'email':
			  return (<EmailControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'fieldset':
			  return (<FieldsetControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'heading':
			  return (<HeadingControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'layout-editor':
			  return (<LayoutControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'number':
			  return (<NumberControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'panel':
			  return (<PanelControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'password':
			  return (<PasswordControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'phone':
			  return (<PhoneControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'radio':
			  return (<RadioControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'select':
			  return (<SelectControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'slider':
			  return (<SliderControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'slide-toggle':
			  return (<SlidertoogleControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'ssn':
			  return (<SsnControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'states':
			  return (<StatesControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'static':
			  return (<StaticControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'static-panel':
			  return (<StaticpanelControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'text':
			  return (<TextControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'textarea':
			  return (<TextareaControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'text-mask':
			  return (<TextmaskControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />); 			
			case 'time':
			  return (<TimeControl index={idx} data={data} mode={this.state.editor} onChange={this.handleSchema} />);
			case 'zip':
			  return (<ZipControl mode={this.state.editor} onChange={this.handleSchema}  close={this.handleCloseModal}/>);
			default:
			  return 'No Controls';
		}	

		//this.setState({ isModalOpen: false })

	}
	
	

	createUI() {
		var renderfields ='';
		const { values } = this.state;
		
		 renderfields = values.map((el, i) => {
										 
			return  <div key={i}>
					<Row>
						<Col s={12}>
							{ this.renderNewControl(i,el)}
						</Col>
						{/*<Col s={2} >
							<Button type='button' className='orgIcon col s12 m2 l2 xl2 mt-8' name="deleteOrg" onClick={this.removeClick.bind(this, i)}>
								<i className="material-icons" title='Delete'>delete</i>
						</Button> 
						</Col>
						<Col s={2} >
						<Button type='button' className='orgIcon col s12 m2 l2 xl2 mt-8' name="deleteOrg" onClick={this.handleAttrOpenModal}>
								<i className="material-icons" title='Update'>edit</i>
						</Button>
							</Col>*/}
					</Row>
					</div>;
		});
			
       return <div>{renderfields}</div>

	}

	render() {

    const { key, collection, title, subtitle, layout } = this.state;
	
	const existingControls =  layout.map((el, i) => 
        
			<div key={i}>
				<Row><Col s={11}>
					{this.renderExistingControl(i,el)}
					</Col>
					<Col s={1} >
					<Button type='button' className='orgIcon col s12 m2 l2 xl2 mt-8' name="deleteOrg" onClick={this.removeControlsClick.bind(this, i)}>
							<i className="material-icons" title='Delete'>delete</i>
						</Button> 
					</Col>
				</Row>
			</div>

	)
	
		return (
		  
			<div key={this.state.selectedPage} >
				<Row>
					<Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={12} >
    				<form onSubmit={this.handleSubmit} >
					
						 <Row>
						 <label className="required-field"></label>
						 <Input s={10} id="key" label="Key" name="key" type="text" value={key} validate onChange={this.handleChange} required />
						 </Row>
						 <Row>
						 <label className="required-field"></label>
							<Input s={10} label="Collection" id="collection" name="collection" type="text" value={collection} validate onChange={this.handleChange} required/>
						 </Row>
						 <Row>
						 <label className="required-field"></label>
							<Input s={10} label="Title" id="title" name="title" type="text" value={title} validate onChange={this.handleChange} required/>
						 </Row>
						 <Row>
						 <label className="required-field"></label>
							<Input s={10} label="Sub Title" id="subtitle" name="subtitle" type="text" value={subtitle} validate onChange={this.handleChange} required />
						 </Row>
						 <Row>
						 
							{existingControls} {/*{this.createUI()}*/}
						 </Row>
						 
						 <Row >
						  <Button type="button" className='orgIcon s12 m2 l2 xl2' name="addPage" onClick={this.handleOpenModal}>
							  <i className="material-icons" title='Add Control' >add_circle</i>
							</Button>
						 </Row>
						 <Row>
							
						</Row>
						<Row>
							<Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={8} >
								<Button type="submit "className="btn_secondary otherButtonAddDetUpt mr-2" >Save</Button>
							</Col>
						</Row>
				    </form>
					</Col>
				   </Row>
						<Modal className="modal modal-fixed-footer" open={this.state.isModalOpen} modalOptions={{ dismissible: false }}>
							
							<form onSubmit={this.handleControlSubmit} >
							 
							 <div className="modal-content">
							  <h5>Add an Element</h5>
							   <select defaultValue="" name='type' id='type' onChange={this.handleTypeChange} required s={6}>
								  <option value="" disabled >Choose your option</option>
								  	{elementType.map(itemval => {
									  return <option value={itemval.value}>{itemval.label}</option>
									})}
								</select>
								{this.addControl()}
							  </div>
							</form>
						</Modal>
						
						
						
					
						
						
						
						
						
			</div>
		);

	}
}

export default dynamicControls;