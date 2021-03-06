'use strict';
let express = require('express');
let axios = require('axios');
let router = express.Router();
let logging = require('../utils/logger');
let responseStatus = require('../constants/httpStatus');
let MESSAGE = require('../constants/applicationConstants');
const config = require('../config/config');
let menuRoleBiz = require('../biz/menuRoleAccessBiz');

// create menu-role-access.
router.post('/menu-role-access', (req, res) => {

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

    let newConfig = { headers: requestOptions.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    menuRoleBiz.createMenuRoleAccess(newConfig, inpParam).then(response => {
        if (response.status === 200) {
            res.status(200).send(response.data);
        } else {
            res.status(500).send(response)
        }
    });

});

// find menu-role-access list.
router.get('/menu-role-access', (req, res) => {

    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
	requestOptions.headers.Environment = req.headers.environment;
    let newConfig = { headers: requestOptions.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    menuRoleBiz.getMenuRoleAccessList(newConfig).then(response => {
        if (response.status === 200) {
            res.status(200).send(response.data);
        } else {
            res.status(500).send(response)
        }
    });
});

// find menu-role-access by using id.
router.get('/menu-role-access/:id', (req, res) => {

    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
	requestOptions.headers.Environment = req.headers.environment;
    let newConfig = { headers: requestOptions.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    let inpParam = req.params;
    if (inpParam !== undefined || Object.keys(inpParam).length !== 0) {
        menuRoleBiz.getMenuRoleAccess(newConfig, inpParam.id).then(response => {
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

//update menu-role-access.
router.put('/menu-role-access/:id', (req, res) => {
    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
	requestOptions.headers.Environment = req.headers.environment;
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
    menuRoleBiz.updateMenuRoleAccess(newConfig, inpParam.id, req.body).then(response => {
        if (response.status === 200) {
            res.status(200).send(response.data);
        } else {
            res.status(500).send(response)
        }
    });
});

// delete menu-role-access.
router.delete('/menu-role-access/:id', (req, res) => {
    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
	requestOptions.headers.Environment = req.headers.environment;
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
    menuRoleBiz.deleteMenuRoleAccess(newConfig, inpParam.id).then(response => {
        if (response.status === 200) {
            res.status(200).send(response.data);
        } else {
            res.status(500).send(response)
        }
    });
});

module.exports = router;