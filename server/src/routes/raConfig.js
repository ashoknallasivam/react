'use strict';
let express = require('express');
let axios = require('axios');
let router = express.Router();
let logging = require('../utils/logger');
let responseStatus = require('../constants/httpStatus');
let MESSAGE = require('../constants/applicationConstants');
const config = require('../config/config');

 
// create ra-config.
router.post('/create-ra-config', (req, res) => {
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
    axios.post(`${config.RAPTER_URL}/ra-config?tenantId=`+ req.query.tenantId, inpParam, requestOptions).then(function (response) {
        res.status(200).send(response.data);
    }).catch(error => {
        logging.applogger.error(error);
    res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });    });
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
    axios.get(`${config.RAPTER_URL}/ra-config/`+req.params.id+ '?tenantId='+ req.query.tenantId, requestOptions).then(function (response) {
        res.status(200).send(response.data);
    }).catch(error => {
        logging.applogger.error(error);
    res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });    });
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
    let inpParam = req.params;
    if (inpParam !== undefined || Object.keys(inpParam).length !== 0) {
        axios.get(`${config.RAPTER_URL}/ra-config?tenantId=` + inpParam.tenantId , requestOptions).then(function (response) {
            res.status(200).send(response.data);
        }).catch(error => {
            logging.applogger.error(error);
        res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });        });
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
    let inpParam = req.params;
    let query_string = req.query.tenantId;
    if ((inpParam === undefined) || Object.keys(inpParam).length === 0) {
        let rtnVal = responseStatus.BAD_REQUEST;
        rtnVal.messages = MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE;
        logging.applogger.info(rtnVal);
        res.status(400).send({ code: responseStatus.BAD_REQUEST.code, status: responseStatus.BAD_REQUEST.status, messages: MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE });
        return;
    }
    axios.put(`${config.RAPTER_URL}/ra-config/` + inpParam.id+ '?tenantId=' + query_string, req.body, requestOptions).then(function (response) {
        res.status(200).send(response.data);
    }).catch(error => {
        logging.applogger.error(error);
    res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });    });
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
    let inpParam = req.params;
    let query_string = req.query.tenantId;
    if ((inpParam === undefined) || Object.keys(inpParam).length === 0) {
        let rtnVal = responseStatus.BAD_REQUEST;
        rtnVal.messages = MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE;
        logging.applogger.info(rtnVal);
        res.status(400).send({ code: responseStatus.BAD_REQUEST.code, status: responseStatus.BAD_REQUEST.status, messages: MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE });
        return;
    }
    axios.delete(`${config.RAPTER_URL}/ra-config/` + inpParam.id + '?tenantId=' + query_string, requestOptions).then(function (response) {
        res.send(response.data);
    }).catch(error => {
        logging.applogger.error(error);
    res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });    });
});
 
module.exports = router;