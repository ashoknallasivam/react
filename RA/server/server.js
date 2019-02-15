const express = require('express');
const path = require('path');
var bodyParser = require("body-parser");
var axios =  require('axios');
var fs = require("fs");
const historyFallback = require('connect-history-api-fallback');
const app = express();
const apiRouter = express.Router();
const RAPTER_URL = 'https://rapter-api.admin.mpr.works/api/v1';

var config;

app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   next();
})

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

//Serve static files from the React app 
app.use(express.static(path.join(__dirname, 'build'))); 

//GlobalVariables
var allTenantsRead = [];

//READ FILES
readLatestProject();
function readLatestProject() {
  fs.readdir('./exported_file', function (err, filenames) {
    if(err){
        return new Error(err);
        
    }
    filenames.forEach(function (filename) {
        fs.readFile('./exported_file/' + filename, function(err, content) {
          if (err) {
            return new Error(err);
           
          }
          JSON.parse(allTenantsRead.push(JSON.parse(content)));
        })
    })
  })  
}

var loginTokenHeader;
apiRouter.post('/login', (req, res) => {
  axios.post(`${RAPTER_URL}/login`, req.body).then(function(response){
    loginTokenHeader = {headers: {'Content-Type': "application/json", 'Authorization': "Bearer " + response.data.token}};
    res.send(response.data);
    //return response;
  });
});

apiRouter.post('/two-factor-validate', (req, res) => {
  console.log(loginTokenHeader);
  axios.post(`${RAPTER_URL}/two-factor-validate`,req.body, loginTokenHeader).then(function(response){
    config = {headers: {'Content-Type': "application/json", 'Authorization': "Bearer " + response.data.token}};
    res.send(response.data);
    //return response;
  });
});


apiRouter.get('/tenant', (req, res) => {
    axios.get(`${RAPTER_URL}/tenant`, config).then(function(response){
      res.send(response.data);
      //return response;
    });
});

apiRouter.post('/tenant', (req, res) => {
  axios.post(`${RAPTER_URL}/tenant`,req.body, config).then(function(response){
    res.send(response.data);
    //return response;
  });
});

apiRouter.get('/organization', (req, res) => {
    axios.get(`${RAPTER_URL}/organization`, config).then(function(response){
      res.send(response.data);
      //return response;
    });
});

apiRouter.post('/organization', (req, res) => {
  axios.post(`${RAPTER_URL}/organization`,req.body, config).then(function(response){
    res.send(response.data);
    //return response;
  });
});

apiRouter.get('/role', (req, res) => {
  axios.get(`${RAPTER_URL}/role`, config).then(function(response){
    res.send(response.data);
    //return response;
  });
});

apiRouter.post('/role', (req, res) => {
  axios.post(`${RAPTER_URL}/role`,req.body, config).then(function(response){
    res.send(response.data);
    //return response;
  });
});

apiRouter.get('/menu', (req, res) => {
  axios.get(`${RAPTER_URL}/menu`, config).then(function(response){
    res.send(response.data);
    //return response;
  });
});

apiRouter.get('/resource', (req, res) => {
  axios.get(`${RAPTER_URL}/resource`, config).then(function(response){
    res.send(response.data);
    //return response;
  });
});

apiRouter.post('/menu-role-access', (req, res) => {
  axios.post(`${RAPTER_URL}/bounds`, req.body, config).then(function(response){
    let x_rapter_bounds = response.data["x-rapter-bounds"];
    let newConfig = {headers: config.headers};
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    axios.get(`${RAPTER_URL}/menu-role-access`, newConfig).then(function(response){
      res.send(response.data);
    })
  }).catch(function(error){
    console.log(error);
  });
});

apiRouter.post('/create-menu-role-access', (req, res) => {
  axios.post(`${RAPTER_URL}/bounds`, req.body, config).then(function(response){
    let x_rapter_bounds = response.data["x-rapter-bounds"];
    let newConfig = {headers: config.headers};
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    axios.post(`${RAPTER_URL}/menu-role-access`, newConfig).then(function(response){
      res.send(response.data);
    })
  }).catch(function(error){
    console.log(error);
  });
});

apiRouter.post('/resource-role-access', (req, res) => {
  axios.post(`${RAPTER_URL}/bounds`, req.body, config).then(function(response){
    let x_rapter_bounds = response.data["x-rapter-bounds"];
    let newConfig = {headers: config.headers};
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    axios.get(`${RAPTER_URL}/resource-role-access`, newConfig).then(function(response){
      res.send(response.data);
    })
  }).catch(function(error){
    console.log(error);
  });
});

apiRouter.get('/enrollment-target', (req, res) => {
  axios.get(`${RAPTER_URL}/enrollment-target`, config).then(function(response){
    res.send(response.data);
    //return response;
  });
});

apiRouter.post('/enrollment-target', (req, res) => {
  axios.get(`${RAPTER_URL}/enrollment-target`, req.body, config).then(function(response){
    res.send(response.data);
    //return response;
  });
});

apiRouter.post('/ra-config', (req, res) => {
  axios.get(`${RAPTER_URL}/ra-config?tenantId=`+ req.body.tenant, config).then(function(response){
    res.send(response.data);
    //return response;
  });
});

apiRouter.post('/tenant', (req, res) => {
  console.log(req.body);
  axios.get(`${RAPTER_URL}/tenant`, req.body, config).then(function(response){
    res.send(response.data);
    //return response;
  });
});



var obj = {
  tenant: [],
  organization: [],
  roles: [],
  enrollmentTarget: [],
  raConfig:[]
} 
apiRouter.post('/export-project', (req, res) => {
    let exportTenantId = req.body.id;
    let fileName = "tenantId" + "_" + exportTenantId + ".json";
    var exportedProject = fs.createWriteStream(`./exported_file/${fileName}`);
    console.log(req.body.name);
    obj.tenant = [];
    obj.tenant.push(req.body);
    let selectedOrgs = [];
    let selectedRoles = [];
    let selectedEnrollments = [];
    let selectedRaConfig = [];
    mapRolesToOrg = (roles) => {
        selectedOrgs.map(org => {
          if(roles.orgId == org.id){
            selectedRoles.push(roles);
          }
        })
    }
    mapEnrollmentTargetToLoc = (enroll) => {
      selectedOrgs.map(org => {
          if(enroll.orgId == org.id){
            selectedEnrollments.push(enroll);
          }
      })
    }
    mapRaConfigToLoc = (raConfig) => {
      selectedOrgs.map(org => {
        if(raConfig.stratum[0].value == org.id){
          selectedRaConfig.push(raConfig);
        }
    })
    }
    axios.get(`${RAPTER_URL}/organization`, config).then(function (response) {
        let allOrgs = response.data;
        selectedOrgs = allOrgs.filter(item => item.tenantId == exportTenantId);
        obj.organization = [];
        obj.organization.push(selectedOrgs);
        axios.get(`${RAPTER_URL}/role`, config).then(function (response) {
            let allRoles = response.data;
            allRoles.map(item => mapRolesToOrg(item));
            obj.roles = [];
            obj.roles.push(...selectedRoles);
            let data = JSON.stringify(obj);
            fs.writeFileSync(`./exported_file/${fileName}`, data, function (err) {
              if (err) {
                  return console.error(err);
              }
          });
        });
        axios.get(`${RAPTER_URL}/enrollment-target`, config).then(function (response) {
            let allEnrollmentTarget = response.data;
            allEnrollmentTarget.map(item => mapEnrollmentTargetToLoc(item));
            obj.enrollmentTarget = [];
            obj.enrollmentTarget.push(...selectedEnrollments);
            let data = JSON.stringify(obj);
            fs.writeFileSync(`./exported_file/${fileName}`, data, function (err) {
                if (err) {
                    return console.error(err);
                }
            });
        });
        axios.get(`${RAPTER_URL}/ra-config?tenantId=` + exportTenantId, config).then(function (response) {
          let allRaConfig = response.data;
          allRaConfig.map(item => mapRaConfigToLoc(item));
          obj.raConfig = [];
          obj.raConfig.push(...selectedRaConfig);
          let data = JSON.stringify(obj);
          fs.writeFileSync(`./exported_file/${fileName}`, data, function (err) {
              if (err) {
                  return console.error(err);
              }
          });
      });  
        exportedProject.end();
        res.send("successful");
    })
})


apiRouter.get('/import-project', (req, res) => {
    res.set('Content-Type', '');
    res.send(JSON.stringify(allTenantsRead)); 
})

// Put all API endpoints under '/api' 
app.use('/api', apiRouter); 

app.use(historyFallback()); 
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/build/index.html'));
});
const port = process.env.PORT || 3000; app.listen(port); 
console.log(`Node Server listening on ${port}`);
