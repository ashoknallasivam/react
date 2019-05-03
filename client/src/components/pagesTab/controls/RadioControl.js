import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';
import { flatten  } from 'flat';



class RadioControl extends Component {

	constructor(props) {
		super(props);

		this.state = {
			data: [],
			name: '',
			label: '',
			name: "",
			items: [{ label: "" }]
		};


		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);


	}

	componentDidMount() {
		 //alert('did')
		this.setState({
			mode: this.props.mode,
			type: this.props.type,
			data: this.props.data,

		});
		if (Object.keys(this.props.data).length > 0) {
			this.setState({
					name 				: 	this.props.data.name  ,
					label 				: 	this.props.data.label,
					hint				:	this.props.data.options ? this.props.data.options.hint : '',
					defaultValue	    :	this.props.data.options ? this.props.data.options.defaultValue:'',
					vertical		    :	this.props.data.options.vertical ? this.props.data.options.vertical:'',
					disabled		    :	this.props.data.options.disabled ? this.props.data.options.disabled:'',
					items				:	this.props.data.options.items ? this.props.data.options.items :'',
					required			:	this.props.data.options.validation? this.props.data.options.validation.required:'',
					property			:	this.props.data.options.showIf ? this.props.data.options.showIf.property :'',
					value				:	this.props.data.options.showIf ? this.props.data.options.showIf.value :''
					
			})	
			
		}
		
    }
   
    componentWillReceiveProps(nextProps) {
			// alert('will')
	   this.setState({
			mode:nextProps.mode,
			type:nextProps.type,
			data:nextProps.data,
		});
		

	}

	handleChange(e) {

		const { name, value } = e.target;
		this.setState({ [name]: value }, () => {
			this.createSchema(); // Call back function as SetState is Asynch
		})

	
		
    }
	
	createSchema(){
		
		//onChange(index,initialState);
	}
	handleSubmit() {

		const { onChange } = this.props;

		if (this.state.name !== undefined) {
			var name = this.state.name
		}
		if (this.state.label !== undefined) {
			var label = this.state.label
		}
		if (this.state.hint != undefined) {
			var hint = this.state.hint;
		}
		if (this.state.defaultValue != undefined) {
			var defaultValue = this.state.defaultValue;
		}
		if (this.state.vertical !== undefined) {
			if (this.state.vertical == 'true') {
				var vertical = true;
			} else {
				var vertical = false;
			}
		}
		if (this.state.disabled !== undefined) {
			if (this.state.disabled == 'true') {
				var disabled = true;
			} else {
				var disabled = false;
			}
		}
		
		if (this.state.required !== undefined) {
			if (this.state.required == 'on') {
				var required = true;
			} else {
				var required = false;
			}
		}				
		if(this.state.items !== undefined)
		{
			//var items = [{ label: this.state.label_0 },{ label: this.state.label_1 }]
			var items = this.state.items;
			
		}
		if (this.state.minLength !== undefined) {
			var minLength = this.state.minLength;
		}
		if (this.state.maxLength !== undefined) {
			var maxLength = this.state.maxLength;
		}
		if (this.state.property !== undefined) {
			var property = this.state.property;
		}
		if (this.state.value !== undefined) {
			var value = this.state.value;
		}
		if (this.state.property !== undefined || this.state.value !== undefined) {
			var showIf = { property, value }
		}
		
		var initialState =  {  
			type:this.state.type,
			name, 
			label, 
			options: { 
				hint, 
				defaultValue, 
				showIf,
				vertical,
				disabled,
				validation: {
					required,
				 },
				items	
				},
                			
		};
		//console.log(initialState)
		alert('submitted');
		onChange(initialState, this.props.index);

		this.props.close();
	}
	
  handleItemLabelChange = idx => evt => {
	  
	const { name, value } = evt.target;
	
	this.setState({ [name]: value }, () => {
		this.itemSchema(idx); // Call back function as SetState is Asynch
	})  
   
  };
  
  itemSchema = (idx) => {
	  console.log("BeforeItems",this.state.items)
	  
	  
	  
	  	if (this.state.itemvalue !== undefined) {
			var value = this.state.itemvalue;
		}
		if (this.state.itemlabel !== undefined) {
			var label = this.state.itemlabel;
		}
		
	  
	  
	  
	  
	  
	  var initialItemSchema =  {  
			value,
			label, 
			options: { 
				specify: {
						type:this.state.element_type,
						name:this.state.othername,
						label:this.state.otherlabel,
						options: {
							hint:this.state.otherhint,
							validation : {
								requiredIf : {
									property:this.state.otherproperty,
									value:this.state.othervalue,
								},
								minLength:this.state.otherminLength,
								maxLength:this.state.othermaxLength,
							} 
						}
					} 
				} 
    	};
	  
 
	  const newItems = this.state.items.map((item, sidx) => {
      if (idx !== sidx) return item;
      return { ...item, ...initialItemSchema };
    });

    
	this.setState({ items: newItems }, () => {
		this.handleSave(); // Call back function as SetState is Asynch
	})
  }	
  
  handleSave = () => {
	  
	  
	  console.log("Items",this.state.items)
  }	
  
  handleAddItem = () => {
    this.setState({
      items: this.state.items.concat([{ label: "" }])
    });
  };

  handleRemoveItem = idx => () => {
    this.setState({
      items: this.state.items.filter((s, sidx) => idx !== sidx)
    });
  };
  
  render() {
	  
	  const { data } = this.state;

		return (
			<Fragment>
				<div>

					<div>
						<h5><b>Radio Configuration</b></h5>
					</div>
					<div>
						<Input
							s={12}
							label="Element type"
							id="type"
							name="type"
							type="text"
							value="radio"
							disabled
							required
							className="labelText"
						/>
					</div>
					<div>
						<Input
							s={12}
							label="Name *"
							id="name"
							name="name"
							type="text"
							value={this.state.name}
							required
							onChange={this.handleChange}
							className="labelText"
						/><div className="helper-text" >A unique element name</div>
					</div>
					<div>
						<Input
							s={12}
							label="Label *"
							id="label"
							name="label"
							type="text"
							value={this.state.label}
							required
							onChange={this.handleChange}
							className="labelText"
						/><div className="helper-text" >The text the user sees</div>

					</div>

					<div>
						<div>
							<h5>Options</h5>
								<div>	
								   <Input
										s={12}
										label="Hint"
										id="hint"
										name="hint"
										type="text"
										value={this.state.hint}
										onChange={this.handleChange}
										className= "labelText"
									/><div className="helper-text" >Give user a hint</div>
								</div>
								<div>	
								   <Input
										s={12}
										label="Default value"
										id="defaultValue"
										name="defaultValue"
										type="text"
										value={this.state.defaultValue}
										onChange={this.handleChange}
										className= "labelText"
									/><div className="helper-text" >Provide a default value</div>
								</div>
								<fieldset>
										<legend><b>Show If?</b></legend>
										<div>
											<Input
												s={12}
												label="Property name"
												id="property"
												name="property"
												type="text"
												value={this.state.property}
												onChange={this.handleChange}
												className="labelText"
											/><div className="helper-text" >Property name of field dependency.</div>
										</div>
										<div>
											<Input
												s={12}
												label="Property value"
												id="value"
												name="value"
												type="text"
												value={this.state.value}
												onChange={this.handleChange}
												className="labelText"
											/><div className="helper-text" >Value of dependent field.</div>
										</div>
								</fieldset>
								<div className="valign-wrapper">	
									<label>List will be...*</label>
									<p>
									    <Input name='vertical' type='radio' className="with-gap" value='true' label='Vertical' checked={!this.state.vertical}  onChange={this.handleChange}/>
										
										</p>
										<p>
										<Input name='vertical' type='radio' className="with-gap" value='false' label='Horizontal' checked={this.state.vertical} onChange={this.handleChange}/>
										
									</p>
								</div>
								<div className="valign-wrapper">	
									<label>Default state*</label>
									<p>
										<Input name='disabled' className="with-gap" value="false" label="Enabled" type='radio' checked={!this.state.disabled} id='radio-3' onChange={this.handleChange}/>
										
										</p>
										<p>
										<Input name='disabled' className="with-gap" value="true" label="Disabled" type='radio' checked={this.state.disabled} id='radio-4' onChange={this.handleChange}/>
										
									</p>
								</div>
								 <fieldset>
									<legend><b>Validation</b></legend>
									<div>
										<div>
											<input s={12} type="checkbox" id="required" name="required" onChange={this.handleChange} value={this.state.required} />
											<label htmlFor="required">Required?</label>
										</div>
									</div>
								 </fieldset>
								<div>
									<h6>Items</h6>
								</div>
								
								{this.state.items.map((item, idx) => {
                                 var flattenData = flatten(item);  
									//console.log("Flatten",flattenData);
																
								 return <fieldset>
									<div className="collection-item">
										<div className="valign-wrapper">
											
											<button type='button' className='col s12 m4 l4 xl4 mt-1' name="deleteItem" onClick={this.handleRemoveItem(idx)}
												style={{ backgroundColor: 'unset', border: 'unset', color: '#004e92' }}
											>
												<i className="material-icons" title='Delete'>delete</i>
											</button>
											
										</div>
										<div className="valign-wrapper">
										 <Col s={12} m={6} l={4} xl={12} >
										    <Input
												s={8}
												label={`Value #${idx + 1}`}
												id="itemvalue"
												name="itemvalue"
												type="text"
												value={item.value}
												onChange={this.handleItemLabelChange(idx)}
												className="labelText"
											/>
											
										 </Col>
										</div>
										<div className="helper-text" >The value stored (e.g. 'NJ')</div>
										<div className="valign-wrapper">
										  <Col s={12} m={6} l={4} xl={12} >
											 <Input
												s={8}
												label={`Label #${idx + 1}`}
												id="itemlabel"
												name="itemlabel"
												type="text"
												value={item.label}
												onChange={this.handleItemLabelChange(idx)}
												className="labelText"
											/>
										  </Col>
										</div>
										<div className="helper-text" >What the user sees (e.g. 'New Jersey')</div>
										<Collapsible accordion={false}>
					                     <CollapsibleItem header='Options' icon="keyboard_arrow_down">
										
										<div className="valign-wrapper">
										<div className="helper-text" ><h6>Others Specify</h6></div>
										</div>
									
										<div className="valign-wrapper">
										  <Col s={8} m={6} l={4} xl={8} >
											 <select defaultValue={flattenData['options.specify.type']} s={8} m={6} l={4} xl={8}  id='element_type' name='element_type' type='select' onChange={this.handleItemLabelChange(idx)} >
											  <option value='' >Element Type</option>
											  <option value='text' >Text</option>
											 </select>
										  </Col>
										 
										</div>
                                        <div className="valign-wrapper">
										  <Col s={12} m={6} l={4} xl={12} >
											 <Input
												s={8}
												label='Name'
												id="othername"
												name="othername"
												type="text"
												value={flattenData['options.specify.name']}
												onChange={this.handleItemLabelChange(idx)}
												className="labelText"
											/>
										  </Col>
										</div>
										 <div className="valign-wrapper">
										  <Col s={12} m={6} l={4} xl={12} >
											 <Input
												s={8}
												label='Label'
												id="otherlabel"
												name="otherlabel"
												type="text"
												value={flattenData['options.specify.label']}
												onChange={this.handleItemLabelChange(idx)}
												className="labelText"
											/>
										  </Col>
										</div>
										<div className="valign-wrapper">
										<div className="helper-text" ><h6><b>Options</b></h6></div>
										</div>
										<div className="valign-wrapper">
										  <Col s={12} m={6} l={4} xl={12} >
											 <Input
												s={8}
												label='Hint'
												id="otherhint"
												name="otherhint"
												type="text"
												value={flattenData['options.specify.options.hint']}
												onChange={this.handleItemLabelChange(idx)}
												className="labelText"
											/>
										  </Col>
										</div>
										
										
										<fieldset>
										<legend><b>Validation</b></legend>
											
											<fieldset>
												<legend><b>Required If?</b></legend>
												<div>
													<Input
														s={12}
														label="Property name"
														id="otherproperty"
														name="otherproperty"
														type="text"
														value={flattenData['options.specify.options.validation.requiredIf.property']}
														onChange={this.handleItemLabelChange(idx)}
														className="labelText"
													/><div className="helper-text" >Property name of field dependency.</div>
												</div>
												<div>
													<Input
														s={12}
														label="Property value"
														id="othervalue"
														name="othervalue"
														type="text"
														value={flattenData['options.specify.options.validation.requiredIf.value']}
														onChange={this.handleItemLabelChange(idx)}
														className="labelText"
													/><div className="helper-text" >Value of dependent field.</div>
												</div>
											</fieldset>
											<div>
											<Input
												s={12}
												label="Minimum length"
												id="otherminLength"
												name="otherminLength"
												type="number"
												value={flattenData['options.specify.options.validation.minLength']}
												onChange={this.handleItemLabelChange(idx)}
												className="labelText"
												/><div className="helper-text" >The minimum characters that must be entered</div>
											</div>
											<div>
												<Input
													s={12}
													label="Maximum length"
													id="othermaxLength"
													name="othermaxLength"
													type="number"
													value={flattenData['options.specify.options.validation.maxLength']}
													onChange={this.handleItemLabelChange(idx)}
													className="labelText"
												/><div className="helper-text" >The maximum characters that must be entered</div>
											</div>
										</fieldset>
										</CollapsibleItem>
										</Collapsible>
										
									</div>
									
									</fieldset>
								})}
								<div>
									<Col s={12} m={6} l={4} xl={12} >
										<Button type="button" className='orgIcon col s12 m2 l2 xl2 right' name="addOrg" onClick={this.handleAddItem}>
											<i className="material-icons" title='Add Items'>add_circle</i>
										</Button>
									</Col>
								</div>	
							 
						</div>

					</div>

				</div>
				<div className="right valign-wrapper mt-2">
					<Button type="button" className="btn_secondary otherButtonAddDetUpt mr-2" onClick={this.handleSubmit}>Submit</Button>
					<Button type="button" className="btn_secondary otherButtonAddDetUpt" onClick={this.props.close} >Cancel</Button>

				</div>

			</Fragment>

		);

	}


}
export default RadioControl;