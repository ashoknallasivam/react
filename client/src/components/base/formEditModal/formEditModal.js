import React, { Component, Fragment } from "react";
import { Input, Button, Modal } from 'react-materialize';

class FormEditModal extends Component {
    constructor(props){
        super(props);
        this.state={
            orgName:'',
            locName:'',
            parenOfLoc:{
              value:''
            },
            newOrg:0
    }
  
  }
  componentWillReceiveProps(props){
    this.setState({
      orgsList : props.orgsList,
      selectedOrganisation: props.selectedOrganisation,
      selectedLocation : props.selectedLocation
    })
  }

    _input =(e)=>{
       
      if(e.target.name === "parenOfLoc"){ 
        let data =  this.props.orgsList.filter(item =>{
          return   (item.id == e.target.value) ? item : null ;
          })
          this.setState({
            parenOfLoc : data[0]
        })
      }
     
      else if (e.target.name === "locName"){
        this.setState({
          [selectedLocation[name]] :e.target.value
      })
      }
      else if (e.target.name === "ogName"){
        this.setState({
          [selectedOrganisation[name]] :e.target.value
      })
      }
    }

    _handleClose = () =>{
        this.setState({
          orgName:'',
          locName:'',
          parenOfLoc:{
            value:''
          },
        })
        this.props.handleModalClose(this.props.name)
    }
    _handleOrg = () => {
        let newOrg = {};
        if (this.state.orgName !== '') {
          newOrg.id =this.state.selectedOrganisation.id;
          newOrg.level = 0;
          newOrg.name = this.state.selectedOrganisation.name;
          newOrg.tenantID = 0;
          newOrg.ttoId = null;
          newOrg.parentId = null;
          newOrg.flag = 'modified';
          let isDuplicate = this.props.orgsList.map((iteratedValue) => {
            if (iteratedValue.name === this.state.orgName) {
              return true
            }
          });
          if (isDuplicate.includes(true) )  {
                window.Materialize.toast('Already Exist', 5000)
          } else {

            let allOrganisations ={...this.props.allOrganisations}
            allOrganisations[id] = newOrg;
            let orgsList =this.props.orgsList
            orgsList.map((item,i)=>{
                if(item.id == this.state.selectedOrganisation.id){
                    orgsList[i] = newOrg
                }
            })
            this.setState({ 
              orgName:'',
              newOrg : this.state.newOrg+1 ,
              parenOfLoc:{
                value:''
              },

         });

        console.log(allOrganisations)
        console.log(orgsList)
         this.props.setValues('allOrganisations',allOrganisations) 
         this.props.setValues('orgsList', orgsList)
         this.props.handleModalClose(this.props.name)
          }
        }
      }
      _handleLoc = () => {
        let newLoc = {};
        if (this.state.locName !== '') {
            // const parent = this.props.allOrganisations.concat(this.props.allLocations);
            newLoc.id = "L" + this.state.newOrg;
            newLoc.level = this.state.parenOfLoc.level + 1;
            newLoc.parentId = this.state.parenOfLoc.id;
            newLoc.ttoId = this.state.parenOfLoc.ttoId == null ? this.state.parenOfLoc.id : this.state.parenOfLoc.ttoId;
            newLoc.name = this.state.locName;
            newLoc.tenantID = this.state.parenOfLoc.tenantID;
            newOrg.flag = 'modified';
            const isDuplicatte = this.props.orgsList.map((iteratedValue)=>{
                if(iteratedValue.name === this.state.locName){
                    return true
                }
            });

            if (isDuplicatte.includes(true)) {
                window.Materialize.toast('Already Exist', 5000)
                return false;
            } else if(this.state.parenOfLoc.value !== '') {
              let allLocations ={...this.props.allLocations, ...{[newLoc.id]: {...newLoc}}}
              let orgsList =[...this.props.orgsList,{...newLoc}]
              this.setState({ 
                locName:'',
                newOrg : this.state.newOrg+1 ,
                parenOfLoc:{
                  value:''
                }
           });   
           this.props.setValues('allLocations',allLocations)
           this.props.setValues('orgsList',orgsList)
           this.props.handleModalClose(this.props.name)
            }
            else{
              window.Materialize.toast('select parent for the location', 5000)
            }
        }
    }
 render(){
     return(
         <Modal open={this.props.open} 
                name={this.props.name}  
                header= {this.props.header} 
                handleModalClose={this.props.handleModalClose}
                > 
                {this.props.name ==  "editOrg" || this.props.name == "editLoc" && <Fragment>
                <Input s={12} m={12} l={12} xl={12} 
                        label={(this.props.name == 'editLoc')? 'Edit Location' : 'Edit Organization' }
                        className='mt-0 pl-2' 
                        name={(this.props.name == 'editLoc')? "locName" : "orgName"  }  
                        value={(this.props.name == 'editLoc')? this.state.selectedLocation.name : this.state.selectedOrganisation.name }
                        onChange={this._input} 
                        required />
                {this.props.name == "editLoc" &&
                   <select name="parenOfLoc" onChange={this._input} value={this.state.parenOfLoc.value}>
                        <option value="" disabled> Choose option </option>
                        {
                            this.props.orgsList.map(data=>
                                <option value={data.id}>{data.name}</option>
                            )
                        } 
                   </select> 
                }
                        <div className="col s12 m12 l12 xl12">
                                    <Button className="btn_secondary  otherButtonAddDetUpt modalButton mb-2 ml-1" onClick={this._handleClose}>Cancel</Button>
                                    {this.props.name == "addLoc"&&  
                                        <Button className='btn_secondary modalButton otherButtonAddDetUpt mb-2' 
                                        onClick={this._handleLoc }>Add</Button>
                                    }
                                    { this.props.name =="addOrg"  &&
                                        <Button className='btn_secondary modalButton otherButtonAddDetUpt mb-2' 
                                        onClick={ this._handleOrg }>Add</Button>
                                    } 
                        </div>
                        </Fragment>}
         </Modal>  
      

     )
 }
}

export default FormEditModal;