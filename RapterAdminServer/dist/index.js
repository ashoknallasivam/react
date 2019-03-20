'use strict';

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _connectHistoryApiFallback = require('connect-history-api-fallback');

var _connectHistoryApiFallback2 = _interopRequireDefault(_connectHistoryApiFallback);

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
  next();
});

apiRouter.route('/getList').get(function (req, res) {
  var list = ["item1", "item2", "item7"];
  res.json(list);
  console.log('Sent list of items');
});

apiRouter.route('/reload').get(function (req, res) {
  res.send({
    message: 'I am a server route and can also be hot reloaded!111'
  });
});

apiRouter.route('/hello').get(function (req, res) {
  return res.send('Can you hear me1?');
});

//GlobalVariables
var allTenantsRead = [];

var loginTokenHeader;
apiRouter.post('/login', function (req, res) {

  _axios2.default.post(RAPTER_URL + '/login', req.body).then(function (response) {
    loginTokenHeader = { headers: { 'Content-Type': "application/json", 'Authorization': "Bearer " + response.data.token } };
    res.send(response.data);
    //console.log(response.data);
    //return response;
  });
});

apiRouter.post('/two-factor-validate', function (req, res) {
  console.log(loginTokenHeader);
  _axios2.default.post(RAPTER_URL + '/two-factor-validate', req.body, loginTokenHeader).then(function (response) {
    config = { headers: { 'Content-Type': "application/json", 'Authorization': "Bearer " + response.data.token } };
    res.send(response.data);
    //return response;
  });
});

apiRouter.get('/tenant', function (req, res) {
  _axios2.default.get(RAPTER_URL + '/tenant', config).then(function (response) {
    res.send(response.data);
    //return response;
  });
});

apiRouter.post('/tenant', function (req, res) {
  _axios2.default.post(RAPTER_URL + '/tenant', req.body, config).then(function (response) {
    res.send(response.data);
    //return response;
  });
});

apiRouter.get('/organization', function (req, res) {
  _axios2.default.get(RAPTER_URL + '/organization', config).then(function (response) {
    res.send(response.data);
    //return response;
  });
});

apiRouter.post('/organization', function (req, res) {
  _axios2.default.post(RAPTER_URL + '/organization', req.body, config).then(function (response) {
    res.send(response.data);
    //return response;
  });
});

apiRouter.get('/role', function (req, res) {
  _axios2.default.get(RAPTER_URL + '/role', config).then(function (response) {
    res.send(response.data);
    //return response;
  });
});

apiRouter.post('/role', function (req, res) {
  _axios2.default.post(RAPTER_URL + '/role', req.body, config).then(function (response) {
    res.send(response.data);
    //return response;
  });
});

apiRouter.get('/menu', function (req, res) {
  _axios2.default.get(RAPTER_URL + '/menu', config).then(function (response) {
    res.send(response.data);
    //return response;
  });
});

apiRouter.get('/resource', function (req, res) {
  _axios2.default.get(RAPTER_URL + '/resource', config).then(function (response) {
    res.send(response.data);
    //return response;
  });
});

apiRouter.post('/menu-role-access', function (req, res) {
  _axios2.default.post(RAPTER_URL + '/bounds', req.body, config).then(function (response) {
    var x_rapter_bounds = response.data["x-rapter-bounds"];
    var newConfig = { headers: config.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    _axios2.default.get(RAPTER_URL + '/menu-role-access', newConfig).then(function (response) {
      res.send(response.data);
    });
  }).catch(function (error) {
    console.log(error);
  });
});

apiRouter.post('/create-menu-role-access', function (req, res) {
  _axios2.default.post(RAPTER_URL + '/bounds', req.body, config).then(function (response) {
    var x_rapter_bounds = response.data["x-rapter-bounds"];
    var newConfig = { headers: config.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    _axios2.default.post(RAPTER_URL + '/menu-role-access', newConfig).then(function (response) {
      res.send(response.data);
    });
  }).catch(function (error) {
    console.log(error);
  });
});

apiRouter.post('/resource-role-access', function (req, res) {
  _axios2.default.post(RAPTER_URL + '/bounds', req.body, config).then(function (response) {
    var x_rapter_bounds = response.data["x-rapter-bounds"];
    var newConfig = { headers: config.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    _axios2.default.get(RAPTER_URL + '/resource-role-access', newConfig).then(function (response) {
      res.send(response.data);
    });
  }).catch(function (error) {
    console.log(error);
  });
});

apiRouter.get('/enrollment-target', function (req, res) {
  _axios2.default.get(RAPTER_URL + '/enrollment-target', config).then(function (response) {
    res.send(response.data);
    //return response;
  });
});

apiRouter.post('/enrollment-target', function (req, res) {
  _axios2.default.get(RAPTER_URL + '/enrollment-target', req.body, config).then(function (response) {
    res.send(response.data);
    //return response;
  });
});

apiRouter.post('/ra-config', function (req, res) {
  _axios2.default.get(RAPTER_URL + '/ra-config?tenantId=' + req.body.tenant, config).then(function (response) {
    res.send(response.data);
    //return response;
  });
});

apiRouter.post('/tenant', function (req, res) {
  console.log(req.body);
  _axios2.default.get(RAPTER_URL + '/tenant', req.body, config).then(function (response) {
    res.send(response.data);
    //return response;
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
    });
    exportedProject.end();
    res.send("successful");
  });
});

apiRouter.get('/import-project', function (req, res) {
  res.set('Content-Type', '');
  res.send(JSON.stringify(allTenantsRead));
});

app.use('/api', apiRouter);
app.use((0, _connectHistoryApiFallback2.default)());

var server = _http2.default.createServer(app);

server.listen(PORT, function () {
  console.log('The server is running at http://localhost:' + PORT);
});