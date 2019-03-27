import React, { Component } from 'react';
import { Row, Col, Card, Tab,Tabs } from 'react-materialize';
import { Link, withRouter } from 'react-router-dom';
import SimpleForm from './SimpleForm';
import Select from 'react-select';
import env from './controls.json';
import PageJsonadd from './pagejsonadd';
import PageForm from './pageform';
import PageJson from './pagejson_copy';

//const scaryAnimals = env;

const schema = {
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

	

	
	
class Pages extends Component {
	
     constructor(props) {
        super(props);
		this.state = {
			jsonEditor: '',
			controls: null,
			schema: schema
        };
	  this.CreatePage = this.CreatePage.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
	  
    }	
	
	  componentDidMount() {
		//this.props.test();
	  }
	 
    handleChange(e) {
        const { name, value } = e.target;
        //this.setState({ [name]: value });
    }
	
    handleSubmit(e) {
 		e.preventDefault();
		this.setState({ submitted: true });
		//const { controls } = this.state;
		//alert(controls);
		
    } 
	
   CreatePage(event){
	 
	  this.props.viewEditor();
	}
	
	componentWillReceiveProps(nextProps) {
	  if (this.props.editor !== nextProps.editor) {
		this.setState({
		  jsonEditor: nextProps.editor
		});
	  }
	  
	}
	

   render(props) {
	   
	  	   const customStyles = { input: styles => {  return { ...styles, height: '1.7em'};  }}
	  	   const { schema, submitted, controls } = this.state;
		  
           
		   
		   return ( 
		    
		   
			 <div>
			  <Row >
				   <Col className="input-field center">	   
				    <h4>Dynamic Pages</h4>
				   </Col>
				 </Row>
	      <form className="col-md-4" onSubmit={this.handleSubmit} >
	             <Row className="margin">
				  
               {/* <Col className="input-field p-0" s={2}>
			   
                <Select styles={customStyles} options={scaryAnimals} onChange={opt => this.setState({ controls: opt.value }) } required/>
               
			   </Col> */}
			   <Col className="input-field p-0" s={2}>
			   
                <button className="btn waves-light" type="submit" name="action" >Create Page</button>
               </Col>

             </Row> 
			 </form>
			 
			 
			 		 {submitted == true ? (
					 
				<div>
				
				
			   <Row id="login-page">
					<Col className="z-depth-4 " s={12} m={6} l={4} xl={4}>
						
						
						{/*<NewForm/>*/}
						
					   
				   </Col>
				   <Col className="z-depth-4 " s={12} m={6} l={4} xl={6}>
				        <PageJson pageJson={schema}/>
						

				   </Col>
			   </Row>
			  </div>
           ) : (
          ''
          )}
		 
            <Col className="p-0" s={2}>
				 {/*<SimpleForm fields={fields} controls={controls} onSubmit={() =>{}}/>*/}
			  </Col>
			  </div>
		 );

		 
	}

}

export default Pages;
