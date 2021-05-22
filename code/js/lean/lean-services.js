'use strict';

const error = require('../error')
const response = require('../responses')


function services(data, db, auth){

    return {

        createProject: function(name, description, user){
            if(name && description)
                return db.createProject(name,description,user)
                    .then(id => {
                        return response.create(response.CREATED,'lean/projects/',id)
                    })
            else{
                return Promise.reject(error.create(
                    error.ARGUMENT_ERROR,
                    'Please give the project a name and a description'
                ))
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
            if(!projectId){
                return Promise.reject(
                    error.create(error.ARGUMENT_ERROR,'Please insert a project ID')
                )
            }
            if(!newName || !newDesc){
                return Promise.reject(
                    error.create(
                        error.ARGUMENT_ERROR,
                        'Please insert a new name and description to update a project'
                    )
                )
            }
            return db.updateProject(projectId,newName,newDesc)
                    .then(id => {
                        return response.create(response.OK,'lean/projects/',id)
                })
        },
        deleteProject: function (id){
            return db.deleteProject(id)
                .then(() => {return response.create(response.OK,'lean/projects/','')})

        },

        addDashboardToProject: function (projectId, name, description){
            if(!name){
                return Promise.reject(
                    error.create(
                        400,
                        'Bad Request, please insert valid parameter'
                    )
                )
            }

            return this.getProjectById(projectId)
                    .then(project => {
                        return db.addDashboardToProject(project.id, name, description)
                            .then(dashboardId => {
                                return response.create(201, `lean/projects/${projectId}/dashboard/`, dashboardId)
                            })
                    })

        },
        removeDashboardFromProject: function (projectId, dashboardId){
            if(!projectId){
                return Promise.reject(
                    error.create(
                        error.ARGUMENT_ERROR,
                        'Please indicate a valid project ID'
                    )
                )
            }
            return db.getProjectById(projectId)
                .then(project => {
                    const dashboardIndex = project.dashboards.findIndex(d => d === dashboardId)
                    if(dashboardIndex === -1){
                        return Promise.reject(error.create(error.NOT_FOUND,'Dashboard does not exists'))
                    }
                    return db.removeDashboardFromProject(projectId,dashboardId,dashboardIndex)
                        .then(() => {
                            response.create(response.OK,`lean/projects/`,projectId)
                        })
                })
        },

        getDashboardFromProject: function(projectId,dashboardId){
            if(!projectId){
                return Promise.reject(
                    error.create(
                        error.ARGUMENT_ERROR,
                        'Please indicate a valid project ID'
                    )
                )
            }
            return db.getProjectById(projectId)
                .then(project => {return db.getDashboardFromProject(projectId,dashboardId)})
        },
        updateDashboardFromProject: function (projectId, dashobardId,newName,newDesc){
            if(!projectId || !dashobardId){
                return Promise.reject(
                    error.create(error.ARGUMENT_ERROR,'Please insert a valid parameter')
                )
            }
            if(!newName || !newDesc){
                return Promise.reject(
                    error.create(
                        error.ARGUMENT_ERROR,
                        'Please insert a new name and description to update a dashboard'
                    )
                )
            }
            return db.getProjectById(projectId)
                .then(() => {
                    return db.updateDashboardFromProject(dashobardId,newName,newDesc)
                        .then(id => {
                            return response.create(response.OK,`lean/projects/${projectId}/dashboard/`,id)
                        })
                })
        },
        getWidgetTemplates: function (){
            return db.getWidgetTemplates()
        },
        addWidgetToDashboard:function (projectId,dashboardId,widgetId,timeSettings,credentials){
            return db.addWidgetToDashboard(dashboardId,widgetId,timeSettings,credentials)
                .then(dashboardId => {
                    return response.create(response.OK,`lean/projects/${projectId}/dashboard/`,dashboardId)
                })

        },
        removeWidgetFromDashboard: function (projectId,dashboardId,widgetId){
            return db.removeWidgetFromDashboard(projectId,dashboardId,widgetId)
                .then(dashboardId => {
                    return response.create(response.OK,`lean/projects/${projectId}/dashboard/`,dashboardId)
                })
        },
        createUser: async function (username,password, first_name, last_name) {
            /*const userExists = await auth.checkUser(username)
            if(userExists) throw error.create(error.CONFLICT, `the username ${username} already exists`)

            return auth.createUser(username,password, first_name, last_name)
        },
    };
}


module.exports = services;
            return auth.createUser(username,password, first_name, last_name)*/
            return await auth.createUser(username, password)
        },

        loginLocal: async function(req, res){
            return await auth.loginLocal(req, res)
        },

        logout: async function(req, res){
            return await auth.logout(req, res)
        }
    };
}

module.exports = services;

