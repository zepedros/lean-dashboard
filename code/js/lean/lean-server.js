'use strict'

const DEFAULT_PORT = 8000;

const PORT = process.argv[2] || DEFAULT_PORT;

const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

const auth = require('../auth')
auth.initialize(app)

const db = require('./lean-db');
const data = require('./lean-data');

const servicesCreator = require('./lean-services');
const webApiCreator = require('./lean-web-api');

const services = servicesCreator(data, db, auth);
const webapi = webApiCreator(app, services, auth);

app.listen(PORT);
console.log(`Listening at port ${PORT}\nAccess http://localhost:8000/lean/issues to start`);
