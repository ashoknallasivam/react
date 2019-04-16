'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
const config = require('../config/config');

// enrollment-target list.
exports.getEnrollmentTargetList = (requestOptions) => {
    return axios.get(`${config.RAPTER_URL}/enrollment-target`, requestOptions).then(response => {
        return response;
    }).catch(error => {
        let rtVal = {
            code:error.response.status,
            status:error.response.statusText,
            messages: error.response.error === undefined?error.response.data.sqlMessage: error.response.error
        };
        
        return rtVal;
    });
};
// find enrollment-target by using id.
exports.getEnrollmentTarget = (requestOptions, enrollmentId) => {
    return axios.get(`${config.RAPTER_URL}/enrollment-target/` + enrollmentId, requestOptions).then(response => {
        return response;
    }).catch(error => {
        let rtVal = {
            code:error.response.status,
            status:error.response.statusText,
            messages: error.response.error === undefined?error.response.data.sqlMessage: error.response.error
        };
        
        return rtVal;
    });
};

// create enrollment-target.
exports.createEnrollmentTarget = (requestOptions, inpParam) => {
    return axios.post(`${config.RAPTER_URL}/enrollment-target`, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        let rtVal = {
            code:error.response.status,
            status:error.response.statusText,
            messages: error.response.error === undefined?error.response.data.sqlMessage: error.response.error
        };
        
        return rtVal;
    });
};

// update enrollment-target.
exports.updateEnrollmentTarget = (requestOptions, enrollmentId, inpParam) => {
    return axios.put(`${config.RAPTER_URL}/enrollment-target/` + enrollmentId, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        let rtVal = {
            code:error.response.status,
            status:error.response.statusText,
            messages: error.response.error === undefined?error.response.data.sqlMessage: error.response.error
        };
        
        return rtVal;
    });
};
// delete enrollment-target.
exports.deleteEnrollmentTarget = (requestOptions, enrollmentId) => {
    return axios.delete(`${config.RAPTER_URL}/enrollment-target/` + enrollmentId, requestOptions).then(response => {
        return response;
    }).catch(error => {
        let rtVal = {
            code:error.response.status,
            status:error.response.statusText,
            messages: error.response.error === undefined?error.response.data.sqlMessage: error.response.error
        };
        
        return rtVal;
    });
};
