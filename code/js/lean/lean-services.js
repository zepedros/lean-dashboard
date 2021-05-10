'use strict';

const error = require('../error')

function services(data, db, auth){

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
                return db.createProject(name,description)
            else{
                throw error.create(
                    error.ARGUMENT_ERROR,
                    'Please give the project a name and a description'
                )
            }
        },
        postDashboardToProject: function(projectId, name, description){
            return db.postDashboardToProject(projectId,name,description)
        },
        postLeanProject: function (name, description, user){
            return db.postLeanProject(name,description,user)
        },
        deleteProject: function (id){
            return db.deleteProject(id)
        },

        createUser: async function (username,password, first_name, last_name) {
            const userExists = await auth.checkUser(username)
            if(userExists) throw error.create(error.CONFLICT, `the username ${username} already exists`)
            return auth.createUser(username,password, first_name, last_name)
        }
    };
}

module.exports = services;
