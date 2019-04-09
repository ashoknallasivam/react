let express = require('express');
let cors = require('cors');
let historyFallback = require('connect-history-api-fallback');
let bearerToken = require('express-bearer-token');
let cookieParser = require('cookie-parser');
let config = require('./config/config');
let tenantService = require('./routes/tenant');
let organizationService = require('./routes/organization');
let roleService = require('./routes/role');
let menuService = require('./routes/menu');
let resourceService = require('./routes/resource');
let menuRoleAccessService = require('./routes/menuRoleAccess');
let resourceRoleAccessService = require('./routes/resourceRoleAccess');
let raConfigService = require('./routes/raConfig');
let enrollementTargetService = require('./routes/enrollmentTarget');
let loginService = require('./routes/login');
let dashBoardService = require('./routes/dashboard');
let publishProjectService = require('./routes/publishProject');
let pageService = require('./routes/page');
let boundService = require('./routes/bounds');
let userService = require('./routes/user');


/**
* Module dependencies.
*/
let debug = require('debug')('MPR:server');
let http = require('http');


let app = express();
app.use(cors());
/**
* Normalize a port into a number, string, or false.
*/

function normalizePort(val) {
  let port = parseInt(val, 10);
  if (isNaN(port)) {
    // named pipe
    return val;
  }
  if (port >= 0) {
    // port number
    return port;
  }
  return false;
}

/**
* Get port from config and store in Express.
*/
let port = normalizePort(process.env.PORT || config.APPLICATION_PORT);

app.set('port', port);

/**
* Create HTTP server.
*/
let server = http.createServer(app);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({
  limit: '50mb',
  extended: true
}));
app.use(bearerToken());
app.use(cookieParser());
app.use('/', loginService);
app.use('/', tenantService);
app.use('/', organizationService);
app.use('/', roleService);
app.use('/', menuService);
app.use('/', resourceService);
app.use('/', menuRoleAccessService);
app.use('/', resourceRoleAccessService);
app.use('/', raConfigService);
app.use('/', enrollementTargetService);
app.use('/', dashBoardService);
app.use('/', publishProjectService);
app.use('/', pageService);
app.use('/', boundService);
app.use('/', userService);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', false);

  // Pass to next layer of middleware
  next();
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
});

/**
* Event listener for HTTP server "error" event.
*/
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }


  let bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;


  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}


/**
* Event listener for HTTP server "listening" event.
*/

function onListening() {
  let addr = server.address();
  let bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
  console.log("localhost:" + port);
}

/**
* Listen on provided port, on all network interfaces.
*/
server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

app.use(historyFallback());


if (process.env.NODE_ENV === 'production') {
  const serveStatic = require('serve-static');

  
    app.use(serveStatic('public'));
  
}

module.exports = app;