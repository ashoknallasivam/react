'use strict';
let express = require('express');
let axios = require('axios');
let router = express.Router();
let logging = require('../utils/logger');
let responseStatus = require('../constants/httpStatus');
let MESSAGE = require('../constants/applicationConstants');
const config = require('../config/config');

// get the project info.
router.get('/dashboard_data', (req, res) => {
    // token validation.
    let token = req.token;
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
    // preparing dashboard list.
    mapping(requestOptions).then(response => {
        res.send(mapToObjectRec(response.mapProjects));
    }).catch(error => {
        logging.applogger.error(error);
        res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
    });
});

//API for complete project information.
router.get('/dashboard_data/:id', (req, res) => {
    // token validation.
    let token = req.token;
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;

    let inpParam = req.params;
    mapping(requestOptions).then(response => {
        selectedProjectInfo(response, inpParam.id, requestOptions).then(response => {
            res.send(response);
        })
    }).catch(error => {
        //logging.applogger.error(error);
        res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
    });
});

module.exports = router;

// preparing all projects information.
function mapping(requestOptions) {
    let allTenants = [];
    let allOrganization = [];
    let allRoles = [];
    let allEnrollemntTarget = [];
    return axios.get(`${config.RAPTER_URL}/tenant`, requestOptions).then(response => {
        response.data.map(item => { item.orgs = new Map(); item.orgsList = []; allTenants.push(item) });
        var mapProjects = new Map();
        allTenants.map(item => mapProjects.set(item.id, item))
        // listing the selected project organization.
        return axios.get(`${config.RAPTER_URL}/organization`, requestOptions).then(response => {
            response.data.map(item => { item.children = new Map(); item.roles = []; item.enrollemntTargets = []; item.raConfig = []; item.bounds = ''; allOrganization.push(item) });
            var mapOrgs = new Map();
            allOrganization.map(item => mapOrgs.set(item.id, item));
            for (const [key, value] of mapOrgs.entries()) {
                if (value.ttoId == null) {
                    mapProjects.get(value.tenantId).orgs.set(key, value);
                    mapProjects.get(value.tenantId).orgsList.push(value);
                } else {
                    let parentOrg = mapOrgs.get(value.parentId);
                    parentOrg.children.set(key, value);
                    mapProjects.get(value.tenantId).orgsList.push(value);
                }
            }
            return { mapProjects: mapProjects, mapOrgs: mapOrgs };
        }).catch(error => {
            //logging.applogger.error(error);
            return ({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
        });
    }).catch(error => {
        //logging.applogger.error(error);
        return ({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
    });
}

// formatting response data map to object.
function mapToObjectRec(m) {
    let rtnVal = {};
    if (m instanceof Map) {
        for (let [k, v] of m) {//for each project
            let oneObject = {}
            Object.keys(v).forEach(function (key) {
                if (typeof v[key] === "object") {
                    oneObject[key] = mapToObjectRec(v[key])
                }
                else {
                    oneObject[key] = v[key]
                }
            });
            rtnVal[k] = oneObject;
        }
    } else {
        rtnVal = m;
    }
    return rtnVal
}

// selected project information will return.
function selectedProjectInfo(projects, projectId, requestOptions) {
    let allRoles = [];
    let allEnrollemntTarget = [];
    let allRaConfig = [];
    var promises = {};
    var menuPromises = {};
    var resourcePromises = {}
    const { mapProjects, mapOrgs } = projects;
    for (const [key, value] of mapOrgs.entries()) {
        if (value.tenantId == parseInt(projectId)) {
            let boundBody = { "tenantId": value.tenantId, "ttoId": value.ttoId == null ? value.id : value.ttoId, "ltoId": value.ttoId == null ? null : value.id }
            promises[key] = axios.post(`${config.RAPTER_URL}/bounds`, boundBody, requestOptions)
        }
    }
    return axios.all(Object.values(promises)).then(function (results) {
        results.forEach(function (response, index) {
            mapOrgs.get(parseInt(Object.keys(promises)[index])).bounds = response.data;
        })
        // listing the selected project role.
        return axios.get(`${config.RAPTER_URL}/role`, requestOptions).then(response => {
            allRoles = [...response.data];
            for (var role of allRoles) {
                for (var org of mapProjects.get(parseInt(projectId)).orgsList) {
                    if (org.id == role.orgId) {
                        role.menus = [];
                        role.resources = [];
                        let newHeaders = requestOptions;
                        newHeaders.headers['x-rapter-bounds'] = org.bounds["x-rapter-bounds"]
                        menuPromises[role.id + "O" + org.id] = axios.get(`${config.RAPTER_URL}/menu-role-access`, newHeaders).catch(error => {
                            //logging.applogger.error(error);
                        });
                        resourcePromises[role.id + "O" + org.id] = axios.get(`${config.RAPTER_URL}/resource-role-access`, newHeaders).catch(error => {
                            //logging.applogger.error(error);
                        });

                        mapOrgs.get(org.id).roles.push(role);
                    }
                }
            }
            // listing the selected project menu-role-access.
            return axios.all(Object.values(menuPromises)).then(function (results) {
                results.forEach(function (response, index) {
                    (mapOrgs.get(parseInt(Object.keys(menuPromises)[index].split("O")[1]))).roles.map(role => {
                        if (Object.keys(menuPromises)[index].split("O")[0] == role.id) {

                            typeof response === "undefined" ? role.menus = [] : response.data.map(menuAccess => {
                                if (menuAccess.roleId == role.id) {
                                    role.menus.push(menuAccess);
                                }
                            });
                        }
                    });
                });
                // listing the selected project resource-role-access.
                return axios.all(Object.values(resourcePromises)).then(function (results) {
                    results.forEach(function (response, index) {
                        (mapOrgs.get(parseInt(Object.keys(resourcePromises)[index].split("O")[1]))).roles.map(role => {
                            if (Object.keys(resourcePromises)[index].split("O")[0] == role.id) {
                                typeof response === "undefined" ? role.resources = [] : response.data.map(resourceAccess => {
                                    if (resourceAccess.roleId == role.id) {
                                        role.resources.push(resourceAccess);
                                    }
                                });
                            }
                        });
                    })
                    // listing the selected project enrollment-target.
                    return axios.get(`${config.RAPTER_URL}/enrollment-target`, requestOptions).then(response => {
                        allEnrollemntTarget = [...response.data];
                        for (var enrollmentTarget of allEnrollemntTarget) {
                            for (var org of mapProjects.get(parseInt(projectId)).orgsList) {
                                if (org.id == enrollmentTarget.orgId) {
                                    mapOrgs.get(org.id).enrollemntTargets.push(enrollmentTarget);
                                }
                            }
                        }
                        // listing the selected project ra-config.
                        return axios.get(`${config.RAPTER_URL}/ra-config?tenantId=` + parseInt(projectId), requestOptions).then(response => {
                            allRaConfig = [...response.data];
                            for (var raConfig of allRaConfig) {
                                for (var org of mapProjects.get(parseInt(projectId)).orgsList) {
                                    if (org.id == raConfig.stratum[0].value) {
                                        mapOrgs.get(org.id).raConfig.push(raConfig);
                                    }
                                }
                            }
                            mapProjects.get(parseInt(projectId)).orgs = mapToObjectRec(mapProjects.get(parseInt(projectId)).orgs);
                            return (mapProjects.get(parseInt(projectId)));
                        }).catch(error => {
                            //logging.applogger.error(error);
                            return ({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
                        });
                    }).catch(error => {
                        //logging.applogger.error(error);
                        return ({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
                    });
                }).catch(error => {
                    //logging.applogger.error(error);
                    return ({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
                });
            })
        }).catch(error => {
            //logging.applogger.error(error);
            return ({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
        });
    }).catch(error => {
        //logging.applogger.error(error);
        return ({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
    });
}