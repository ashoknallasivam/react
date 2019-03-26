import React, { Component } from 'react';
import { Row, Col, Card, Tab,Tabs } from 'react-materialize';
import JSONInput from "react-json-editor-ajrm/index";
import locale from "react-json-editor-ajrm/locale/en";

class PageJsonadd extends Component {
	
     constructor(props) {
        super(props);
        
        // reset login status
        this.state = {
			tenantId: '1',
			json: '',
			jsonEditor: ''
            
        };
		
     this.jsonValue = this.jsonValue.bind(this);   
     this.handleSubmit = this.handleSubmit.bind(this);
	  
    }
	
	jsonValue(e, data) {
		// console.log("Json: " + e.plainText);
		//alert(JSON.stringify(e.json));
        this.setState({ 
          json: e.json
        });
		
      }	
	
	
	handleSubmit(e) {
		
        e.preventDefault();
               
        if (this.state.json) {
			this.props.createPage(this.state.json,this.props.pageId);
			
        }
		
    }	
	
	
	
  componentDidMount() {
	  	 	  
	
	
		 
  }
  

	
	componentWillReceiveProps(nextProps) {
	  if (this.props.editor !== nextProps.editor) {
		this.setState({
		  jsonEditor: nextProps.editor
		});
	  }
	}	
	

	renderAlert() {
		if (this.props.pageStatus) {
		  return (
			<div className="alert alert-danger">
			  <strong>{this.props.pageStatus}</strong> 
			</div>
		  );
		}
	  }	
	
	
	   render() {
        
			 return ( 
			    
				<div style={{ maxWidth: "1400px", maxHeight: "100%" }}>
				<form className="col-md-4" onSubmit={this.handleSubmit} >
				<Row className="margin">
                  <Col className="input-field p-0" s={12}>
					<JSONInput
					  theme="light_mitsuketa_tribute"
					  id = 'json_content_add'
					  locale={locale}
					  onChange={this.jsonValue}
					  colors={{
						string: "#990099" // overrides theme colors with whatever color value you want
					  }}
					  height="280px"
					  width="450px"
					  onKeyPressUpdate = {false}
					/>
					</Col>
					
				</Row>
			    <Row className="center submit-container">
						<button className="btn waves-light" type="submit" name="action">Save
						  
						</button> {this.renderAlert()}
				</Row>
				</form>	
				</div>
               
			 );
				
		
	
   }

}


export default PageJsonadd;
