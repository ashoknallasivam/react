'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _connectHistoryApiFallback = require('connect-history-api-fallback');

var _connectHistoryApiFallback2 = _interopRequireDefault(_connectHistoryApiFallback);

var _webpack3 = require('../../webpack.config');

var _webpack4 = _interopRequireDefault(_webpack3);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _users = require('../../users.json');

var _users2 = _interopRequireDefault(_users);

var _requestPromise = require('request-promise');

var _requestPromise2 = _interopRequireDefault(_requestPromise);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RAPTER_URL = 'https://rapter-api.admin.mpr.works/api/v1';

var _process$env = process.env,
    _process$env$NODE_ENV = _process$env.NODE_ENV,
    NODE_ENV = _process$env$NODE_ENV === undefined ? 'development' : _process$env$NODE_ENV,
    _process$env$PORT = _process$env.PORT,
    PORT = _process$env$PORT === undefined ? 8080 : _process$env$PORT;


var config;

var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use(_bodyParser2.default.urlencoded({ extended: false }));

var apiRouter = _express2.default.Router();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT");
  next();
});

apiRouter.route('/getList').get(function (req, res) {
  var list = ["item1", "item2", "item7"];
  res.json(list);
  console.log('Sent list of items');
});

//Globalletiables
var allTenantsRead = [];

//READ FILES
/*readLatestProject();
function readLatestProject() {
  fs.readdir('./exported_file', function (err, filenames) {
    if (err) {
      return new Error(err);

    }
    filenames.forEach(function (filename) {
      fs.readFile('./exported_file/' + filename, function (err, content) {
        if (err) {
          return new Error(err);

        }
        JSON.parse(allTenantsRead.push(JSON.parse(content)));
      })
    })
  })
} */

var loginTokenHeader = void 0;

apiRouter.post('/login', function (req, res) {

  if (req.body.username === "undefined" || req.body.username === "" || req.body.username === null && req.body.password === "undefined" || req.body.password === "" || req.body.password === null) {
    var rtnVal = {};
    rtnVal = _config2.default.httpStatus.SERVER_ERROR;
    rtnVal.message = _config2.default.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }

  _axios2.default.post(RAPTER_URL + '/login', req.body).then(function (response) {
    loginTokenHeader = { headers: { 'Content-Type': "application/json", 'Authorization': "Bearer " + response.data.token } };
    console.log(response);
    res.send(response.data);
  }).catch(function (error) {

    if (error.response) {
      // Request was made but server responded with something
      // other than 2xx
      //console.debug('Status:', error.response.status);
      //console.debug('Data:', error.response.data);
      //console.debug('Headers:', error.response.headers);
      res.sendStatus(error.response.status);
      //res.send(error.response.data);
      //res.send(error.response.headers);
    } else {
      // Something else happened while setting up the request
      // triggered the error
      //console.debug('Error Message:', error.message);
      res.send(error.message);
    }

    //return Promise.reject(error.response || error.message); 
  });
});

apiRouter.post('/two-factor-validate', function (req, res, next) {

  // check header for the token
  var token = req.headers['access-token'];

  // decode token
  if (token) {

    var requestOptions = {
      headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + token },
      body: { code: code }
    };

    _axios2.default.post(RAPTER_URL + '/two-factor-validate', requestOptions).then(function (response) {

      res.send(response.data);
    }).catch(function (error) {

      if (error.response) {

        res.sendStatus(error.response.status);
        res.send(error.response.data);
        res.send(error.response.headers);
      } else {

        res.send(error.message);
      }

      //return Promise.reject(error.response || error.message); 
    });

    next();
  } else {

    // if there is no token  

    res.send({

      message: 'No token provided.'
    });
  }
});

apiRouter.post('/two-factor-validate11', function (req, res) {

  if (req.body.username === "undefined" || req.body.username === "" || req.body.username === null) {
    var rtnVal = {};
    rtnVal = _config2.default.httpStatus.SERVER_ERROR;
    rtnVal.message = _config2.default.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }

  console.log(loginTokenHeader);
  _axios2.default.post(RAPTER_URL + '/two-factor-validate', req.body, loginTokenHeader).then(function (response) {
    config = { headers: { 'Content-Type': "application/json", 'Authorization': "Bearer " + response.data.token } };
    res.send(response.data);
  }).catch(function (error) {

    if (error.response) {

      res.sendStatus(error.response.status);
      res.send(error.response.data);
      res.send(error.response.headers);
    } else {

      res.send(error.message);
    }

    //return Promise.reject(error.response || error.message); 
  });
});

//tenant.
apiRouter.get('/tenant', function (req, res) {
  _axios2.default.get(RAPTER_URL + '/tenant', config).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.post('/tenant', function (req, res) {
  console.log(req.body);
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    var rtnVal = {};
    rtnVal = _config2.default.httpStatus.SERVER_ERROR;
    rtnVal.message = _config2.default.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  _axios2.default.post(RAPTER_URL + '/tenant', req.body, config).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.put('/tenant/:id', function (req, res) {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    var rtnVal = {};
    rtnVal = _config2.default.httpStatus.SERVER_ERROR;
    rtnVal.message = _config2.default.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  _axios2.default.put(RAPTER_URL + '/tenant/' + req.params.id, req.body, config).then(function (response) {
    res.send(response.data);
    //return response;
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

// organization.
apiRouter.get('/organization', function (req, res) {
  _axios2.default.get(RAPTER_URL + '/organization', config).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.post('/organization', function (req, res) {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    var rtnVal = {};
    rtnVal = _config2.default.httpStatus.SERVER_ERROR;
    rtnVal.message = _config2.default.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  _axios2.default.post(RAPTER_URL + '/organization', req.body, config).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.put('/organization/:id', function (req, res) {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    var rtnVal = {};
    rtnVal = _config2.default.httpStatus.SERVER_ERROR;
    rtnVal.message = _config2.default.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  _axios2.default.put(RAPTER_URL + '/organization/' + req.params.id, req.body, config).then(function (response) {
    res.send(response.data);
    //return response;
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.delete('/organization/:id', function (req, res) {
  _axios2.default.delete(RAPTER_URL + '/organization/' + req.params.id, config).then(function (response) {
    res.send(response.data);
    //return response;
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

// role
apiRouter.get('/role', function (req, res) {
  _axios2.default.get(RAPTER_URL + '/role', config).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.post('/role', function (req, res) {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    var rtnVal = {};
    rtnVal = _config2.default.httpStatus.SERVER_ERROR;
    rtnVal.message = _config2.default.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  _axios2.default.post(RAPTER_URL + '/role', req.body, config).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.put('/role/:id', function (req, res) {
  _axios2.default.put(RAPTER_URL + '/role/' + req.params.id, req.body, config).then(function (response) {
    res.send(response.data);
    //return response;
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.delete('/role/:id', function (req, res) {
  _axios2.default.delete(RAPTER_URL + '/role/' + req.params.id, config).then(function (response) {
    res.send(response.data);
    //return response;
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

// menu.
apiRouter.get('/menu', function (req, res) {
  _axios2.default.get(RAPTER_URL + '/menu', config).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});
// resource.
apiRouter.get('/resource', function (req, res) {
  _axios2.default.get(RAPTER_URL + '/resource', config).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.post('/menu-role-access', function (req, res) {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    var rtnVal = {};
    rtnVal = _config2.default.httpStatus.SERVER_ERROR;
    rtnVal.message = _config2.default.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  _axios2.default.post(RAPTER_URL + '/bounds', req.body, config).then(function (response) {
    var x_rapter_bounds = response.data["x-rapter-bounds"];
    var newConfig = { headers: config.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    _axios2.default.get(RAPTER_URL + '/menu-role-access', newConfig).then(function (response) {
      res.send(response.data);
    });
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.post('/resource-role-access', function (req, res) {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    var rtnVal = {};
    rtnVal = _config2.default.httpStatus.SERVER_ERROR;
    rtnVal.message = _config2.default.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  _axios2.default.post(RAPTER_URL + '/bounds', req.body, config).then(function (response) {
    var x_rapter_bounds = response.data["x-rapter-bounds"];
    var newConfig = { headers: config.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    _axios2.default.get(RAPTER_URL + '/resource-role-access', newConfig).then(function (response) {
      res.send(response.data);
    });
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

var menuRoleCreate = function menuRoleCreate(roleId, menuId) {
  var menuRoleBody = {};
  menuRoleBody.roleId = roleId;
  menuRoleBody.menuId = menuId;
  return menuRoleBody;
};

var createBounds = function createBounds(tenantId, ttoId, ltoId) {
  var boundsBody = {};
  boundsBody.tenantId = tenantId;
  boundsBody.ttoId = ttoId;
  ltoId == null ? null : boundsBody.ltoId = ltoId;
  return boundsBody;
};

var resourceRoleCreate = function resourceRoleCreate(roleId, resourceId) {
  var resourceRoleBody = {};
  resourceRoleBody.roleId = roleId;
  resourceRoleBody.resourceId = resourceId;
  return resourceRoleBody;
};

apiRouter.post('/create-menu-role-access', function (req, res) {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    var rtnVal = {};
    rtnVal = _config2.default.httpStatus.SERVER_ERROR;
    rtnVal.message = _config2.default.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  var _req$body = req.body,
      tenantId = _req$body.tenantId,
      ttoId = _req$body.ttoId,
      ltoId = _req$body.ltoId,
      roleId = _req$body.roleId,
      menuId = _req$body.menuId;

  console.log(req.body);
  var boundsBody = createBounds(tenantId, ttoId, ltoId);
  _axios2.default.post(RAPTER_URL + '/bounds', boundsBody, config).then(function (response) {

    var x_rapter_bounds = response.data["x-rapter-bounds"];
    var newConfig = { headers: config.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    var menuRoleBody = menuRoleCreate(roleId, menuId);
    _axios2.default.post(RAPTER_URL + '/menu-role-access', menuRoleBody, newConfig).then(function (response) {
      res.send(response.data);
    });
  }).catch(function (error) {
    console.log(error);
  });
});

apiRouter.post('/create-resource-role-access', function (req, res) {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    var rtnVal = {};
    rtnVal = _config2.default.httpStatus.SERVER_ERROR;
    rtnVal.message = _config2.default.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  var _req$body2 = req.body,
      tenantId = _req$body2.tenantId,
      ttoId = _req$body2.ttoId,
      ltoId = _req$body2.ltoId,
      roleId = _req$body2.roleId,
      resourceId = _req$body2.resourceId;

  console.log(req.body);
  var boundsBody = createBounds(tenantId, ttoId, ltoId);
  _axios2.default.post(RAPTER_URL + '/bounds', boundsBody, config).then(function (response) {
    var x_rapter_bounds = response.data["x-rapter-bounds"];
    var newConfig = { headers: config.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    var resourceRoleBody = resourceRoleCreate(roleId, resourceId);
    _axios2.default.post(RAPTER_URL + '/resource-role-access', resourceRoleBody, newConfig).then(function (response) {
      res.send(response.data);
    });
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.get('/enrollment-target', function (req, res) {
  _axios2.default.get(RAPTER_URL + '/enrollment-target', config).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.post('/create-enrollment-target', function (req, res) {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    var rtnVal = {};
    rtnVal = _config2.default.httpStatus.SERVER_ERROR;
    rtnVal.message = _config2.default.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  _axios2.default.post(RAPTER_URL + '/enrollment-target', req.body, config).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.put('/enrollment-target/:id', function (req, res) {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    var rtnVal = {};
    rtnVal = _config2.default.httpStatus.SERVER_ERROR;
    rtnVal.message = _config2.default.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  _axios2.default.put(RAPTER_URL + '/enrollment-target/' + req.params.id, req.body, config).then(function (response) {
    res.send(response.data);
    //return response;
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.delete('/enrollment-target/:id', function (req, res) {
  _axios2.default.delete(RAPTER_URL + '/enrollment-target/' + req.params.id, config).then(function (response) {
    res.send(response.data);
    //return response;
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

var raConfigCreate = function raConfigCreate(description, blockSize, stratum, groups) {
  var raConfigBody = {};
  raConfigBody.description = description;
  raConfigBody.stratum = stratum;
  raConfigBody.blockSize = blockSize;
  raConfigBody.groups = groups;
  return raConfigBody;
};

apiRouter.post('/ra-config', function (req, res) {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    var rtnVal = {};
    rtnVal = _config2.default.httpStatus.SERVER_ERROR;
    rtnVal.message = _config2.default.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  _axios2.default.get(RAPTER_URL + '/ra-config?tenantId=' + req.body.tenant, config).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.post('/create-ra-config', function (req, res) {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    var rtnVal = {};
    rtnVal = _config2.default.httpStatus.SERVER_ERROR;
    rtnVal.message = _config2.default.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  var _req$body3 = req.body,
      tenantId = _req$body3.tenantId,
      description = _req$body3.description,
      blockSize = _req$body3.blockSize,
      stratum = _req$body3.stratum,
      groups = _req$body3.groups;

  var raConfigBody = raConfigCreate(description, blockSize, stratum, groups);
  _axios2.default.post(RAPTER_URL + '/ra-config?tenantId=' + tenantId, raConfigBody, config).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.put('/ra-config/:id', function (req, res) {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    var rtnVal = {};
    rtnVal = _config2.default.httpStatus.SERVER_ERROR;
    rtnVal.message = _config2.default.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  var _req$body4 = req.body,
      tenantId = _req$body4.tenantId,
      description = _req$body4.description,
      blockSize = _req$body4.blockSize,
      stratum = _req$body4.stratum,
      groups = _req$body4.groups;

  var raConfigBody = raConfigCreate(description, blockSize, stratum, groups);
  _axios2.default.put(RAPTER_URL + '/ra-config/' + req.params.id + '?tenantId=' + tenantId, raConfigBody, config).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.delete('/ra-config/:id', function (req, res) {
  _axios2.default.put(RAPTER_URL + '/ra-config/' + req.params.id, config).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

var obj = {
  tenant: [],
  organization: [],
  roles: [],
  enrollmentTarget: [],
  raConfig: []
};
apiRouter.post('/export-project', function (req, res) {
  var exportTenantId = req.body.id;
  var fileName = "tenantId" + "_" + exportTenantId + ".json";
  var exportedProject = _fs2.default.createWriteStream('./exported_file/' + fileName);
  console.log(req.body.name);
  obj.tenant = [];
  obj.tenant.push(req.body);
  var selectedOrgs = [];
  var selectedRoles = [];
  var selectedEnrollments = [];
  var selectedRaConfig = [];
  mapRolesToOrg = function mapRolesToOrg(roles) {
    selectedOrgs.map(function (org) {
      if (roles.orgId == org.id) {
        selectedRoles.push(roles);
      }
    });
  };
  mapEnrollmentTargetToLoc = function mapEnrollmentTargetToLoc(enroll) {
    selectedOrgs.map(function (org) {
      if (enroll.orgId == org.id) {
        selectedEnrollments.push(enroll);
      }
    });
  };
  mapRaConfigToLoc = function mapRaConfigToLoc(raConfig) {
    selectedOrgs.map(function (org) {
      if (raConfig.stratum[0].value == org.id) {
        selectedRaConfig.push(raConfig);
      }
    });
  };
  _axios2.default.get(RAPTER_URL + '/organization', config).then(function (response) {
    var allOrgs = response.data;
    selectedOrgs = allOrgs.filter(function (item) {
      return item.tenantId == exportTenantId;
    });
    obj.organization = [];
    obj.organization.push(selectedOrgs);
    _axios2.default.get(RAPTER_URL + '/role', config).then(function (response) {
      var _obj$roles;

      var allRoles = response.data;
      allRoles.map(function (item) {
        return mapRolesToOrg(item);
      });
      obj.roles = [];
      (_obj$roles = obj.roles).push.apply(_obj$roles, selectedRoles);
      var data = JSON.stringify(obj);
      _fs2.default.writeFileSync('./exported_file/' + fileName, data, function (err) {
        if (err) {
          return console.error(err);
        }
      });
    }).catch(function (error) {
      console.log(error);
      res.send(error.response);
    });
    _axios2.default.get(RAPTER_URL + '/enrollment-target', config).then(function (response) {
      var _obj$enrollmentTarget;

      var allEnrollmentTarget = response.data;
      allEnrollmentTarget.map(function (item) {
        return mapEnrollmentTargetToLoc(item);
      });
      obj.enrollmentTarget = [];
      (_obj$enrollmentTarget = obj.enrollmentTarget).push.apply(_obj$enrollmentTarget, selectedEnrollments);
      var data = JSON.stringify(obj);
      _fs2.default.writeFileSync('./exported_file/' + fileName, data, function (err) {
        if (err) {
          return console.error(err);
        }
      });
    }).catch(function (error) {
      console.log(error);
      res.send(error.response);
    });
    _axios2.default.get(RAPTER_URL + '/ra-config?tenantId=' + exportTenantId, config).then(function (response) {
      var _obj$raConfig;

      var allRaConfig = response.data;
      allRaConfig.map(function (item) {
        return mapRaConfigToLoc(item);
      });
      obj.raConfig = [];
      (_obj$raConfig = obj.raConfig).push.apply(_obj$raConfig, selectedRaConfig);
      var data = JSON.stringify(obj);
      _fs2.default.writeFileSync('./exported_file/' + fileName, data, function (err) {
        if (err) {
          return console.error(err);
        }
      });
    }).catch(function (error) {
      console.log(error);
      res.send(error.response);
    });
    exportedProject.end();
    res.send("successful");
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.get('/import-project', function (req, res) {
  res.set('Content-Type', '');
  res.send(JSON.stringify(allTenantsRead));
});

app.use('/api', apiRouter);
app.use((0, _connectHistoryApiFallback2.default)());

if (NODE_ENV === 'production') {
  var FE_DIR = (0, _path.resolve)(__dirname, '..', 'client');

  app.use(_express2.default.static(FE_DIR));

  app.get('/*', function (req, res) {
    res.sendFile((0, _path.resolve)(FE_DIR, 'index.html'));
  });
} else {
  var compiler = (0, _webpack2.default)(_webpack4.default);

  app.use((0, _webpackDevMiddleware2.default)(compiler, {
    stats: { colors: true }
  }));
  app.use((0, _webpackHotMiddleware2.default)(compiler));
}

var server = _http2.default.createServer(app);

server.listen(PORT, function () {
  console.log('The server is running at http://localhost:' + PORT);
});