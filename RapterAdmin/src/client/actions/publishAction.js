import axios from 'axios';
const TENANT_POST_SUCCESS = 'TENANT_POST_SUCCESS';
const NEW_PROJECT = 'NEW_PROJECT';
import { API_URL, BACKEND_URL } from '../config';
import { PublishActionTypes } from '../constants/actionTypes';
import { clearOrg } from './tenantAction';

let finalToken = localStorage.getItem('finaltoken');
let config = {
    headers: {'Content-Type': "application/json", 'Authorization': "Bearer " + finalToken}
}
const actions = {
    PublishTenant: (payload) => ({
        type: PublishActionTypes.tenantPublish.PUBLISH_TENANT,
        data: payload
    }),
    NewProject: (payload) => ({
        type: PublishActionTypes.tenantPublish.NEW_PROJECT,
        data: payload
    })
}

let insertId_tto = {}; //key: value =>  parentId: insertId

let createTenant = (name) => {
    let tenantBody = {};
    tenantBody.name = name;
    return tenantBody
}
let createTTO = (name, insertId_tenant, ttoId, parentID, level, id) => {
    let TTOBody = {};
    TTOBody.name = name;
    TTOBody.tenantId = insertId_tenant;
    TTOBody.ttoId = ttoId;
    TTOBody.parentId = parentID;
    TTOBody.level = level;
    return TTOBody;
}
let createLTO = (name, insertId_tenant, ttoId, parentID, level) => {
    let LTOBody = {};
    LTOBody.name = name;
    LTOBody.tenantId = insertId_tenant;
    LTOBody.ttoId = ttoId;
    LTOBody.parentId = parentID;
    LTOBody.level = level;
    return LTOBody;
}
let createRoles = (name, description, orgId, isAssignable, isAutoAccess, isAutoAssignOnIntake) => {
    let RoleBody = {};
    RoleBody.name = name;
    RoleBody.description = description;
    RoleBody.orgId = orgId;
    RoleBody.isAssignable = isAssignable;
    RoleBody.isAutoAccess = isAutoAccess;
    RoleBody.isAutoAssignOnIntake = isAutoAssignOnIntake
    return RoleBody;
}
let raConfigCreate = (tenantId, description, blockSize, ltoId, groups) => {
    let raConfigBody = {};
    raConfigBody.tenantId = tenantId
    raConfigBody.description = description;
    raConfigBody.stratum = [{
        variable: "ltoId",
        value: ltoId
    }];
    raConfigBody.blockSize = blockSize;
    raConfigBody.groups = groups;
    return raConfigBody;
}
let raConfigGroups = (assignment, description, ratio, sequenceLimit) => {
    let raConfigBodyGroups = {};
    raConfigBodyGroups.assignment = assignment;
    raConfigBodyGroups.description = description;
    raConfigBodyGroups.ratio = ratio;
    raConfigBodyGroups.sequenceLimit = sequenceLimit;
    return raConfigBodyGroups;
}

let enrollmentTargetCreate = (orgId, month, target) => {
    let enrollmentTargetBody = {};
    enrollmentTargetBody.orgId = orgId;
    enrollmentTargetBody.month = month;
    enrollmentTargetBody.target = target;
    return enrollmentTargetBody;
}

let createBounds = (tenantId, ttoId, ltoId) => {
    let boundsBody = {};
    boundsBody.tenantId = tenantId;
    boundsBody.ttoId = ttoId;
    ltoId == null ? null: boundsBody.ltoId = ltoId;
    return boundsBody;
}

let menuRoleCreate = (tenantId, ttoId, ltoId, roleId, menuId) => {
    let menuRoleBody = {};
    menuRoleBody.tenantId = tenantId;
    menuRoleBody.ttoId = ttoId;
    ltoId == null ? null: menuRoleBody.ltoId = ltoId;
    menuRoleBody.roleId = roleId;
    menuRoleBody.menuId = menuId;
    return menuRoleBody;
}

let resourceRoleCreate = (tenantId, ttoId, ltoId, roleId, resourceId) => {
    let resourceRoleBody = {};
    resourceRoleBody.tenantId = tenantId;
    resourceRoleBody.ttoId = ttoId;
    ltoId == null ? null: resourceRoleBody.ltoId = ltoId;
    resourceRoleBody.roleId = roleId;
    resourceRoleBody.resourceId = resourceId;
    return resourceRoleBody;
}

let postResultBody = {};

export const Publish = () => (dispatch, getState) => {
    const { projectFormReducer, projectInfo, createProj, LtoReducers, TtoReducers } = getState();
    let tenantBody = createTenant(projectFormReducer.tenant);
    axios.post(`${BACKEND_URL}/tenant`, tenantBody, {mode: 'cors'}, config).then((response) => {
        postResultBody.tenant = response.status;
        let insertId_tenant = response.data.insertId;
        dispatch(actions.NewProject(insertId_tenant));
        projectFormReducer.organizations.map(item => {
            if(item.flag == "createFlag"){
                let TTOBody = createTTO(item.name, insertId_tenant, item.ttoId, item.parentID, item.level);
                axios.post(`${BACKEND_URL}/organization`, TTOBody, {mode: 'cors'}, config).then((response) => {
                postResultBody.tto = response.status;
                let parentId = item.id;//internal ttoId which should be compared to create a ltos and roles
                let insertId_tto = response.data.insertId; //save the insert id with hardcodded parent id, VERY IMPORTANT, THIS TTOID WILL BE USED FOR FURTHER PUBLISH
                //organisation-user mapping goes here
                if(projectFormReducer.locations.length !== 0){
                    projectFormReducer.locations.map(item => {
                        //let insertId_lto = item.parentID == "something" ? insertId_tto : ;to check if lto parent is also an lto, use the level factor here
                        let insertId_lto;
                        if(item.ttoId == parentId || item == ''){ 
                            let LTOBody = createLTO(item.name, insertId_tenant, insertId_tto, insertId_tto, item.level);
                            axios.post(`${BACKEND_URL}/organization`, LTOBody, {mode: 'cors'}, config).then((response) => {
                                postResultBody.lto = response.status;
                                //for roles
                                let locationId = item.id;
                                insertId_lto = response.data.insertId;
                                projectFormReducer.roleDetails.map(item => {
                                    if(item.orgId == parentId){
                                        let RoleBody = createRoles(item.name, item.description, insertId_tto, item.isAssignable, item.isAutoAccess, item.isAutoAssignOnIntake);
                                        axios.post(`${BACKEND_URL}/role`, RoleBody, {mode: 'cors'}, config).then((response) =>{
                                            //use insert id here
                                            postResultBody.role = response.status;
                                            let insertId_role = response.data.insertId;
                                            let parentId = item.id;
                                            if(role == 200){
                                                console.log('Role created');
                                                //option to post menu and role inside this if                                                
                                            }else {
                                                console.log('Role not created')
                                            }
                                            projectFormReducer.menuDetails.map(item => {
                                                if(item.roleId == parentId){
                                                    Object.keys(item.menuId).map(id => {
                                                        let menuBody = menuRoleCreate(insertId_tenant, insertId_tto, insertId_lto, insertId_role,id);
                                                        axios.post(`${BACKEND_URL}/create-menu-role-access`, menuBody, {mode: 'cors'}, config).then((response) => {
                                                            console.log(response, 'menu role created');
                                                        })
                                                    });
                                                }
                                            });
                                            projectFormReducer.resourceDetails.map(item => {
                                                if(item.roleId == parentId){
                                                    Object.keys(item.resourceId).map(id => {
                                                        let resourceBody = resourceRoleCreate(insertId_tenant, insertId_tto, insertId_lto, insertId_role,id);
                                                        axios.post(`${BACKEND_URL}/create-resource-role-access`, resourceBody, {mode: 'cors'}, config).then((response) => {
                                                            console.log(response, 'menu role created');
                                                        })
                                                    });
                                                }
                                            })
                                        }).catch(function (error) {
                                            console.log(error);
                                            return error.response;
                                        });
                                    }else {
                                        let RoleBody = createRoles(item.name, item.description, insertId_lto, item.isAssignable, item.isAutoAccess, item.isAutoAssignOnIntake);
                                        axios.post(`${BACKEND_URL}/role`, RoleBody, {mode: 'cors'}, config).then((response) =>{
                                            //use insert id here
                                            postResultBody.role = response.status;
                                            let insertId_role = response.data.insertId;
                                            let parentId = item.id;
                                            if(role == 200){
                                                console.log('Role created');
                                                //option to post menu and role inside this if                                                
                                            }else {
                                                console.log('Role not created')
                                            }
                                            projectFormReducer.menuDetails.map(item => {
                                                if(item.roleId == parentId){
                                                    Object.keys(item.menuId).map(id => {
                                                        let menuBody = menuRoleCreate(insertId_tenant, insertId_tto, insertId_lto, insertId_role,id);
                                                        axios.post(`${BACKEND_URL}/create-menu-role-access`, menuBody, {mode: 'cors'}, config).then((response) => {
                                                            console.log(response, 'menu role created');
                                                        })
                                                    });
                                                }
                                            });
                                            projectFormReducer.resourceDetails.map(item => {
                                                if(item.roleId == parentId){
                                                    Object.keys(item.resourceId).map(id => {
                                                        let resourceBody = resourceRoleCreate(insertId_tenant, insertId_tto, insertId_lto, insertId_role,id);
                                                        axios.post(`${BACKEND_URL}/create-resource-role-access`, resourceBody, {mode: 'cors'}, config).then((response) => {
                                                            console.log(response, 'menu role created');
                                                        })
                                                    });
                                                }
                                            })
                                        }).catch(function (error) {
                                            console.log(error);
                                            return error.response;
                                        });
                                    }
                                })
                                const { studyConfigList, enrollmentTargetData } = createProj;
                                let raConfigBodyGroups = [];
                                studyConfigList.map(item => {
                                    if (item.ltoId == locationId) {
                                        item.groups.map(item => {
                                            raConfigBodyGroups.push(raConfigGroups(item.assignment, item.description, item.ratio, item.sequenceLimit));
                                        });
                                        let raConfigBody = raConfigCreate(insertId_tenant, item.description, item.blockSize, insertId_lto, raConfigBodyGroups);
                                        axios.post(`${BACKEND_URL}/create-ra-config`, raConfigBody, {mode: 'cors'}, config).then((response) => {
                                            console.log(response)
                                        }).catch(function (error) {
                                            console.log(error);
                                            return error.response;
                                        });
                                    }
                                })
                            
                                enrollmentTargetData.map(item => {
                                    if(item.orgId == locationId){
                                        let enrollmentTargetBody = enrollmentTargetCreate(insertId_lto, item.month, item.target);
                                        axios.post(`${BACKEND_URL}/create-enrollment-target`, enrollmentTargetBody, {mode: 'cors'}, config).then((response) => {
                                            console.log(response);
                                        }).catch(function (error) {
                                            console.log(error);
                                            return error.response;
                                        });
                                    }
                                })
                                const {lto, role, tenant, tto} = postResultBody;
                                if(lto == 200 && tenant == 200 && tto == 200){
                                    console.log('Tenant and Org created');
                                    
                                }else {
                                    console.log('Tenant and Org not created')
                                }
                            }).catch(function (error) {
                                console.log(error);
                                return error.response;
                            });;
                        }
                    });
                } else{
                    /* 
                    if location is not created
                    similar structure for only tto is be written here in else part;
                    */
                    projectFormReducer.roleDetails.map(item => {
                        if(item.orgId == parentId){
                            let RoleBody = createRoles(item.name, item.description, insertId_tto, item.isAssignable, item.isAutoAccess, item.isAutoAssignOnIntake);
                            axios.post(`${BACKEND_URL}/role`, RoleBody, {mode: 'cors'}, config).then((response) =>{
                                //use insert id here
                                postResultBody.role = response.status;
                                let insertId_role = response.data.insertId;
                                let parentId = item.id;
                                if(role == 200){
                                    console.log('Role and ra-config created');
                                    //option to post menu and role inside this if
                                    
                                }else {
                                    console.log('Role and ra-config not created')
                                }
                                projectFormReducer.menuDetails.map(item => {
                                    if(item.roleId == parentId){
                                        Object.keys(item.menuId).map(id => {
                                            let menuBody = menuRoleCreate(insertId_tenant, insertId_tto, insertId_lto, insertId_role,id);
                                            axios.post(`${BACKEND_URL}/create-menu-role-access`, menuBody, {mode: 'cors'}, config).then((response) => {
                                                console.log(response, 'menu role created');
                                            })
                                        });
                                    }
                                });
                                projectFormReducer.resourceDetails.map(item => {
                                    if(item.roleId == parentId){
                                        Object.keys(item.resourceId).map(id => {
                                            let resourceBody = resourceRoleCreate(insertId_tenant, insertId_tto, insertId_lto, insertId_role,id);
                                            axios.post(`${BACKEND_URL}/create-resource-role-access`, resourceBody, {mode: 'cors'}, config).then((response) => {
                                                console.log(response, 'menu role created');
                                            })
                                        });
                                    }
                                })
                            }).catch(function (error) {
                                console.log(error);
                                return error.response;
                            });
                        }
                    })
                    const {enrollment, lto, raConfig, role, tenant, tto} = postResultBody;
                    if(lto == 200 && tenant == 200 && tto == 200){
                        console.log('Tenant and Org created');
                        
                    }else {
                        console.log('Tenant and Org not created')
                    }
                }
                }).catch(function (error) {
                    console.log(error);
                    return error.response;
                });
            }
        });
    }).catch(function (error) {
        console.log(error);
        return error.response;
    });;
}
