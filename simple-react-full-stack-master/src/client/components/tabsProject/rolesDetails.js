import React, { Component, Fragment } from "react";
import { Row, Tab, Tabs, Col, Input, Table, Icon, Button, Card, Modal } from 'react-materialize';


export const RolesDetails = (props) => (                            
    <div className={props.roleStatus ? "show" : "hide"}>
    <form onSubmit={props.SelectedDropdownRoleDetails}>
    <Input s={6} label="Name" onChange={props.handleRoleInput} name="roleName" defaultValue={props.selectedRole.name} required = {true} readOnly={props.ApplicationMode == 'VIEW' ? true : false}/>
    <Input s={6} label="Description" onChange={props.handleRoleInput} name="roleDescription" defaultValue={props.selectedRole.description} />
    {/* <Input s={6} m={4} l={4} xl={4} label="Map To Location" value="Map To Location" type='checkbox' name="MapToLocation" onChange={props.handleRoleInput}  /> */}
    <div className='mb-2 col s4'>
        <h5>Menu Access</h5>
        <table className="role-details">
            <tbody>
                {
                    props.menuList.map((iteratedValue) => {
                        return <tr>
                            <td>
                                <Input 
                                type='checkbox' 
                                roleType="Menu" 
                                name={iteratedValue.name} 
                                onChange={props.handleRoleInput} 
                                value={iteratedValue.id}
                                label={iteratedValue.label} 
                                checked={
                                    props.selectedMenu.filter(item => item == iteratedValue.id).length > 0 ? true: false  
                                }
                                 />
                            </td>
                        </tr>

                    })
                }
            </tbody>
        </table>
    </div>
    <div className='mb-2 col s4'>
        <h5>Resource Access</h5>
        <table className="role-details">
            <tbody>
                {
                    props.resourceList.map((iteratedValue) => {
                        return <tr>
                            <td>
                                <Input
                                 type='checkbox' 
                                 roleType="Resource" 
                                 onChange={props.handleRoleInput} 
                                 value={iteratedValue.id} 
                                 name={iteratedValue.name} 
                                 label={iteratedValue.name} 
                                 checked={props.selectedResource.filter(item => item == iteratedValue.id).length > 0 ? true: false  }
                                 />
                            </td>
                        </tr>

                    })
                }
            </tbody>
        </table>
    </div>
    <div className='mb-2 col s4'>
        <h5>Attributes</h5>
        <table className="role-details">
            <tbody>
                <tr>
                    <td>
                        <Input type='checkbox' roleType="Attribute" name="isAssignable" onChange={props.handleRoleInput} label='Assignable' checked={props.selectedRole.isAssignable == 1 ? true : false}/>
                    </td>
                </tr>
                <tr>
                    <td>
                        <Input type='checkbox' roleType="Attribute" name="isAutoAccess" onChange={props.handleRoleInput} label='AutoAccess' checked={props.selectedRole.isAutoAccess == 1?true:false}  />
                    </td>
                </tr>
                <tr>
                    <td>
                        <Input type='checkbox' roleType="Attribute" name="isAutoAssignOnIntake" onChange={props.handleRoleInput} label='AutoAssignIntake' checked={props.selectedRole.isAutoAssignOnIntake == 1?true:false} />
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <div className='mb-2 col s12'>
        {props.isEditMode &&  <Button className= {"show btn_secondary"} onClick={props.DeleteRole}>Delete Role</Button>}
        {props.isEditMode &&  <Button className= {"show btn_secondary"} onClick={props.UpdateRole} type="submit">Update Role</Button>}
        {!props.isEditMode && <Button type="submit" className="btn_secondary" >Save Role</Button>}
        
    </div>
    </form>
</div>            

)

