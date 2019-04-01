import React, { Component, Fragment } from "react";
import { Input, Button, Modal } from 'react-materialize';

class FormDeleteModal extends Component {
    constructor(props){
        super(props);
        this.state={
          selectedOrganisation:{
            name:''
          },
          selectedLocation:{
            name:''
          },
           
    }
  
  }
  componentWillReceiveProps(props){
    
    this.setState({
      orgsList : props.orgsList,
      selectedOrganisation: props.selectedOrganisation,
      selectedLocation : props.selectedLocation
    })
  }

    _handleClose = () =>{
        this.props.handleModalClose(this.props.name)
    }
    _handleOrg = () => {
        let newOrg = {
          ...this.state.selectedOrganisation,
          statusFlag : "delete"
        };
       
            let arrIndex='';
            let allOrganisations ={...this.props.allOrganisations}
            delete  allOrganisations[this.state.selectedOrganisation.id]
            let orgsList =this.props.orgsList
            orgsList.map((item,i)=>{
                if(item.id == this.state.selectedOrganisation.id){
                    arrIndex = i;
                  }
            })
            orgsList.splice(arrIndex,1)
            this.setState({ 
              selectedOrganisation:{
                name:''
              }
         });
         this.props.setValues('allOrganisations',allOrganisations) 
         this.props.setValues('orgsList', orgsList)
         this.props.handleModalClose(this.props.name)

          }
      
      _handleLoc = () => {
              let newLoc = {...this.state.selectedLocation,
              statusFlag : 'delete'};
              let arrIndex='';           
              let allLocations ={...this.props.allLocations}
              delete allLocations[this.state.selectedLocation.id]
              let orgsList =this.props.orgsList;
                  orgsList.map((item,i)=>{
                    if(item.id == this.state.selectedLocation.id){
                      arrIndex = i;
                    }
                  });
                  orgsList.splice(arrIndex,1);
                  this.setState({
                    selectedLocation:{
                      name:''
                    }
                  })
           this.props.setValues('allLocations',allLocations)
           this.props.setValues('orgsList',orgsList)
           this.props.handleModalClose(this.props.name)
            }
        
 render(){
     return(
         <Modal open={this.props.open} 
                name={this.props.name}  
                header= {this.props.header} 
                handleModalClose={this.props.handleModalClose}
                > 
                <h6> delete  {(this.props.name == 'deleteLoc')? this.state.selectedLocation.name : this.state.selectedOrganisation.name } ?</h6>
                       
                       
                        <div className="col s12 m12 l12 xl12">
                                    <Button className="btn_secondary  otherButtonAddDetUpt modalButton mb-2 ml-1" onClick={this._handleClose}>Cancel</Button>
                                    {this.props.name == "deleteLoc"&&  
                                        <Button className='btn_secondary modalButton otherButtonAddDetUpt mb-2' 
                                        onClick={this._handleLoc }>Delete</Button>
                                    }
                                    { this.props.name =="deleteOrg"  &&
                                        <Button className='btn_secondary modalButton otherButtonAddDetUpt mb-2' 
                                        onClick={ this._handleOrg }>Delete</Button>
                                    } 
                        </div>
                    
         </Modal>  
      

     )
 }
}

export default FormDeleteModal;