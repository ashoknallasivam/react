import axios from 'axios';
const TENANT_POST_SUCCESS = 'TENANT_POST_SUCCESS';
import { API_URL } from '../config';
import { PublishActionTypes } from '../constants/actionTypes';
import { clearOrg } from './tenantAction';

let finalToken = localStorage.getItem('finaltoken');
let config = {
    headers: {'Content-Type': "application/json", 'Authorization': "Bearer " + finalToken}
}

let updateResultBody = {};

let updateTenant = (name) => {
    let tenantBody = {};
    tenantBody.name = name;
    return tenantBody
}

let updateTTO = (name, insertId_tenant, ttoId, parentID, level, id) => {
    let TTOBody = {};
    TTOBody.name = name;
    TTOBody.tenantId = insertId_tenant;
    TTOBody.ttoId = ttoId;
    TTOBody.parentId = parentID;
    TTOBody.level = level;
    return TTOBody;
}

let updateLTO = (name, insertId_tenant, ttoId, parentID, level) => {
    let LTOBody = {};
    LTOBody.name = name;
    LTOBody.tenantId = insertId_tenant;
    LTOBody.ttoId = ttoId;
    LTOBody.parentId = parentID;
    LTOBody.level = level;
    return LTOBody;
}
let updateRoles = (name, description, orgId, isAssignable, isAutoAccess, isAutoAssignOnIntake) => {
    let RoleBody = {};
    RoleBody.name = name;
    RoleBody.description = description;
    RoleBody.orgId = orgId;
    RoleBody.isAssignable = isAssignable;
    RoleBody.isAutoAccess = isAutoAccess;
    RoleBody.isAutoAssignOnIntake = isAutoAssignOnIntake
    return RoleBody; 
}

export const Update = () => (dispatch, getState) => {
    console.log('update is set');
    const { projectFormReducer, projectInfo, createProj, LtoReducers, TtoReducers } = getState();
    let tenantBody = updateTenant(projectFormReducer.tenant);
    axios.put(`${API_URL}/api/v1/tenant/` + projectInfo[0].id, tenantBody, config).then((response) => {
        console.log(response);
        updateResultBody.tenant = response.status;
        alert("tenant name is updated")
        projectFormReducer.organizations.map(item => {
            if(item.flag == "createFlag"){//if org is newely created
                let TTOBody = updateTTO(item.name, projectInfo[0].id, item.ttoId, item.parentID, item.level);
                axios.post(`${API_URL}/api/v1/organization`, TTOBody, config).then((response) => {
                    console.log(response);
                    alert("new org is added");
                    updateResultBody.tto = response.status;
                    let orgId = item.id;//internal ttoId which should be compared to create a ltos and roles
                    let insertId_tto = response.data.insertId;
                    if(projectFormReducer.locations.length !== 0){
                        projectFormReducer.locations.map(item => {
                            if(item.flag == "createFlag" && (item.ttoId == orgId || item == '')){//when a new location is added
                                let LTOBody = updateLTO(item.name, projectInfo[0].id, insertId_tto, insertId_tto, item.level);
                                axios.post(`${API_URL}/api/v1/organization`, LTOBody, config).then((response) => {
                                    updateResultBody.lto = response.status;
                                    //for roles
                                    let locationId = item.id;
                                    let insertId_lto = response.data.insertId;
                                    projectFormReducer.roleDetails.map(item => {
                                        if(item.flag == 'createFlag' && item.orgId == locationId){// if mapped to lto
                                            let RoleBody = updateRoles(item.name, item.description, insertId_lto, item.isAssignable, item.isAutoAccess, item.isAutoAssignOnIntake)
                                            axios.post(`${API_URL}/api/v1/role`, RoleBody, config).then((response=> {
                                                console.log(response);
                                            }))
                                        } else if(item.flag == 'createFlag' && item.orgId == orgId){// if mapped to tto
                                            let RoleBody = updateRoles(item.name, item.description, insertId_tto, item.isAssignable, item.isAutoAccess, item.isAutoAssignOnIntake)
                                            axios.post(`${API_URL}/api/v1/role`, RoleBody, config).then((response=> {
                                                console.log(response);
                                            }))
                                        }
                                    })
                                })
                            }else {// when no new location is added but org is added

                            }
                        })
                    }

                    /* 
                    if location is not created
                    similar structure for only tto will be written here in else part;
                    */
                    else{

                    }
                })
            } else {//if org is not newely created
                if(projectFormReducer.locations.length !== 0){
                    let parentId = item.id;
                    projectFormReducer.locations.map(item => {
                        if(item.flag == "createFlag" && (item.ttoId == parentId || item == '')){// new location is created
                            let LTOBody = updateLTO(item.name, projectInfo[0].id, item.ttoId, item.parentID, item.level);
                            axios.post(`${API_URL}/api/v1/organization`, LTOBody, config).then((response) => {
                                updateResultBody.lto = response.status;
                                //for roles
                                let locationId = item.id;
                                insertId_lto = response.data.insertId;
                                let RoleBody = updateRoles(item.name, item.description, insertId_tto)
                                axios.post(`${API_URL}/api/v1/role`, RoleBody, config)
                            })
                        }
                    })
                }
            }
        })
    });
    //when role/ra-config/enrollment is created for an existing tenant/org/loc
    projectFormReducer.roleDetails.map(item => {//roles created from existing orgs
        if(item.flag == 'createFlag'){
            let RoleBody = updateRoles(item.name, item.description, item.orgId, item.isAssignable, item.isAutoAccess, item.isAutoAssignOnIntake);
            axios.post(`${API_URL}/api/v1/role`, RoleBody, config).then((response) => {
                console.log(response);
            })
        }
    })
}
