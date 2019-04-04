'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
const config = require('../config/config');

// organization list.
exports.getOrganizationList = (requestOptions) => {
    return axios.get(`${config.RAPTER_URL}/organization`, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
// find organization by using id.
exports.getOrganization = (requestOptions, organizationId) => {
    return axios.get(`${config.RAPTER_URL}/organization/` + organizationId, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};

// create organization.
exports.createOrganization = (requestOptions, inpParam) => {
    return axios.post(`${config.RAPTER_URL}/organization`, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};

// update organization.
exports.updateOrganization = (requestOptions, organizationId, inpParam) => {
    return axios.put(`${config.RAPTER_URL}/organization/` + organizationId, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
// delete organization.
exports.deleteOrganization = (requestOptions, organizationId) => {
    return axios.delete(`${config.RAPTER_URL}/organization/` + organizationId, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
