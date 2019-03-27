import React from "react";
import { connect } from 'react-redux';
import * as actions from '../../actions/page.actions';
import ReactDOM from "react-dom";
import { Row, Col, Tab,Tabs,Input,Icon } from 'react-materialize';

class DynamicForm extends React.Component {
  constructor(props) {

    super(props);
	
	this.props.test();
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
		
		this.setState({
			key: this.props.pageJson.key,
			collection: this.props.pageJson.collection,
			title: this.props.pageJson.title,
			subtitle: this.props.pageJson.subtitle,
			layout: this.props.pageJson.layout
		});
			
	}
	
	componentWillReceiveProps(nextProps) {
    
    this.setState({
      key: nextProps.pageJson.key,
      collection: nextProps.pageJson.collection,
      title: nextProps.pageJson.title,
      subtitle: nextProps.pageJson.subtitle,
      layout: nextProps.pageJson.layout
    });
  }

 createUI(){
     return this.state.values.map((el, i) => 
          <div key={i}>
		  
		  
		  
    	    <input s={6} type="text" defaultValue={el||''} onChange={this.handleChange.bind(this, i)} />
			
    	    <input type='button' className="btn waves-light" value='remove' onClick={this.removeClick.bind(this, i)}/>
         </div>            
     )
  }

   handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value }, () => console.log(name, value));
		
		
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
			key: this.state.key,
			collection: this.state.collection,
			title: this.state.title,
			subtitle: this.state.subtitle,
			layout: this.state.layout
	};
     // alert('A name was submitted: ' + this.state.values.join(', '));
	//console.log('Send this in a POST request:', formPayload);
	//console.log(this.props.pageJson);
	//console.log(this.state);
	
	if (this.state) {
		
		this.props.updatePage(formPayload,this.props.pageId);
		
	}
		
		
	
	
  }
  
 
  
  // You can tell React to skip applying an effect if certain values haven’t changed between re-renders. [ props ]

  
	

  render() {
 
  
  return (
    <div style={{ maxWidth: "1400px", maxHeight: "100%" }}>
  <form onSubmit={this.handleSubmit} >
    <Row>
	
     <Input s={8} label="Key" id="key" name="key" type="text" value={this.state.key} validate onChange={this.handleChange} required/>

     </Row>
     <Row>
        <Input s={8} label="Collection" id="collection" name="collection" type="text" value={this.state.collection} validate onChange={this.handleChange} required/>
     </Row>
     <Row>
        <Input s={8} label="Title" id="title" name="title" type="text" value={this.state.title} validate onChange={this.handleChange} required/>
     </Row>
     <Row>
        <Input s={8} label="Sub Title" id="subtitle" name="subtitle" type="text" value={this.state.subtitle} validate onChange={this.handleChange} required />
     </Row>
   


    <Row>
    
    {this.state.layout.map(value => {
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
               return  <Input name={value.name} type={value.type} defaultValue={itemval.value} label={itemval.label} onChange={this.handleChange}/>
              
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
    

	<Row>
	 <Col className="z-depth-8 mr-0" s={12} m={6} l={4} xl={8} >
      {this.createUI()}        
      <input type='button' className="btn" value='add fields' onClick={this.addClick.bind(this)}/>
      <input type="submit" className="btn" value="Submit" />
	  </Col>
    </Row> 
	 	
    
    </form>
		
		</div>
		);
	 
	 
	

	
	

  }
}


function mapStateToProps(state) {
  return { bounds: state.page.bounds, 
  pageContent: state.page.pages, 
  pageJson: state.page.pagejson , 
  pageId: state.page.pageid, 
  pageStatus: state.page.pagestatus, 
  testmessage: state.page.testmessage, 
  editor: state.page.editor };
}

export default connect(mapStateToProps, actions)(DynamicForm);