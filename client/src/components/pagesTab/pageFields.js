import React from "react";
import ReactDOM from "react-dom";
import { Row, Col, Tab,Tabs,Input,Icon } from 'react-materialize';

class PagePreview extends React.Component {
  constructor(props) {

    super(props);
	
	
	this.state = {
            submitted: false,
			values: [],
			key: '',
			collection:'',
			title:'',
			subtitle:'',
			layout: []
			
			
    };
   
    this.handleSubmit = this.handleSubmit.bind(this);    
	this.handleChange = this.handleChange.bind(this);
	//this.removeClick = this.removeClick.bind(this);
  }

	componentDidMount() {
		//alert(this.props.pageId)
		
		
			
	}
	
	componentWillReceiveProps(nextProps) {
    
   
  }

 createUI(){
     return this.state.values.map((el, i) => 
          <div key={i}>
		    <a className="btn-floating btn-small grey" onClick={this.removeClick.bind(this, i)}><i className="material-icons">delete_outline</i></a>
		   <Col className="input-field p-0" s={12}>
		         <input id="name" name="name" type="text" className="pl-0" defaultValue='' onChange={this.handleChange} required/>
                 <label htmlFor="name" className="center-align">Name</label>
            </Col>
			<Col className="input-field p-0" s={12}>
                 <input id="label" name="label" type="text" className="pl-0" defaultValue='' onChange={this.handleChange} required/>
                 <label htmlFor="label" className="center-align">Label</label>
            </Col>
			<Col className="input-field p-0" s={12}>
                 <input id="minLength" name="minLength" type="number" className="pl-0" defaultValue='' onChange={this.handleChange} required/>
                 <label htmlFor="min" className="center-align">Minimum Length</label>
            </Col>
			<Col className="input-field p-0" s={12}>
                 <input id="maxLength" name="maxLength" type="number" className="pl-0" defaultValue='' onChange={this.handleChange} required/>
                 <label htmlFor="max" className="center-align">Maximum Length</label>
            </Col>
			<Col className="input-field p-0" s={12}>
                 <Input s={12} name='required' id='required' type='select' className="pl-0" label='Required' defaultValue='' onChange={this.handleChange} required>
				   <option value=''>Select</option>
				   <option value='true'>Yes</option>
				   <option value='false'>No</option>
				  </Input>
            </Col>
			
    	    
         </div>            
     )
  }

   handleChange(e) {
	    const { name, value } = e.target;
        this.setState({ [name]: value }, () => console.log(name, value));
   }
   
   handleChange1(i, event) {
     let values = [...this.state.values];
	  const { name, value } = event.target;
     values[i][{name}] = {value};
     this.setState({ values });
	 
     
     ///this.setState({ values[i][name]:value });
   }
  
  
  
  addClick(){
    this.setState(prevState => ({ values: [...prevState.values, '']}))
  }
  
  removeClick(i){
     let values = [...this.state.values];
     values.splice(i,1);
     this.setState({ values });
  }

  handleSubmit(e) {
   
    e.preventDefault();
	const formPayload = {
			name: this.state.name,
			label: this.state.label,
			min: this.state.min,
			max: this.state.max,
			required: this.state.required,
			
	};
     
	console.log('Send this in a POST request:', formPayload);
	//console.log(this.props.pageJson);
	//console.log(this.state);
	
	//if (this.state) {
		
		//this.props.updatePage(formPayload,this.props.pageId);
		
	//}
		
		
	
	
  }
  
 
  
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  
	

  render() {
 
  
  return (
   <div style={{ maxWidth: "1400px", maxHeight: "100%" }}>
   <form onSubmit={this.handleSubmit} >
    <Row>
	 <Col className="input-field p-0" s={12} m={6} l={4} xl={6} > 
	<Input s={12} name='type' id='type' type='select' className="pl-0" label='Controls' onChange={this.handleChange} required>
	  <option value=''>Select Control</option>
	   <option value='input'>Input</option>
	   <option value='email'>Email</option>
	   {/*<option value='radio'>Radio</option>
	   <option value='checkbox'>Checkbox</option>
	   <option value='textarea'>TextArea</option>
	   <option value='numeric'>Numeric</option>
	   <option value='date_picker'>DatePicker</option>
	   <option value='time_picker'>TimePicker</option>*/}
	  
	</Input>
	 </Col>
	 <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={6} >
       <button className="btn " type="submit" name="action" onClick={this.addClick.bind(this)}>Attributes
          <i className="material-icons right">add</i>
       </button>
     
	  </Col>
	  <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={12} > 
	  {this.createUI()}     
		
		
	 </Col>
     </Row>
  
    

	<Row>
	 <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={8} >
         
      <input type="submit" className="btn" value="Submit" />
	  </Col>
    </Row> 
	 	
    
    </form>
		
		</div>
		);
	 
	 
	

	
	

  }
}

export default PagePreview;