'use strict';
let express = require('express');
let router = express.Router();
let logging = require('../utils/logger');
let responseStatus = require('../constants/httpStatus');
let MESSAGE = require('../constants/applicationConstants');
const config = require('../config/config');
let x_rapter_bounds = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc1JlYWR5IjoxMCwibHRvSWQiOjEwLCJ0ZW5hbnRJZCI6MSwidHRvSWQiOjEsImlhdCI6MTU1Mzc3NDgzMCwiZXhwIjoxNTUzODYxMjMwfQ.dn7HIw4hfAlEK7MG7OSuSKmifRUmyKnw9xMtBqurpA0";//  req.bounds.
let pageBiz = require('../biz/pageBiz');

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
    let newConfig = { headers: requestOptions.headers};
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    
    pageBiz.createPage(newConfig, inpParam).then(response=>{
        if(response.status===200){
            res.status(200).send(response.data);
        }else{
            res.status(500).send(response)
        }
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
    pageBiz.getPageList(newConfig).then(response=>{
        if(response.status===200){
            res.status(200).send(response.data);
        }else{
            res.status(500).send(response)
        }
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
        pageBiz.getPage(newConfig, inpParam.id).then(response=>{
            if(response.status===200){
                res.status(200).send(response.data);
            }else{
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
    pageBiz.updatePage(newConfig, inpParam.id, req.body).then(response=>{
        if(response.status===200){
            res.status(200).send(response.data);
        }else{
            res.status(500).send(response)
        }
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
    pageBiz.deletePage(newConfig, inpParam.id).then(response =>{
        if(response.status===200){
            res.status(200).send(response.data);
        }else{
            res.status(500).send(response)
        }
    });
});

module.exports = router;
