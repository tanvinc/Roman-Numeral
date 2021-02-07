## Roman-Numeral
This service generates roman numerals from integer input in the range 1-3999.
It follows the Standard representation of the Roman Numerals described [here](https://en.wikipedia.org/wiki/Roman_numerals) where:
```json
1 --> I
4 --> IV (5 - 1)
5 --> V
9 --> IX (10 - 1)
10 --> X
40 --> XL (50 - 10)
50 --> L
90 --> XC (100 - 90)
100 --> C
400 --> CD (500 - 100)
500 --> D
900 --> CM (1000 - 100)
1000 --> M
```

The input is accepted in the form of query parameters. 
A GET request of the format http://localhost:8080/romannumeral?query={Integer} will receive the response in the form of a JSON payload - 
```json
{
    "input": "{Integer}",
    "output": "{roman representation of the integer}"
}
```

This service uses the following external libraries:
 - **bunyan** - this is used for logging [Bunyan reference](https://www.npmjs.com/package/bunyan)
 - **datadog-metrics** - used for pushing metrics to datadog [Datadog Metrics reference](https://www.npmjs.com/package/datadog-metrics)
 - **dotenv** - for setting up the project environment and to configure the DATADOG_API_KEY used for metrics
 - **express** - used for handling http requests [Express reference](https://expressjs.com/en/api.html)

 Dev dependencies used for formatting and testing:
 - **chai**, **mocha** - used for testing
 - **eslint** - used for formatting and linting

### Steps to build and run

#### Running locally
In order to run the project locally, follow these steps:
- Clone this repository
  The source code of this project is under the /src directory. 
  The /src/test directories has a file test.js that contains all the unit tests for the convert.js module.
- Create a .env file with the following variables at root level/ level similar to the Dockerfile:
    - DATADOG_API_KEY : Your datadog API key can be obtained [here](https://app.datadoghq.com/account/settings#api) under API Keys
    - PORT : Can be any value, in the current context it would be 8080
    - ENV : The environment in which your service is running (values can arbitrary strings eg. prod, dev, test, etc.)
- Run `npm install` in the project's directory or run the following commands:
    - npm install bunyan
    - npm install dotenv
    - npm install express
    - npm install datadog-metrics
- In order check for linting errors run `npm run lint`. to quickly fix msot of those errors run `npm run lint-fix`
- In order to run the unit tests run `npm test`
- Finally run `npm start` to run the service locally
- Your server is ready to receive requests on http://localhost:8080/romannumeral

#### Building the container
In order to build this project, after cloning the repository, follow these steps:
- Add your API to the variable the `DATADOG_API_KEY=<YOUR_API_KEY>` or pass it in from a secret file to keep it obfuscated
- Add the value of the variable `ENV=<YOUR_ENV>` to specify the enviornment your container will run in
- If you want to avoid the first two steps entirely, add a .env file as described in the steps to run locally above and change the `COPY src ./src` command on the Dockerfile to `COPY . ./`
- Once the env variables are set up, run `docker build -t <image_name_tag> Roman-Numeral/` from one directory level above the cloned repository
- The docker build takes care of lint check and unit tests. If any breaking changes are made to the project in the future, the unit tests will fail and so will the image build, if the functionality doesn't work as expected.
- Finally when the image is built, run `docker run -p 8080:8080 <image_name_tag>` to start your container
- Your container is ready to receive requests on http://localhost:8080/romannumeral

#### Testing the service
While this service includes unit tests under the /src/test folder, end-to-end tests for this service have been performed using [Postman](https://learning.postman.com/docs/getting-started/introduction/)

#### Logging and Metrics
- This service logs INFO and ERROR logs to stdout. These logs can be pushed to a file if needed by changing the stream type on the bunyan logger instance.
- This service generates the following metrics:
  - Number of requests received - This will help evaluate the overall traffic
  - Number of successfully processed requests
  - Number of failed requests
  These two metrics above will help to gauge potential down time on the service, eg. if the service receives 10,000 requests per min and there have been 0 successes or failures over 5-15 mins it can be a good trigger for paging on-call support
  - Types of response codes (this is to fetch counts per response code) - This can help to analyze the overall statistics on various requests
