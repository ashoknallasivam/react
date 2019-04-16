'use strict';
let axios = require('axios');
let logging = require('../utils/logger');
const config = require('../config/config');

// menu-role-access list.
exports.getMenuRoleAccessList = (requestOptions) => {
    return axios.get(`${config.RAPTER_URL}/menu-role-access`, requestOptions).then(response => {
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
    return axios.get(`${config.RAPTER_URL}/menu-role-access/` + menuRoleId, requestOptions).then(response => {
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
    return axios.post(`${config.RAPTER_URL}/menu-role-access`, inpParam, requestOptions).then(response => {
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
    return axios.delete(`${config.RAPTER_URL}/menu-role-access/` + menuRoleId, requestOptions).then(response => {
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
