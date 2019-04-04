'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
const config = require('../config/config');

// resource-role-access list.
exports.getResourceRoleAccessList = (requestOptions) => {
    return axios.get(`${config.RAPTER_URL}/resource-role-access`, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
// find resource-role-access by using id.
exports.getResourceRoleAccess = (requestOptions, resourceRoleId) => {
    return axios.get(`${config.RAPTER_URL}/resource-role-access/` + resourceRoleId, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};

// create resource-role-access.
exports.createResourceRoleAccess = (requestOptions, inpParam) => {
    return axios.post(`${config.RAPTER_URL}/resource-role-access`, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};

// update resource-role-access.
exports.updateResourceRoleAccess = (requestOptions, resourceRoleId, inpParam) => {
    return axios.put(`${config.RAPTER_URL}/resource-role-access/` + resourceRoleId, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
// delete resource-role-access.
exports.deleteResourceRoleAccess = (requestOptions, resourceRoleId) => {
    return axios.delete(`${config.RAPTER_URL}/resource-role-access/` + resourceRoleId, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
