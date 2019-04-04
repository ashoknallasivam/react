'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
const config = require('../config/config');

// menu list.
exports.getMenuList = (requestOptions) => {
    return axios.get(`${config.RAPTER_URL}/menu`, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
