'use strict';
let express = require('express');
let axios = require('axios');
let router = express.Router();
let logging = require('../utils/logger');
let responseStatus = require('../constants/httpStatus');
let MESSAGE = require('../constants/applicationConstants');
const config = require('../config/config');
let test = require('../routes/bounds');
let x_rapter_bounds = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViZWRlYjJkMzFiZjYwMGMyYjRkZDU2MiIsImlzRnVsbHlBdXRoZW50aWNhdGVkIjp0cnVlLCJpYXQiOjE1NTM2NTk3MjMsImV4cCI6MTU1Mzc0NjEyM30.udJ2PJyyYchtPTa-L-DD3_MD-G5RDLyPFemWa-YH2s8";//  req.bounds.

// create page.
router.post('/page', (req, res) => {
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

    // call the common create bounds function. todo or getting from the request body
    /*test.getBoundsInfo(token, inpParam).then(response=>{
        x_rapter_bounds  = response.x-rapter-bounds;
        console.log(x_rapter_bounds);
    }).catch(error => {
        logging.applogger.error(error);
        res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
    });*/
    let newConfig = { headers: requestOptions.headers};
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    axios.post(`${config.RAPTER_URL}/page`, inpParam, newConfig).then(response=> {
        res.status(200).send(response.data);
    }).catch(error => {
        logging.applogger.error(error);
        res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
    });
});

// find page list.
router.get('/page', (req, res) => {
    // token validation.
    let token = req.token;
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
    let newConfig = { headers: requestOptions.headers};
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    axios.get(`${config.RAPTER_URL}/page`, newConfig).then(response=> {
        res.status(200).send(response.data);
    }).catch(error => {
        logging.applogger.error(error);
        res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
    });
});

// find page by using id.
router.get('/page/:id', (req, res) => {
    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
    let newConfig = { headers: requestOptions.headers};
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    let inpParam = req.params;
    if (inpParam !== undefined || Object.keys(inpParam).length !== 0) {
        axios.get(`${config.RAPTER_URL}/page/` + inpParam.id, newConfig).then(response=> {
            res.status(200).send(response.data);
        }).catch(error => {
            logging.applogger.error(error);
            res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
        });
    } else {
        let rtnVal = responseStatus.BAD_REQUEST;
        rtnVal.messages = MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE;
        res.status(400).send({ code: responseStatus.BAD_REQUEST.code, status: responseStatus.BAD_REQUEST.status, messages: MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE });
        return;
    }
});

// update page.
router.put('/page/:id', (req, res) => {
    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
    let newConfig = { headers: requestOptions.headers};
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    let inpParam = req.params;
    if ((inpParam === undefined) || Object.keys(inpParam).length === 0) {
        let rtnVal = responseStatus.BAD_REQUEST;
        rtnVal.messages = MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE;
        logging.applogger.info(rtnVal);
        res.status(400).send({ code: responseStatus.BAD_REQUEST.code, status: responseStatus.BAD_REQUEST.status, messages: MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE });
        return;
    }
    axios.put(`${config.RAPTER_URL}/page/` + inpParam.id, req.body, requestOptions).then(response=> {
        res.status(200).send(response.data);
    }).catch(error => {
        logging.applogger.error(error);
        res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
    });
});

// delete page.
router.delete('/page/:id', (req, res) => {
    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
    let newConfig = { headers: requestOptions.headers};
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    let inpParam = req.params;
    if ((inpParam === undefined) || Object.keys(inpParam).length === 0) {
        let rtnVal = responseStatus.BAD_REQUEST;
        rtnVal.messages = MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE;
        logging.applogger.info(rtnVal);
        res.status(400).send({ code: responseStatus.BAD_REQUEST.code, status: responseStatus.BAD_REQUEST.status, messages: MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE });
        return;
    }
    axios.delete(`${config.RAPTER_URL}/page/` + inpParam.id, requestOptions).then(response=> {
        res.send(response.data);
    }).catch(error => {
        logging.applogger.error(error);
        res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
    });
});

module.exports = router;
