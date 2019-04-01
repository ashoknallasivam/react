import React from "react";
import ReactDOM from "react-dom";
import { Row, Col, Tab,Tabs,Input,Icon } from 'react-materialize';
import TextInput from './text';

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
		   <Text />
			
    	    
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
	 <TextInput />
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