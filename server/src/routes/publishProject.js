'use strict';
let express = require('express');
let axios = require('axios');
let router = express.Router();
let logging = require('../utils/logger');
let responseStatus = require('../constants/httpStatus');
let MESSAGE = require('../constants/applicationConstants');
const config = require('../config/config');
let tenantBiz = require('../biz/tenantBiz');
let organizationBiz = require('../biz/organizationBiz');
let roleBiz = require('../biz/roleBiz');
let enrollmentBiz = require('../biz/enrollmentTargetBiz');
let raConfigBiz = require('../biz/raConfigBiz');
let menuBiz = require('../biz/menuRoleAccessBiz');
let resourceBiz = require('../biz/resourceRoleAccessBiz');
let pageBiz = require('../biz/pageBiz');
let boundsbiz = require('../biz/boundsBiz');
let fs = require('fs');

// publish bounds.
router.post('/publish', (req, res) => {
    let publishStatus = {};
    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;

    let inpParam = req.body;
    //Check for the input parameters.
    if ((inpParam === undefined) || Object.keys(inpParam).length === 0) {
        let rtnVal = responseStatus.BAD_REQUEST;
        rtnVal.messages = MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE;
        res.status(400).send({ code: responseStatus.BAD_REQUEST.code, status: responseStatus.BAD_REQUEST.status, messages: MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE });
        return;
    }

    // read the flag then call appropriate operation.

    if (inpParam.statusFlag === "new" && inpParam.projectStatus == "publish") {
        // publish request body.
        let tenantInputObj = {
            "name": inpParam.name
        };

        tenantBiz.createTenant(requestOptions, tenantInputObj).then(response => {
            if (response.status === 200) {
                let test = [];
                let publishedTenantId = response.data.insertId;
                if ((inpParam.orgsList !== undefined) && (inpParam.orgsList.length !== 0)) {
                    inpParam.orgsList.map(oneOrganization => {//top level organization.
                        oneOrganization.tenantId = publishedTenantId;
                        // calling create organization in loop through.
                        publishProjectOrganization(requestOptions, oneOrganization);


                        // single response to the client.finall response.
                        //res.status(200).send("Successfully created.");
                    })
                    // single response to the client.finall response.
                    res.status(200).send("Successfully created.");

                } else {
                    // if organization list empty then return with tenant success.
                    res.status(200).send(response.data);
                }

            } else {
                res.status(500).send(response);
            }
        }).catch(error => {
            res.status(500).send(error);
        })
    } else if (inpParam.statusFlag === "modified" && inpParam.projectStatus == "publish") {
        // publish request body.
        let tenantInputObj = {
            "name": inpParam.name
        };
        tenantBiz.updateTenant(requestOptions, inpParam.id, tenantInputObj).then(response => {
            if (response.status === 200) {
                if ((inpParam.orgsList !== undefined) && (inpParam.orgsList.length !== 0)) {
                    inpParam.orgsList.forEach(oneOrganization => {//top level organization.
                        // calling create organization in loop through.
                        publishProjectOrganization(requestOptions, oneOrganization)


                        // single response to the client.finall response.
                        //res.status(200).send("Successfully created.");
                    })
                    // single response to the client.finall response.
                    res.status(200).send("Successfully updated.");

                }
                console.log("Successfully updated tenant name.")
            } else {
                res.status(500).send(response);
            }
        })
    } else if(inpParam.projectStatus == "publish") {
        if ((inpParam.orgsList !== undefined) && (inpParam.orgsList.length !== 0)) {
            inpParam.orgsList.forEach(oneOrganization => {//top level organization.
                // calling create organization in loop through.
                publishProjectOrganization(requestOptions, oneOrganization);


                // single response to the client.finall response.
                //res.status(200).send("Successfully created.");
            })
            // single response to the client.finall response.
            res.status(200).send("Successfully created.");

        } else {
            // if organization list empty then return with tenant success.
            res.status(200).send(response.data);
        }

    } else if(inpParam.projectStatus == "save"){
        fs.writeFile('savedProjects/saveProject.json_' + inpParam.id + '.json', JSON.stringify(inpParam), 'utf8', function (err) {
            if (err) {
                logging.applogger.error(err);
                res.send(err);
            }else{
                res.status(200).send({savedProjectId: inpParam.id});
                // fs.unlinkSync('AllProjects.json', function (err) {
                //     if (err) throw err;
                // })
            }
            
        });
    }

});




module.exports = router;

// // publish organization list for particular project.
function publishProjectOrganization(requestOptions, oneOrganization) {
    var globalTto = oneOrganization.ttoId;
    // read the flag then call appropriate 
    if (oneOrganization.statusFlag === "new") {
        // publish request body.
        let inputObj = {
            "name": oneOrganization.name,
            "tenantId": oneOrganization.tenantId,
            "ttoId": oneOrganization.ttoId,
            "parentId": oneOrganization.parentId,
            "level": oneOrganization.level
        };

        return organizationBiz.createOrganization(requestOptions, inputObj).then(response => {
            var arr = []
            if (inputObj.level === 0) {
                globalTto = response.data.insertId;
            }
            if (response.status === 200) {
                arr.push(response.status);
                let orgUserBody = {"ttoId" : globalTto, "ltoId":  inputObj.ttoId == null? null: response.data.insertId, userId: oneOrganization.userId}
                if(inputObj.level !== 0){   
                    organizationBiz.createOrganizationUser(requestOptions, orgUserBody);
                }
                if (oneOrganization.roles !== undefined && oneOrganization.roles.length !== 0) {
                    publishRoleList(requestOptions, oneOrganization.roles, oneOrganization.tenantId, globalTto, response.data.insertId == globalTto ? null : response.data.insertId);
                    arr.push(response.status)
                }
                // creating raconfigs
                if (oneOrganization.raConfig !== undefined && oneOrganization.raConfig.length !== 0) {
                    publishRaConfigList(requestOptions, oneOrganization.raConfig, response.data.insertId, oneOrganization.tenantId);

                }
                // creating enrollments
                if (oneOrganization.enrollmentTargets !== undefined && oneOrganization.enrollmentTargets.length !== 0) {
                    publishEnrollementTargetList(requestOptions, oneOrganization.enrollmentTargets, response.data.insertId);
                }
                // creating pages // bounds are need.
                if (oneOrganization.pages !== undefined && oneOrganization.pages.length !== 0) {
                    publishProjectPageList(requestOptions, oneOrganization.pages, oneOrganization.tenantId, globalTto, response.data.insertId == globalTto ? null : response.data.insertId);
                }

                // checking the organization have any chilren or not.
                if (oneOrganization.children.length !== 0) {
                    oneOrganization.children.forEach(oneChildren => {
                        // set parentId to child.
                        oneChildren.tenantId = oneOrganization.tenantId;
                        oneChildren.parentId = response.data.insertId;
                        oneChildren.ttoId = globalTto;
                        // calling childrens of organization.
                        publishProjectOrganization(requestOptions, oneChildren);
                    })
                }
            }
            return response
        })
    } else if (oneOrganization.statusFlag === "modified") {

        let inputObj = {
            "name": oneOrganization.name,
            "tenantId": oneOrganization.tenantId,
            "ttoId": oneOrganization.ttoId,
            "parentId": oneOrganization.parentId,
            "level": oneOrganization.level
        };
        return organizationBiz.updateOrganization(requestOptions, oneOrganization.id, inputObj).then(response => {
            if (response.status === 200) {
                if (oneOrganization.roles !== undefined && oneOrganization.roles.length !== 0) {
                    publishRoleList(requestOptions, oneOrganization.roles, oneOrganization.tenantId, oneOrganization.ttoId, oneOrganization.id);
                }
                // creating raconfigs
                if (oneOrganization.raConfig !== undefined && oneOrganization.raConfig.length !== 0) {
                    publishRaConfigList(requestOptions, oneOrganization.raConfig, oneOrganization.id, oneOrganization.tenantId);
                }
                // creating enrollments
                if (oneOrganization.enrollmentTargets !== undefined && oneOrganization.enrollmentTargets.length !== 0) {
                    publishEnrollementTargetList(requestOptions, oneOrganization.enrollmentTargets, oneOrganization.id);
                }
                // creating pages // bounds are need.
                if (oneOrganization.pages !== undefined && oneOrganization.pages.length !== 0) {
                    publishProjectPageList(requestOptions, oneOrganization.pages, oneOrganization.tenantId, oneOrganization.ttoId, oneOrganization.id);
                }

                // checking the organization have any chilren or not.
                if (oneOrganization.children.length !== 0) {
                    oneOrganization.children.forEach(oneChildren => {
                        // set parentId to child.
                        oneChildren.tenantId = oneOrganization.tenantId;
                        oneChildren.parentId = response.data.insertId;
                        oneChildren.ttoId = globalTto;
                        // calling childrens of organization.
                        publishProjectOrganization(requestOptions, oneChildren);
                    })
                }
            }

        })

    } else if (oneOrganization.statusFlag === "delete") {
        return organizationBiz.deleteOrganization(requestOptions, oneOrganization.id).then(response => {
            if (response.status === 200) {
                // return success msg.
                return response
            } else {
                logging.applogger.error(response);
            }
        })
    } else {

        if (oneOrganization.roles !== undefined && oneOrganization.roles.length !== 0) {
            publishRoleList(requestOptions, oneOrganization.roles, oneOrganization.tenantId, oneOrganization.ttoId, oneOrganization.id);
        }
        // creating raconfigs
        if (oneOrganization.raConfig !== undefined && oneOrganization.raConfig.length !== 0) {
            publishRaConfigList(requestOptions, oneOrganization.raConfig, oneOrganization.id, oneOrganization.tenantId);
        }
        // creating enrollments
        if (oneOrganization.enrollmentTargets !== undefined && oneOrganization.enrollmentTargets.length !== 0) {
            publishEnrollementTargetList(requestOptions, oneOrganization.enrollmentTargets, oneOrganization.id);
        }
        // creating pages // bounds are need.
        if (oneOrganization.pages !== undefined && oneOrganization.pages.length !== 0) {
            publishProjectPageList(requestOptions, oneOrganization.pages, oneOrganization.tenantId, oneOrganization.ttoId, oneOrganization.id);
        }

        // checking the organization have any chilren or not.
        if (oneOrganization.children.length !== 0) {
            oneOrganization.children.forEach(oneChildren => {
                // set parentId to child.
                oneChildren.tenantId = oneOrganization.tenantId;
                oneChildren.parentId = oneOrganization.id;
                oneChildren.ttoId = oneOrganization.level === 0 ? oneOrganization.id: oneOrganization.ttoId;
                // calling childrens of organization.
                publishProjectOrganization(requestOptions, oneChildren);
            })
        }
    }
}


// publish role list for particular project.
function publishRoleList(requestOptions, roleList, tenantId, globalTto, orgId) {
    let publishRoleStatus = {};
    // loop through the roleList.
    if (roleList.length !== 0) {
        roleList.forEach(oneRole => {
            if (oneRole.statusFlag === "new") {
                // preparing role body.
                let roleBody = {
                    "name": oneRole.name,
                    "description": oneRole.description,
                    "orgId": orgId,
                    "isAssignable": oneRole.isAssignable,
                    "isAutoAccess": oneRole.isAutoAccess,
                    "isAutoAssignOnIntake": oneRole.isAutoAssignOnIntake
                };

                return roleBiz.createRole(requestOptions, roleBody).then(response => {

                    if (response.status === 200) {

                        if (oneRole.menus.length !== 0) {
                            publishMenuRoleAccessList(requestOptions, oneRole.menus, tenantId, globalTto, orgId, response.data.insertId);
                        }
                        if (oneRole.resources.length !== 0) {
                            publishResourceRoleAccessList(requestOptions, oneRole.resources, tenantId, globalTto, orgId, response.data.insertId);

                        }

                        return response.data;
                    } else {
                        logging.applogger.error(response);
                    }
                });
            } else if (oneRole.statusFlag === "modified") {
                // preparing role body.
                let roleBody = {
                    "name": oneRole.name,
                    "description": oneRole.description,
                    "orgId": oneRole.orgId,
                    "isAssignable": oneRole.isAssignable,
                    "isAutoAccess": oneRole.isAutoAccess,
                    "isAutoAssignOnIntake": oneRole.isAutoAssignOnIntake
                };

                return roleBiz.updateRole(requestOptions, oneRole.id, roleBody).then(response => {
                    if (response.status === 200) {

                        if (oneRole.menus.length !== 0) {
                            publishMenuRoleAccessList(requestOptions, oneRole.menus, tenantId, oneRole.orgId, orgId, oneRole.id);
                        }
                        if (oneRole.resources.length !== 0) {
                            publishResourceRoleAccessList(requestOptions, oneRole.resources, tenantId, globalTto, orgId, oneRole.id);

                        }
                        return response.data;
                    } else {
                        logging.applogger.error(response);
                    }
                });

            } else if (oneRole.statusFlag === "delete") {
                return roleBiz.deleteRole(requestOptions, oneRole.id).then(response => {
                    if (response.status === 200) {
                        return response;
                    } else {
                        logging.applogger.error(response);
                    }
                });
            }
        })
    }
}

// publish menu-role-access list for particular project.
function publishMenuRoleAccessList(requestOptions, menuRoleAccessList, tenantId, globalTto, ltoId, roleId) {
    let boundsBody = {
        "tenantId": tenantId,
        "ttoId": globalTto,
        "ltoId": ltoId
    }
    return boundsbiz.createBounds(requestOptions, boundsBody).then(response => {
        if (response.status === 200) {
            let newHeaders = requestOptions;
            newHeaders.headers['x-rapter-bounds'] = response.data["x-rapter-bounds"]
            if (menuRoleAccessList.length !== 0) {
                menuRoleAccessList.forEach(oneMenuRoleAccess => {
                    if (oneMenuRoleAccess.statusFlag === "new") {
                        // preparing body for resource.
                        let menuRoleAccessBody = {
                            "roleId": roleId,
                            "menuId": oneMenuRoleAccess.menuId,
                        };
                        return menuBiz.createMenuRoleAccess(newHeaders, menuRoleAccessBody).then(response => {
                            if (response.status === 200) {
                                return response;
                            } else {
                                logging.applogger.error(response);
                            }
                        });

                    } else if (oneMenuRoleAccess.statusFlag === "delete") {
                        return menuBiz.deleteMenuRoleAccess(newHeaders, oneMenuRoleAccess.menuId).then(response => {
                            if (response.status === 200) {
                                return response;
                            } else {
                                logging.applogger.error(response);
                            }
                        });

                    }

                });
            }
        }
    })

}

// publish resource-role-access list for particular project.
function publishResourceRoleAccessList(requestOptions, resourceRoleAccessList, tenantId, globalTto, ltoId, roleId) {
    let boundsBody = {
        "tenantId": tenantId,
        "ttoId": globalTto,
        "ltoId": ltoId
    }
    return boundsbiz.createBounds(requestOptions, boundsBody).then(response => {
        if (response.status === 200) {
            let newHeaders = requestOptions;
            newHeaders.headers['x-rapter-bounds'] = response.data["x-rapter-bounds"]

            //loop through the resourceRoleAccessList.
            if (resourceRoleAccessList.length !== 0) {
                resourceRoleAccessList.forEach(oneResourceRoleAccess => {
                    if (oneResourceRoleAccess.statusFlag === "new") {
                        // preparing body for resource.
                        let resourceRoleAccessBody = {
                            "roleId": roleId,
                            "resourceId": oneResourceRoleAccess.resourceId
                        };
                        return resourceBiz.createResourceRoleAccess(newHeaders, resourceRoleAccessBody).then(response => {
                            if (response.status === 200) {
                                return response;
                            } else {
                                logging.applogger.error(response);
                            }
                        })

                    } else if (oneResourceRoleAccess.statusFlag === "delete") {
                        return resourceBiz.deleteResourceRoleAccess(newHeaders, oneResourceRoleAccess.resourceId).then(response => {
                            if (response.status === 200) {
                                return response;
                            } else {
                                logging.applogger.error(response);
                            }

                        })

                    }

                });
            }
        }
    })

}

// publish ra-config list for particular project.
function publishRaConfigList(requestOptions, raConfigList, ltoId, tenantId) {

    // loop through the raConfigList.
    if (raConfigList.length !== 0) {
        var statusPromises = []
        raConfigList.forEach(oneRaConfig => {
            if (oneRaConfig.statusFlag === "new") {

                // set the location id for value.
                oneRaConfig.stratum[0].value = ltoId;
                // need to prepare body.
                let raConfiBody = {
                    "description": oneRaConfig.description,
                    "stratum": oneRaConfig.stratum,
                    "blockSize": oneRaConfig.blockSize,
                    "groups": oneRaConfig.groups
                };
                raConfigBiz.createRaConfig(requestOptions, tenantId, raConfiBody).then(response => {
                    if (response.status === 200) {
                        statusPromises.push(response.status)
                        return response;
                    } else {
                        logging.applogger.error(response);
                    }
                })

            } else if (oneRaConfig.statusFlag === "modified") {
                // need to prepare body.
                let raConfiBody = {
                    "description": oneRaConfig.description,
                    "stratum": oneRaConfig.stratum,
                    "blockSize": oneRaConfig.blockSize,
                    "groups": oneRaConfig.groups
                };
                return raConfigBiz.updateRaConfig(requestOptions, oneRaConfig._id, tenantId, raConfiBody).then(response => {
                    if (response.status === 200) {
                        return response;
                    } else {
                        logging.applogger.error(response);
                    }
                })

            } else if (oneRaConfig.statusFlag === "delete") {
                return raConfigBiz.deleteRaConfig(requestOptions, oneRaConfig._id, tenantId).then(response => {
                    if (response.status === 200) {
                        return response;
                    } else {
                        logging.applogger.error(response);
                    }
                })
            }

        });
    }
}

// publish enrollment-target list for particular project.
function publishEnrollementTargetList(requestOptions, enrollmentTargetList, orgId) {

    //loop through the enrollmentTargetList.
    if (enrollmentTargetList.length !== 0) {
        enrollmentTargetList.forEach(oneEnrollmentTarget => {
            // read the flag and do the operation.
            if (oneEnrollmentTarget.statusFlag === "new") {

                // preparing EnrollmentTarget body.
                let enrollmentBody = {
                    "orgId": orgId,
                    "month": oneEnrollmentTarget.month,
                    "target": oneEnrollmentTarget.target
                };
                return enrollmentBiz.createEnrollmentTarget(requestOptions, enrollmentBody).then(response => {
                    if (response.status === 200) {
                        return response;
                    } else {
                        logging.applogger.error(response);
                    }
                })
            } else if (oneEnrollmentTarget.statusFlag === "modified") {
                // preparing EnrollmentTarget body.
                let enrollmentBody = {
                    "orgId": oneEnrollmentTarget.orgId,
                    "month": oneEnrollmentTarget.month,
                    "target": oneEnrollmentTarget.target
                };
                return enrollmentBiz.updateEnrollmentTarget(requestOptions, oneEnrollmentTarget.id, enrollmentBody).then(response => {
                    if (response.status === 200) {
                        return response;
                    } else {
                        logging.applogger.error(response);
                    }
                })

            } else if (oneEnrollmentTarget.statusFlag === "delete") {
                return enrollmentBiz.deleteEnrollmentTarget(requestOptions, oneEnrollmentTarget.id).then(response => {
                    if (response.status === 200) {
                        return response;
                    } else {
                        logging.applogger.error(response);
                    }
                })
            }
        });
    }
}

function publishProjectPageList(requestOptions, pageList, tenantId, globalTto, ltoId) {
    let boundsBody = {
        "tenantId": tenantId,
        "ttoId": globalTto,
        "ltoId": ltoId
    }
    return boundsbiz.createBounds(requestOptions, boundsBody).then(response => {
        if (response.status === 200) {
            let newHeaders = requestOptions;
            newHeaders.headers['x-rapter-bounds'] = response.data["x-rapter-bounds"]

            // loop through the pagelist.
            if (pageList.length !== 0) {
                pageList.forEach(onePage => {
                    if (onePage.statusFlag === "new") {
                        // prepaing pagebody
                        let pageBody = {
                            "key": onePage.key,
                            "collection": onePage.collection,
                            "title": onePage.title,
                            "subtitle": onePage.subtitle,
                            "layout": onePage.layout
                        }
                        return pageBiz.createPage(newHeaders, pageBody).then(response => {
                            if (response.status === 200) {
                                return response;
                            } else {
                                logging.applogger.error(response);
                            }
                        });

                    } else if (onePage.statusFlag === "modified") {
                        let pageBody = {
                            "key": onePage.key,
                            "collection": onePage.collection,
                            "title": onePage.title,
                            "subtitle": onePage.subtitle,
                            "layout": onePage.layout
                        }
                        return pageBiz.updatePage(newHeaders, onePage._id, pageBody).then(response => {
                            if (response.status === 200) {
                                return response;
                            } else {
                                logging.applogger.error(response);
                            }
                        });

                    } else if (onePage.statusFlag === "delete") {
                        return pageBiz.deletePage(newHeaders, onePage._id).then(response => {
                            if (response.status === 200) {
                                return response;
                            } else {
                                logging.applogger.error(response);
                            }
                        });

                    }

                });
            }
        }
    });

}