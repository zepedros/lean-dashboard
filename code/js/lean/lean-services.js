'use strict';

const mock = require('./mock-db')

function services(data, db){

    return {

        getIssues: async function () {
            //return db.getIssues()
            return mock.getIssues()
        },
        getIssuesById: async function (id) {
            return db.getIssuesById(id)
        },
        getProjects: async function () {
            return db.getProjects()
        },

        getProjectById: async function (id) {
            return db.getProjectById(id)
        }
    };
}

module.exports = services;
