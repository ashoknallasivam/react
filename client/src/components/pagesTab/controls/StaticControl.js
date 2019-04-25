import React, { Component, Fragment } from 'react';
import { Row, Col, Tab, Tabs, Input, Icon, Button, Modal, Collapsible, CollapsibleItem } from 'react-materialize';

class StaticControl extends Component {
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
				<CollapsibleItem header="Static" icon="keyboard_arrow_down">
					<div>
						<h5><b>Static Configuration</b></h5>
					</div>
					<div>
						<Input s={12} label="Element type" id="type" name="type" type="text" value="static" disabled required />
					</div>
					<label class="pl-3" >Label * </label>
					<div className="helper-text" >What the user sees</div>
					<div>
						<Collapsible accordion={false}>
							<CollapsibleItem header='options' icon="keyboard_arrow_down">
								<fieldset><legend><b>Show If?</b></legend>
									<div>
										<Input s={12} className="mb-0" label="Property name" id="property" name="property" type="text"
											value="" autoComplete='off' onChange={this.handleChange} />
										<div className="helper-text" >Property name of field dependency.</div>
									</div>
									<div>
										<Input s={12} className="mb-0" label="Property value" id="value" name="value" type="text"
											value="" onChange={this.handleChange} />
										<div className="helper-text" >Value of dependent field.</div>
									</div>
								</fieldset>
							</CollapsibleItem>
						</Collapsible>
					</div>
				</CollapsibleItem>
			</Collapsible>
		);
	}
}
export default StaticControl;