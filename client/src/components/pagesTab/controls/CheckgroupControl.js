import React, { Component, Fragment } from "react";
import {
	Row,
	Col,
	Tab,
	Tabs,
	Input,
	Icon,
	Button,
	Modal,
	Collapsible,
	CollapsibleItem
} from "react-materialize";

class CheckgroupControl extends Component {
	constructor(props) {
		super(props);

		this.state = {
			fieldId: 0,
			fields: [0]
		};

		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount() { }

	componentWillReceiveProps(nextProps) { }

	addFields = () => {
		let fieldId = this.state.fieldId;
		fieldId = fieldId + 1;
		let fields = [...this.state.fields, fieldId];
		this.setState({
			fieldId,
			fields
		});
	};
	removeField(index) {
		let fields = this.state.fields;
		let delIndex = fields.indexOf(index);
		fields.splice(delIndex, 1);
		this.setState({
			fields
		});
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
				<CollapsibleItem header="CheckboxGroup" icon="keyboard_arrow_down">
					<div>
						<h5>
							<b>CheckboxGroup Configuration</b>
						</h5>
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
						/>
						<div className="helper-text">A unique element name</div>
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
						/>
						<div className="helper-text">The text the user sees</div>
					</div>
					<div>
						<div>
							<input
								s={12}
								type="checkbox"
								id="required"
								name="required"
								onChange={this.handleChange}
							/>
							<label htmlFor="required">Required?</label>
						</div>
					</div>
					<div>
						<Input
							s={12}
							label="Hint"
							id="hint"
							name="hint"
							type="text"
							value={this.state.hint}
							onChange={this.handleChange}
						/>
						<div className="helper-text">Give user a hint</div>
					</div>
					<div>
						<legend>
							<b>Show If?</b>
						</legend>
						<div>
							<Input
								s={12}
								label="Property name"
								id="property"
								name="property"
								type="text"
								value={this.state.property}
								onChange={this.handleChange}
							/>
							<div className="helper-text">
								Property name of field dependency.
              </div>
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
							/>
							<div className="helper-text">Value of dependent field.</div>
						</div>
					</div>
					<div>
						<h5>Validation</h5>
						<Input
							s={12}
							label="Require at least this many to be checked"
							id="requiredMin"
							name="requiredMin"
							type="number"
							value={this.state.value}
							onChange={this.handleChange}
						/>
					</div>
					<div>
						<h5>Fields</h5>
						{this.state.fields.map((data, index) => {
							return (
								<Row id={data} className="">
									<div className="d-flex">
										<Input
											s={12}
											label="Element type"
											id="type"
											name="type"
											type="text"
											value="checkbox"
											disabled
											required
										/>{" "}
										<Button
											type="button"
											className="orgIcon col s12 m2 l2 xl2 mt-8"
											name="deleteOrg"
											onClick={this.removeField.bind(this, data)}
										>
											<i className="material-icons" title="Delete">
												delete
                      </i>
										</Button>
									</div>
									<div>
										<Input
											s={12}
											label="Name*"
											id="name"
											name="name"
											type="text"
											value={this.state.name}
											required
											onChange={this.handleChange}
										/>

										<div className="helper-text">A unique element name</div>
									</div>
									<div>
										<Input
											s={12}
											label="Label*"
											id="label"
											name="label"
											type="text"
											value={this.state.label}
											required
											onChange={this.handleChange}
										/>
										<div className="helper-text">The text the user sees</div>
									</div>

									<Collapsible accordion={false}>
										<CollapsibleItem
											header="options"
											icon="keyboard_arrow_down"
										>
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

											<Row>
												<Col s={12}>
													<Collapsible accordion={false}>
														<CollapsibleItem
															header="Other specify"
															icon="keyboard_arrow_down"
														>
															<div>
																<Input
																	s={12}
																	label="Element type"
																	id="type"
																	name="type"
																	type="text"
																	value="text"
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
																	value={this.state.name}
																	required
																	onChange={this.handleChange}
																/>

																<div className="helper-text">
																	A unique element name
                            </div>
															</div>
															<div>
																<Input
																	s={12}
																	label="Label*"
																	id="label"
																	name="label"
																	type="text"
																	value={this.state.label}
																	required
																	onChange={this.handleChange}
																/>
																<div className="helper-text">
																	The text the user sees
                            </div>
															</div>

															<Collapsible accordion={false}>
																<CollapsibleItem
																	header="options"
																	icon="keyboard_arrow_down"
																>
																	<div>
																		<Input
																			s={12}
																			label="Hint"
																			id="hint"
																			name="hint"
																			type="text"
																			value={this.state.hint}
																			onChange={this.handleChange}
																		/>
																		<div className="helper-text">
																			Give user a hint
                                </div>
																	</div>

																	<div>
																		<h5>Validation</h5>
																	</div>
																	<div>
																		<legend>
																			<b>Required If?</b>
																		</legend>
																		<div>
																			<Input
																				s={12}
																				label="Property name"
																				id="property"
																				name="property"
																				type="text"
																				value={this.state.property}
																				onChange={this.handleChange}
																			/>
																			<div className="helper-text">
																				Property name of field dependency.
                                  </div>
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
																			/>
																			<div className="helper-text">
																				Value of dependent field.
                                  </div>
																		</div>
																	</div>
																</CollapsibleItem>
															</Collapsible>
														</CollapsibleItem>
													</Collapsible>
												</Col>
											</Row>
											<div>
												<h5>Validation</h5>
											</div>
											<div>
												<div>
													<input
														s={12}
														type="checkbox"
														id="requiredField"
														name="requiredField"
														onChange={this.handleChange}
													/>
													<label htmlFor="required">Required?</label>
												</div>
											</div>
										</CollapsibleItem>
									</Collapsible>
								</Row>
							);
						})}
						<Button
							type="button"
							className="orgIcon s12 m2 l2 xl2"
							name="addPage"
							onClick={this.addFields}
						>
							<i className="material-icons" title="Add Control">
								add_circle
              </i>
						</Button>
					</div>
				</CollapsibleItem>
			</Collapsible>
		);
	}
}
export default CheckgroupControl;
