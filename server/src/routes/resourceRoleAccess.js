'use strict';
let express = require('express');
let axios = require('axios');
let router = express.Router();
let logging = require('../utils/logger');
let responseStatus = require('../constants/httpStatus');
let MESSAGE = require('../constants/applicationConstants');
const config = require('../config/config');


// create resource-role-access.
router.post('/create-resource-role-access', (req, res) => {
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
    // preparing bounds body
    let boundsBody = this.createBoundsObj(inpParam);
    // preparing resource role body.
    let resourceRoleBody = this.createResourceRoleObj(inpParam);

    axios.post(`${config.RAPTER_URL}/bounds`, boundsBody, requestOptions).then(function (response) {
        let x_rapter_bounds = response.data["x-rapter-bounds"];
        let newConfig = { headers: requestOptions.headers };
        newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;

        axios.post(`${config.RAPTER_URL}/resource-role-access`, resourceRoleBody, newConfig).then(function (response) {
            res.send(response.data);
        }).catch(error => {
            logging.applogger.error(error);
            res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.sqlMessage});
        });
    }).catch(error => {
        logging.applogger.error(error);
        res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
    });
});

// find resource-role-access list.
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
    // preparing bounds body
    let boundsBody = this.createBoundsObj(inpParam);

    axios.post(`${config.RAPTER_URL}/bounds`, boundsBody, requestOptions).then(response => {
        let x_rapter_bounds = response.data["x-rapter-bounds"];
        let newConfig = { headers: requestOptions.headers };
        newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
        axios.get(`${config.RAPTER_URL}/resource-role-access`, newConfig).then(function (response) {
            res.status(200).send(response.data);
        }).catch(error => {
            logging.applogger.error(error);
            res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
        });
    }).catch(error => {
        logging.applogger.error(error);
        res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
    });
});

// find resource-role-access by using id.
router.post('/resource-role-access/:id', (req, res) => {
    let inpParam = req.params;
    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
    if (inpParam !== undefined || Object.keys(inpParam).length !== 0) {
        let boundsBody = this.createBoundsObj(req.body);
        axios.post(`${config.RAPTER_URL}/bounds`, boundsBody, requestOptions).then(response => {
            let x_rapter_bounds = response.data["x-rapter-bounds"];
            let newConfig = { headers: requestOptions.headers };
            newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
            axios.get(`${config.RAPTER_URL}/resource-role-access/`, newConfig).then(function (response) {
                res.status(200).send(response.data);
            }).catch(error => {
                logging.applogger.error(error);
                res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
            });
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

    let inpParam = req.body;
    if ((inpParam === undefined) || Object.keys(inpParam).length === 0) {
        let rtnVal = responseStatus.BAD_REQUEST;
        rtnVal.messages = MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE;
        logging.applogger.info(rtnVal);
        res.status(400).send({ code: responseStatus.BAD_REQUEST.code, status: responseStatus.BAD_REQUEST.status, messages: MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE });
        return;
    }
    // preparing bounds body
    let boundsBody = this.createBoundsObj(inpParam);
    // preparing resource role body.
    let resourceRoleBody = this.createResourceRoleObj(inpParam);

    axios.post(`${config.RAPTER_URL}/bounds`, boundsBody, requestOptions).then(response => {
        let x_rapter_bounds = response.data["x-rapter-bounds"];
        let newConfig = { headers: requestOptions.headers };
        newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
        axios.put(`${config.RAPTER_URL}/resource-role-access/` + req.params.id, resourceRoleBody, newConfig).then(function (response) {
            res.status(200).send(response.data);
        }).catch(error => {
            logging.applogger.error(error);
            res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
        });
    }).catch(error => {
        logging.applogger.error(error);
        res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
    });
});
// delete resource-role-access.
router.post('/delete-resource-role-access/:id', (req, res) => {

    // token validation.
    let token = req.token
    if (token === undefined || token === "" || token === null) {
        res.status(403).send({ code: responseStatus.FORBIDDEN.code, status: responseStatus.FORBIDDEN.status, messages: MESSAGE.COMMON.INVALID_TOKEN });
        return;
    }
    let requestOptions = config.AUTHORIZATION;
    requestOptions.headers.Authorization = "Bearer " + token;
    let inpParam = req.body;
    if ((inpParam === undefined) || Object.keys(inpParam).length === 0) {
        let rtnVal = responseStatus.BAD_REQUEST;
        rtnVal.messages = MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE;
        logging.applogger.info(rtnVal);
        res.status(400).send({ code: responseStatus.BAD_REQUEST.code, status: responseStatus.BAD_REQUEST.status, messages: MESSAGE.COMMON.MANDATORY_FIELDS_MESSAGE });
        return;
    }
    let boundsBody = this.createBoundsObj(inpParam);
    axios.post(`${config.RAPTER_URL}/bounds`, boundsBody, requestOptions).then(response => {
        let x_rapter_bounds = response.data["x-rapter-bounds"];
        let newConfig = { headers: requestOptions.headers };
        newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
        axios.delete(`${config.RAPTER_URL}/resource-role-access/` + inpParam.insertResourceId, newConfig).then(function (response) {
            res.send(response.data);
        }).catch(error => {
            logging.applogger.error(error);
            res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
        });
    }).catch(error => {
        logging.applogger.error(error);
        res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
    });
});

module.exports = router;

exports.createBoundsObj = (inpParam => {
    let boundsBody = {
        "tenantId": inpParam.tenantId,
        "ttoId": inpParam.ttoId,
        "ltoId": inpParam.ltoId
    };
    return boundsBody;
});
exports.createResourceRoleObj = (inpParam => {
    let resourceRoleBody = {
        "roleId": inpParam.roleId,
        "resourceId": inpParam.resourceId
    };
    return resourceRoleBody;
});