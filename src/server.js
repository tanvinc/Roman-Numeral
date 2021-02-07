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

    try{

        log.info('Request received');
        
        if(Object.keys(req.query).length==1){ // checking if there are more than one query parameters

            let num=req.query.query; // fetching the value from the query parameter

            if(num>=1 && num<=3999){ // validating if the query parameter is within the valid range

                let output= await converter(num); // valid integer sent for further processing

                res.status(200).send({ //successfully processed request
                    input: num,
                    output: output
                });

            } else{
                res.status(422).send({error: 'Input out of bounds or cannot be processed'}); // fails to process negative integers, integers greater than 3999 or less than 1 and alphabetic or special character inputs
                log.error('The input %d is out of bounds', num);
            }
        } else{
            res.status(422).send({error: 'Request parameters cannot be processed'}); // failed to process requests with multiple query parameters
            log.error('More than one parameter found');
        }
    } catch(e) { // block to catch unexpected errors in processing
        res.status(500).send({error: 'Unexpected error'});
        log.error('Unexpected error %d', e);
    }
});


/**
 * Configuring the service to listen on localhost port 8080
 */
app.listen(port, () => {
    log.info('Server is running on port %d', port);
});