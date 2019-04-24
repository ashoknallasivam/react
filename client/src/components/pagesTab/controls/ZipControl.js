import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal,Collapsible,CollapsibleItem } from 'react-materialize';



class ZipControl extends Component {

  constructor(props) {
		super(props);

		this.state = {
			data:[]
		};

		
	  this.handleChange = this.handleChange.bind(this);

    }

    componentDidMount() {
      this.setState({
			mode:this.props.mode,
			index:this.props.index,
			data:this.props.data
	  });
	  
    }
   
    componentWillReceiveProps(nextProps) {
	   this.setState({
			mode:nextProps.mode,
			index:nextProps.index,
			data:nextProps.data
	  });
	}
	
	handleChange(e) {
		
		const { name, value } = e.target;
		this.setState({ [name]: value }, () => {
			this.createSchema(); // Call back function as SetState is Asynch
		})
		
		//console.log(initialState);
		//console.log(this.state.data);
		
    }
	
	createSchema(){
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
		if(this.state['required'+index] !== undefined)
		{
			if(this.state['required'+index] == 'on')
			{
				var required = true;
			}else{
				var required = false;
			}
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
			type:this.state.data.type,
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
		}
		onChange(index,initialState);
	}	

  render() {
        const { index } = this.state;
        
		return (
			<Collapsible accordion={false}>
				<CollapsibleItem header="Zip" icon="keyboard_arrow_down">
					<div>
						<h5><b>Zip Configuration</b></h5>
					</div>
					<div>
						<Input
							s={12}
							label="Element type"
							id="type"
							name="type"
							type="text"
							value="zip"
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
						/><div className="helper-text" >The text the user sees</div>
						
					</div>
					
					<div>
						<Collapsible accordion={false}>
							<CollapsibleItem header='Options' icon="keyboard_arrow_down">
								<div>	
								   <Input
										s={12}
										label="Hint"
										id="hint"
										name="hint"
										type="text"
										value={this.state.hint}
										onChange={this.handleChange}
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
									/><div className="helper-text" >Provide a default value</div>
								</div>
								<div>	
								   <Input
										s={12}
										label="Input mask"
										id="inputMask"
										name="inputMask"
										type="text"
										value={this.state.inputMask}
										onChange={this.handleChange}
										disabled
									/><div className="helper-text" >Enter the input mask.</div>
								</div>
								<div><h5>Validation</h5></div>
								<div>
									<div>
										<input s={12} type="checkbox" id="required" name={"required" + index} onChange={this.handleChange} value={this.state['required'+index]} />
										<label htmlFor="required">Required?</label>
									</div>
							    </div>
								
								<div>
									<div>
										<Input
											s={12}
											label="Minimum length"
											id="minLength"
											name="minLength"
											type="number"
											value={this.state.minLength}
											onChange={this.handleChange}
										/><div className="helper-text" >The minimum characters that must be entered</div>
									</div>
									<div>
										<Input
											s={12}
											label="Maximum length"
											id="maxLength"
											name="maxLength"
											type="number"
											value={this.state.maxLength}
											onChange={this.handleChange}
										/><div className="helper-text" >The maximum characters that must be entered</div>
									</div>
									<div>	
									   <Input
											s={12}
											label="Pattern"
											id="pattern"
											name="pattern"
											type="text"
											value={this.state.pattern}
											onChange={this.handleChange}
											disabled
										/><div className="helper-text" >The pattern that can be entered.</div>
									</div>
									<div>	
									   <Input
											s={12}
											label="Pattern validation message"
											id="patternValMsg"
											name="patternValMsg"
											type="text"
											value={this.state.patternValMsg}
											onChange={this.handleChange}
											disabled
										/><div className="helper-text" >Error message for text not matching pattern.</div>
									</div>
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
										/><div className="helper-text" >Value of dependent field.</div>
									</div>
                                </div>
							</CollapsibleItem>
						</Collapsible>
    				</div>
					
				</CollapsibleItem>
			</Collapsible>
			);
	 
  }	 
	

}
export default ZipControl;