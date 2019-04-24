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
				</CollapsibleItem>
			</Collapsible>
		);
	}
}
export default StaticControl;