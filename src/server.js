'use strict';

const express=require('express');
const app=express();
const port=8080;
const log=require('./logger');

/**
 * Handling GET requests for roman numerals
 */
app.get('/romannumeral', async function (req, res) {

    log.info('Request received');
    
    let num=req.query.query; // fetching the value from the query parameter

    if(num>=1 && num<=3999){ // validating if the query parameter is within the valid range
        res.status(200).send({
            input: num,
            message: 'Hello'
        });
    } else{
        res.status(422).send('Integer out of bounds');
        log.error('The input %d is out of bounds', num);
    }
});


/**
 * Configuring the service to listen on localhost port 8080
 */
app.listen(port, () => {
    log.info('Server is running on port %d', port);
});