import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal,Collapsible,CollapsibleItem } from 'react-materialize';



class TextareaControl extends Component {

  constructor(props) {
		super(props);

		this.state = {
			data:[],
			 name : "",
		 label : "",
		 defaultValues : "",
		 minimumValue : "",
		 maximumValue : "",
		 required : false,
		 property : "",
		 PropertyValue : "",
		 increments : "",
		 thumbLabel : true,
		 vertical : false,
		 invert : false
		};

		
	  this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
      this.setState({
			mode:this.props.mode,
			index:this.props.index,
			data:this.props.data
		});
		if (Object.keys(this.props.data).length > 0){
			this.setState({
				name : this.props.data.name  ,
					label : this.props.data.label,
	
			})	
		}
	  
    }
   
   
	
	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value })
		if([name] == 'required'){
			this.setState({
				[name] : e.target.checked
			})
		}
		
    }
	
		handleSubmit =() =>{
		const { onChange } = this.props;
		const { index } = this.state;
		if(this.state.name !== undefined)
		{
			var name = this.state.name
		}
		if(this.state.label !== undefined)
		{
			var label = this.state.label
		}
		if(this.state.hint !== undefined)
		{
			var hint = this.state.hint;
		}
		if(this.state.autocomplete !== undefined)
		{
			if(this.state.autocomplete == 'on')
			{
				var autocomplete = true;
			}else{
				var autocomplete = false;
			}
		}
		if(this.state.required !== undefined)
		{
				var required = this.state.required;
		}				
		if(this.state.label_0 !== undefined)
		{
			var items = [{ label: this.state.label_0 },{ label: this.state.label_1 }]
		}
		if(this.state.minLength !== undefined)
		{
			var minLength = this.state.minLength;
		}
		if(this.state.maxLength !== undefined)
		{
			var maxLength = this.state.maxLength;
		}
		if(this.state.property !== undefined)
		{
			var property = this.state.property;
		}
		if(this.state.value !== undefined)
		{
			var value = this.state.value;
		}
		if(this.state.property !== undefined || this.state.value !== undefined )
		{
			var requiredIf = { property, value }
		}
		
		var initialState =  {  
			type:'textarea',
			name, 
			label, 
			options: { 
				hint, 
				autocomplete, 
				items,
				validation: { required, minLength, maxLength , 
							  requiredIf
						}
				}  
		};
		onChange(initialState,this.props.index);
		this.props.close()
	};

  render() {
        const { index } = this.state;

		return (
			<Fragment>
					<div>
						<h5><b>Textarea Configuration</b></h5>
					</div>
					<div>
						<Input
							s={12}
							label="Element type"
							id="type"
							name="type"
							type="text"
							value="textarea"
							disabled
							required
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
							className="labelText mb-1"
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
							className="labelText mb-1"
						/><div className="helper-text" >The text the user sees</div>
						
					</div>
					
					<div>
					
								<div>	
								   <Input
										s={12}
										label="Hint"
										id="hint"
										name="hint"
										type="text"
										value={this.state.hint}
										onChange={this.handleChange}
										className="labelText mb-1"
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
										className="labelText mb-1"
									/><div className="helper-text" >Provide a default value</div>
								</div>
								<fieldset>
								<legend><b>Validation</b></legend>
								<div>
									<div>
										<input s={12} type="checkbox" id="required" name="required" onChange={this.handleChange} checked={this.state.required} />
										<label htmlFor="required">Required?</label>
									</div>
							    </div>
								<div>
									<fieldset>
									<legend><b>Required If?</b></legend>
									<div>
										<Input
											s={12}
											label="Property name"
											id="property"
											name="property"
											type="text"
											value={this.state.property}
											onChange={this.handleChange}
											className="labelText mb-1"
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
											className="labelText mb-1"
										/><div className="helper-text" >Value of dependent field.</div>
									</div>
                                </fieldset>
                                </div>
							</fieldset>
						
    				</div>
						<div className="right valign-wrapper mt-2">
				  <Button type="button" className="btn_secondary otherButtonAddDetUpt mr-2"  onClick={this.handleSubmit}>Submit</Button>
				  <Button type="button" className="btn_secondary otherButtonAddDetUpt" onClick={this.props.close} >Cancel</Button>
								
			</div>
			
						</Fragment>
			);
	 
  }	 
	

}
export default TextareaControl;