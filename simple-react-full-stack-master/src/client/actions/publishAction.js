import axios from 'axios';
const TENANT_POST_SUCCESS = 'TENANT_POST_SUCCESS';
const NEW_PROJECT = 'NEW_PROJECT';
import { API_URL } from '../config';
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
let raConfigCreate = (description, blockSize, ltoId, groups) => {
    let raConfigBody = {};
    raConfigBody.description = description;
    raConfigBody.stratum = [{
        variable: "ltoId",
        value: ltoId
    }];
    raConfigBody.blockSize = blockSize;
    raConfigBody.groups = groups;
    console.log(raConfigBody);
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
    boundsBody.ltoId = ltoId;
    return boundsBody;
}

let menuRoleCreate = (roleId, menuId) => {
    let menuRoleBody = {};
    menuRoleBody.roleId = roleId;
    menuRoleBody.menuId = menuId;
    return menuRoleBody;
}

let resourceRoleCreate = (roleId, resourceId) => {
    let resourceRoleBody = {};
    resourceRoleBody.roleId = roleId;
    resourceRoleBody.resourceId = resourceId;
    return resourceRoleBody;
}

let postResultBody = {};

export const Publish = () => (dispatch, getState) => {
    const { projectFormReducer, projectInfo, createProj, LtoReducers, TtoReducers } = getState();
    let tenantBody = createTenant(projectFormReducer.tenant);
    axios.post(`${API_URL}/api/v1/tenant`, tenantBody, config).then((response) => {
        postResultBody.tenant = response.status;
        let insertId_tenant = response.data.insertId;
        dispatch(actions.NewProject(insertId_tenant));
        projectFormReducer.organizations.map(item => {
            if(item.flag == "createFlag"){
                let TTOBody = createTTO(item.name, insertId_tenant, item.ttoId, item.parentID, item.level);
                console.log(TTOBody);
                axios.post(`${API_URL}/api/v1/organization`, TTOBody, config).then((response) => {
                console.log(response);
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
                            axios.post(`${API_URL}/api/v1/organization`, LTOBody, config).then((response) => {
                                console.log(response);
                                postResultBody.lto = response.status;
                                //for roles
                                let locationId = item.id;
                                insertId_lto = response.data.insertId;
                                projectFormReducer.roleDetails.map(item => {
                                    if(item.orgId == parentId){
                                        let RoleBody = createRoles(item.name, item.description, insertId_tto, item.isAssignable, item.isAutoAccess, item.isAutoAssignOnIntake);
                                        axios.post(`${API_URL}/api/v1/role`, RoleBody, config).then((response) =>{
                                            console.log(response);//use insert id here
                                            postResultBody.role = response.status;
                                            let insertId_role = response.data.insertId;
                                            let parentId = item.id;
                                            console.log(parentId);
                                            if(role == 200){
                                                console.log('Role created');
                                                alert('Role created');//option to post menu and role inside this if
                                                
                                            }else {
                                                alert('Role not created');
                                                console.log('Role not created')
                                            }
                                            projectFormReducer.menuDetails.map(item => {
                                                if(item.roleId == parentId){
                                                    let boundsBody = createBounds(insertId_tenant, insertId_tto, insertId_lto);
                                                    debugger;
                                                    axios.post(`${API_URL}/api/v1/bounds`, boundsBody, config).then((response) => {
                                                        alert('bounds for menu created');
                                                        console.log(response, 'bounds for menu');
                                                        let x_rapter_bounds = response.data["x-rapter-bounds"];
                                                        Object.keys(item.menuId).map(id => {
                                                            debugger;
                                                            let menuRoleBody = menuRoleCreate(insertId_role, id);
                                                            //use x-rapter in here
                                                            let newConfig = {headers: config.headers};
                                                            newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
                                                            axios.post(`${API_URL}/api/v1/menu-role-access`, menuRoleBody, newConfig).then((response) => {
                                                                alert('menu role created')
                                                                console.log(response, 'menu role created');
                                                            });
                                                        });
                                                    })
                                                }
                                            });
                                            projectFormReducer.resourceDetails.map(item => {
                                                if(item.roleId == parentId){
                                                    let boundsBody = createBounds(insertId_tenant, insertId_tto, insertId_lto);
                                                    axios.post(`${API_URL}/api/v1/bounds`, boundsBody, config).then((response) => {
                                                        alert('bounds for resource created');
                                                        console.log(response, 'bounds for resource');
                                                        let x_rapter_bounds = response.data["x-rapter-bounds"];
                                                        Object.keys(item.resourceId).map(id => {
                                                            let resourceRoleBody = resourceRoleCreate(insertId_role, id);
                                                            console.log(resourceRoleBody);
                                                            //use x-rapter in here
                                                            let newConfig = {headers: config.headers};
                                                            newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
                                                            axios.post(`${API_URL}/api/v1/resource-role-access`, resourceRoleBody, newConfig).then((response) => {
                                                                alert('resource role created')
                                                                console.log(response, 'resource role created');
                                                            })
                                                        })
                                                    })
                                                }
                                            })
                                        })
                                    }
                                })
                                const { studyConfigData, enrollmentTargetData } = createProj;
                                            if(LtoReducers.currentLtoSelection == locationId){
                                                let raConfigBodyGroups = [];
                                                studyConfigData.groups.map(item => {
                                                    raConfigBodyGroups.push(raConfigGroups(item.assignment, item.description, item.ratio, item.sequenceLimit));
                                                });
                                                let raConfigBody = raConfigCreate(studyConfigData.description, studyConfigData.blockSize, insertId_lto, raConfigBodyGroups)
                                                axios.post(`${API_URL}/api/v1/ra-config?tenantId=` + insertId_tenant, raConfigBody, config).then((response) => {
                                                    console.log(response);
                                                    postResultBody.raConfig = response.status;
                                                    const {enrollment, lto, raConfig, role, tenant, tto} = postResultBody;
                                                        if(raConfig == 200){
                                                            console.log('okay');
                                                            alert('Role and ra-config created');
                                                            
                                                        }else {
                                                            alert('not created');
                                                            console.log('not okay')
                                                        }
                                                })
                                            }
                                            if(LtoReducers.currentLtoSelection == locationId){
                                                enrollmentTargetData.map(item => {
                                                    let enrollmentTargetBody = enrollmentTargetCreate(insertId_lto, item.month, item.target);
                                                    axios.post(`${API_URL}/api/v1/enrollment-target`, enrollmentTargetBody, config).then((response) => {
                                                        console.log(response);
                                                        postResultBody.enrollment = response.status;
                                                        const {enrollment} = postResultBody;
                                                        if(enrollment == 200){
                                                            console.log('okay');
                                                            alert('enrollment created');
                                                            clearOrg();
                                                        }else {
                                                            alert('not created');
                                                            console.log('not okay')
                                                        }
                                                    })
                                                })
                                            }
                                const {lto, role, tenant, tto} = postResultBody;
                                if(lto == 200 && tenant == 200 && tto == 200){
                                    console.log('okay');
                                    alert('Tenant and Org created');
                                    
                                }else {
                                    alert('not created');
                                    console.log('not okay')
                                }
                                console.log(postResultBody);
                            });
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
                            axios.post(`${API_URL}/api/v1/role`, RoleBody, config).then((response) =>{
                                console.log(response);//use insert id here
                                postResultBody.role = response.status;
                                let insertId_role = response.data.insertId;
                                let parentId = item.id;
                                console.log(parentId);
                                if(role == 200){
                                    console.log('Role and ra-config created');
                                    alert('Role and ra-config created');//option to post menu and role inside this if
                                    
                                }else {
                                    alert('Role and ra-config not created');
                                    console.log('Role and ra-config not created')
                                }
                                projectFormReducer.menuDetails.map(item => {
                                    if(item.roleId == parentId){
                                        let boundsBody = createBounds(insertId_tenant, insertId_tto);
                                        axios.post(`${API_URL}/api/v1/bounds`, boundsBody, config).then((response) => {
                                            alert('bounds for menu created');
                                            console.log(response, 'bounds for menu');
                                            let x_rapter_bounds = response.data["x-rapter-bounds"];
                                            Object.keys(item.menuId).map(id => {
                                                debugger;
                                                let menuRoleBody = menuRoleCreate(insertId_role, id);
                                                //use x-rapter in here
                                                let newConfig = {headers: config.headers};
                                                newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
                                                axios.post(`${API_URL}/api/v1/menu-role-access`, menuRoleBody, newConfig).then((response) => {
                                                    alert('menu role created')
                                                    console.log(response, 'menu role created');
                                                });
                                            });
                                        })
                                    }
                                });
                                projectFormReducer.resourceDetails.map(item => {
                                    if(item.roleId == parentId){
                                        let boundsBody = createBounds(insertId_tenant, insertId_tto);
                                        axios.post(`${API_URL}/api/v1/bounds`, boundsBody, config).then((response) => {
                                            alert('bounds for resource created');
                                            console.log(response, 'bounds for resource');
                                            let x_rapter_bounds = response.data["x-rapter-bounds"];
                                            Object.keys(item.resourceId).map(id => {
                                                let resourceRoleBody = resourceRoleCreate(insertId_role, id);
                                                console.log(resourceRoleBody);
                                                //use x-rapter in here
                                                let newConfig = {headers: config.headers};
                                                newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
                                                axios.post(`${API_URL}/api/v1/resource-role-access`, resourceRoleBody, newConfig).then((response) => {
                                                    alert('resource role created')
                                                    console.log(response, 'resource role created');
                                                })
                                            })
                                        })
                                    }
                                })
                            })
                        }
                    })
                    const {enrollment, lto, raConfig, role, tenant, tto} = postResultBody;
                    if(lto == 200 && tenant == 200 && tto == 200){
                        console.log('okay');
                        alert('Tenant and Org created');
                        
                    }else {
                        alert('not created');
                        console.log('not okay')
                    }
                    console.log(postResultBody);
                }
                })
            }
        });
        console.log(postResultBody);
    });
}