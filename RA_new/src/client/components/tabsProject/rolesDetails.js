import React, { Component, Fragment } from "react";
import { Row, Tab, Tabs, Col, Input, Table, Icon, Button, Card, Modal } from 'react-materialize';

export const RolesDetails = (props) => (                            
    <div className={props.roleStatus ? "show RoledAddDiv row m-0" : "hide"}>
    <form onSubmit={props.SelectedDropdownRoleDetails}>
    <div className='col s12 m12 l12 xl12 pl-0 '>
        <Input s={4} label="Name" onChange={props.handleRoleInput} name="roleName" key={props.selectedRole.name} defaultValue={props.selectedRole.name} 
         required = {true} readOnly={props.ApplicationMode == 'VIEW' ? true : false}/>
        <div className='col s4 ml-1'>
            <Input s={12} label="Description" onChange={props.handleRoleInput} name="roleDescription" key={props.selectedRole.description}
            defaultValue={props.selectedRole.description} />
        </div>
        {props.ApplicationMode !== 'VIEW' ?
            <div className='col s12 m3 l3 xl3 pr-0 MapcheckboxLTo'>
                    <Input s={12} m={12} l={12} xl={12}   
                    name='roleToLocation' type='checkbox' onChange={props.handleRoleToLto} checked={props.isBindToLto} 
                    disabled={props.selectedCurrentLTO == '' ? true : false} value='red' 
                    label={props.selectedCurrentLTO == '' ? 'Mapping to Organization' : 'Map to Location'} 
                    />
            </div>: null
        }
    </div>
<div>
    <div className='mb-2 col s4'>
        <h5>Menu Access</h5>
        <table className="role-details">
            <tbody>
                {props.menuList.map(iteratedValue => {
                                return <tr>
                                    {(iteratedValue.name) !== "" ?
                                        <td>
                                            <Input
                                                type='checkbox'
                                                roleType="Menu"
                                                name={iteratedValue.name}
                                                onChange={props.handleRoleInput}
                                                value={iteratedValue.id}
                                                label={iteratedValue.label}
                                                checked={props.selectedMenu.filter(item => item == iteratedValue.id).length > 0 ? true : false}
                                                disabled={props.ApplicationMode == 'VIEW' ? true : false}
                                            />
                                        </td> : null}
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
                            {props.resourceList.map(iteratedValue => {
                                return <tr>
                                    <td>
                                        <Input
                                            type='checkbox'
                                            roleType="Resource"
                                            onChange={props.handleRoleInput}
                                            value={iteratedValue.id}
                                            name={iteratedValue.name}
                                            label={iteratedValue.name}
                                            checked={props.selectedResource.filter(item => item == iteratedValue.id).length > 0 ? true : false}
                                            disabled={props.ApplicationMode == 'VIEW' ? true : false}
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
                                    <Input type='checkbox' roleType="Attribute" name="isAssignable" onChange={props.handleRoleInput} label='Assignable' checked={props.selectedRole.isAssignable == 1 ? true : false} disabled={props.ApplicationMode == 'VIEW' ? true : false} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Input type='checkbox' roleType="Attribute" name="isAutoAccess" onChange={props.handleRoleInput} label='AutoAccess' checked={props.selectedRole.isAutoAccess == 1 ? true : false} disabled={props.ApplicationMode == 'VIEW' ? true : false} />
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <Input type='checkbox' roleType="Attribute" name="isAutoAssignOnIntake" onChange={props.handleRoleInput} label='AutoAssignIntake' checked={props.selectedRole.isAutoAssignOnIntake == 1 ? true : false} disabled={props.ApplicationMode == 'VIEW' ? true : false} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='mb-2 col s12'>
               {(props.isEditMode && props.ApplicationMode !== 'VIEW') &&  <Button type='button' className= {"show btn_secondary otherButtonAddDetUpt"} onClick={props.UpdateRole}>Update</Button>}
        {(props.isEditMode && props.ApplicationMode !== 'VIEW') &&  <Button type='button' className= {"show btn_secondary otherButtonAddDetUpt ml-1"} 
        onClick={props.handleDeleteRoleModal}>Delete</Button>}
        {!props.isEditMode && <Button type="submit" className="btn_secondary otherButtonAddDetUpt" >Add</Button>}
        <Modal
            header='Please Confirm '
            id='DeleteRoleModal'
        >
            <p>Are you sure you want to delete it?</p>

                <div className="col s12 m12 l12 xl12">
                    <button className="btn btn_secondary modal-close otherButtonAddDetUpt modalButton mb-2 ml-1">Cancel</button>
                    <Button className='btn_secondary modalButton otherButtonAddDetUpt mb-2' onClick={props.DeleteRole} >Delete</Button>
                </div>
        </Modal>
            </div>
        </form>
    </div>
)

