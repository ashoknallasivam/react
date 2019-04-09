'use strict';
let express = require('express');
let axios = require('axios');
let router = express.Router();
let logging = require('../utils/logger');
let responseStatus = require('../constants/httpStatus');
let MESSAGE = require('../constants/applicationConstants');
const config = require('../config/config');
let fs = require('fs');

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
    //let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZWRlYjJkMzFiZjYwMGMyYjRkZDU2MiIsImlzRnVsbHlBdXRoZW50aWNhdGVkIjp0cnVlLCJpYXQiOjE1NTQ0NDUzMDgsImV4cCI6MTU1NDUzMTcwOH0.ZJNQ7r1q391pJYs90nVOVCOU90xXpgJgyayR6BHhN0U"
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
            if(req.query.export!=="true"){
                res.send(response);
            } else {

                // export project.
                let data = JSON.stringify(response);
                fs.writeFile('AllProjects.json', data, 'utf8', function (err) {
                    if (err) {
                        logging.applogger.error(err);
                        res.send(err);
                    }else{
                        res.download('AllProjects.json', "exportedProject_" + req.params.id + ".json");
                        // fs.unlinkSync('AllProjects.json', function (err) {
                        //     if (err) throw err;
                        // })
                    }
                    
                });
            }
            
        }).catch(error => {
            //logging.applogger.error(error);
            res.status(500).send(error);
        });
    }).catch(error => {
        //logging.applogger.error(error);
        res.status(500).send(error);
    });
});

router.get('/saved_projects', (req, res) => {
    // token validation.
    let token = req.token;
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
    fs.readdir('savedProjects', function(err, items) {
        if (err) {
            logging.applogger.error(err);
            res.send(err);
        }else{
            let allSavedProjects = [];
            let parsedData;
            var promise = []
            for (var i=0; i<items.length; i++) {
                promise.push(new Promise((resolve, reject) => {
                    fs.readFile('savedProjects/' + items[i], (err, data) => {  
                        if (err) throw reject(err);
                        parsedData = JSON.parse(data);
                        resolve(parsedData)
                        //res.send(parsedData);                    
                    })
                }));
            }
            Promise.all(promise).then(function (values) {               
                res.send(JSON.stringify(values));
            })
        }
    });
});


module.exports = router;

// preparing all projects information.
function mapping(requestOptions) {
    let allTenants = [];
    let allOrganization = [];
    let allRoles = [];
    let allEnrollmentTarget = [];
    return axios.get(`${config.RAPTER_URL}/tenant`, requestOptions).then(response => {
        response.data.map(item => { item.orgs = new Map(); item.orgsList = []; allTenants.push(item) });
        var mapProjects = new Map();
        allTenants.map(item => mapProjects.set(item.id, item))
        // listing the selected project organization.
        return axios.get(`${config.RAPTER_URL}/organization`, requestOptions).then(response => {
            response.data.map(item => { item.children = new Map(); item.roles = []; item.enrollmentTargets = []; item.raConfig = []; item.bounds = ''; item.pages = []; allOrganization.push(item) });
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
    let allEnrollmentTarget = [];
    let allRaConfig = [];
    var promises = {};
    var menuPromises = {};
    var resourcePromises = {};
    var pagePromises = {};
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
            let newHeaders = requestOptions;
            newHeaders.headers['x-rapter-bounds'] = response.data
            //pagePromises[Object.keys(promises)[index]] = axios.get(`${config.RAPTER_URL}/pages`, newHeaders);
        })
        for (const [key, value] of mapOrgs.entries()) {
            if (value.tenantId == parseInt(projectId)) {
                //let boundBody = { "tenantId": value.tenantId, "ttoId": value.ttoId == null ? value.id : value.ttoId, "ltoId": value.ttoId == null ? null : value.id }
                let newHeaders = requestOptions;
                newHeaders.headers['x-rapter-bounds'] = value.bounds['x-rapter-bounds'];
                pagePromises[key] = axios.get(`${config.RAPTER_URL}/page`, newHeaders)
            }
        }
        return axios.all(Object.values(pagePromises)).then(function (results) {
            results.forEach(function (response, index) {
                mapOrgs.get(parseInt(Object.keys(promises)[index])).pages = [...response.data]
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
                    (mapProjects.get(parseInt(projectId)).orgsList.map(orginList => {
                        if(orginList.id == parseInt(Object.keys(menuPromises)[index].split("O")[1])){
                            orginList.roles.map(role => {
                                if (Object.keys(menuPromises)[index].split("O")[0] == role.id){
                            
                                    typeof response === "undefined" ? role.menus = [] : response.data.map(menuAccess => {
                                        if(menuAccess.roleId == role.id){
                                            role.menus.push(menuAccess);
                                        }
                                    });
                                }
                            })
                        }
                    }))
                });
                // listing the selected project resource-role-access.
                return axios.all(Object.values(resourcePromises)).then(function (results) {
                    results.forEach(function (response, index) {
                        (mapProjects.get(parseInt(projectId)).orgsList.map(orginList => {
                            if(orginList.id == parseInt(Object.keys(resourcePromises)[index].split("O")[1])){
                                orginList.roles.map(role => {
                                    if (Object.keys(resourcePromises)[index].split("O")[0] == role.id){
                                
                                        typeof response === "undefined" ? role.resources = [] : response.data.map(resourceAccess => {
                                            if(resourceAccess.roleId == role.id){
                                                role.resources.push(resourceAccess);
                                            }
                                        });
                                    }
                                })
                            }
                        }))
                    })
                    // listing the selected project enrollment-target.
                    return axios.get(`${config.RAPTER_URL}/enrollment-target`, requestOptions).then(response => {
                        allEnrollmentTarget = [...response.data];
                        for (var enrollmentTarget of allEnrollmentTarget) {
                            for (var org of mapProjects.get(parseInt(projectId)).orgsList) {
                                if (org.id == enrollmentTarget.orgId) {
                                    mapOrgs.get(org.id).enrollmentTargets.push(enrollmentTarget);
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
                            logging.applogger.error(error);
                            return ({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
                        });
                    }).catch(error => {
                        logging.applogger.error(error);
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
        })
    }).catch(error => {
        //logging.applogger.error(error);
        return ({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
    });
}