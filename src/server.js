'use strict';

const express=require('express');
const app=express();
const port=8080;
const log=require('./logger');
const converter=require('./convert');

/**
 * Handling GET requests for roman numerals
 */
app.get('/romannumeral', async function (req, res) {

    log.info('Request received');
    
    let num=req.query.query; // fetching the value from the query parameter

    if(num>=1 && num<=3999){ // validating if the query parameter is within the valid range

        let output= await converter(num);

        res.status(200).send({
            input: num,
            output: output
        });

    } else{
        res.status(422).send({error: 'Input out of bounds or cannot be processed'});
        log.error('The input %d is out of bounds', num);
    }
});


/**
 * Configuring the service to listen on localhost port 8080
 */
app.listen(port, () => {
    log.info('Server is running on port %d', port);
});