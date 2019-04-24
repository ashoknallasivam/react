import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';

class SsnControl extends Component {
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
				<CollapsibleItem header="Ssn" icon="keyboard_arrow_down">
					<div>
						<h5><b>Ssn Configuration</b></h5>
					</div>
					<div>
						<Input s={12} label="Element type" id="type" name="type" type="text" value="ssn" disabled required />
					</div>
					<div>
						<Input s={12} className="mb-0" label="Name *" id="name" name="name" type="text" value="" required
							onChange={this.handleChange} />
						<div className="helper-text" >A unique element name</div>
					</div>
					<div>
						<Input s={12} className="mb-0" label="Label *" id="label" name="label" type="text" value="" required
							onChange={this.handleChange} />
						<div className="helper-text" >The text the user sees</div>
					</div>
					<div>
						<Collapsible accordion={false}>
							<CollapsibleItem header='options' icon="keyboard_arrow_down">
								<div>
									<Input s={12} className="mb-0" name="hint" type="text" value="Hint" disabled required />
									<div className="helper-text" >Give user a hint</div>
								</div>
								<div>
									<Input s={12} className="mb-0" label="Default value" id="defaultValue" name="defaultValue" type="text" value=""
										onChange={this.handleChange} />
									<div className="helper-text" >Provide a default value</div>
								</div>
								<div>
									<Input s={12} className="mb-0" name="inputMask" type="text" value="Input mask" disabled required />
									<div className="helper-text" >Enter the input mask.</div>
								</div>
								<div><h5>Validation</h5></div>
								<div>
									<div>
										<input s={12} type="checkbox" className='filled-in' id="required" name="required" onChange={this.handleChange} />
										<label htmlFor="required">Required?</label>
									</div>
								</div>
								<div>
									<Input s={12} className="mb-0" label="Minimum length" id="minimumLength" name="minimumLength" type="number" value=""
										onChange={this.handleChange} />
									<div className="helper-text" >The minimum characters that must be entered</div>
								</div>
								<div>
									<Input s={12} className="mb-0" label="Maximum length" id="maximumLength" name="maximumLength" type="number" value=""
										onChange={this.handleChange} />
									<div className="helper-text" >The maximum characters that can be entered</div>
								</div>
								<div>
									<Input s={12} className="mb-0" name="pattern" type="text" value="Pattern" disabled required />
									<div className="helper-text" >The pattern that can be entered.</div>
								</div>
								<div>
									<Input s={12} className="mb-0" name="patternValidationMessage" type="text" value="Pattern validation message" disabled required />
									<div className="helper-text" >Error message for text not matching pattern.</div>
								</div>
								<div>
									<legend><b>Required If?</b></legend>
									<div>
										<Input s={12} className="mb-0" label="Property name" id="property" name="property" type="text"
											value="" onChange={this.handleChange} />
										<div className="helper-text" >Property name of field dependency.</div>
									</div>
									<div>
										<Input s={12} className="mb-0" label="Property value" id="value" name="value" type="text"
											value="" onChange={this.handleChange} />
										<div className="helper-text" >Value of dependent field.</div>
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
export default SsnControl;