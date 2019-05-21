'use strict';
let express = require('express');
let router = express.Router();
let logging = require('../utils/logger');
let responseStatus = require('../constants/httpStatus');
let MESSAGE = require('../constants/applicationConstants');
const config = require('../config/config');
let raConfigBiz = require('../biz/raConfigBiz');

// create ra-config.
router.post('/ra-config', (req, res) => {
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
    raConfigBiz.createRaConfig(requestOptions, req.query.tenantId, inpParam).then(response => {
        if (response.status === 200) {
            res.status(200).send(response.data);
        } else {
            res.status(500).send(response);
        }
    });
});

// find ra-config by using id.
router.get('/ra-config/:id', (req, res) => {
    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
	requestOptions.headers.Environment = req.headers.environment;
	
    // calling rapter ra-config find one api.
    raConfigBiz.getRaConfig(requestOptions, req.params.id, req.query.tenantId).then(response => {
        if (response.status === 200) {
            res.status(200).send(response.data);
        } else {
            res.status(500).send(response)
        }
    });
});
// find ra-config list.
router.get('/ra-config', (req, res) => { //Not using as of now
    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
	requestOptions.headers.Environment = req.headers.environment;
	
    let inpParam = req.query;
    if (inpParam !== undefined || Object.keys(inpParam).length !== 0) {
        // calling rapter ra-config list api.
        raConfigBiz.getRaConfigList(requestOptions, inpParam.tenantId).then(response => {
            if (response.status === 200) {
                res.status(200).send(response.data);
            } else {
                res.status(500).send(response);
            }
        });

    } else {
        let rtnVal = responseStatus.BAD_REQUEST;
        rtnVal.messages = MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE;
        res.status(400).send({ code: responseStatus.BAD_REQUEST.code, status: responseStatus.BAD_REQUEST.status, messages: MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE });
        return;
    }
});

//update ra-config.
router.put('/ra-config/:id', (req, res) => {
    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
	requestOptions.headers.Environment = req.headers.environment;
	
    let inpParam = req.params;
    let query_string = req.query.tenantId;
    if ((inpParam === undefined) || Object.keys(inpParam).length === 0) {
        let rtnVal = responseStatus.BAD_REQUEST;
        rtnVal.messages = MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE;
        logging.applogger.info(rtnVal);
        res.status(400).send({ code: responseStatus.BAD_REQUEST.code, status: responseStatus.BAD_REQUEST.status, messages: MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE });
        return;
    }
    // calling ra-config update api.
    raConfigBiz.updateRaConfig(requestOptions, inpParam, query_string, req.body).then(response => {
        if (response.status === 200) {
            res.status(200).send(response.data);
        } else {
            res.status(500).send(response)
        }
    });
});
// delete ra-config.
router.delete('/ra-config/:id', (req, res) => {
    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
	requestOptions.headers.Environment = req.headers.environment;
	
    let inpParam = req.params;
    let query_string = req.query.tenantId;
    if ((inpParam === undefined) || Object.keys(inpParam).length === 0) {
        let rtnVal = responseStatus.BAD_REQUEST;
        rtnVal.messages = MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE;
        logging.applogger.info(rtnVal);
        res.status(400).send({ code: responseStatus.BAD_REQUEST.code, status: responseStatus.BAD_REQUEST.status, messages: MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE });
        return;
    }
    // calling rapter ra-config delete api.
    raConfigBiz.deleteRaConfig(requestOptions, inpParam.id, query_string).then(response => {
        if (response.status === 200) {
            res.status(200).send(response.data);
        } else {
            res.status(500).send(response)
        }
    });
});

module.exports = router;