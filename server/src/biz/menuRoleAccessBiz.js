'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
const config = require('../config/config');
let urlList= require('../helpers/api-url');

// menu-role-access list.
exports.getMenuRoleAccessList = (requestOptions) => {
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
    return axios.get(`${RAPTER_URL}/menu-role-access`, requestOptions).then(response => {
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
// find menu-role-access by using id.
exports.getMenuRoleAccess = (requestOptions, menuRoleId) => {
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
    return axios.get(`${RAPTER_URL}/menu-role-access/` + menuRoleId, requestOptions).then(response => {
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

// create menu-role-access.
exports.createMenuRoleAccess = (requestOptions, inpParam) => {
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
    return axios.post(`${RAPTER_URL}/menu-role-access`, inpParam, requestOptions).then(response => {
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

// update menu-role-access.
// exports.updateMenuRoleAccess = (requestOptions, menuRoleId, inpParam) => {
//     return axios.put(`${config.RAPTER_URL}/menu-role-access/` + menuRoleId, inpParam, requestOptions).then(response => {
//         return response;
//     }).catch(error => {
//         let rtVal = {
//             code:error.response.status,
//             status:error.response.statusText,
//             messages: error.response.error === undefined?error.response.data.sqlMessage: error.response.error
//         };
        
//         return rtVal;
//     });
// };
// delete menu-role-access.
exports.deleteMenuRoleAccess = (requestOptions, menuRoleId) => {
	let RAPTER_URL = urlList.apiUrl(requestOptions.headers.Environment)
    return axios.delete(`${RAPTER_URL}/menu-role-access/` + menuRoleId, requestOptions).then(response => {
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
