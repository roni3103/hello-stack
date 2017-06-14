'use strict';

let bunyan = require('bunyan');
let log = bunyan.createLogger({name: 'apilog'});

module.exports = log;
