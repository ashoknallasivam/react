import axios from 'axios';
const TENANT_POST_SUCCESS = 'TENANT_POST_SUCCESS';
import { API_URL, BACKEND_URL } from '../config';
import { PublishActionTypes } from '../constants/actionTypes';
import { clearOrg } from './tenantAction';
import { authHeaderFinal } from '../helpers';


let finalToken = localStorage.getItem('finaltoken');
let config = {
    headers: { 'Content-Type': "application/json", 'Authorization': "Bearer " + finalToken }
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
let enrollmentTargetCreate = (orgId, month, target) => {
    let enrollmentTargetBody = {};
    enrollmentTargetBody.orgId = orgId;
    enrollmentTargetBody.month = month;
    enrollmentTargetBody.target = target;
    return enrollmentTargetBody;
}
let raConfigUpdate = (tenantId,description, blockSize, ltoId, groups) => {
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
let raConfigGroupsUpdate = (assignment, description, ratio, sequenceLimit) => {
    let raConfigBodyGroups = {};
    raConfigBodyGroups.assignment = assignment;
    raConfigBodyGroups.description = description;
    raConfigBodyGroups.ratio = ratio;
    raConfigBodyGroups.sequenceLimit = sequenceLimit;
    return raConfigBodyGroups;
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

export const Update = () => (dispatch, getState) => {
    console.log('update is set');
    const { projectFormReducer, projectInfo, createProj, LtoReducers, TtoReducers } = getState();
    let tenantBody = updateTenant(projectFormReducer.tenant);
    axios.put(`${BACKEND_URL}/tenant/`+ projectInfo[0].id, tenantBody, { headers: authHeaderFinal() }).then((response) => {
        console.log(response);
        let insertId_tenant = projectInfo[0].id;
        updateResultBody.tenant = response.status;
        alert("tenant name is updated");
        projectFormReducer.organizations.map(item => {
            if (item.flag == "createFlag") {//if org is newely created
                let TTOBody = updateTTO(item.name, projectInfo[0].id, item.ttoId, item.parentID, item.level);
                axios.post(`${BACKEND_URL}/organization`, TTOBody, { headers: authHeaderFinal() }).then((response) => {
                    console.log(response);
                    alert("new org is added");
                    updateResultBody.tto = response.status;
                    let orgId = item.id;//internal ttoId which should be compared to create a ltos and roles
                    let insertId_tto = response.data.insertId;

                    //new roles for new TTO
                    projectFormReducer.roleDetails.map(item => {
                        if (item.flag == 'createFlag' && item.orgId == orgId && item.parentFlag == "createFlag") {// if mapped to tto
                            let RoleBody = updateRoles(item.name, item.description, insertId_tto, item.isAssignable, item.isAutoAccess, item.isAutoAssignOnIntake)
                            axios.post(`${BACKEND_URL}/role`, RoleBody, { headers: authHeaderFinal() }).then((response => {
                                console.log(response);
                                let insertId_role = response.data.insertId;
                                let parentId = item.id;
                                projectFormReducer.menuDetails.map(item => {
                                    if(item.roleId == parentId){
                                        Object.keys(item.menuId).map(id => {
                                            let menuBody = menuRoleCreate(insertId_tenant, insertId_tto, insertId_lto, insertId_role,id);
                                            axios.post(`${BACKEND_URL}/create-menu-role-access`, menuBody, { headers: authHeaderFinal() }).then((response) => {
                                                console.log(response, 'menu role created');
                                            }).catch(function (error) {
                                                console.log(error);
                                                return error.response;
                                            });
                                        });
                                    }
                                });
                                projectFormReducer.resourceDetails.map(item => {
                                    if(item.roleId == parentId){
                                        Object.keys(item.resourceId).map(id => {
                                            let resourceBody = resourceRoleCreate(insertId_tenant, insertId_tto, insertId_lto, insertId_role,id);
                                            axios.post(`${BACKEND_URL}/create-resource-role-access`, resourceBody, { headers: authHeaderFinal() }).then((response) => {
                                                console.log(response, 'menu role created');
                                            }).catch(function (error) {
                                                console.log(error);
                                                return error.response;
                                            });
                                        });
                                    }
                                })
                            })).catch(function (error) {
                                console.log(error);
                                return error.response;
                            });
                        }
                    })


                    if (projectFormReducer.locations.length !== 0) {
                        projectFormReducer.locations.map(item => {
                            if (item.flag == "createFlag" && (item.ttoId == orgId || item == '')) {//when a new location is added
                                let LTOBody = updateLTO(item.name, projectInfo[0].id, insertId_tto, insertId_tto, item.level);
                                axios.post(`${BACKEND_URL}/organization`, LTOBody, { headers: authHeaderFinal() }).then((response) => {
                                    updateResultBody.lto = response.status;
                                    //for roles
                                    let locationId = item.id;
                                    let insertId_lto = response.data.insertId;
                                    projectFormReducer.roleDetails.map(item => {
                                        if (item.flag == 'createFlag' && item.orgId == locationId && item.parentFlag == "createFlag") {// if mapped to lto
                                            let RoleBody = updateRoles(item.name, item.description, insertId_lto, item.isAssignable, item.isAutoAccess, item.isAutoAssignOnIntake)
                                            axios.post(`${BACKEND_URL}/role`, RoleBody, { headers: authHeaderFinal() }).then((response => {
                                                console.log(response);
                                                let insertId_role = response.data.insertId;
                                            let parentId = item.id;
                                            projectFormReducer.menuDetails.map(item => {
                                                if(item.roleId == parentId){
                                                    Object.keys(item.menuId).map(id => {
                                                        let menuBody = menuRoleCreate(insertId_tenant, insertId_tto, insertId_lto, insertId_role,id);
                                                        axios.post(`${BACKEND_URL}/create-menu-role-access`, menuBody, { headers: authHeaderFinal() }).then((response) => {
                                                            console.log(response, 'menu role created');
                                                        }).catch(function (error) {
                                                            console.log(error);
                                                            return error.response;
                                                        });
                                                    });
                                                }
                                            });
                                            projectFormReducer.resourceDetails.map(item => {
                                                if(item.roleId == parentId){
                                                    Object.keys(item.resourceId).map(id => {
                                                        let resourceBody = resourceRoleCreate(insertId_tenant, insertId_tto, insertId_lto, insertId_role,id);
                                                        axios.post(`${BACKEND_URL}/create-resource-role-access`, resourceBody, { headers: authHeaderFinal() }).then((response) => {
                                                            console.log(response, 'menu role created');
                                                        }).catch(function (error) {
                                                            console.log(error);
                                                            return error.response;
                                                        });
                                                    });
                                                }
                                            })
                                            })).catch(function (error) {
                                                console.log(error);
                                                return error.response;
                                            });
                                        }
                                    })
                                    //enrollment-target
                                    createProj.enrollmentTargetData && createProj.enrollmentTargetData.map(item => {
                                        if (item.flag == 'createFlag' && item.orgId == locationId) {
                                            item.groups.map(item => {
                                                raConfigBodyGroups.push(raConfigGroups(item.assignment, item.description, item.ratio, item.sequenceLimit));
                                            });
                                            let raConfigBody = raConfigCreate(insertId_tenant, item.description, item.blockSize, insertId_lto, raConfigBodyGroups);
                                            axios.post(`${BACKEND_URL}/create-ra-config`, raConfigBody, { headers: authHeaderFinal() }).then((response) => {
                                                console.log(response)
                                            }).catch(function (error) {
                                                console.log(error);
                                                return error.response;
                                            });
                                            // }
                                        }
                                    })
                                    //ra-config
                                    let raConfigGroups = [];
                                    createProj.studyConfigList && createProj.studyConfigList.map(item => {
                                        if (item.flag == 'createFlag' && item.ltoId == locationId) {
                                            let enrollmentTargetBody = enrollmentTargetCreate(insertId_lto, item.month, item.target);
                                        axios.post(`${BACKEND_URL}/create-enrollment-target`, enrollmentTargetBody, { headers: authHeaderFinal() }).then((response) => {
                                            console.log(response);
                                        }).catch(function (error) {
                                            console.log(error);
                                            return error.response;
                                        });
                                        }
                                    })
                                }).catch(function (error) {
                                    console.log(error);
                                    return error.response;
                                });
                            }
                        })
                    }
                }).catch(function (error) {
                    console.log(error);
                    return error.response;
                });
            } else {//if tto is not newely created
                if (projectFormReducer.locations.length !== 0) {
                    let parentId = item.id;
                    projectFormReducer.locations.map(item => {
                        if (item.flag == "createFlag" && (item.ttoId == parentId || item == '')) {// new location is created
                            let LTOBody = updateLTO(item.name, projectInfo[0].id, item.ttoId, item.parentID, item.level);
                            axios.post(`${BACKEND_URL}/organization`, LTOBody, { headers: authHeaderFinal() }).then((response) => {
                                updateResultBody.lto = response.status;
                                //for roles
                                let locationId = item.id;
                                    let insertId_lto = response.data.insertId;
                                    projectFormReducer.roleDetails.map(item => {
                                        if (item.flag == 'createFlag' && item.orgId == locationId && item.parentFlag == "createFlag") {// if mapped to lto
                                            let RoleBody = updateRoles(item.name, item.description, insertId_lto, item.isAssignable, item.isAutoAccess, item.isAutoAssignOnIntake)
                                            axios.post(`${BACKEND_URL}/role`, RoleBody, { headers: authHeaderFinal() }).then((response => {
                                                console.log(response);
                                                let insertId_role = response.data.insertId;
                                            let parentId = item.id;
                                            projectFormReducer.menuDetails.map(item => {
                                                if(item.roleId == parentId){
                                                    Object.keys(item.menuId).map(id => {
                                                        let menuBody = menuRoleCreate(insertId_tenant, insertId_tto, insertId_lto, insertId_role,id);
                                                        axios.post(`${BACKEND_URL}/create-menu-role-access`, menuBody, { headers: authHeaderFinal() }).then((response) => {
                                                            console.log(response, 'menu role created');
                                                        }).catch(function (error) {
                                                            console.log(error);
                                                            return error.response;
                                                        });
                                                    });
                                                }
                                            });
                                            projectFormReducer.resourceDetails.map(item => {
                                                if(item.roleId == parentId){
                                                    Object.keys(item.resourceId).map(id => {
                                                        let resourceBody = resourceRoleCreate(insertId_tenant, insertId_tto, insertId_lto, insertId_role,id);
                                                        axios.post(`${BACKEND_URL}/create-resource-role-access`, resourceBody, { headers: authHeaderFinal() }).then((response) => {
                                                            console.log(response, 'menu role created');
                                                        }).catch(function (error) {
                                                            console.log(error);
                                                            return error.response;
                                                        });
                                                    });
                                                }
                                            })
                                            })).catch(function (error) {
                                                console.log(error);
                                                return error.response;
                                            });
                                        }
                                    })
                                createProj.enrollmentTargetData.map(item => {
                                    if (item.flag == 'createFlag' && item.orgId == locationId) {
                                        // if(item.orgId == insertId_lto){
                                        let enrollmentTargetBody = enrollmentTargetCreate(insertId_lto, item.month, item.target);
                                        axios.post(`${BACKEND_URL}/create-enrollment-target`, enrollmentTargetBody, { headers: authHeaderFinal() }).then((response) => {
                                            console.log(response);
                                            if (response.status == 200) {
                                                console.log('okay');
                                                // alert('enrollment created from part2');
                                                clearOrg();
                                            } else {
                                                alert('not created');
                                                console.log('not okay')
                                            }
                                            alert('enrollment old org and new loc');
                                        }).catch(function (error) {
                                            console.log(error);
                                            return error.response;
                                        });
                                        // }
                                    }
                                })
                                //ra-config
                                let studyConfigGroups = [];
                                createProj.studyConfigList && createProj.studyConfigList.map(item => {
                                    if (item.flag == 'createFlag' && item.ltoId == locationId) {
                                        item.groups && item.groups.map(item => {
                                            studyConfigGroups.push(raConfigGroupsUpdate(item.assignment, item.description, item.ratio, item.sequenceLimit));
                                        });
                                        let raConfigBody = raConfigUpdate(insertId_tenant, item.description, item.blockSize, insertId_lto, studyConfigGroups);
                                        axios.post(`${BACKEND_URL}/create-ra-config`, raConfigBody, { headers: authHeaderFinal() }).then((response) => {
                                            console.log(response);
                                            // alert("ra-config created old org new loc");
                                            clearOrg();
                                        }) .catch(function (error) {
                                                console.log(error);
                                                return error.response;
                                        });
                                    }
                                })
                            }).catch(function (error) {
                                console.log(error);
                                return error.response;
                            });
                        }
                        else {
                            //ra-config
                            const ltoId = item.id;
                            let studyConfigGroups = [];
                            createProj.studyConfigList && createProj.studyConfigList.map(item => {
                                if (item.flag == 'createFlag' && item.ltoId == ltoId) {
                                    item.groups && item.groups.map(item => {
                                        studyConfigGroups.push(raConfigGroupsUpdate(item.assignment, item.description, item.ratio, item.sequenceLimit));
                                    });
                                    let raConfigBody = raConfigUpdate(insertId_tenant, item.description, item.blockSize, ltoId, studyConfigGroups);
                                    axios.post(`${BACKEND_URL}/create-ra-config`, raConfigBody, { headers: authHeaderFinal() }).then((response) => {
                                        console.log('ra-config created');
                                        // alert("ra-config created old org old loc");
                                        clearOrg();
                                    }).catch(function (error) {
                                            console.log(error);
                                            return error.response;
                                        });
                                }
                            })
                            createProj.enrollmentTargetData && createProj.enrollmentTargetData.map(item => {
                                if (item.flag == 'createFlag' && item.orgId == ltoId) {
                                        let enrollmentTargetBody = enrollmentTargetCreate(ltoId, item.month, item.target);
                                        axios.post(`${BACKEND_URL}/create-enrollment-target`, enrollmentTargetBody, { headers: authHeaderFinal() }).then((response) => {
                                            if (response.status == 200) {
                                                alert('enrollment created for old org and old loc');
                                                clearOrg();
                                            } else {
                                                console.log('enrollment not created')
                                            }
                                        }).catch(function (error) {
                                            console.log(error);
                                            return error.response;
                                        });
                                }
                            })
                        }
                    })
                }
            }
        })
    });
    //when role/ra-config/enrollment is created for an existing tenant/org/loc
    projectFormReducer.roleDetails.map(item => {//roles created from existing orgs

        if (item.flag == 'createFlag' && (item.parentFlag == "updateFlag" || item.parentFlag == "viewFlag")) {
            let RoleBody = updateRoles(item.name, item.description, item.orgId, item.isAssignable, item.isAutoAccess, item.isAutoAssignOnIntake);
            axios.post(`${BACKEND_URL}/role`, RoleBody, { headers: authHeaderFinal() }).then((response) => {
                let insertId_role = response.data.insertId;
                let parentId = item.id;
                projectFormReducer.menuDetails.map(item => {
                    if(item.roleId == parentId){
                        Object.keys(item.menuId).map(id => {
                            let menuBody = menuRoleCreate(insertId_tenant, insertId_tto, insertId_lto, insertId_role,id);
                            axios.post(`${BACKEND_URL}/create-menu-role-access`, menuBody, { headers: authHeaderFinal() }).then((response) => {
                                console.log(response, 'menu role created');
                            }).catch(function (error) {
                                console.log(error);
                                return error.response;
                            });
                        });
                    }
                });
                projectFormReducer.resourceDetails.map(item => {
                    if(item.roleId == parentId){
                        Object.keys(item.resourceId).map(id => {
                            let resourceBody = resourceRoleCreate(insertId_tenant, insertId_tto, insertId_lto, insertId_role,id);
                            axios.post(`${BACKEND_URL}/create-resource-role-access`, resourceBody, { headers: authHeaderFinal() }).then((response) => {
                                console.log(response, 'menu role created');
                            }).catch(function (error) {
                                console.log(error);
                                return error.response;
                            });
                        });
                    }
                })
            }).catch(function (error) {
                console.log(error);
                return error.response;
            });
        } else if (item.flag == 'viewFlag') { //roles are edited of an existing org
            let RoleBody = updateRoles(item.name, item.description, item.orgId, item.isAssignable, item.isAutoAccess, item.isAutoAssignOnIntake);
            axios.put(`${BACKEND_URL}/role/` + item.id, RoleBody, { headers: authHeaderFinal() }).then((response) => {
                console.log(response);
            }).catch(function (error) {
                console.log(error);
                return error.response;
            });
        }
    });
    //delete org
    projectFormReducer.orgDeleteIdList.forEach((item) => {//org delete from existing orgslist
        axios.delete(`${BACKEND_URL}/organization/` + item, config).then((response) => {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
            return error.response;
        });

    })
    //delete loc
    projectFormReducer.locDeleteIdList.forEach((item) => {//loc delete from existing locslist
        axios.delete(`${BACKEND_URL}/organization/` + item, config).then((response) => {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
            return error.response;
        });

    })
    //delete role
    projectFormReducer.roleDeleteIdList.forEach((item) => {//role delete from existing roleslist
        axios.delete(`${BACKEND_URL}/role/` + item, config).then((response) => {
            console.log(response);
        }).catch(function (error) {
            console.log(error);
            return error.response;
        });

    })
    //UpdateOrg
    projectFormReducer.organizations.map(item => {
        if (item.flag == 'UpdateFlag') {
            let TTOBody = updateTTO(item.name, projectInfo[0].id, item.ttoId, item.parentId, item.level);
            axios.put(`${BACKEND_URL}/organization/` + item.id, TTOBody, { headers: authHeaderFinal() }).then((response) => {
                console.log(response);
                alert("org updated");
                updateResultBody.tto = response.status;
            }).catch(function (error) {
                console.log(error);
                return error.response;
            });
        }
    })
    //UpdateLoc
    projectFormReducer.locations.map(item => {
        if (item.flag == 'UpdateFlag') {
            let LTOBody = updateLTO(item.name, projectInfo[0].id, item.ttoId, item.parentId, item.level);
            axios.put(`${BACKEND_URL}/organization/` + item.id, LTOBody, { headers: authHeaderFinal() }).then((response) => {
                console.log(response);
                alert("loc updated");
                updateResultBody.tto = response.status;
            }).catch(function (error) {
                console.log(error);
                return error.response;
            });
        }
    })
    //delete enrollment
    createProj.enrolDeleteIdList && createProj.enrolDeleteIdList.forEach((item) => {//org delete from existing orgslist
        axios.delete(`${BACKEND_URL}/enrollment-target/` + item, config).then((response) => {
            console.log(response);
            alert("enrollment deleted");
        }).catch(function (error) {
            console.log(error);
            return error.response;
        });

    })
    //delete ra-config from existing list
    createProj.raConfigDeleteIdList && createProj.raConfigDeleteIdList.forEach((item) => {
        axios.delete(`${BACKEND_URL}/ra-config/` + item + `?tenantId=` + projectInfo[0].id, config).then((response) => {
            console.log(response);
            // alert("ra-config deleted");
        })
        .catch(function (error) {
            console.log(error);
            return error.response;
        });
    })
    //update enrollment
    createProj.enrollmentTargetData.map(item => {
        if (item.flag == 'updateFlag') {
            let enrollmentTargetBody = enrollmentTargetCreate(item.orgId, item.month, item.target);
            axios.put(`${BACKEND_URL}/enrollment-target/` + item.id, enrollmentTargetBody, { headers: authHeaderFinal() }).then((response) => {
                console.log(response);
                alert("enrollment updated");
                //updateResultBody.tto = response.status;
            }).catch(function (error) {
                console.log(error);
                return error.response;
            });
        }
    })
    //Update ra-config
    createProj.studyConfigList && createProj.studyConfigList.map(item => {
        if (item.flag == 'updateFlag') {
            let raConfigBodyGroups = [];
            item.groups && item.groups.map(item => {
                raConfigBodyGroups.push(raConfigGroupsUpdate(item.assignment, item.description, item.ratio, item.sequenceLimit));
            });
            let raConfigBody = raConfigUpdate(projectInfo[0].id,item.description, item.blockSize, item.ltoId, raConfigBodyGroups);
            axios.put(`${BACKEND_URL}/ra-config/` + item.id, raConfigBody, config).then((response) => {
                console.log(response);
                // alert("ra-config updated");
            })
            .catch(function (error) {
                console.log(error);
                return error.response;
            });
        }
    })
}
