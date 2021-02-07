'use strict';

const bunyan=require('bunyan');

/**
 * Creating a logger for the service
 */
module.exports = bunyan.createLogger({
    name: 'intRoman',
    streams: [
      {
        level: 'info',
        stream: process.stdout
      }
    ]
  });