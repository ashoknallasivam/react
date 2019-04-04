let bunyan = require('bunyan');
let RotatingFileStream = require('bunyan-rotating-file-stream');

let applogger = bunyan.createLogger({
    name: 'RapterAdmin',
    streams: [     
        {
            stream: new RotatingFileStream({
                level: 'info',
                path: './log/applogging.log',
                period: '1d',          // daily rotation
                totalFiles: 10,        // keep 10 back copies
                rotateExisting: true,  // Give ourselves a clean file when we start up, based on period
                threshold: '10m',      // Rotate log files larger than 10 megabytes
                totalSize: '20m',      // Don't keep more than 20mb of archived log files
                gzip: true             // Compress the archive log files to save space
            })
        }
    ]
});

module.exports.applogger =  applogger;

