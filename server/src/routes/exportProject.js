'use strict';
let express = require('express');
let router = express.Router();
let logging = require('../utils/logger');
let responseStatus = require('../constants/httpStatus');
let MESSAGE = require('../constants/applicationConstants');
const config = require('../config/config');
let fs = require('fs');

router.get('/dashboard_data/:id', (req, res) => {
  // exporting the particular project.
  let data = JSON.stringify(response);
  fs.writeFile('AllProjects.json', data, 'utf8', function (err) {
    if (err) {
      logging.applogger.error(err);
      res.send(err);
    }
  });
  res.download('/AllProjects.json', "exportedProject_" + req.params.id + ".json");
  fs.unlink('/AllProjects.json', function (err) {
    if (err) throw err;
  })
})



module.exports = router;
