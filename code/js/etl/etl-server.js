'use strict'

const DEFAULT_PORT = 8000;

const PORT = process.argv[2] || DEFAULT_PORT;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

//const auth = require('../auth')
//auth.initialize(app)

const db = require('./etl-db');

const azureData = require('./data/etl-azure-data.js')
const jiraData = require('./data/etl-jira-data.js')
const squashData = require('./data/etl-squash-data.js')

const servicesCreator = require('./etl-services.js');
const webApiCreator = require('./etl-web-api.js');

const services = servicesCreator(azureData,jiraData,squashData, db);
const webapi = webApiCreator(app, services);

app.use(express.static('../client/dist'));

app.listen(PORT);
console.log(`Listening at port ${PORT}\nAccess http://localhost:8000/leanDashboard to start`);
