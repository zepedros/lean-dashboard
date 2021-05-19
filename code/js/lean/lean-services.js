'use strict';

const error = require('../error')


function services(data, db, auth){

    return {

        createProject: function(name, description, user){
            if(name && description)
                return db.createProject(name,description,user)
                    .then(id => {
                        return setReturnUri(201,'lean/projects/',id)
                    })
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
                .then(id => {
                    return setReturnUri(200,'lean/projects/',id)
                })
        },
        deleteProject: function (id){
            return db.deleteProject(id)

        },
        //duvida aqui
        addDashboardToProject: function (projectId, name, description){
            return this.getProjectById(projectId)
                .then(project => {
                    return db.addDashboardToProject(project.id,name,description)
                        .then(dashboardId => {
                            return setReturnUri(201,`/projects/${projectId}/dashboard`,dashboardId)
                        })
                })
        },
        removeDashboardFromProject: function (projectId, dashboardId){
            return db.getProjectById(projectId)
                .then(project => {
                    const dashboardIndex = project.dashboards.findIndex(d => d.id === dashboardId)
                    if(dashboardIndex === -1){
                       throw error.create(error.NOT_FOUND,'Dashboard does not exists')
                    }
                    return db.removeDashboardFromProject(projectId,dashboardIndex)
                })
        },
        createUser: async function (username,password, first_name, last_name) {
            const userExists = await auth.checkUser(username)
            if(userExists) throw error.create(error.CONFLICT, `the username ${username} already exists`)
            return auth.createUser(username,password, first_name, last_name)
        },
    };
}

 function setReturnUri (status, index,id){
     const URI = "http://localhost:8000/"
    return {
        status: status,
        body: URI.concat(index).concat(id)
    }
}

module.exports = services;
