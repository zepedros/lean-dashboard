'use strict'

const DEFAULT_PORT = 8000;

const PORT = process.argv[2] || DEFAULT_PORT;

async function setup() {

    const express = require('express');
    const app = express();
    const bodyParser = require('body-parser');

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}))

    require('dotenv').config({path: "../.env"})

    const authizationDbConfig = {
        "host": process.env.HOST,
        "port": process.env.DB_PORT,
        "user": process.env.DB_USER,
        "password": process.env.DB_PASSWORD,
        "connectionLimit": process.env.DB_CONNECTION_LIMIT,
        "database": process.env.DATABASE,
        "dbms": process.env.DBMS,
    }

    const rbacOptions = {
        roles : ["manager", "admin", "guest", "Colaborator"],
        permissions: [
            { "resource": "lean", "action": "GET" },
            { "resource": "lean", "action": "POST" },
            { "resource": "lean", "action": "PUT" },
            { "resource": "lean", "action": "DELETE" }
        ],

        grants: {
            manager: [
                { "resource": "lean", "action": "GET" },
                { "resource": "lean", "action": "POST" },
                { "resource": "lean", "action": "PUT" },
                { "resource": "lean", "action": "DELETE" }
            ],
            Colaborator: [
                { "resource": "lean", "action": "GET" }
            ]
        }
    }

    const authization = await (require('@authization/authization')
        .setup({app: app, db: authizationDbConfig,rbac_opts: rbacOptions}))
        .catch(err => console.log(`Error setting up Authization Module:\n${err}`))

    const authCreator = require('../auth')

    const auth = authCreator(authization)
    //auth.initialize(app)

    const db = require('./lean-db');
    const etlDb = require('../etl/etl-db')
    const data = require('./lean-data');

    await etlDb.deleteWidgetTemplates()
    await etlDb.createWidgetTemplates()
    const servicesCreator = require('./lean-services');
    const webApiCreator = require('./lean-web-api');

    const scheduler = require('../etl/scheduler/etl-scheduler')
    scheduler.widgetMapBuilder()
    const services = servicesCreator(data, db, auth);
    const webapi = webApiCreator(app, services, auth, authization);

    return app
}


setup().then(app => {
    app.listen(PORT);
    console.log(`Listening at port ${PORT}\nAccess http://localhost:8000/ to start`);
})

