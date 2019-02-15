import axios from 'axios';
const TENANT_POST_SUCCESS = 'TENANT_POST_SUCCESS';
import { API_URL } from '../config';
import { PublishActionTypes } from '../constants/actionTypes';
import { clearOrg } from './tenantAction';

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
let raConfigUpdate = (description, blockSize, ltoId, groups) => {
    let raConfigBody = {};
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

export const Update = () => (dispatch, getState) => {
    console.log('update is set');
    const { projectFormReducer, projectInfo, createProj, LtoReducers, TtoReducers } = getState();
    let tenantBody = updateTenant(projectFormReducer.tenant);
    axios.put(`${API_URL}/api/v1/tenant/` + projectInfo[0].id, tenantBody, config).then((response) => {
        console.log(response);
        updateResultBody.tenant = response.status;
        alert("tenant name is updated");
        projectFormReducer.organizations.map(item => {
            if (item.flag == "createFlag") {//if org is newely created
                let TTOBody = updateTTO(item.name, projectInfo[0].id, item.ttoId, item.parentID, item.level);
                axios.post(`${API_URL}/api/v1/organization`, TTOBody, config).then((response) => {
                    console.log(response);
                    alert("new org is added");
                    updateResultBody.tto = response.status;
                    let orgId = item.id;//internal ttoId which should be compared to create a ltos and roles
                    let insertId_tto = response.data.insertId;
                    if (projectFormReducer.locations.length !== 0) {
                        projectFormReducer.locations.map(item => {
                            if (item.flag == "createFlag" && (item.ttoId == orgId || item == '')) {//when a new location is added
                                let LTOBody = updateLTO(item.name, projectInfo[0].id, insertId_tto, insertId_tto, item.level);
                                axios.post(`${API_URL}/api/v1/organization`, LTOBody, config).then((response) => {
                                    updateResultBody.lto = response.status;
                                    //for roles
                                    let locationId = item.id;
                                    let insertId_lto = response.data.insertId;
                                    projectFormReducer.roleDetails.map(item => {
                                        if (item.flag == 'createFlag' && item.orgId == locationId) {// if mapped to lto
                                            let RoleBody = updateRoles(item.name, item.description, insertId_lto, item.isAssignable, item.isAutoAccess, item.isAutoAssignOnIntake)
                                            axios.post(`${API_URL}/api/v1/role`, RoleBody, config).then((response => {
                                                console.log(response);
                                            }))
                                        } else if (item.flag == 'createFlag' && item.orgId == orgId) {// if mapped to tto
                                            let RoleBody = updateRoles(item.name, item.description, insertId_tto, item.isAssignable, item.isAutoAccess, item.isAutoAssignOnIntake)
                                            axios.post(`${API_URL}/api/v1/role`, RoleBody, config).then((response => {
                                                console.log(response);
                                            }))
                                        }
                                    })
                                    //enrollment-target
                                    createProj.enrollmentTargetData && createProj.enrollmentTargetData.map(item => {
                                        if (item.flag == 'createFlag') {
                                            // if(item.orgId == insertId_lto){
                                            let enrollmentTargetBody = enrollmentTargetCreate(insertId_lto, item.month, item.target);
                                            axios.post(`${API_URL}/api/v1/enrollment-target`, enrollmentTargetBody, config).then((response) => {
                                                console.log(response);
                                                if (response.status == 200) {
                                                    console.log('okay');
                                                    alert('enrollment created from new org and new loc');
                                                    clearOrg();
                                                } else {
                                                    alert('not created');
                                                    console.log('not okay')
                                                }
                                            })
                                            // }
                                        }
                                    })
                                    //ra-config
                                    let raConfigGroups = [];
                                    createProj.finalStudyConfigData && createProj.finalStudyConfigData.map(item => {
                                        if (item.flag == 'createFlag') {
                                            item.groups && item.groups.map(item => {
                                                raConfigGroups.push(raConfigGroupsUpdate(item.assignment, item.description, item.ratio, item.sequenceLimit));
                                            });
                                            let raConfigBody = raConfigUpdate(item.description, item.blockSize, insertId_lto, raConfigGroups);
                                            axios.post(`${API_URL}/api/v1/ra-config?tenantId=` + projectInfo[0].id, raConfigBody, config).then((response) => {
                                                console.log(response);
                                            })
                                                .catch(function (error) {
                                                    console.log(error);
                                                });
                                        }
                                    })
                                })
                            } else {// when no new location is added but org is added

                            }
                        })
                    }

                    /* 
                    if location is not created
                    similar structure for only tto will be written here in else part;
                    */
                    else {

                    }
                })
            } else {//if org is not newely created
                if (projectFormReducer.locations.length !== 0) {
                    let parentId = item.id;
                    projectFormReducer.locations.map(item => {
                        if (item.flag == "createFlag" && (item.ttoId == parentId || item == '')) {// new location is created
                            let LTOBody = updateLTO(item.name, projectInfo[0].id, item.ttoId, item.parentID, item.level);
                            axios.post(`${API_URL}/api/v1/organization`, LTOBody, config).then((response) => {
                                updateResultBody.lto = response.status;
                                //for roles
                                let locationId = item.id;
                                let insertId_lto = response.data.insertId;
                                // let RoleBody = updateRoles(item.name, item.description, insertId_tto)
                                // axios.post(`${API_URL}/api/v1/role`, RoleBody, config)
                                //enrollment-target
                                createProj.enrollmentTargetData && createProj.enrollmentTargetData.map(item => {
                                    if (item.flag == 'createFlag') {
                                        // if(item.orgId == insertId_lto){
                                        let enrollmentTargetBody = enrollmentTargetCreate(insertId_lto, item.month, item.target);
                                        axios.post(`${API_URL}/api/v1/enrollment-target`, enrollmentTargetBody, config).then((response) => {
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
                                        })
                                        // }
                                    }
                                })
                                //ra-config
                                let studyConfigGroups = [];
                                createProj.finalStudyConfigData && createProj.finalStudyConfigData.map(item => {
                                    if (item.flag == 'createFlag') {
                                        item.groups && item.groups.map(item => {
                                            studyConfigGroups.push(raConfigGroupsUpdate(item.assignment, item.description, item.ratio, item.sequenceLimit));
                                        });
                                        let raConfigBody = raConfigUpdate(item.description, item.blockSize, insertId_lto, studyConfigGroups);
                                        axios.post(`${API_URL}/api/v1/ra-config?tenantId=` + projectInfo[0].id, raConfigBody, config).then((response) => {
                                            console.log(response);
                                        })
                                            .catch(function (error) {
                                                console.log(error);
                                            });
                                    }
                                })
                            })
                        }
                        else {
                            //ra-config
                            const ltoId = item.id;
                            let studyConfigGroups = [];
                            createProj.finalStudyConfigData && createProj.finalStudyConfigData.map(item => {
                                if (item.flag == 'createFlag' && item.ltoId == ltoId) {
                                    item.groups && item.groups.map(item => {
                                        studyConfigGroups.push(raConfigGroupsUpdate(item.assignment, item.description, item.ratio, item.sequenceLimit));
                                    });
                                    let raConfigBody = raConfigUpdate(item.description, item.blockSize, ltoId, studyConfigGroups);
                                    axios.post(`${API_URL}/api/v1/ra-config?tenantId=` + projectInfo[0].id, raConfigBody, config).then((response) => {
                                        console.log(response);
                                    })
                                        .catch(function (error) {
                                            console.log(error);
                                        });
                                }
                            })
                            createProj.enrollmentTargetData && createProj.enrollmentTargetData.map(item => {
                                if (item.flag == 'createFlag') {
                                    if (item.orgId == ltoId) {
                                        let enrollmentTargetBody = enrollmentTargetCreate(ltoId, item.month, item.target);
                                        axios.post(`${API_URL}/api/v1/enrollment-target`, enrollmentTargetBody, config).then((response) => {
                                            console.log(response);
                                            if (response.status == 200) {
                                                console.log('okay');
                                                //alert('enrollment created from part1');
                                                clearOrg();
                                            } else {
                                                alert('not created');
                                                console.log('not okay')
                                            }
                                            alert('enrollment created for old org and old loc');
                                        })
                                    }
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

        if (item.flag == 'createFlag') {
            let RoleBody = updateRoles(item.name, item.description, item.orgId, item.isAssignable.data[0], item.isAutoAccess.data[0], item.isAutoAssignOnIntake.data[0]);
            axios.post(`${API_URL}/api/v1/role`, RoleBody, config).then((response) => {
                console.log(response);
            })
        } else if (item.flag == 'viewFlag') { //roles are edited of an existing org
            let RoleBody = updateRoles(item.name, item.description, item.orgId, item.isAssignable.data[0], item.isAutoAccess.data[0], item.isAutoAssignOnIntake.data[0]);
            axios.put(`${API_URL}/api/v1/role/` + item.id, RoleBody, config).then((response) => {
                console.log(response);
            })
        }
    });
    //delete org
    projectFormReducer.orgDeleteIdList.forEach((item) => {//org delete from existing orgslist
        axios.delete(`${API_URL}/api/v1/organization/` + item, config).then((response) => {
            console.log(response);
        })

    })
    //delete loc
    projectFormReducer.locDeleteIdList.forEach((item) => {//loc delete from existing locslist
        axios.delete(`${API_URL}/api/v1/organization/` + item, config).then((response) => {
            console.log(response);
        })

    })
    //delete role
    projectFormReducer.roleDeleteIdList.forEach((item) => {//role delete from existing roleslist
        axios.delete(`${API_URL}/api/v1/role/` + item, config).then((response) => {
            console.log(response);
        })

    })
    //UpdateOrg
    projectFormReducer.organizations.map(item => {
        if (item.flag == 'UpdateFlag') {
            let TTOBody = updateTTO(item.name, projectInfo[0].id, item.ttoId, item.parentID, item.level);
            axios.put(`${API_URL}/api/v1/organization/` + item.id, TTOBody, config).then((response) => {
                console.log(response);
                alert("org updated");
                updateResultBody.tto = response.status;
            })
        }
    })
    //UpdateLoc
    projectFormReducer.locations.map(item => {
        if (item.flag == 'UpdateFlag') {
            let LTOBody = updateLTO(item.name, projectInfo[0].id, item.ttoId, item.parentID, item.level);
            axios.put(`${API_URL}/api/v1/organization/` + item.id, LTOBody, config).then((response) => {
                console.log(response);
                alert("loc updated");
                updateResultBody.tto = response.status;
            })
        }
    })
    //delete enrollment
    createProj.enrolDeleteIdList && createProj.enrolDeleteIdList.forEach((item) => {//org delete from existing orgslist
        axios.delete(`${API_URL}/api/v1/enrollment-target/` + item, config).then((response) => {
            console.log(response);
            alert("enrollment deleted");
        })

    })
    //delete ra-config from existing list
    createProj.raConfigDeleteIdList && createProj.raConfigDeleteIdList.forEach((item) => {
        console.log(item);
        axios.delete(`${API_URL}/api/v1/ra-config/` + item + `?tenantId=` + projectInfo[0].id, config).then((response) => {
            console.log(response);
        })
            .catch(function (error) {
                console.log(error);
            });
    })
    //update enrollment
    createProj.enrollmentTargetData.map(item => {
        if (item.flag == 'updateFlag') {
            console.log(item)
            let TTOBody = enrollmentTargetCreate(item.orgId, item.month, item.target);
            axios.put(`${API_URL}/api/v1/enrollment-target/` + item.id, TTOBody, config).then((response) => {
                console.log(response);
                alert("enrollment updated");
                //updateResultBody.tto = response.status;
            })
        }
    })
    //Update ra-config
    let raConfigBodyGroups = [];
    createProj.finalStudyConfigData && createProj.finalStudyConfigData.map(item => {
        if (item.flag == 'updateFlag') {
            item.groups && item.groups.map(item => {
                raConfigBodyGroups.push(raConfigGroupsUpdate(item.assignment, item.description, item.ratio, item.sequenceLimit));
            });
            let raConfigBody = raConfigUpdate(item.description, item.blockSize, item.ltoId, raConfigBodyGroups);
            axios.put(`${API_URL}/api/v1/ra-config/` + item._id + `?tenantId=` + projectInfo[0].id, raConfigBody, config).then((response) => {
                console.log(response);
            })
                .catch(function (error) {
                    console.log(error);
                });
        }
    })
}
