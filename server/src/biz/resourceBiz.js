'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
const config = require('../config/config');

// tenant list.
exports.getResourceList = (requestOptions) => {
    return axios.get(`${config.RAPTER_URL}/resource`, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
