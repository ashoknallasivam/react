'use strict';
let express = require('express');
let axios = require('axios');
let router = express.Router();
let logging = require('../utils/logger');
let responseStatus = require('../constants/httpStatus');
let MESSAGE = require('../constants/applicationConstants');
const config = require('../config/config');
let x_rapter_bounds = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc1JlYWR5IjoxMCwibHRvSWQiOjEwLCJ0ZW5hbnRJZCI6MSwidHRvSWQiOjEsImlhdCI6MTU1Mzc3NDgzMCwiZXhwIjoxNTUzODYxMjMwfQ.dn7HIw4hfAlEK7MG7OSuSKmifRUmyKnw9xMtBqurpA0";//  req.bounds.
let resourceRoleBiz = require('../biz/resourceRoleAccessBiz');

// create resource-role-access.
router.post('/resource-role-access', (req, res) => {
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
    let newConfig = { headers: requestOptions.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    resourceRoleBiz.createResourceRoleAccess(newConfig, inpParam).then(response => {
        if (response.status === 200) {
            res.status(200).send(response.data);
        } else {
            res.status(500).send(response)
        }
    });

});

// find resource-role-access list.
router.get('/resource-role-access', (req, res) => {

    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
    let newConfig = { headers: requestOptions.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    resourceRoleBiz.getResourceRoleAccessList(newConfig).then(response => {
        if (response.status === 200) {
            res.status(200).send(response.data);
        } else {
            res.status(500).send(response)
        }
    });
});

// find resource-role-access by using id.
router.get('/resource-role-access/:id', (req, res) => {
    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
    let newConfig = { headers: requestOptions.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    let inpParam = req.params;
    if (inpParam !== undefined || Object.keys(inpParam).length !== 0) {
        resourceRoleBiz.getResourceRoleAccess(newConfig, inpParam.id).then(response => {
            if (response.status === 200) {
                res.status(200).send(response.data);
            } else {
                res.status(500).send(response)
            }
        });
    } else {
        let rtnVal = responseStatus.BAD_REQUEST;
        rtnVal.messages = MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE;
        res.status(400).send({ code: responseStatus.BAD_REQUEST.code, status: responseStatus.BAD_REQUEST.status, messages: MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE });
        return;
    }
});

//update resource-role-access.
router.put('/resource-role-access/:id', (req, res) => {
    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
    let newConfig = { headers: requestOptions.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    let inpParam = req.params;
    if ((inpParam === undefined) || Object.keys(inpParam).length === 0) {
        let rtnVal = responseStatus.BAD_REQUEST;
        rtnVal.messages = MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE;
        logging.applogger.info(rtnVal);
        res.status(400).send({ code: responseStatus.BAD_REQUEST.code, status: responseStatus.BAD_REQUEST.status, messages: MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE });
        return;
    }
    resourceRoleBiz.updateResourceRoleAccess(newConfig, inpParam.id, req.body).then(response => {
        if (response.status === 200) {
            res.status(200).send(response.data);
        } else {
            res.status(500).send(response)
        }
    });
});
// delete resource-role-access.
router.delete('/resource-role-access/:id', (req, res) => {

    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
    let newConfig = { headers: requestOptions.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    let inpParam = req.params;
    if ((inpParam === undefined) || Object.keys(inpParam).length === 0) {
        let rtnVal = responseStatus.BAD_REQUEST;
        rtnVal.messages = MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE;
        logging.applogger.info(rtnVal);
        res.status(400).send({ code: responseStatus.BAD_REQUEST.code, status: responseStatus.BAD_REQUEST.status, messages: MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE });
        return;
    }
    resourceRoleBiz.deleteResourceRoleAccess(newConfig, inpParam.id).then(response => {
        if (response.status === 200) {
            res.status(200).send(response.data);
        } else {
            res.status(500).send(response);
        }
    });
});

module.exports = router;