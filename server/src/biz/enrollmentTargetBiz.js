'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
const config = require('../config/config');

// enrollment-target list.
exports.getEnrollmentTargetList = (requestOptions) => {
    return axios.get(`${config.RAPTER_URL}/enrollment-target`, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
// find enrollment-target by using id.
exports.getEnrollmentTarget = (requestOptions, enrollmentId) => {
    return axios.get(`${config.RAPTER_URL}/enrollment-target/` + enrollmentId, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};

// create enrollment-target.
exports.createEnrollmentTarget = (requestOptions, inpParam) => {
    return axios.post(`${config.RAPTER_URL}/enrollment-target`, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};

// update enrollment-target.
exports.updateEnrollmentTarget = (requestOptions, enrollmentId, inpParam) => {
    return axios.put(`${config.RAPTER_URL}/enrollment-target/` + enrollmentId, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
// delete enrollment-target.
exports.deleteEnrollmentTarget = (requestOptions, enrollmentId) => {
    return axios.delete(`${config.RAPTER_URL}/enrollment-target/` + enrollmentId, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
