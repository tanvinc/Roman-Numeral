'use strict';

const express=require('express');
const app=express();
const port=8080;
const log=require('./logger');

/**
 * Handling GET requests for roman numerals
 */
app.get('/romannumeral', async function(req, res) {

    log.info('Request received');
    
    let num=req.query.query;

    res.status(200).send({
        input: num,
        message: 'Hello'
    });
});


/**
 * Configuring the service to listen on localhost port 8080
 */
app.listen(port, () => {
    log.info('Server is running on port %d', port);
});