import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import fs from 'fs';
import { resolve } from 'path';
import historyFallback from 'connect-history-api-fallback';
import bearerToken from 'express-bearer-token';
import messages from './config';
import cors from 'cors';

const RAPTER_URL = 'https://rapter-api.admin.mpr.works/api/v1';

const { NODE_ENV = 'development', PORT = 4000 } = process.env;

var config;

const app = express();

app.use(bearerToken());


app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));

//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const apiRouter = express.Router();

app.use(function (req, res, next) {
   res.header("Access-Control-Allow-Origin", "*");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
   res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS,DELETE,PUT")
   next();
})


apiRouter.route('/getList')
  .get((req, res) => {
	  const list = ["item1", "item2", "item7"];
    res.json(list);
    console.log('Sent list of items');
  });

  
//Globalletiables
const allTenantsRead = [];

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


//Check to make sure header is not undefined, if so, return Forbidden (403)
const checkToken = (req, res, next) => {
    const header = req.headers['authorization'];

    if(typeof header !== 'undefined') {
		const token = req.token;
        //const bearer = header.split(' ');
        //const token = bearer[1];

        req.token = token;
        next();
    } else {
        //If header is undefined return Forbidden (403)
        res.sendStatus(403)
    }
}

// Login API 

apiRouter.post('/login', (req, res) => {
	
  if (req.body.username === "undefined" || req.body.username === "" || req.body.username === null && req.body.password === "undefined" || req.body.password === "" || req.body.password === null ) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }	
	

  axios.post(`${RAPTER_URL}/login`, req.body).then(function (response) {

	res.send(response.data);

  }).catch(function (error) {
	  
	if (error.response) {
      
	  res.sendStatus(error.response.status);
	 

    } else {
      
	  res.send(error.message);
	  
    }
    
  });
  
  
});

// Two factor Authentication API

apiRouter.post('/two-factor-validate', (req, res) =>{
	
	if (req.body.code === "undefined" || req.body.code === "" || req.body.code === null) {
		let rtnVal = {}
		rtnVal = messages.httpStatus.SERVER_ERROR;
		rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
		res.status(500).send(rtnVal);
		return;
	 }		
	
	const bearerToken = req.token;
	//console.log('Token '+req.token);
	
	const requestOptions = {
  
        headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + bearerToken }
        
    };
	
	// Call to external API by passing the request body and header information from node api 
   
     axios.post(`${RAPTER_URL}/two-factor-validate`, req.body, requestOptions ).then(function (response) {

	    res.send(response.data);

	 }).catch(function (error) {
		  
		if (error.response) {
		  
		  res.sendStatus(error.response.status);

		} else {
		 
		  res.send(error.message);
		  
		}

	  });
   
});


//tenant.
apiRouter.get('/tenant', checkToken, (req, res) => {
	
	const bearerToken = req.token;
	console.log('Token '+req.token);
	
	
	const requestOptions = {
  
        headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + bearerToken }
        
    };
	
	
	axios.get(`${RAPTER_URL}/tenant`, requestOptions).then(function (response) {
		res.send(response.data);
	  }).catch(function (error) {
		res.send(error.message);
	  }); 
});

//tenant.
apiRouter.post('/tenant', (req, res) => {
	
	const bearerToken = req.token;
	console.log('Token '+req.token);
	console.log('Body '+ JSON.stringify(req.body));
	/*
	
  axios.get(`${RAPTER_URL}/tenant`, config).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  }); */
});


//tenant.
apiRouter.get('/tenant111', (req, res) => {
  axios.get(`${RAPTER_URL}/tenant`, config).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.post('/tenant111', (req, res) => {
  console.log(req.body);
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  axios.post(`${RAPTER_URL}/tenant`, req.body, config).then(function (response) {
    res.send(response.data);
  }).catch(error => {
    res.send(error.response);
  });
});

apiRouter.put('/tenant/:id', (req, res) => {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  axios.put(`${RAPTER_URL}/tenant/` + req.params.id, req.body, config).then(function(response){
    res.send(response.data);
    //return response;
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

// organization.
apiRouter.get('/organization', checkToken, (req, res) => {
	
	const bearerToken = req.token;
	//console.log('Token '+req.token);
	
	const requestOptions = {
  
        headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + bearerToken }
        
    };
	
	
  axios.get(`${RAPTER_URL}/organization`,requestOptions).then(function (response) {
    res.send(response.data);

  }).catch(error => {
    res.send(error.message);
  });
});

apiRouter.post('/organization', (req, res) => {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  axios.post(`${RAPTER_URL}/organization`, req.body, config).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    res.send(error.response);
  });
});

apiRouter.put('/organization/:id', (req, res) => {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  axios.put(`${RAPTER_URL}/organization/` + req.params.id, req.body, config).then(function(response){
    res.send(response.data);
    //return response;
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.delete('/organization/:id', (req, res) => {
  axios.delete(`${RAPTER_URL}/organization/` + req.params.id, config).then(function(response){
    res.send(response.data);
    //return response;
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

// role
apiRouter.get('/role', checkToken,  (req, res) => {
	
    const bearerToken = req.token;
	console.log('Token '+req.token);
	
	const requestOptions = {
  
        headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + bearerToken }
        
    };
	
  axios.get(`${RAPTER_URL}/role`, requestOptions).then(function (response) {
    res.send(response.data);

  }).catch(function (error) {
    res.send(error.message);
  });
});

apiRouter.post('/role', (req, res) => {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  axios.post(`${RAPTER_URL}/role`, req.body, config).then(function (response) {
    res.send(response.data);

  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.put('/role/:id', (req, res) => {
  axios.put(`${RAPTER_URL}/role/` + req.params.id ,req.body, config).then(function(response){
    res.send(response.data);
    //return response;
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.delete('/role/:id', (req, res) => {
  axios.delete(`${RAPTER_URL}/role/` + req.params.id, config).then(function(response){
    res.send(response.data);
    //return response;
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

// menu.
apiRouter.get('/menu', (req, res) => {
  axios.get(`${RAPTER_URL}/menu`, config).then(function (response) {
    res.send(response.data);

  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});
// resource.
apiRouter.get('/resource', (req, res) => {
  axios.get(`${RAPTER_URL}/resource`, config).then(function (response) {
    res.send(response.data);

  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.post('/menu-role-access', (req, res) => {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  axios.post(`${RAPTER_URL}/bounds`, req.body, config).then(function(response){
    let x_rapter_bounds = response.data["x-rapter-bounds"];
    let newConfig = {headers: config.headers};
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    axios.get(`${RAPTER_URL}/menu-role-access`, newConfig).then(function(response){
      res.send(response.data);
    })
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.post('/resource-role-access', (req, res) => {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  axios.post(`${RAPTER_URL}/bounds`, req.body, config).then(function(response){
    let x_rapter_bounds = response.data["x-rapter-bounds"];
    let newConfig = {headers: config.headers};
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    axios.get(`${RAPTER_URL}/resource-role-access`, newConfig).then(function(response){
      res.send(response.data);
    })
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

let menuRoleCreate = (roleId, menuId) => {
  let menuRoleBody = {};
  menuRoleBody.roleId = roleId;
  menuRoleBody.menuId = menuId;
  return menuRoleBody;
}

let createBounds = (tenantId, ttoId, ltoId) => {
  let boundsBody = {};
  boundsBody.tenantId = tenantId;
  boundsBody.ttoId = ttoId;
  ltoId == null ? null: boundsBody.ltoId = ltoId;
  return boundsBody;
}

let resourceRoleCreate = (roleId, resourceId) => {
  let resourceRoleBody = {};
  resourceRoleBody.roleId = roleId;
  resourceRoleBody.resourceId = resourceId;
  return resourceRoleBody;
}

apiRouter.post('/create-menu-role-access', (req, res) => {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  const {tenantId, ttoId, ltoId, roleId, menuId} = req.body;
  console.log(req.body);
  let boundsBody = createBounds(tenantId, ttoId, ltoId); 
  axios.post(`${RAPTER_URL}/bounds`, boundsBody, config).then(function(response){

    let x_rapter_bounds = response.data["x-rapter-bounds"];
    let newConfig = { headers: config.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    let menuRoleBody = menuRoleCreate(roleId, menuId);
    axios.post(`${RAPTER_URL}/menu-role-access`,menuRoleBody, newConfig).then(function(response){
      res.send(response.data);
    })
  }).catch(function(error){
    console.log(error);
  });
});

apiRouter.post('/create-resource-role-access', (req, res) => {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  const {tenantId, ttoId, ltoId, roleId, resourceId} = req.body;
  console.log(req.body);
  let boundsBody = createBounds(tenantId, ttoId, ltoId); 
  axios.post(`${RAPTER_URL}/bounds`, boundsBody, config).then(function(response){
    let x_rapter_bounds = response.data["x-rapter-bounds"];
    let newConfig = {headers: config.headers};
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    let resourceRoleBody = resourceRoleCreate(roleId, resourceId);
    axios.post(`${RAPTER_URL}/resource-role-access`,resourceRoleBody, newConfig).then(function(response){
      res.send(response.data);
    })
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.get('/enrollment-target', (req, res) => {
  axios.get(`${RAPTER_URL}/enrollment-target`, config).then(function (response) {
    res.send(response.data);

  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.post('/create-enrollment-target', (req, res) => {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  axios.post(`${RAPTER_URL}/enrollment-target`, req.body, config).then(function(response){
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.put('/enrollment-target/:id', (req, res) => {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  axios.put(`${RAPTER_URL}/enrollment-target/` + req.params.id, req.body, config).then(function(response){
    res.send(response.data);
    //return response;
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.delete('/enrollment-target/:id', (req, res) => {
  axios.delete(`${RAPTER_URL}/enrollment-target/` + req.params.id, config).then(function(response){
    res.send(response.data);
    //return response;
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

let raConfigCreate = (description, blockSize, stratum, groups) => {
  let raConfigBody = {};
  raConfigBody.description = description;
  raConfigBody.stratum = stratum;
  raConfigBody.blockSize = blockSize;
  raConfigBody.groups = groups;
  return raConfigBody;
}

apiRouter.post('/ra-config', (req, res) => {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  axios.get(`${RAPTER_URL}/ra-config?tenantId=`+ req.body.tenant, config).then(function(response){
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);

  });
});

apiRouter.post('/create-ra-config', (req, res) => {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  let { tenantId, description, blockSize, stratum, groups } = req.body;
  let raConfigBody = raConfigCreate(description, blockSize, stratum, groups);
  axios.post(`${RAPTER_URL}/ra-config?tenantId=`+ tenantId,raConfigBody, config).then(function(response){
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.put('/ra-config/:id', (req, res) => {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  let { tenantId, description, blockSize, stratum, groups } = req.body;
  let raConfigBody = raConfigCreate(description, blockSize, stratum, groups);
  axios.put(`${RAPTER_URL}/ra-config/` + req.params.id+ `?tenantId=`+ tenantId, raConfigBody, config).then(function(response){
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.delete('/ra-config/:id', (req, res) => {
  axios.put(`${RAPTER_URL}/ra-config/` + req.params.id, config).then(function(response){
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

/*let obj = {
  tenant: [],
  organization: [],
  roles: [],
  enrollmentTarget: [],
  raConfig: []
}
apiRouter.post('/export-project', (req, res) => {
  let exportTenantId = req.body.id;
  let fileName = "tenantId" + "_" + exportTenantId + ".json";
  let exportedProject = fs.createWriteStream(`./exported_file/${fileName}`);
  console.log(req.body.name);
  obj.tenant = [];
  obj.tenant.push(req.body);
  let selectedOrgs = [];
  let selectedRoles = [];
  let selectedEnrollments = [];
  let selectedRaConfig = [];
  mapRolesToOrg = (roles) => {
    selectedOrgs.map(org => {
      if (roles.orgId == org.id) {
        selectedRoles.push(roles);
      }
    })
  }
  mapEnrollmentTargetToLoc = (enroll) => {
    selectedOrgs.map(org => {
      if (enroll.orgId == org.id) {
        selectedEnrollments.push(enroll);
      }
    })
  }
  mapRaConfigToLoc = (raConfig) => {
    selectedOrgs.map(org => {
      if (raConfig.stratum[0].value == org.id) {
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
    }).catch(function (error) {
      console.log(error);
      res.send(error.response);
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
    }).catch(function (error) {
      console.log(error);
      res.send(error.response);
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
})


apiRouter.get('/import-project', (req, res) => {
  res.set('Content-Type', '');
  res.send(JSON.stringify(allTenantsRead));
})
  */
  
app.use('/api', apiRouter);
app.use(historyFallback());


if (NODE_ENV === 'production') {
  const FE_DIR = resolve(__dirname, '..', 'client');

  app.use(express.static(FE_DIR));

  app.get('/*', (req, res) => {
    res.sendFile(resolve(FE_DIR, 'index.html'));
  });
} 


const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`The server is running at http://localhost:${PORT}`);
    
});