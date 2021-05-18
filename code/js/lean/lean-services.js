'use strict';

const error = require('../error')

function services(data, db, auth){

    return {

        createProject: function(name, description, user){
            if(name && description)
                return db.createProject(name,description,user)
            else{
                throw error.create(
                    error.ARGUMENT_ERROR,
                    'Please give the project a name and a description'
                )
            }
        },
        getAllProjects:function (){
            return db.getAllProjects()
        },
        getProjects: async function (user) {
            return db.getProjects(user)
        },
        getProjectById: async function (id) {
            return db.getProjectById(id)
        },
        updateProject:function(projectId, newName,newDesc){
            return db.updateProject(projectId,newName,newDesc)
        },
        deleteProject: function (id){
            return db.deleteProject(id)
        },
        addDashboardToProject: function (projectId, name, description){
            return db.addDashboardToProject(projectId,name,description)
        },
        removeDashboardFromProject: function (projectId, dashboardId){
            return db.getProjectById(projectId)
                .then(project => {
                    const dashboardIndex = project.dashboards.findIndex(d => d.id === dashboardId)
                    return db.removeDashboardFromProject(projectId,dashboardIndex)
                })
        },
        createUser: async function (username,password, first_name, last_name) {
            const userExists = await auth.checkUser(username)
            if(userExists) throw error.create(error.CONFLICT, `the username ${username} already exists`)
            return auth.createUser(username,password, first_name, last_name)
        }
    };
}

module.exports = services;
