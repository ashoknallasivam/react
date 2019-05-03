import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';



class PasswordControl extends Component {

	constructor(props) {
		super(props);

		this.state = {

		};


		this.handleChange = this.handleChange.bind(this);

	}
	componentDidMount() {
		// alert('did')
		this.setState({
			mode: this.props.mode,
			type: this.props.type,
			data: this.props.data,

		});
		if (Object.keys(this.props.data).length > 0) {
			this.setState({
				name: this.props.data.name,
				label: this.props.data.label,
				hint: this.props.data.options ? this.props.data.options.hint : '',
				defaultValue: this.props.data.options ? this.props.data.options.defaultValue : '',
				required: this.props.data.options.validation ? this.props.data.options.validation.required : '',
				minLength: this.props.data.options.validation ? this.props.data.options.validation.minLength : '',
				maxLength: this.props.data.options.validation ? this.props.data.options.validation.maxLength : '',
				pattern: this.props.data.pattern,
				patternValMsg: this.props.data.patternValMsg,
				property: this.props.data.options.validation.requiredIf ? this.props.data.options.validation.requiredIf.property : '',
				value: this.props.data.options.validation.requiredIf ? this.props.data.options.validation.requiredIf.value : ''
			})
		}
	}


	handleChange(e) {

		const { name, value } = e.target;
		this.setState({ [name]: value }, () => {
		})
		if ([name] == 'required') {
			this.setState({
				[name]: e.target.checked
			})
		}
	}

	handleSubmit = () => {

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
		if (this.state.defaultValue !== undefined) {
			var defaultValue = this.state.defaultValue;
		}
		if (this.state.required !== undefined) {
			var required = this.state.required;
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


		var initialState = {
			type: 'password',
			name,
			label,
			options: {
				hint,
				defaultValue,
				validation: {
					required,
					minLength,
					maxLength,
					requiredIf: {
						property,
						value
					}
				}
			}
		};
		//console.log(initialState)
		alert('submitted');
		onChange(initialState, this.props.index);
		this.props.close();
	}
	render() {


		return (
			<Fragment>
				<div>

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
									<div>
										<Input
											s={12}
											label="Minimum length"
											id="minLength"
											name="minLength"
											type="number"
											value={this.state.minLength}
											onChange={this.handleChange}
											className="labelText mb-1"
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
											className="labelText mb-1"
										/><div className="helper-text" >The maximum characters that must be entered</div>
									</div>
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
export default PasswordControl;