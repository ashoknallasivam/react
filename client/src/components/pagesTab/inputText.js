import React, { Component, Fragment } from 'react';
import { Row, Input, Button, Modal, Col } from 'react-materialize';
import LoadingSpinner from './loadingSpinner';
import inputJson from './text.json';


class IntputText extends Component {

  constructor(props) {
		super(props);

		this.state = {
			inputJson: inputJson,
			selected:this.props.selected
		};
		
	  this.handleChange = this.handleChange.bind(this);
	  this.handleSubmit = this.handleSubmit.bind(this);  
    }

    componentDidMount() {
      this.setState({
			inputJson: inputJson,
			selected:this.props.selected
			
	  });
	  //console.log(inputJson);
    }
   
    componentWillReceiveProps(nextProps) {
	   this.setState({
			inputJson: inputJson,
			selected:nextProps.selected
			
	  });
	  //console.log(inputJson);
	}
	
	
	
	handleChange(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value }, () => console.log(name, value));
		
		
    }


	handleSubmit(e) {
	   
		e.preventDefault();
		
		//console.log('Send this in a POST request:', formPayload);
		//this.props.sendInput(this.state);  
		//console.log(this.props.pageJson);
		console.log(this.state);
		
		if (this.state) {
			
			this.props.sendInput(this.state);
			
		}
			
			
		
		
	 }	
	
  render() {
 
  
  return (
   <div style={{ maxWidth: "1400px", maxHeight: "100%" }}>
  
     <form onSubmit={this.handleSubmit} >
     <Row>
    
    {this.state.inputJson.layout.map(value => {
        const { type, label, name, options } = value
        if (type == 'heading') {
			return <div >
				 <h4>{value.label}</h4>
				 
				</div>;
			
		}else  if (type == 'text') {
			
			if (name == 'type') {
			   return <div >
				 <Input
				 s={6}
				 label={value.label}
				 id={value.name}
				 name={value.name}
				 type={value.type}
				 value={this.state.selected}
				 minLength={value.options.validation.minLength}
				 maxLength={value.options.validation.maxLength}
				 onChange={this.handleChange}
				 disabled
				/>
    			</div>
				;
			} else {
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
				
			}
			
			
			
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
         
      <input type="submit" className="btn" value="Submit" />
	  </Col>
    </Row> 
     
    </form>
		
		</div>
		);
	 
	 
	

	
	

  }	 
	

}
export default IntputText;