'use strict';

const express=require('express');
const app=express();
const port=process.env.PORT;
const log=require('./logger');
const converter=require('./convert');
const metrics = require('datadog-metrics'); // the service uses a datadog agent configured using a datadog API key to push metrics to Datadog
let env= process.env.ENV;
metrics.init({ host: '127.0.0.1', prefix: 'roman-numeral.' }); // initializing metrics for localhost, prefixed with name of the service

/**
 * Handling GET requests for roman numerals and generating metrics
 * Metrics being pushed to datadog:
 *  - Number of requests received
 *  - Number of successfully processed requests
 *  - Number of failed requests
 *  - Types of response codes (this is to fetch counts per response code)
 */
app.get('/romannumeral', async function (req, res) {

    try{

        log.info('Request received');
        metrics.increment('requests_received',  1, [`env:${env}`]);
        
        if(Object.keys(req.query).length==1){ // checking if there are more than one query parameters

            let num=req.query.query; // fetching the value from the query parameter

            if(num>=1 && num<=3999){ // validating if the query parameter is within the valid range

                let output= await converter(num); // valid integer sent for further processing

                res.status(200).send({ //successfully processed request
                    input: num,
                    output: output
                });

                metrics.increment('responsecodes', 1, ['status_code:200',  `env:${env}`]); // this metric keeps track of response codes
                metrics.increment('successful_requests', 1, [`env:${env}`]); // this metric keeps track of successfully process requests

            } else{
                res.status(422).send({error: 'Input out of bounds or cannot be processed'}); // fails to process negative integers, integers greater than 3999 or less than 1 and alphabetic or special character inputs
                log.error('The input %d is out of bounds', num);
                
                metrics.increment('responsecodes', 1, ['status_code:422',  `env:${env}`]);
                metrics.increment('failed_requests', 1, [`env:${env}`]); // this metric keeps track of failed requests
            }
        } else{
            res.status(422).send({error: 'Request parameters cannot be processed'}); // failed to process requests with multiple query parameters
            log.error('More than one parameter found');
            
            metrics.increment('responsecodes', 1, ['status_code:422',  `env:${env}`]);
            metrics.increment('failed_requests', 1, [`env:${env}`]);
        }
    } catch(e) { // block to catch unexpected errors in processing
        res.status(500).send({error: 'Unexpected error'});
        log.error('Unexpected error %d', e);
        
        metrics.increment('responsecodes', 1, ['status_code:500',  `env:${env}`]);
        metrics.increment('failed_requests', 1, [`env:${env}`]);
    }
});


/**
 * Configuring the service to listen on localhost port 8080
 */
app.listen(port, () => {
    log.info('Server is running on port %d', port);
});