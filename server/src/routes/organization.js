'use strict';
let express = require('express');
let router = express.Router();
let logging = require('../utils/logger');
let responseStatus = require('../constants/httpStatus');
let MESSAGE = require('../constants/applicationConstants');
const config = require('../config/config');
let organizationBiz = require('../biz/organizationBiz');



// create organization.
router.post('/organization', (req, res) => {
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
    organizationBiz.createOrganization(requestOptions, inpParam).then(response => {
        if (response.status === 200) {
            res.status(200).send(response.data);
        } else {
            res.status(500).send(response)
        }
    });
});

// find organizationlist.
router.get('/organization', (req, res) => {
    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
    organizationBiz.getOrganizationList(requestOptions).then(response => {
        if (response.status === 200) {
            res.status(200).send(response.data);
        } else {
            res.status(500).send(response)
        }
    });
});

// find organization by using id.
router.get('/organization/:id', (req, res) => {
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
        organizationBiz.getOrganization(requestOptions, inpParam.id).then(response => {
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

//update organization.
router.put('/organization/:id', (req, res) => {
    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
    let inpParam = req.params;
    if ((inpParam === undefined) || Object.keys(inpParam).length === 0) {
        let rtnVal = responseStatus.BAD_REQUEST;
        rtnVal.messages = MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE;
        logging.applogger.info(rtnVal);
        res.status(400).send({ code: responseStatus.BAD_REQUEST.code, status: responseStatus.BAD_REQUEST.status, messages: MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE });
        return;
    }
    organizationBiz.updateOrganization(requestOptions, inpParam.id, req.body).then(response => {
        if (response.status === 200) {
            res.status(200).send(response.data);
        } else {
            res.status(500).send(response)
        }
    });

});

// delete organization.
router.delete('/organization/:id', (req, res) => {
    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;

    let inpParam = req.params;
    if ((inpParam === undefined) || Object.keys(inpParam).length === 0) {
        let rtnVal = responseStatus.BAD_REQUEST;
        rtnVal.messages = MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE;
        logging.applogger.info(rtnVal);
        res.status(400).send({ code: responseStatus.BAD_REQUEST.code, status: responseStatus.BAD_REQUEST.status, messages: MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE });
        return;
    }
    organizationBiz.deleteOrganization(requestOptions, inpParam.id).then(response => {
        if (response.status === 200) {
            res.status(200).send(response.data);
        } else {
            res.status(500).send(response)
        }
    });
});

// create organization ursr.
router.post('/organization-user', (req, res) => {
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
    organizationBiz.createOrganizationUser(requestOptions, inpParam).then(response => {
        if (response.status === 200) {
            res.status(200).send(response.data);
        } else {
            res.status(500).send(response)
        }
    });
});

module.exports = router;
