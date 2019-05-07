import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';



class CheckboxControl extends Component {

	constructor(props) {
		super(props);

		this.state = {
			align: "after",
			disabled: "true"
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
				align: this.props.data.options ? this.props.data.options.align : "after",
				disabled: this.props.data.options ? this.props.data.options.disabled : "true",
				defaultValue: this.props.data.options ? this.props.data.options.defaultValue : '',
				required: this.props.data.options.validation ? this.props.data.options.validation.required : '',
				property: this.props.data.options.validation.requiredIf ? this.props.data.options.validation.requiredIf.property : '',
				value: this.props.data.options.validation.requiredIf ? this.props.data.options.validation.requiredIf.value : ''
			})
		}
	}


	handleChange(e) {
		const { name, value } = e.target;
		// console.log(e.target.value, e.target.name)
		this.setState({ [name]: value })

		if ([name] == 'required') {
			this.setState({
				[name]: e.target.checked
			})
		}

	}

	handleSubmit = () => {


		if (this.state.name !== undefined) {
			var name = this.state.name
		}
		if (this.state.label !== undefined) {
			var label = this.state.label
		}
		if (this.state.defaultValue != undefined) {
			var defaultValue = this.state.defaultValue;
		}
		if (this.state.align !== undefined) {
			var align = this.state.align;
		}
		if (this.state.disabled !== undefined) {
			var disabled = this.state.disabled;
		}
		if (this.state.required !== undefined) {
			var required = this.state.required
		}
		if (this.state.property !== undefined) {
			var property = this.state.property;
		}
		if (this.state.value !== undefined) {
			var value = this.state.value;
		}


		var initialState = {
			type: "checkbox",
			name,
			label,
			options: {
				defaultValue,
				align,
				disabled,
				validation: {
					required,
					requiredIf: {
						property,
						value
					}
				}
			}
		};




		alert('Submitted');
		this.props.onChange(initialState, this.props.index);
		this.props.close();
	};


	render() {


		return (
			<Fragment>
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
						className="labelText"
						disabled
						required
					/>
				</div>
				<div>
					<Input
						s={12}
						label="Name*"
						id="name"
						name="name"
						type="text"
						className="labelText mb-1"
						value={this.state.name}
						required
						onChange={this.handleChange}
					/><div className="helper-text" >A unique element name</div>
				</div>
				<div>
					<Input
						s={12}
						label="Label*"
						id="label"
						name="label"
						type="text"
						className="labelText mb-1"
						value={this.state.label}
						required
						onChange={this.handleChange}
					/><div className="helper-text" >The text the user sees</div>

				</div>

				<div>
					<h5><b>Options</b></h5>
					<div>
						<Input
							s={12}
							label="Default value"
							id="defaultValue"
							name="defaultValue"
							type="text"
							className="labelText mb-1"
							value={this.state.defaultValue}
							onChange={this.handleChange}
						/><div className="helper-text" >Provide a default value</div>
					</div>
					<div>
						<label className="innerDynamicLabel">Align box to...*</label>

						<div>
							<input name='align' className="with-gap" value="after" type='radio' checked={this.state.align == "after"} id='alignafter' onChange={this.handleChange} />
							<label className="innerDynamicLabel ml-1" htmlFor='alignafter'>Start</label>
						</div>
						<div>
							<input name='align' className="with-gap" value="before" type='radio' checked={this.state.align == "before"} id='alignbefore' onChange={this.handleChange} />
							<label className="innerDynamicLabel ml-1" htmlFor='alignbefore'>End</label>
						</div>
					</div>
					<div>
						<label className="innerDynamicLabel">Default state*</label>

						<div>
							<input name='disabled' className="with-gap" value="false" type='radio' checked={this.state.disabled == "false"} id='dTrue' onChange={this.handleChange} />
							<label className="innerDynamicLabel ml-1" htmlFor='dTrue'>Enabled</label>
						</div>
						<div>
							<input name='disabled' className="with-gap" value="true" type='radio' checked={this.state.disabled == "true"} id='dFalse' onChange={this.handleChange} />
							<label className="innerDynamicLabel ml-1" htmlFor='dFalse'>Disabled</label>
						</div>
					</div>


					<fieldset>
						<legend><b>Validation</b></legend>
						<div>
							<div>
								<input s={12} type="checkbox" id="required" name="required" checked={this.state.required} onChange={this.handleChange} />
								<label htmlFor="required">Required?</label>
							</div>
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
									className="labelText mb-1"
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
									className="labelText mb-1"
									value={this.state.value}
									onChange={this.handleChange}
								/><div className="helper-text" >Value of dependent field.</div>
							</div>
						</fieldset>
					</fieldset>
				</div>
				<div className="right valign-wrapper mt-2">
					<Button type="button" className="btn_secondary otherButtonAddDetUpt mr-2" onClick={this.handleSubmit}>Submit</Button>
					<Button type="button" className="btn_secondary otherButtonAddDetUpt" onClick={this.props.close} >Cancel</Button>

				</div>
			</Fragment>

		);

	}


}
export default CheckboxControl;