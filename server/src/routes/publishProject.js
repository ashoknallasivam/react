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
let toTreeBiz = require('../biz/listToTree');
let fs = require('fs');
const isvalid = require('isvalid');


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
    requestOptions.headers.Environment = req.headers.environment;
	
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
            let publishOrgStatus = {};
            publishOrgStatus.orgs = [];
            if (response.status === 200) {
                publishOrgStatus.Tenant = response.status;
                let publishedTenantId = response.data.insertId;
                if ((inpParam.orgsList !== undefined) && (inpParam.orgsList.length !== 0)) {
                    inpParam.orgsList.forEach(oneOrganization => {//top level organization.
                        oneOrganization.tenantId = publishedTenantId;

                        // calling create organization in loop through.
                        publishOrgStatus.orgs.push(publishProjectOrganization(requestOptions, oneOrganization));//will 
                    })

                    // single response to the client.finall response.
                    let tenantResult = []
                    publishOrgStatus.orgs.map(item => {
                        item.then(response => {
                            if (response !== "success") {
                                tenantResult.push({ "failed": response });
                            } else {
                                tenantResult.push("success");
                            }
                        })
                    })

                    tenantResult.map(item => {
                        if (typeof item === "object") {
                            tenantBiz.deleteTenant(requestOptions, publishedTenantId).then(response => {
                                if (response.status === 200) {
                                    res.status(500).send("Tenant creation failed");
                                } else {
                                    res.status(500).send("Manually need deletion of a failed tenant. " + publishedTenantId);
                                }
                            })
                            return item.failed
                        }
                    })
                    let resultValue = {
                        id: publishedTenantId,
                        messages: "Successfully created. "
                    }
                    // fs.readdir('savedProjects', function (err, items) {
                    //     if (err) {
                    //         //res.status(500).send(err);
                    //         logging.applogger.error(err);
                    //     } else {
                    //         let item = inpParam.id + ".json";
                    //         fs.unlink('savedProjects/' + item, (err) => {
                    //             if (err) {
                    //                 res.status(500).send(err);
                    //             }else{
                    //                 res.status(200).send("Successfully file was deleted.");
                    //             }
                    //         })
                    //     }
                    // });
                    res.status(200).send(resultValue);

                } else {
                    let resultValue = {
                        id: response.data.insertId,
                        messages: "Successfully created."
                    }
                    // if organization list empty then return with tenant success.
                    res.status(200).send(resultValue);
                }

            } else {
                res.status(500).send(response);
                logging.applogger.error(response);
            }
        }).catch(error => {
            res.status(500).send(error);
            logging.applogger.error(error);
        })
    } else if (inpParam.statusFlag === "modified" && inpParam.projectStatus == "publish") {
        // publish request body.
        let tenantInputObj = {
            "name": inpParam.name
        };
        tenantBiz.updateTenant(requestOptions, inpParam.id, tenantInputObj).then(response => {
            let publishOrgStatus = {};
            publishOrgStatus.orgs = [];
            if (response.status === 200) {
                if ((inpParam.orgsList !== undefined) && (inpParam.orgsList.length !== 0)) {
                    inpParam.orgsList.forEach(oneOrganization => {//top level organization.
                        // calling create organization in loop through.
                        publishOrgStatus.orgs.push(publishProjectOrganization(requestOptions, oneOrganization));
                    })

                    // single response to the client.finall response.
                    let tenantResult = [];
                    let final = Promise.all(publishOrgStatus.orgs);
                    final.then(function (results) {
                        results.map(item => {
                            if (item !== "success") {
                                tenantResult.push({ "failed": response });
                            } else {
                                tenantResult.push("success");
                            }
                        })
                    })

                    tenantResult.map(item => {
                        if (typeof item === "object") {
                            res.status(500).send(item.failed);
                            return
                        }
                    })
                    let resultValue = {
                        id: inpParam.id,
                        messages: "Successfully updated. "
                    }
                    res.status(200).send(resultValue);

                } else {
                    // if organization list empty then return with tenant success.
                    let resultValue = {
                        id: inpParam.id,
                        messages: "Successfully updated."
                    }
                    res.status(200).send(resultValue);

                }
            } else {
                res.status(500).send(response);
                logging.applogger.error(response);
            }
        }).catch(error => {
            res.status(500).send(error);
            logging.applogger.error(error);
        })
    } else if (inpParam.projectStatus == "publish") {

        let publishOrgStatus = {};
        publishOrgStatus.orgs = [];
        if ((inpParam.orgsList !== undefined) && (inpParam.orgsList.length !== 0)) {
            inpParam.orgsList.forEach(oneOrganization => {//top level organization.
                // calling create organization in loop through.
                publishOrgStatus.orgs.push(publishProjectOrganization(requestOptions, oneOrganization));//this will return "scucess" or "error message"
            })

            // single response to the client.finall response.
            let tenantResult = [];
            let final = Promise.all(publishOrgStatus.orgs);
            final.then(function (results) {
                results.map(item => {
                    if (item !== "success") {
                        tenantResult.push({ "failed": response });
                    } else {
                        tenantResult.push("success");
                    }
                })
            })

            tenantResult.map(item => {
                if (typeof item === "object") {
                    res.status(500).send(item.failed);
                    return;
                }
            })
            let resultValue = {
                id: inpParam.id,
                messages: "Successfully updated. "
            }
            res.status(200).send(resultValue);
        }

    } else if (inpParam.projectStatus == "save") {
        if (!fs.existsSync('savedProjects/')){
                fs.mkdirSync('savedProjects/');
        }
        fs.readdir('savedProjects', function (err, items) {
            if (err) {
                logging.applogger.error(err);
                res.send(err);
            } else {
                let parsedData;
                let duplicate = [];
                var promise = []
                for (var i = 0; i < items.length; i++) {
                    promise.push(new Promise((resolve, reject) => {
                        fs.readFile('savedProjects/' + items[i], (err, data) => {
                            if (err) throw reject(err);
                            parsedData = JSON.parse(data);
                            resolve(parsedData)
                            //res.send(parsedData);                    
                        })
                    }));
                }
                if(promise.length !==0){
                    Promise.all(promise).then(function (values) {
                        if(values.length !== 0){
                            values.map(item => {
                                if(item.name === inpParam.name && item.id !== inpParam.id){//same name and different id means a new unpublished project
                                    duplicate.push(true);
                                }
                            })
                            if(duplicate.includes(true)){
                                res.status(403).send("Duplicate entry for the " + inpParam.name + " exists");
                            }else{
                                fs.writeFile('savedProjects/' + inpParam.id + '.json', JSON.stringify(inpParam), 'utf8', function (err) {
                                    if (err) {
                                        logging.applogger.error(err);
                                        res.send(err);
                                    } else {
                                        res.status(200).send({ savedProjectId: inpParam.id });
                                        // fs.unlinkSync('AllProjects.json', function (err) {
                                        //     if (err) throw err;
                                        // })
                                    }
                        
                                });
                            }
                        }
                    })
                }else{
                    fs.writeFile('savedProjects/' + inpParam.id + '.json', JSON.stringify(inpParam), 'utf8', function (err) {
                        if (err) {
                            logging.applogger.error(err);
                            res.send(err);
                        } else {
                            res.status(200).send({ savedProjectId: inpParam.id });
                            // fs.unlinkSync('AllProjects.json', function (err) {
                            //     if (err) throw err;
                            // })
                        }
            
                    });
                }
            }
        });
    }

});


router.post('/validate', (req, res) => {
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let inpParam = req.body;
    isvalid(inpParam, {
        type: Object,
        unknownKeys: 'remove',
        schema: {
            name: { type: String, required: true },
            id: {type: String, required: true},
            orgsList: { 
                type: Array,
                required: true,
                schema: {
                    type: Object,
                    unknownKeys: 'remove',
                    required: true,
                    schema:{
                        id:{ type: Number, required: true },
                        name: { type: String, required: true },
                        tenantId: { type: Number, required: true },
                        ttoId: { type: Number, required: true, allowNull: true },
                        parentId: { type: Number, required: true, allowNull: true },
                        level: { type: Number, required: true },
                        roles: { 
                            type: Array, 
                            required: true,
                            schema: {
                                type: Object,
                                unknownKeys: 'remove',
                                schema:{
                                    id:{ type: Number, required: true },
                                    name: { type: String, required: true },
                                    description: { type: String, required: true },
                                    orgId:{ type: Number, required: true },
                                    isAssignable: { 
                                        type: Object, 
                                        unknownKeys: 'remove',
                                        required: true,
                                        schema:{
                                            data: {
                                                type: Array,
                                                len: 1,
                                                schema: Number
                                            },
                                            type: {type: String, required: true, default: "buffer"}
                                        }
                                    },
                                    isAutoAccess: { 
                                        type: Object, 
                                        unknownKeys: 'remove',
                                        required: true,
                                        schema:{
                                            data: {
                                                type: Array,
                                                len: 1,
                                                schema: Number
                                            },
                                            type: {type: String, required: true, default: "buffer"}
                                        } 
                                    },
                                    isAutoAssignOnIntake: { 
                                        type: Object, 
                                        unknownKeys: 'remove',
                                        required: true,
                                        schema:{
                                            data: {
                                                type: Array,
                                                len: 1,
                                                schema: Number
                                            },
                                            type: {type: String, required: true, default: "buffer"}
                                        } 
                                    },
                                    menus:{
                                        type:Array,
                                        required: true,
                                        schema:{
                                            type:Object,
                                            unknownKeys: 'remove',
                                            schema:{
                                                roleId:{ type: Number, required: true },
                                                menuId:{ type: Number, required: true },
                                            }
                                        }
                                    },
                                    resources:{
                                        type:Array,
                                        required: true,
                                        schema:{
                                            type:Object,
                                            unknownKeys: 'remove',
                                            schema:{
                                                roleId:{ type: Number, required: true },
                                                resourceId:{ type: Number, required: true },
                                            }
                                        }
                                    }
                                }
                            }
                        },
                        enrollmentTargets: { 
                            type: Array,
                            required: true,
                            schema:{
                                type: Object,
                                unknownKeys: 'remove',
                                schema:{
                                    id:{ type: Number, required: true },
                                    orgId:{type: Number, required: true},
                                    month:{type: String, required: true},
                                    target:{type: Number, required: true}
                                }
                            }
                        },
                        pages: { 
                            type: Array,
                            required: true ,
                            schema:{
                                type: Object,
                                unknownKeys: 'remove',
                                schema:{
                                    _id:{ type: String, required: true },
                                    key:{type: String, required: true},
                                    collection:{type: String, required: true},
                                    title:{type: String, required: true},
                                    subtitle:{type: String, required: true},
                                    layout:{
                                        type: Array,
                                        required: true,
                                        schema:{
                                            type: Object,
                                            unknownKeys: 'allow',
                                        }
                                    }
                                }
                            }
                        },
                        raConfig:{
                            type: Array,
                            required: true,
                            schema:{
                                type: Object,
                                unknownKeys: 'remove',
                                schema:{
                                    _id:{ type: String, required: true },
                                    description:{type: String, required: true},
                                    stratum:{
                                        type: Array,
                                        required: true,
                                        len: 1,
                                        schema:{
                                            type: Object,
                                            required: true,
                                            unknownKeys: 'remove',
                                            schema:{
                                                value:{type: Number, required: true},
                                                variable:{type: String, required: true, default: "ltoId"}
                                            }
                                        }
                                    },
                                    blockSize:{type: String, required: true},
                                    groups:{
                                        type: Array,
                                        schema:{
                                            type: Object,
                                            unknownKeys: 'remove',
                                            schema:{
                                                assignment:{type: String, required: true},
                                                description:{type: String, required: true},
                                                ratio:{type: String, required: true},
                                                sequenceLimit:{type: String, required: true},
                                                layout: {type: Array}
                                            }
                                        }
                                    },
                                }
                            }
                        }
                    }
                }
            }
        }
    }).then((data) => {
        const{name, orgsList} = data;
        try{
            orgsList.map((item, i) => {
                orgsList[i].statusFlag = "new";
                orgsList[i].userId = inpParam.userId;
                //raconfig
                for (let key in orgsList[i].raConfig) {
                    orgsList[i].raConfig[key].statusFlag = "new"
                }
                //enrollmentTargets
                for (let key in orgsList[i].enrollmentTargets) {
                    orgsList[i].enrollmentTargets[key].statusFlag = "new"
                }
                //pages
                for (let key in orgsList[i].pages) {
                    orgsList[i].pages[key].statusFlag = "new"
                }
                //roles
                for (let key in orgsList[i].roles) {
                    orgsList[i].roles[key].statusFlag = "new";
                    //menu
                    for (let index in orgsList[i].roles[key].menus) {
                        orgsList[i].roles[key].menus[index].statusFlag = "new";
                    }
                    //resource
                    for (let index in orgsList[i].roles[key].resources) {
                        orgsList[i].roles[key].resources[index].statusFlag = "new";
                    }
                }
            });
            data.projectStatus = "save";
            data.statusFlag = "new";
            data.orgsList = orgsList;
            data.orgs = toTreeBiz.list_to_tree(orgsList);
            if (!fs.existsSync('savedProjects/')){
                fs.mkdirSync('savedProjects/');
            }
            fs.readdir('savedProjects', function (err, items) {
                if (err) {
                    logging.applogger.error(err);
                    res.send(err);
                } else {
                    let parsedData;
                    let duplicate = [];
                    var promise = []
                    for (var i = 0; i < items.length; i++) {
                        promise.push(new Promise((resolve, reject) => {
                            fs.readFile('savedProjects/' + items[i], (err, data) => {
                                if (err) throw reject(err);
                                parsedData = JSON.parse(data);
                                resolve(parsedData)
                                //res.send(parsedData);                    
                            })
                        }));
                    }
                    if(promise.length !==0){
                        Promise.all(promise).then(function (values) {
                            if(values.length !== 0){
                                values.map(item => {
                                    if(item.name === data.name){
                                        duplicate.push(true);
                                    }
                                })
                                if(duplicate.includes(true)){
                                    res.status(500).send("Duplicate entry for the key name with " + data.name + "exists");
                                }else{
                                    fs.writeFile('savedProjects/' + data.id + '.json', JSON.stringify(data), 'utf8', function (err) {
                                        if (err) {
                                            logging.applogger.error(err);
                                            res.send(err);
                                        } else {
                                            res.status(200).send({ savedProjectId: data.id, messages: "Successfully imported as unpublished Project" });
                                            // fs.unlinkSync('AllProjects.json', function (err) {
                                            //     if (err) throw err;
                                            // })
                                        }
                            
                                    });
                                }
                            }
                        })
                    }else{
                        fs.writeFile('savedProjects/' + data.id + '.json', JSON.stringify(data), 'utf8', function (err) {
                            if (err) {
                                logging.applogger.error(err);
                                res.send(err);
                            } else {
                                res.status(200).send({ savedProjectId: data.id, messages: "Successfully imported as unpublished Project" });
                                // fs.unlinkSync('AllProjects.json', function (err) {
                                //     if (err) throw err;
                                // })
                            }
                
                        });
                    }
                }
            });
        }catch(e){
            logging.applogger.error(e);
            res.status(500).send('Please check the uploaded project structure');
        }
    }).catch((err) => {
        res.status(500).send('Please check the uploaded project structure');
    });
})
module.exports = router;

// // publish organization list for particular project.
function publishProjectOrganization(requestOptions, oneOrganization) {
    let globalTto = oneOrganization.ttoId;
    let allOrgStatus = [];// will contain orgs and its children status
    let orgPromises = [];
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

        orgPromises.push(organizationBiz.createOrganization(requestOptions, inputObj).then(response => {
            if (inputObj.level === 0) {
                globalTto = response.data.insertId;
            }
            let publishOrgStatus = {};
            if (response.status === 200) {
                // fs.writeFile('functions' + response.data.insertId + '.json', JSON.stringify(inpParam), 'utf8', function (err) {
                //     if (err) {
                //         logging.applogger.error(err);
                //         res.send(err);
                //     }else{
                // res.status(200).send({savedProjectId: inpParam.id});
                //         // fs.unlinkSync('AllProjects.json', function (err) {
                //         //     if (err) throw err;
                //     // })
                //     }

                // });
                publishOrgStatus.org = response.status;
                let orgUserBody = { "ttoId": globalTto, "ltoId": inputObj.ttoId == null ? null : response.data.insertId, userId: oneOrganization.userId }
                if (inputObj.level !== 0) {
                    organizationBiz.createOrganizationUser(requestOptions, orgUserBody);
                }
                if (oneOrganization.roles !== undefined && oneOrganization.roles.length !== 0) {
                    publishOrgStatus.roles = publishRoleList(requestOptions, oneOrganization.roles, oneOrganization.tenantId, globalTto, response.data.insertId == globalTto ? null : response.data.insertId, oneOrganization.userId);//this will return a single response for all roles
                }
                // creating raconfigs.
                if (oneOrganization.raConfig !== undefined && oneOrganization.raConfig.length !== 0) {
                    publishOrgStatus.raConfigStatus = publishRaConfigList(requestOptions, oneOrganization.raConfig, response.data.insertId, oneOrganization.tenantId);

                }
                // creating enrollments.
                if (oneOrganization.enrollmentTargets !== undefined && oneOrganization.enrollmentTargets.length !== 0) {
                    publishOrgStatus.enrollmentTargetStatus = publishEnrollementTargetList(requestOptions, oneOrganization.enrollmentTargets, response.data.insertId);
                }
                // creating pages.
                if (oneOrganization.pages !== undefined && oneOrganization.pages.length !== 0) {
                    publishOrgStatus.pagesStatus = publishProjectPageList(requestOptions, oneOrganization.pages, oneOrganization.tenantId, globalTto, response.data.insertId == globalTto ? null : response.data.insertId);
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
                allOrgStatus.push(publishOrgStatus);
            } else {
                publishOrgStatus.org = response.status;
                allOrgStatus.push(publishOrgStatus);
                logging.applogger.error(response);
            }
        }));
    } else if (oneOrganization.statusFlag === "modified") {
        let inputObj = {
            "name": oneOrganization.name,
            "tenantId": oneOrganization.tenantId,
            "ttoId": oneOrganization.ttoId,
            "parentId": oneOrganization.parentId,
            "level": oneOrganization.level
        };
        orgPromises.push(organizationBiz.updateOrganization(requestOptions, oneOrganization.id, inputObj).then(response => {
            let publishOrgStatus = {};
            if (response.status === 200) {
                publishOrgStatus.org = response.status;
                if (oneOrganization.roles !== undefined && oneOrganization.roles.length !== 0) {
                    publishOrgStatus.roles = publishRoleList(requestOptions, oneOrganization.roles, oneOrganization.tenantId, oneOrganization.ttoId, oneOrganization.id, oneOrganization.userId);
                }
                // creating raconfigs
                if (oneOrganization.raConfig !== undefined && oneOrganization.raConfig.length !== 0) {
                    publishOrgStatus.raConfigStatus = publishRaConfigList(requestOptions, oneOrganization.raConfig, oneOrganization.id, oneOrganization.tenantId);
                }
                // creating enrollments
                if (oneOrganization.enrollmentTargets !== undefined && oneOrganization.enrollmentTargets.length !== 0) {
                    publishOrgStatus.enrollmentTargetStatus = publishEnrollementTargetList(requestOptions, oneOrganization.enrollmentTargets, oneOrganization.id);
                }
                // creating pages // bounds are need.
                if (oneOrganization.pages !== undefined && oneOrganization.pages.length !== 0) {
                    publishOrgStatus.pagesStatus = publishProjectPageList(requestOptions, oneOrganization.pages, oneOrganization.tenantId, oneOrganization.ttoId, oneOrganization.id);
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
                allOrgStatus.push(publishOrgStatus);
            } else {
                publishOrgStatus.org = response.status;
                allOrgStatus.push(publishOrgStatus);
                logging.applogger.error(response);
            }

        }));

    } else if (oneOrganization.statusFlag === "delete") {
        orgPromises.push(organizationBiz.deleteOrganization(requestOptions, oneOrganization.id).then(response => {
            let publishOrgStatus = {};
            if (response.status === 200) {
                // return success msg.
                publishOrgStatus.org = response.status;
                allOrgStatus.push(publishOrgStatus);

            } else {
                publishOrgStatus.org = response.status;
                allOrgStatus.push(publishOrgStatus);
                logging.applogger.error(response);
            }
        }))
    } else {
        let publishOrgStatus = {};
        if (oneOrganization.roles !== undefined && oneOrganization.roles.length !== 0) {
            publishOrgStatus.roles = publishRoleList(requestOptions, oneOrganization.roles, oneOrganization.tenantId, oneOrganization.ttoId, oneOrganization.id, oneOrganization.userId);
        }
        // creating raconfigs
        if (oneOrganization.raConfig !== undefined && oneOrganization.raConfig.length !== 0) {
            publishOrgStatus.raConfigStatus = publishRaConfigList(requestOptions, oneOrganization.raConfig, oneOrganization.id, oneOrganization.tenantId);
        }
        // creating enrollments
        if (oneOrganization.enrollmentTargets !== undefined && oneOrganization.enrollmentTargets.length !== 0) {
            publishOrgStatus.enrollmentTargetStatus = publishEnrollementTargetList(requestOptions, oneOrganization.enrollmentTargets, oneOrganization.id);
        }
        // creating pages // bounds are need.
        if (oneOrganization.pages !== undefined && oneOrganization.pages.length !== 0) {
            publishOrgStatus.pagesStatus = publishProjectPageList(requestOptions, oneOrganization.pages, oneOrganization.tenantId, oneOrganization.ttoId, oneOrganization.id);
        }
        allOrgStatus.push(publishOrgStatus);
        // checking the organization have any chilren or not.
        if (oneOrganization.children.length !== 0) {
            oneOrganization.children.forEach(oneChildren => {
                // set parentId to child.
                oneChildren.tenantId = oneOrganization.tenantId;
                oneChildren.parentId = oneOrganization.id;
                oneChildren.ttoId = oneOrganization.level === 0 ? oneOrganization.id : oneOrganization.ttoId;
                // calling childrens of organization.
                publishProjectOrganization(requestOptions, oneChildren);
            })
        }
    }


    let finalPromise = axios.all(orgPromises);
    return finalPromise.then(function (results) {
        let orgResults = [];
        allOrgStatus.map(item => {
            if (item.org !== 200 && item.roles !== "success" && item.raConfigStatus !== "success" && item.enrollmentTargetStatus !== "success" && item.pagesStatus !== "success") {
                orgResults.push({ "failed": item.org ? item.org : item.roles ? item.roles : item.raConfigStatus ? item.raConfigStatus : item.enrollmentTargetStatus ? item.enrollmentTargetStatus : item.pagesStatus })
            } else {
                orgResults.push("success");
            }
        })
        orgResults.map(item => {
            if (typeof item === "object") {
                return item.failed
            }
        })
        return "success";
    })
}


// publish role list for particular project.
function publishRoleList(requestOptions, roleList, tenantId, globalTto, orgId, userId) {//this function should send a single status success/error with msg of fail
    let allRolesStatus = [];
    let rolePromises = [];
    // loop through the roleList.
    if (roleList.length !== 0) {
        roleList.forEach(oneRole => {
            if (oneRole.statusFlag === "new") {
                // preparing role body.
                let roleBody = {
                    "name": oneRole.name,
                    "description": oneRole.description,
                    "orgId": orgId !== null ? orgId: globalTto,
                    "isAssignable": oneRole.isAssignable,
                    "isAutoAccess": oneRole.isAutoAccess,
                    "isAutoAssignOnIntake": oneRole.isAutoAssignOnIntake
                };

                rolePromises.push(roleBiz.createRole(requestOptions, roleBody).then(response => {
                    let publishRoleStatus = {};
                    if (response.status === 200) {
                        publishRoleStatus.role = response.status;
                        let userRoleBody = { "roleId": response.data.insertId, "userId": userId };
                        let boundsBody = { "tenantId": tenantId, "ttoId": globalTto, "ltoId": orgId }
                        boundsbiz.createBounds(requestOptions, boundsBody).then(response => {
                            if (response.status === 200) {
                                let newHeaders = requestOptions;
                                newHeaders.headers['x-rapter-bounds'] = response.data["x-rapter-bounds"];
                                roleBiz.createUserRole(newHeaders, userRoleBody).then(response => {
                                });
                            }
                        })

                        if (oneRole.menus.length !== 0) {
                            publishRoleStatus.menuStatus = publishMenuRoleAccessList(requestOptions, oneRole.menus, tenantId, globalTto, orgId, response.data.insertId);//this will return either success or failed
                        }
                        if (oneRole.resources.length !== 0) {
                            publishRoleStatus.ResourceStatus = publishResourceRoleAccessList(requestOptions, oneRole.resources, tenantId, globalTto, orgId, response.data.insertId);//this will return either success or failed

                        }
                        allRolesStatus.push(publishRoleStatus);
                        //return response.data;
                    } else {
                        publishRoleStatus.role = response.messages;
                        allRolesStatus.push(publishRoleStatus);//role creation failed
                        logging.applogger.error(response);
                    }
                }));
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

                rolePromises.push(roleBiz.updateRole(requestOptions, oneRole.id, roleBody).then(response => {
                    let publishRoleStatus = {};
                    if (response.status === 200) {
                        publishRoleStatus.role = response.status;
                        if (oneRole.menus.length !== 0) {
                            publishRoleStatus.menu = publishMenuRoleAccessList(requestOptions, oneRole.menus, tenantId, globalTto, orgId, oneRole.id);
                        }
                        if (oneRole.resources.length !== 0) {
                            publishRoleStatus.resource = publishResourceRoleAccessList(requestOptions, oneRole.resources, tenantId, globalTto, orgId, oneRole.id);

                        }
                        allRolesStatus.push(publishRoleStatus);
                    } else {
                        publishRoleStatus.role = response.messages;
                        allRolesStatus.push(publishRoleStatus);//role creation failed
                        logging.applogger.error(response);
                    }
                }));

            } else if (oneRole.statusFlag === "delete") {
                let publishRoleStatus = {};
                rolePromises.push(roleBiz.deleteRole(requestOptions, oneRole.id).then(response => {
                    if (response.status === 200) {
                        publishRoleStatus.role = response.status;
                        allRolesStatus.push(publishRoleStatus);
                    } else {
                        publishRoleStatus.role = response.messages;
                        allRolesStatus.push(publishRoleStatus);
                        logging.applogger.error(response);
                    }
                }));
            }
        })
        //allRoles single response
        let finalPromise = axios.all(rolePromises);
        return finalPromise.then(function (results) {
            let roleResults = [];
            allRolesStatus.map(item => {
                if (item.role !== 200 && item.menu !== "success" && item.resource !== "success") {
                    roleResults.push({ "failed": item.role ? item.role : item.menu ? item.menu : item.resource })
                } else {
                    roleResults.push("success");
                }
            })
            roleResults.map(item => {
                if (typeof item === "object") {
                    return item.failed
                }
            })
            return "success";
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
        let menuAccessPromise = [];
        if (response.status === 200) {
            let newHeaders = requestOptions;
            newHeaders.headers['x-rapter-bounds'] = response.data["x-rapter-bounds"]

            //loop through the menuRoleAccessList.
            if (menuRoleAccessList.length !== 0) {
                menuRoleAccessList.forEach(oneMenuRoleAccess => {
                    if (oneMenuRoleAccess.statusFlag === "new") {
                        // preparing body for resource.
                        let menuRoleAccessBody = {
                            "roleId": roleId,
                            "menuId": oneMenuRoleAccess.menuId
                        };
                        menuAccessPromise.push(menuBiz.createMenuRoleAccess(newHeaders, menuRoleAccessBody))

                    } else if (oneMenuRoleAccess.statusFlag === "delete") {
                        menuAccessPromise.push(menuBiz.deleteMenuRoleAccess(newHeaders, oneMenuRoleAccess.id))
                    }

                });
                let finalPromise = axios.all(menuAccessPromise);
                return finalPromise.then(function (results) {
                    let menuRoleAccessResults = []
                    results.map(item => {
                        if (item.status !== 200) {
                            menuRoleAccessResults.push({ 'failed': item.messages });

                        } else {
                            menuRoleAccessResults.push('success')
                        }
                    })
                    menuRoleAccessResults.map(item => {
                        if (typeof item === "object") {
                            return item.failed
                        }
                    })
                    return "success";
                })
            }
        } else {
            logging.applogger.error(response);
            return response.messages;
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
        let resourceAccessPromise = [];
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
                        resourceAccessPromise.push(resourceBiz.createResourceRoleAccess(newHeaders, resourceRoleAccessBody))

                    } else if (oneResourceRoleAccess.statusFlag === "delete") {
                        resourceAccessPromise.push(resourceBiz.deleteResourceRoleAccess(newHeaders, oneResourceRoleAccess.id))
                    }

                });
                let finalPromise = axios.all(resourceAccessPromise);
                return finalPromise.then(function (results) {
                    let resourceRoleAccessResults = []
                    results.map(item => {
                        if (item.status !== 200) {
                            resourceRoleAccessResults.push({ 'failed': item.messages });

                        } else {
                            resourceRoleAccessResults.push('success')
                        }
                    })
                    resourceRoleAccessResults.map(item => {
                        if (typeof item === "object") {
                            return item.failed
                        }
                    })
                    return "success";
                })
            }
        } else {
            logging.applogger.error(response);
            return response.messages;
        }
    })
}

// publish ra-config list for particular project.
function publishRaConfigList(requestOptions, raConfigList, ltoId, tenantId) {

    // loop through the raConfigList.
    if (raConfigList.length !== 0) {
        let raConfigPromises = [];
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
                raConfigPromises.push(raConfigBiz.createRaConfig(requestOptions, tenantId, raConfiBody));
            } else if (oneRaConfig.statusFlag === "modified") {
                // need to prepare body.
                let raConfiBody = {
                    "description": oneRaConfig.description,
                    "stratum": oneRaConfig.stratum,
                    "blockSize": oneRaConfig.blockSize,
                    "groups": oneRaConfig.groups
                };
                raConfigPromises.push(raConfigBiz.updateRaConfig(requestOptions, oneRaConfig._id, tenantId, raConfiBody));
            } else if (oneRaConfig.statusFlag === "delete") {
                raConfigPromises.push(raConfigBiz.deleteRaConfig(requestOptions, oneRaConfig._id, tenantId));
            }

        });
        //all raconfig single response
        let finalPromise = axios.all(raConfigPromises);
        return finalPromise.then(function (results) {
            let raConfigResults = [];
            results.map(item => {
                if (item.status !== 200) {
                    raConfigResults.push({ 'failed': item.messages });
                } else {
                    raConfigResults.push("success");
                }
            })
            raConfigResults.map(item => {
                if (typeof item === "object") {
                    return item.failed
                }
            })
            return "success";
        })

    }
}

// publish enrollment-target list for particular project.
function publishEnrollementTargetList(requestOptions, enrollmentTargetList, orgId) {

    //loop through the enrollmentTargetList.
    if (enrollmentTargetList.length !== 0) {
        let enrollmentPromises = [];
        enrollmentTargetList.forEach(oneEnrollmentTarget => {
            // read the flag and do the operation.
            if (oneEnrollmentTarget.statusFlag === "new") {

                // preparing EnrollmentTarget body.
                let enrollmentBody = {
                    "orgId": orgId,
                    "month": oneEnrollmentTarget.month,
                    "target": oneEnrollmentTarget.target
                };
                enrollmentPromises.push(enrollmentBiz.createEnrollmentTarget(requestOptions, enrollmentBody));

            } else if (oneEnrollmentTarget.statusFlag === "modified") {
                // preparing EnrollmentTarget body.
                let enrollmentBody = {
                    "orgId": oneEnrollmentTarget.orgId,
                    "month": oneEnrollmentTarget.month,
                    "target": oneEnrollmentTarget.target
                };
                enrollmentPromises.push(enrollmentBiz.updateEnrollmentTarget(requestOptions, oneEnrollmentTarget.id, enrollmentBody));

            } else if (oneEnrollmentTarget.statusFlag === "delete") {
                enrollmentPromises.push(enrollmentBiz.deleteEnrollmentTarget(requestOptions, oneEnrollmentTarget.id));
            }
        });
        //all enrollment target single response
        let finalPromise = axios.all(enrollmentPromises);
        return finalPromise.then(function (results) {
            let enrollmentResults = [];
            results.map(item => {
                if (item.status !== 200) {
                    enrollmentResults.push({ 'failed': item.messages });
                } else {
                    enrollmentResults.push("success");
                }
            })
            enrollmentResults.map(item => {
                if (typeof item === "object") {
                    return item.failed
                }
            })
            return "success";
        })
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
            let pagePromises = [];
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
                        pagePromises.push(pageBiz.createPage(newHeaders, pageBody))

                    } else if (onePage.statusFlag === "modified") {
                        let pageBody = {
                            "key": onePage.key,
                            "collection": onePage.collection,
                            "title": onePage.title,
                            "subtitle": onePage.subtitle,
                            "layout": onePage.layout
                        }
                        pagePromises.push(pageBiz.updatePage(newHeaders, onePage._id, pageBody))


                    } else if (onePage.statusFlag === "delete") {
                        pagePromises.push(pageBiz.deletePage(newHeaders, onePage._id))
                    }

                });
                let finalPromise = axios.all(pagePromises);
                return finalPromise.then(function (results) {
                    let pageResults = []
                    results.map(item => {
                        if (item.status !== 200) {
                            pageResults.push({ 'failed': item.messages })

                        } else {
                            pageResults.push('success')
                        }
                    })
                    pageResults.map(item => {
                        if (typeof item === "object") {
                            return item.failed
                        }
                    })
                    return "success";
                })
            }
        } else {
            logging.applogger.error(response);
            return response.messages;
        }
    });

}