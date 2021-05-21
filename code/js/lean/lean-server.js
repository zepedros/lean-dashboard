'use strict'

const DEFAULT_PORT = 8000;

const PORT = process.argv[2] || DEFAULT_PORT;

async function setup() {

    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))

    /*const authizationDbConfig = {
        "host": "localhost",
        "port": 5432,
        "user": "postgres",
        "password": "1234",
        "connectionLimit": 5,
        "database": "authization",
        "dbms": "postgres"
    }

    const authization = await (require('@authization/authization').setup({app, db: authizationDbConfig}))

    const authCreator = require('../auth')

    const auth = authCreator(authization)
    //auth.initialize(app)
*/
    const db = require('./lean-db');
    const etlDb = require('../etl/etl-db')
    const data = require('./lean-data');

    await etlDb.createWidgetTemplates()
    const servicesCreator = require('./lean-services');
    const webApiCreator = require('./lean-web-api');

    const services = servicesCreator(data, db, auth);
    const webapi = webApiCreator(app, services, auth, authization);

    return app
}


setup().then(app => {
    app.listen(PORT);
    console.log(`Listening at port ${PORT}\nAccess http://localhost:8000/ to start`);
})

