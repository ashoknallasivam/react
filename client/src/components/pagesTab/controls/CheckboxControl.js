import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal,Collapsible,CollapsibleItem } from 'react-materialize';



class CheckboxControl extends Component {

  constructor(props) {
		super(props);

		this.state = {
			
		};

		
	  this.handleChange = this.handleChange.bind(this);
	  
    }

    componentDidMount() {
     
	  
    }
   
    componentWillReceiveProps(nextProps) {
	  
	 
	}
	
	
	
	handleChange(e) {
		const { onChange } = this.props;
		const { name, value } = e.target;
		console.log(e.target.value, e.target.name)
		//this.setState({ [name]: value }, () => console.log(name, value));
		onChange(e);
    }
	
		


  render() {

		
		return (
			<Collapsible accordion={false}>
			<CollapsibleItem header="Checkbox" icon="keyboard_arrow_down">
				<div>
					<h5><b>Checkbox Configuration</b></h5>
				</div>
				<div>
					<Input
						s={12}
						label="Element type"
						id="type"
						name="type"
						type="text"
						value="checkbox"
						disabled
						required
					/>
				 </div>	
					<div>	
					 <Input
						s={12}
						label="Name"
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
						label="Label"
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
						<CollapsibleItem header='options' icon="keyboard_arrow_down">
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
								<label>Align to box*</label>
								 <Input
									className="with-gap"
									s={12}
									label="start"
									id="start"
									name="align"
									type="radio"
									value={this.state.align}
									onChange={this.handleChange}
								/>
								 <Input
									className="with-gap"
									s={12}
									label="end"
									id="end"
									name="align"
									type="radio"
									value={this.state.align}
									onChange={this.handleChange}
								/>
							</div>
							<div>	
								<label>Default state*</label>
								 <Input
									className="with-gap"
									s={12}
									label="Disabled"
									id="Disabled"
									name="disabled"
									type="radio"
									value={this.state.disabled}
									onChange={this.handleChange}
								/>
								 <Input
									s={12}
									className="with-gap"
									label="Enabled"
									id="Enabled"
									name="disabled"
									type="radio"
									value={this.state.disabled}
									onChange={this.handleChange}
								/>
							</div>


							<div><h5>Validation</h5></div>
							<div>
								<div>
									<input s={12} type="checkbox" id="required" name="required" onChange={this.handleChange} />
									<label htmlFor="required">Required?</label>
								</div>
								</div>
							<div>
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
export default CheckboxControl;