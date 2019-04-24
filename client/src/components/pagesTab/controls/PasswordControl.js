import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal,Collapsible,CollapsibleItem } from 'react-materialize';



class PasswordControl extends Component {

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
		//this.setState({ [name]: value }, () => console.log(name, value));
		onChange(e);
    }
	
		


  render() {

		
		return (
			<Collapsible accordion={false}>
				<CollapsibleItem header="Password" icon="keyboard_arrow_down">
				<div>
						<h5><b>Password Configuration</b></h5>
					</div>
					<div>
						<Input
							s={12}
							label="Element type"
							id="type"
							name="type"
							type="text"
							value="password"
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
										id="hint"
										name="defaultValue"
										type="text"
										value={this.state.hint}
										onChange={this.handleChange}
									/><div className="helper-text" >Provide a default value</div>
								</div>
								<div>
									<fieldset>
										<legend>Validation</legend>
										<div>
											<input s={12} type="checkbox" id="required" name="required" onChange={this.handleChange} />
											<label htmlFor="required">Required?</label>
										</div>
										<div>
											<Input
												s={12}
												label="Minimum length"
												id="min"
												name="min"
												type="number"
												value={this.state.property}
												onChange={this.handleChange}
											/><div className="helper-text" >The minimum value that must be entered</div>
										</div>
										<div>
											<Input
												s={12}
												label="Maximum length"
												id="max"
												name="max"
												type="number"
												value={this.state.value}
												onChange={this.handleChange}
											/><div className="helper-text" >The maximum value that can be entered</div>
										</div>
										<fieldset>
											<legend>Required If?</legend>
											<div>
												<Input
													s={12}
													label="Property name"
													id="property"
													name="property"
													type="text"
													value={this.state.property}
													onChange={this.handleChange}
												/><div className="helper-text" >Property name of field dependency</div>
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
												/><div className="helper-text" >Value of dependent field</div>
											</div>
										</fieldset>
									</fieldset>
								</div>
							</CollapsibleItem>
						</Collapsible>
					</div>
				</CollapsibleItem>
			</Collapsible>
			);
	 
  }	 
	

}
export default PasswordControl;