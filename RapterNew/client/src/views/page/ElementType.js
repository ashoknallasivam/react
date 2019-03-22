import React from "react";
import ReactDOM from "react-dom";
import { Row, Col, Tab,Tabs,Input,Icon } from 'react-materialize';
import env from './controls.json';
const scaryAnimals = env;

		const schema1 = {
		  key: 'profile',
		  collection: 'cases',
		  title: 'Participant profile',
		  subtitle: 'Edit participant’s profile with new or changed contact information.',
		  layout: [
			{
			  type: 'text',
			  name: 'firstName',
			  label: 'First name',
			  options: {
				items: [
				  {}
				],
				validation: {
				  required: true,
				  minLength: 2,
				  maxLength: 30
				}
			  }
			},
			{
			  type: 'text',
			  name: 'middleName',
			  label: 'Middle name',
			  options: {
				items: [
				  {}
				],
				validation: {}
			  }
			},
			{
			  type: 'text',
			  name: 'lastName',
			  label: 'Last name',
			  options: {
				items: [
				  {}
				],
				validation: {
				  required: true,
				  minLength: 2,
				  maxLength: 30
				}
			  }
			},
			{
			  type: 'text',
			  name: 'nickname',
			  label: 'Nickname',
			  options: {
				items: [
				  {}
				],
				validation: {}
			  }
			},
			{
				  type: 'radio',
				  name: 'gender',
				  label: 'Gender',
				  options: {
					vertical: true,
					validation: {
					  required: true
					},
					items: [
					  {
						value: 'female',
						label: 'Female',
						options: {
						  specify: {
							options: {
							  validation: {}
							}
						  }
						}
					  },
					  {
						value: 'male',
						label: 'Male',
						options: {
						  specify: {
							options: {
							  validation: {}
							}
						  }
						}
					  },
					  {
						value: 'other',
						label: 'Other',
						options: {
						  specify: {
							type: 'text',
							name: 'genderOther',
							label: 'Please specify',
							options: {
							  validation: {
								requiredIf: {
								  property: 'gender',
								  value: 'other'
								}
							  }
							}
						  }
						}
					  }
					],
					disabled: false
				  }
				},			
				{
					  type: 'checkbox',
					  name: 'noContact',
					  label: 'Applicant does not have any contacts.',
					  options: {
						align: 'start',
						disabled: false,
						validation: {}
					  }
				},
				{
					type: 'email',
					name: 'email',
					label: 'Email',
					options: {
					  validation: {
						requiredIf: {
						  property: 'noEmail',
						  value: 'false'
						}
					  }
					}
				},
				  {
					type: 'select',
					name: 'relationshipType',
					label: 'Relationship type',
					options: {
					  validation: {},
					  items: [
						{
						  value: 'mother',
						  label: 'Mother',
						  options: {
							specify: {
							  options: {
								validation: {}
							  }
							}
						  }
						},
						{
						  value: 'father',
						  label: 'Father',
						  options: {
							specify: {
							  options: {
								validation: {}
							  }
							}
						  }
						},
						{
						  value: 'friend',
						  label: 'Friend',
						  options: {
							specify: {
							  options: {
								validation: {}
							  }
							}
						  }
						},
						{
						  value: 'grandparent',
						  label: 'Grandmother/grandfather',
						  options: {
							specify: {
							  options: {
								validation: {}
							  }
							}
						  }
						},
						{
						  value: 'sibling',
						  label: 'Sister/brother',
						  options: {
							specify: {
							  options: {
								validation: {}
							  }
							}
						  }
						},
						{
						  value: 'child',
						  label: 'Son/daughter',
						  options: {
							specify: {
							  options: {
								validation: {}
							  }
							}
						  }
						},
						{
						  value: 'spouse',
						  label: 'Spouse/partner',
						  options: {
							specify: {
							  options: {
								validation: {}
							  }
							}
						  }
						},
						{
						  value: 'other',
						  label: 'Other',
						  options: {
							specify: {
							  type: 'text',
							  name: 'relationshipOther',
							  label: 'Please specify',
							  options: {
								validation: {
								  requiredIf: {
									property: 'relationshipType',
									value: 'other'
								  }
								}
							  }
							}
						  }
						}
					  ]
					}
				  },				
				  {
					  type: 'date',
					  name: 'startDate',
					  label: 'Actual start date',
					  options: {
						hint: 'MM/DD/YYYY',
						startAt: {},
						validation: {
						  required: true,
						  minDate: {},
						  maxDate: {}
						}
					  }
				  },
				  {
					  type: 'time',
					  name: 'startTime',
					  label: 'Actual start time',
					  options: {
						validation: {
						  required: true
						}
					  }
				  },			
		  ]
		}


class NewForm extends React.Component {
  constructor(props) {
	 
    super(props);
	
	this.state = {
            submitted: false,
			shareholders: [{ name: "" }],
            schema: [{ schema1 }]
        };
	
	this.handleChange = this.handleChange.bind(this);
  }

  handleNameChange = evt => {
    this.setState({ name: evt.target.value });
  };
  
  
      handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
		
		
    }
	

  handleShareholderNameChange = idx => evt => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  };

  handleSubmit = evt => {
    const { name, shareholders } = this.state;
    alert(`Incorporated: ${name} with ${shareholders.length} shareholders`);
  };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: "" }])
    });
  };

  handleRemoveShareholder = idx => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx)
    });
  };

  render() {
	  
	const { submitted,schema } = this.state; 
	 
	    console.log(this.state.schema);
		console.log(schema1);
	 
        return (
		<form className="col-md-4" onSubmit={this.handleSubmit} >
		<Row>
			  <Input s={12} label="Key" id="key" name="key" type="text" value={schema1.key} validate defaultValue='case-access-denied' onChange={this.handleChange} required/>
		 </Row>
		 <Row>
			  <Input s={12} label="Collection" id="collection" name="collection" type="text" value={schema1.collection} validate defaultValue='cases' onChange={this.handleChange} required/>
		 </Row>
		 <Row>
			  <Input s={12} label="Title" id="title" name="title" type="text" value={schema1.title} validate defaultValue='Access denied' onChange={this.handleChange} required/>
		 </Row>
		 <Row>
			  <Input s={12} label="Sub Title" id="subtitle" name="subtitle" type="text" value={schema1.subtitle} validate defaultValue='You do not have access to the details of this case.' onChange={this.handleChange} required />
		 </Row>
		 <Row>
		
            {schema1.layout.map(value => {
				const { type, label, name } = value
				
				if (type == 'text') {
					 return <div >
					   <Input
						 s={6}
						 label={value.label}
						 id={value.name}
						 name={value.name}
						 type={value.type}
						 minLength={value.options.validation.minLength}
						 maxLength={value.options.validation.maxLength}
						 onChange={this.handleChange}
						/>
						</div>;
				} else if (type == 'radio') {
					 return <div >
					     <h5>{value.label}</h5>
						 {value.options.items.map(itemval => {
					     return   <Input name={value.name} type={value.type} value={itemval.value} label={itemval.label} onChange={this.handleChange}/>
							
					     })}
					    </div>;
				} else if (type == 'checkbox') {
					 return <div >
					     <Input s={12} name={value.name} type={value.type} label={value.label} onChange={this.handleChange}/>
 					     </div>;
				} else if (type == 'email') {
					 return <div >
					   <Input
						 s={6}
						 label={value.label}
						 id={value.name}
						 name={value.name}
						 type={value.type}
						 onChange={this.handleChange}
						/>
						</div>;
				} else if (type == 'select') {
					 return <div >
					     <Input s={6} name={value.name} type={value.type} label={value.label} defaultValue='' onChange={this.handleChange}>
						 {value.options.items.map(itemval => {
					     return   <option value={itemval.value}>{itemval.label}</option>
							
					     })}
						 </Input>
					    </div>;
						
				} else if (type == 'date') {
					 return <div >
					     <Input s={6} type={value.type} label={value.label} format='dd/mm/yyyy' onChange={this.handleChange}>
						 
						 
						 </Input>
					    </div>;
						
				}else if (type == 'time') {
					 return <div >
					     <Input s={6} type={value.type} label={value.label} onChange={this.handleChange}>
						 
						 
						 </Input>
					    </div>;
						
				}
				
				
               
            })}
        
		</Row>
		
 		
		
		{/*
        {this.state.shareholders.map((shareholder, idx) => (
		
          <div className="shareholder">
		 
		  
			  <Row>
			  <Input s={12} type='select' label="Element Type" defaultValue='2'>
			    <option value='text'>Text Box</option>
				<option value='textarea'>Text Area</option>
				<option value='email'>Email</option>
				<option value='number'>Numberic</option>
				<option value='checkbox'>Checkbox</option>
				<option value='radio'>Radio Button</option>
				<option value='select'>Select Box</option>
			  </Input>
			</Row>
		  <h6>Attributes</h6>
		    <Row>
			  <Input s={6} label="Field Name" validate></Input>
			  <Input s={6} label="Field Label" validate type='tel'></Input>
			</Row>
            <Row>
			  <Input s={6} label="Default Value" validate defaultValue='Alvin' onChange={this.handleShareholderNameChange(idx)}/>
			</Row>
			
			<h6>Validation</h6>
			
			
			<Row>
				<Input name='group1' type='checkbox' value='Required' label='Required' className='filled-in' />
			</Row>

			
			
			
            <button
              type="button"
              onClick={this.handleRemoveShareholder(idx)}
              className="btn waves-light"
            >
               <Icon>delete</Icon>Delete Element
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={this.handleAddShareholder}
          className="btn waves-light"
        >
          <Icon>add</Icon>Add Element
        </button>
		
		
		
		 <button className="btn waves-effect waves-light" type="submit" name="action">
                          Submit <i className="mdi-content-send right"></i>
  </button> */}
        
       </form> 		
		
		
		
		
		);
	 
	 
	

	
	

  }
}

export default NewForm;