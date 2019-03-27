'use strict';
let express = require('express');
let router = express.Router();
let logging = require('../utils/logger');
let responseStatus = require('../constants/httpStatus');
let MESSAGE = require('../constants/applicationConstants');
const config = require('../config/config');


router.get('/export-project', (req, res) => {
    try {

        const rtnVal = [1, 2, 3];
        if (rtnVal.length === 0) {
            res.status(204).send(rtnVal);
        } else {
            res.status(200).send(rtnVal);
        }
    } catch (err) {
        logging.applogger.error(err);
        res.status(500).send({ code: error.response.status, status: error.response.statusText, messages: error.response.data.error });
        return;
    };
});

module.exports = router;
