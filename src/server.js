'use strict';

const express=require('express');
const app=express();
const port=8080;
const log=require('./logger');

app.listen(port, () => {
    log.info('Server is running on port %d', port);
});