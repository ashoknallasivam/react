import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import fs from 'fs';
import { resolve } from 'path';
import historyFallback from 'connect-history-api-fallback';
import bearerToken from 'express-bearer-token';
import messages from './config';

const RAPTER_URL = 'https://rapter-api.admin.mpr.works/api/v1';

const app = express();

app.use(bearerToken());
app.use(bodyParser.json({ type: '*/*' }));
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

// Login API 

apiRouter.post('/login', (req, res) => {

  if (req.body.username === "undefined" || req.body.username === "" || req.body.username === null && req.body.password === "undefined" || req.body.password === "" || req.body.password === null) {
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

    //return Promise.reject(error.response || error.message); 

  });


});

// Two factor Authentication API

apiRouter.post('/two-factor-validate', (req, res) => {

  if (req.body.code === "undefined" || req.body.code === "" || req.body.code === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }

  const bearerToken = req.token;
  console.log('Token ' + req.token);

  const requestOptions = {

    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + bearerToken }

  };

// Call to external API by passing the request body and header information from node api 

  axios.post(`${RAPTER_URL}/two-factor-validate`, req.body, requestOptions).then(function (response) {
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
apiRouter.get('/tenant', (req, res) => {
  const requestOptions = {

    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }

  };
  axios.get(`${RAPTER_URL}/tenant`, requestOptions).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    res.send(error.message);
  });
});

apiRouter.post('/tenant', (req, res) => {
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE_TENANT_NAME;
    res.status(500).send(rtnVal);
    return;
  }
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  axios.post(`${RAPTER_URL}/tenant`, req.body, requestOptions).then(function (response) {
    res.send(response.data);
  }).catch(error => {
    console.log(error);
    res.send(error.message);

  });
});

apiRouter.put('/tenant/:id', (req, res) => {
  if (req.params.id === "undefined" || req.params.id === "" || req.params.id === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE_TENANT_ID;
    res.status(500).send(rtnVal);
    return;
  }
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  axios.put(`${RAPTER_URL}/tenant/` + req.params.id, req.body, requestOptions).then(function (response) {
    res.send(response.data);
    //return response;
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

// organization.
apiRouter.get('/organization', (req, res) => {
  const requestOptions = {

    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }

  };
  axios.get(`${RAPTER_URL}/organization`, requestOptions).then(function (response) {
    res.send(response.data);

  }).catch(error => {
    res.send(error.message);
  });
});

apiRouter.post('/organization', (req, res) => {
  if ((req.body.name === "undefined" || req.body.name === "" || req.body.name === null)
    && (req.body.level === "undefined" || req.body.level === "" || req.body.level === null) &&
    (req.body.tenantId === "undefined" || req.body.tenantId === "" || req.body.tenantId === null)) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  const requestOptions = {

    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }

  };
  axios.post(`${RAPTER_URL}/organization`, req.body, requestOptions).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    res.send(error.response);
  });
});

apiRouter.put('/organization/:id', (req, res) => {
  if (req.params.id === "undefined" || req.params.id === "" || req.params.id === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE_ORGANIZATION_ID;
    res.status(500).send(rtnVal);
    return;
  }
  const requestOptions = {

    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }

  };
  axios.put(`${RAPTER_URL}/organization/` + req.params.id, req.body, requestOptions).then(function (response) {
    res.send(response.data);
    //return response;
  }).catch(function (error) {
    res.send(error.response);
  });
});

apiRouter.delete('/organization/:id', (req, res) => {
  if (req.params.id === "undefined" || req.params.id === "" || req.params.id === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE_ORGANIZATION_ID;
    res.status(500).send(rtnVal);
    return;
  }
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  axios.delete(`${RAPTER_URL}/organization/` + req.params.id, requestOptions).then(function (response) {
    res.send(response.data);
    //return response;
  }).catch(function (error) {
    res.send(error.response);
  });
});

// role
apiRouter.get('/role', (req, res) => {
  const requestOptions = {

    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }

  };
  axios.get(`${RAPTER_URL}/role`, requestOptions).then(function (response) {
    res.send(response.data);

  }).catch(function (error) {
    res.send(error.message);
  });
});

apiRouter.post('/role', (req, res) => {
  if ((req.body.name === "undefined" || req.body.name === "" || req.body.name === null)
    && (req.body.orgId === "undefined" || req.body.orgId === "" || req.body.orgId === null)) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  axios.post(`${RAPTER_URL}/role`, req.body, requestOptions).then(function (response) {
    res.send(response.data);

  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.put('/role/:id', (req, res) => {
  if (req.params.id === "undefined" || req.params.id === "" || req.params.id === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE_ROLE_ID;
    res.status(500).send(rtnVal);
    return;
  }
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  axios.put(`${RAPTER_URL}/role/` + req.params.id, req.body, requestOptions).then(function (response) {
    res.send(response.data);
    //return response;
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.delete('/role/:id', (req, res) => {
  if (req.params.id === "undefined" || req.params.id === "" || req.params.id === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE_ROLE_ID;
    res.status(500).send(rtnVal);
    return;
  }
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  axios.delete(`${RAPTER_URL}/role/` + req.params.id, requestOptions).then(function (response) {
    res.send(response.data);
    //return response;
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

// menu.
apiRouter.get('/menu', (req, res) => {
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  axios.get(`${RAPTER_URL}/menu`, requestOptions).then(function (response) {
    res.send(response.data);

  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});
// resource.
apiRouter.get('/resource', (req, res) => {
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  axios.get(`${RAPTER_URL}/resource`, requestOptions).then(function (response) {
    res.send(response.data);

  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.get('/bounds', (req, res) => {
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  axios.get(`${RAPTER_URL}/bounds`, req.body, requestOptions).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    res.send(error.message);
  });
});

apiRouter.post('/menu-role-access', (req, res) => { //for fetching all menu role access for a particular tenant/loc/org combination
  // if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
  //   let rtnVal = {}
  //   rtnVal = messages.httpStatus.SERVER_ERROR;
  //   rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
  //   res.status(500).send(rtnVal);
  //   return;
  // }
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  axios.post(`${RAPTER_URL}/bounds`, req.body, requestOptions).then(function (response) {
    let x_rapter_bounds = response.data["x-rapter-bounds"];
    let newConfig = { headers: requestOptions.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    axios.get(`${RAPTER_URL}/menu-role-access`, newConfig).then(function (response) {
      res.send(response.data);
    }).catch(function (error) {
      console.log(error);
      res.send(error.response);
    })
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.post('/resource-role-access', (req, res) => {//for fetching all resource role access for a particular tenant/loc/org combination
  // if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
  //   let rtnVal = {}
  //   rtnVal = messages.httpStatus.SERVER_ERROR;
  //   rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
  //   res.status(500).send(rtnVal);
  //   return;
  // }
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  axios.post(`${RAPTER_URL}/bounds`, req.body, requestOptions).then(function (response) {
    let x_rapter_bounds = response.data["x-rapter-bounds"];
    let newConfig = { headers: requestOptions.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    axios.get(`${RAPTER_URL}/resource-role-access`, newConfig).then(function (response) {
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
  ltoId == null ? null : boundsBody.ltoId = ltoId;
  return boundsBody;
}

let resourceRoleCreate = (roleId, resourceId) => {
  let resourceRoleBody = {};
  resourceRoleBody.roleId = roleId;
  resourceRoleBody.resourceId = resourceId;
  return resourceRoleBody;
}

apiRouter.post('/create-menu-role-access', (req, res) => {//for creating menu role access for a particular tenant/loc/org combination
  if (req.body.menuId === "undefined" || req.body.menuId === "" || req.body.menuId === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  const { tenantId, ttoId, ltoId, roleId, menuId } = req.body;
  console.log(req.body);
  let boundsBody = createBounds(tenantId, ttoId, ltoId);
  axios.post(`${RAPTER_URL}/bounds`, boundsBody, requestOptions).then(function (response) {

    let x_rapter_bounds = response.data["x-rapter-bounds"];
    let newConfig = { headers: requestOptions.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    let menuRoleBody = menuRoleCreate(roleId, menuId);
    axios.post(`${RAPTER_URL}/menu-role-access`, menuRoleBody, newConfig).then(function (response) {
      res.send(response.data);
    })
  }).catch(function (error) {
    console.log(error);
  });
});

apiRouter.post('/delete-menu-role-access/:id', (req, res) => {
  const { tenantId, ttoId, ltoId, insertMenuId } = req.body;
  if ((req.params.id === "undefined" || req.params.id === "" || req.params.id === null) &&
    (insertMenuId === "undefined" || insertMenuId === "" || insertMenuId === null)) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  let boundsBody = createBounds(tenantId, ttoId, ltoId);
  axios.post(`${RAPTER_URL}/bounds`, boundsBody, requestOptions).then(function (response) {

    let x_rapter_bounds = response.data["x-rapter-bounds"];
    let newConfig = { headers: requestOptions.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    axios.delete(`${RAPTER_URL}/menu-role-access` + insertMenuId, newConfig).then(function (response) {
      res.send(response.data);
    })
  }).catch(function (error) {
    console.log(error);
  });
});

apiRouter.post('/create-resource-role-access', (req, res) => {//for creating resource role access for a particular tenant/loc/org combination
  if (req.body.name === "undefined" || req.body.name === "" || req.body.name === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  const { tenantId, ttoId, ltoId, roleId, resourceId } = req.body;
  console.log(req.body);
  let boundsBody = createBounds(tenantId, ttoId, ltoId);
  axios.post(`${RAPTER_URL}/bounds`, boundsBody, requestOptions).then(function (response) {
    let x_rapter_bounds = response.data["x-rapter-bounds"];
    let newConfig = { headers: requestOptions.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    let resourceRoleBody = resourceRoleCreate(roleId, resourceId);
    axios.post(`${RAPTER_URL}/resource-role-access`, resourceRoleBody, newConfig).then(function (response) {
      res.send(response.data);
    })
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.post('/delete-resource-role-access/:id', (req, res) => {
  const { tenantId, ttoId, ltoId, insertResourceId } = req.body;
  if ((req.params.id === "undefined" || req.params.id === "" || req.params.id === null) &&
    (insertResourceId === "undefined" || insertResourceId === "" || insertResourceId === null)) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  let boundsBody = createBounds(tenantId, ttoId, ltoId);
  axios.post(`${RAPTER_URL}/bounds`, boundsBody, requestOptions).then(function (response) {

    let x_rapter_bounds = response.data["x-rapter-bounds"];
    let newConfig = { headers: requestOptions.headers };
    newConfig.headers["x-rapter-bounds"] = x_rapter_bounds;
    axios.delete(`${RAPTER_URL}/resource-role-access` + insertResourceId, newConfig).then(function (response) {
      res.send(response.data);
    })
  }).catch(function (error) {
    console.log(error);
  });
});

apiRouter.get('/enrollment-target', (req, res) => {
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  axios.get(`${RAPTER_URL}/enrollment-target`, requestOptions).then(function (response) {
    res.send(response.data);

  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.post('/create-enrollment-target', (req, res) => {
  if ((req.body.orgId === "undefined" || req.body.orgId === "" || req.body.orgId === null)
    && (req.body.month === "undefined" || req.body.month === "" || req.body.month === null)
    && (req.body.target === "undefined" || req.body.target === "" || req.body.target === null)) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  axios.post(`${RAPTER_URL}/enrollment-target`, req.body, requestOptions).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.put('/enrollment-target/:id', (req, res) => {
  if (req.params.id === "undefined" || req.params.id === "" || req.params.id === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE_ENROLLMENT_TARGET_ID;
    res.status(500).send(rtnVal);
    return;
  }
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  axios.put(`${RAPTER_URL}/enrollment-target/` + req.params.id, req.body, requestOptions).then(function (response) {
    res.send(response.data);
    //return response;
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.delete('/enrollment-target/:id', (req, res) => {
  if (req.params.id === "undefined" || req.params.id === "" || req.params.id === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE_ENROLLMENT_TARGET_ID;
    res.status(500).send(rtnVal);
    return;
  }
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  axios.delete(`${RAPTER_URL}/enrollment-target/` + req.params.id, requestOptions).then(function (response) {
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

apiRouter.post('/ra-config', (req, res) => {//for fetching ra-config for a particular tenant
  if ((req.body.name === "undefined" || req.body.name === "" || req.body.name === null) &&
    (req.body.tenantId === "undefined" || req.body.tenantId === "" || req.body.tenantId === null)) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE;
    res.status(500).send(rtnVal);
    return;
  }
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  axios.get(`${RAPTER_URL}/ra-config?tenantId=` + req.body.tenantId, requestOptions).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);

  });
});

apiRouter.post('/create-ra-config', (req, res) => {//for creating ra-config for a particular tenant
  if (req.body.tenantId === "undefined" || req.body.tenantId === "" || req.body.tenantId === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE_RA_CONFIG_TENANT_ID;
    res.status(500).send(rtnVal);
    return;
  }
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  let { tenantId, description, blockSize, stratum, groups } = req.body;
  let raConfigBody = raConfigCreate(description, blockSize, stratum, groups);
  axios.post(`${RAPTER_URL}/ra-config?tenantId=` + tenantId, raConfigBody, requestOptions).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.put('/ra-config/:id', (req, res) => {
  if ((req.params.id === "undefined" || req.params.id === "" || req.params.id === null) &&
    (req.body.tenantId === "undefined" || req.body.tenantId === "" || req.body.tenantId === null)) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE_RA_CONFIG_ID;
    res.status(500).send(rtnVal);
    return;
  }
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  let { tenantId, description, blockSize, stratum, groups } = req.body;
  let raConfigBody = raConfigCreate(description, blockSize, stratum, groups);
  axios.put(`${RAPTER_URL}/ra-config/` + req.params.id + `?tenantId=` + tenantId, raConfigBody, requestOptions).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.delete('/ra-config/:id', (req, res) => {
  if (req.params.id === "undefined" || req.params.id === "" || req.params.id === null) {
    let rtnVal = {}
    rtnVal = messages.httpStatus.SERVER_ERROR;
    rtnVal.message = messages.COMMON.MANDATORY_FIELDS_MESSAGE_RA_CONFIG_ID;
    res.status(500).send(rtnVal);
    return;
  }
  const requestOptions = {
  
    headers: { 'Content-Type': 'application/json', 'Authorization': "Bearer " + req.token }
    
};
  axios.delete(`${RAPTER_URL}/ra-config/` + req.params.id, requestOptions).then(function (response) {
    res.send(response.data);
  }).catch(function (error) {
    console.log(error);
    res.send(error.response);
  });
});

apiRouter.post('/export-project', (req, res) => {
  console.log(req.body);
  let data = JSON.stringify(req.body);
  fs.writeFileSync('myjsonfile.json', data, function (err) {
    if (err) {
      return console.error(err);
    }
  });
});


apiRouter.get('/import-project', (req, res) => {

  res.set('Content-Type', '');
  res.send(JSON.stringify(allTenantsRead));
})

app.use('/api', apiRouter);
app.use(historyFallback());

if (process.env.NODE_ENV === 'production') {
  const serveStatic = require('serve-static');

  
    app.use(serveStatic('public'));
  
}



const server = http.createServer(app);
server.listen(process.env.PORT || 4000)



