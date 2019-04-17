import React from "react";
import ReactDOM from "react-dom";
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal,Collapsible,CollapsibleItem  } from 'react-materialize';
import InputText from './inputText';
import inputJson from './text.json';
import ExpansionPanel from 'material-expansion-panel';



class dynamicControls extends React.Component {
	
	

	constructor(props) {
		
		
		super(props);

		this.state = {
			submitted: false,
			key: this.props.pageJson.key,
			collection: this.props.pageJson.collection,
			title: this.props.pageJson.title,
			subtitle: this.props.pageJson.subtitle,
			layout: [],
			pageJson: this.props.pageJson,
			type: '',
			name: '',
			label: '',
			inputJson: inputJson,
			selected: '',
			values: [],
			options: [],
			items: [],
			pages: this.props.pages,
			selectedPage: this.props.selectedPage,
			mode: this.props.mode,
            isModalOpen: false
		};

		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleControlSubmit = this.handleControlSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.handleControlChange = this.handleControlChange.bind(this);
		this.handleCloseModal = this.handleCloseModal.bind(this);
		this.handleOpenModal = this.handleOpenModal.bind(this);
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
			name: this.props.name,
			label: this.props.label,
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
			name: nextProps.name,
			label: nextProps.label,
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


	createControlSchema(idx) {

		const newControls = this.state.values.map((key, sidx) => {
			if (idx !== sidx) return key;

			return { ...key, 
			name: this.state.name, 
			type: this.state.type, 
			label: this.state.label, 
			options: { 
				hint: this.state.hint, 
				autocomplete: this.state.autocomplete, 
				items: [{ label: this.state.label_0 },{ label: this.state.label_1 }],
				validation: { required: this.state.required, minLength:this.state.minLength, maxLength:this.state.maxLength , 
							   //requiredIf : { property: this.state.property, value:this.state.value }  
						}
				} 
			};

		});
		
		
        this.setState({
			
			key: this.state.key,
			collection: this.state.collection,
			title: this.state.title,
			subtitle: this.state.subtitle,
			

		});
		
			this.setState({
		
			values: newControls,
			options: newControls,

		});
		
				
		

	}

	handleControlChange = idx => evt => {
		const { name, value } = evt.target;

		this.setState({ [name]: value }, () => {
			this.createControlSchema(idx); // Call back function as SetState is Asynch
		})
		
		//console.log(this.state.values);
	};


	addClick() {
		this.setState(prevState => ({ values: [...prevState.values, ''] }))
		this.setState(prevState => ({ options: [...prevState.options, ''] }))
		this.setState({ isModalOpen: false })
		
		
	}

	removeClick(i) {
		let values = [...this.state.values];
		values.splice(i, 1);
		this.setState({ values });
	}
	
    handleControlSubmit(e) {
		e.preventDefault();
		 if (this.state.type != '') {
			 
			 this.addClick();
			 
		 }
	}
	
	handleCloseModal = () => {
	  
      this.setState({ isModalOpen: false })
    }
	
	handleOpenModal = () => {
	
      this.setState({ isModalOpen: true })
    }

	handleSubmit(e) {

		e.preventDefault();

		if (this.state.mode == 'Edit') {
			
		  	
          const combinedArrays = [...this.props.pages[this.props.selectedPage].layout, ...this.state.values];
		  console.log("Value:",this.state.values);
		  console.log("Options:",this.state.options);
		  //console.log("Layout:",this.props.pages[this.props.selectedPage].layout);
		  //console.log("Combined:",combinedArrays);
		  
		  if(this.state.values.length > 0)
		  {
		  this.props.sendData(combinedArrays,this.state.key,this.state.collection,this.state.title,this.state.subtitle);
		  this.setState({ options: '' });
		  }
		} else {
			//console.log(this.state.values);	
			const combinedArrays = [...this.state.values];
			this.props.sendData(combinedArrays,this.state.key,this.state.collection,this.state.title,this.state.subtitle);
		}
		
		

	}


	renderForm = (idx) => {

		let model = this.state.inputJson.layout;
		let input = '';
		let formUI = model.map((m) => {

			let name = m.name;
			let type = m.type;
			let label = m.label;
			if (type == "heading") {
				return (
					<div>
						<h5>{label}</h5>
					</div>
				);
			}

			if (type == "text") {

				if (name == 'type') {
					return <div >
						<Input
							s={12}
							label={label}
							id={name}
							name={name}
							type={type}
							value={this.state.type}
							minLength={m.options.validation.minLength}
							maxLength={m.options.validation.maxLength}
							onChange={this.handleControlChange(idx)}
							disabled
						/>
					</div>
						;
				} else {
					return <div >
						<Input
							s={12}
							label={label}
							id={name}
							name={name}
							type={type}
							minLength={m.options.validation.minLength}
							maxLength={m.options.validation.maxLength}
							onChange={this.handleControlChange(idx)}
						/>
					</div>;
				}

			}



			if (type == "panel") {

				var arr3 = Object.values(m.options.fields);

				input = arr3.map((o) => {
					
					if (o.type == 'text') {
						return <div>
						
						  	<Input
								s={12}
								label={o.label}
								id={o.name}
								name={o.name}
								type={o.type}
								onChange={this.handleControlChange(idx)}
							/></div>
					}
					
					if (o.type == 'checkbox') {
					   return <div>
					    	  <input s={12} type={o.type} id="test6" name={o.name} onChange={this.handleControlChange(idx)}/>
							  <label htmlFor="test6">{o.label}</label>
         				   </div>;
					} 


					if (o.type == 'array') {
						var autoitems ='';

                        const autoitems = Object.entries(o.options).map(([key,value])=>{

                          if(key == 'hint')	
                          {
							  return (
							      <div>{value.toString()}</div>
							  );
						  } 

						  if(key == 'fields')	
                          {
							  
                             var autofileds = '';
                             var required = '';
                             autofileds = value.map((q,idx) => {
                                
                                const validation =q.options.validation.required.toString() ;

                                required =  validation == true ? required : '';
                                //console.log(idx);
 
									   
								if(q.type == 'checkbox'){
									
									return <div><div>
										  <input s={12} type={q.type} id="test7" name={q.name} onChange={this.handleControlChange(idx)}/>
										  <label htmlFor="test7">{q.label}</label>
									   </div><h6>{q.options.hint}</h6>
                                         </div>;
									
								} else {
                                	return  <div><div>	
										<Input
											s={12}
											label={q.label}
											id={q.name}
											name={ `${q.name}_${idx}` }
											type={q.type}
											onChange={this.handleControlChange(idx)}
										/></div><h6>{q.options.hint}</h6>
                                         </div>;
										
								}	

                             });

                              return <div>{autofileds}</div>
								
						  } 

						})	

						return <div >
						     	<h5>{o.label}</h5>
						       		<div>{autoitems}</div>
								</div>
					}
					
					if (o.type == 'fieldset') {
						var autoitems ='';

                        const autoitems = Object.entries(o.options).map(([key,value])=>{

                          if(key == 'hint')	
                          {
							  return (
							      <div>{value.toString()}</div>
							  );
						  } 

						  if(key == 'fields')	
                          {
							  
                             var autofileds = '';
                             var required = '';
                             autofileds = value.map((q) => {
                                
                                const validation =q.options.validation.required.toString() ;

                                required =  validation == true ? required : '';
                                //console.log(required);
 
									   
								if(q.type == 'checkbox'){
									
									return <div><div>
										  <input s={12} type={q.type} id="test7" name={q.name} onChange={this.handleControlChange(idx)}/>
										  <label htmlFor="test7">{q.label}</label>
									   </div><h6>{q.options.hint}</h6>
                                         </div>;
									
								} else if (q.type == 'fieldset') {
                                	return  <div><div>	
										  </div><h6>{q.label}</h6>
                                         </div>;
										
								}	else {
                                	return  <div><div>	
										<Input
											s={12}
											label={q.label}
											id={q.name}
											name={q.name}
											type={q.type}
											onChange={this.handleControlChange(idx)}
										/></div><h6>{q.options.hint}</h6>
                                         </div>;
										
								}	

                             });

                              return <div>{autofileds}</div>
								
						  } 



						})	


						return <div>
						     	<h5>{o.label}</h5>
						       		<div>{autoitems}</div>
								</div>
					}
					
				});

				input = <div>{input}</div>;




			}
			return (
				<Collapsible accordion={false}>
					<CollapsibleItem header={label} icon="keyboard_arrow_down">
						{input}
					</CollapsibleItem>
				</Collapsible>
			);



		});
		
		return (
			<Collapsible accordion={false}>
				<CollapsibleItem header='Text' icon="keyboard_arrow_down">
					{formUI}
				</CollapsibleItem>
			</Collapsible>
			);
		
	}

	createUI() {
		return this.state.values.map((el, i) =>

			<div key={i}>

				<Row>
					<Col s={11}>
						{this.renderForm(i)}
					</Col>
					<Col s={1} >
					<Button className='orgIcon col s12 m2 l2 xl2 mt-8' name="deleteOrg" onClick={this.removeClick.bind(this, i)}>
							<i className="material-icons" title='Delete'>delete</i>
					</Button>
					</Col>
				</Row>

			</div>

		)
	}

	render() {

    const { key, collection, title, subtitle, layout } = this.state;
	
	const existingControls =  this.state.layout.map((el, i) =>

			<div key={i}>
				<Row><Col s={11}>
					{this.renderForm(i)}
					</Col>
					<Col s={1} >
					<Button className='orgIcon col s12 m2 l2 xl2 mt-8' name="deleteOrg" onClick={this.removeClick.bind(this, i)}>
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
						 <Input s={10} id="key" label="Key" name="key" type="text" value={key} validate onChange={this.handleControlChange('')} required />
						 </Row>
						 <Row>
						 <label className="required-field"></label>
							<Input s={10} label="Collection" id="collection" name="collection" type="text" value={collection} validate onChange={this.handleControlChange('')} required/>
						 </Row>
						 <Row>
						 <label className="required-field"></label>
							<Input s={10} label="Title" id="title" name="title" type="text" value={title} validate onChange={this.handleControlChange('')} required/>
						 </Row>
						 <Row>
						 <label className="required-field"></label>
							<Input s={10} label="Sub Title" id="subtitle" name="subtitle" type="text" value={subtitle} validate onChange={this.handleControlChange('')} required />
						 </Row>
						 <Row>
						 <label>Dynamic Controls</label>
							{existingControls}
						 </Row>
						 
						 <Row ><div><label>Add Controls</label></div>
						  <Button type="button" className='orgIcon s12 m2 l2 xl2' name="addPage" onClick={this.handleOpenModal}>
							  <i className="material-icons" title='Add Control' >add_circle</i>
							</Button>
						 </Row>
						 <Row>
							<Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={10} >
								{this.createUI()}
							</Col>
						</Row>
						<Row>
							<Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={8} >
								<Button type="submit "className="btn_secondary otherButtonAddDetUpt mr-2" >Save</Button>
							</Col>
						</Row>
				    </form>
					</Col>
				   </Row>
						<Modal className="modalpage" open={this.state.isModalOpen} modalOptions={{ dismissible: false }}>
							<form onSubmit={this.handleControlSubmit} >
							 <div className='row' >
							 <div >
							<label>Add an Element</label>
								<select defaultValue="" name='type' id='type' onChange={this.handleChange} required>
								  <option value="" disabled >Choose your option</option>
								  <option value='text'>Text</option>
								  <option value='email'>Email</option>
									{/*<option value='radio'>Radio</option>
									   <option value='checkbox'>Checkbox</option>
									   <option value='textarea'>TextArea</option>
									   <option value='numeric'>Numeric</option>
									   <option value='date_picker'>DatePicker</option>
									   <option value='time_picker'>TimePicker</option>*/}
								</select>
								</div>
							</div>
							 <div className='row' >
							    <Button type="submit" className="btn_secondary otherButtonAddDetUpt mr-2" >Submit</Button>
								<Button type="button" className="btn_secondary otherButtonAddDetUpt" onClick={this.handleCloseModal} >Cancel</Button>
								
                             </div>
							</form>
						</Modal>
			</div>
		);

	}
}

export default dynamicControls;