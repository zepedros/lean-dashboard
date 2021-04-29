'use strict';

const mock = require('./mock-db')
const error = require('../error')

function services(data, db){

    return {

        getIssues: async function () {
            return db.getIssues()
            //return mock.getIssues()
        },
        getIssuesById: async function (id) {
            return db.getIssuesById(id)
        },
        getProjects: async function () {
            return db.getProjects()
        },
        getProjectById: async function (id) {
            return db.getProjectById(id)
        },
        createProject: async function(name, description) {
            if(name && description)
                return mock.createProject(name,description)
            else{
                throw error.create(
                    error.ARGUMENT_ERROR,
                    'Please give the project a name and a description'
                )
            }
        }
    };
}

module.exports = services;
