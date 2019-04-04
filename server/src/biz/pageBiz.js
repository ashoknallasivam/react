'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
const config = require('../config/config');

// page list.
exports.getPageList = (requestOptions) => {
    return axios.get(`${config.RAPTER_URL}/page`, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
// find page by using id.
exports.getPage = (requestOptions, pageId) => {
    return axios.get(`${config.RAPTER_URL}/page/` + pageId, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};

// create page.
exports.createPage = (requestOptions, inpParam) => {
    return axios.post(`${config.RAPTER_URL}/page`, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};

// update page.
exports.updatePage = (requestOptions, pageId, inpParam) => {
    return axios.put(`${config.RAPTER_URL}/page/` + pageId, inpParam, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
// delete page.
exports.deletePage = (requestOptions, pageId) => {
    return axios.delete(`${config.RAPTER_URL}/page/` + pageId, requestOptions).then(response => {
        return response;
    }).catch(error => {
        logging.applogger.error(error);
        return { code: error.response.status, status: error.response.statusText, messages: error.response.error };
    });
};
