'use strict';

const error = require('../error')
const response = require('../responses')
const scheduler = require('../etl/scheduler/etl-scheduler')
//a map with all the scheduled jobs so that they can be stopped and deleted or reconfigured

function services(data, db, auth){

    return {

        createProject: function(name, description, userId){
            if(name && description)
                return db.createProject(name,description,userId)
                    .then(id => {
                        return response.create(response.CREATED,`${id}`)
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
                        return response.create(response.OK,`${id}`)
                })
        },
        deleteProject: function (id){
            return db.deleteProject(id)
                .then(() => {return response.create(response.OK,"")})

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
                                return response.create(201, `${projectId}/dashboard/${dashboardId}`)
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
                            response.create(response.OK,`${projectId}`)
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
                            return response.create(response.OK,`${projectId}/dashboard/${id}`)
                        })
                })
        },
        getWidgetTemplates: function (){
            return db.getWidgetTemplates()
        },

        //check if projectId and dashboardId
        getWidget: function (projectId,dashboardId,widgetId){
            return db.getWidget(widgetId)
        },

        addWidgetToDashboard:function (projectId,dashboardId,templateId,timeSettings,credentials) {
            return db.addWidgetToDashboard(dashboardId, templateId, timeSettings, credentials)
                .then(createdId => {
                    scheduler.scheduleWidget(createdId, true)
                    return response.create(response.OK, `${projectId}/dashboard/`, dashboardId)
                })

        },

        updateWidget: function (projectId,dashboardId,widgetId,timeSettings,credentials){
            return db.updateWidget(widgetId,timeSettings,credentials)
                .then(()=>{
                    scheduler.reSchedule(widgetId)
                    return response.create(response.OK,`${projectId}/dashboard/${dashboardId}`)
                })
        },
        removeWidgetFromDashboard: function (projectId,dashboardId,widgetId){
            return db.removeWidgetFromDashboard(projectId,dashboardId,widgetId)
                .then(dashboardId => {
                    scheduler.deleteJob(widgetId)
                    return response.create(response.OK,`${projectId}/dashboard/${dashboardId}`)
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
        },

        addUserToProject: async function (projectId, usernameToAdd, userMakingRequest){
            if (!usernameToAdd){
                throw error.create(error.ARGUMENT_ERROR, "Please indicate the username of the user to be added to the project")
            }
            const userToAddInfo = await auth.getUserByUsername(usernameToAdd)
            if (userToAddInfo){
                const project = await db.getProjectById(projectId)

                if (project.owner !== userMakingRequest.id && userMakingRequest.username !== "superuser") throw error.create(error.FORBIDDEN, "User doesn't have access to this project")
                if (project.members.includes(userToAddInfo.id)) throw error.create(error.CONFLICT, "User already belongs to project")

                return db.addUserToProject(projectId, userToAddInfo.id)
                    .then(res => {
                        return response.create(response.CREATED, `${res}`)
                    })

            } else {
                throw error.create(error.NOT_FOUND, "User doesn't exist")
            }
        },

        removeUserFromProject: async function(projectId, usernameToRemove, userMakingRequest){
            if (!usernameToRemove){
                throw error.create(error.ARGUMENT_ERROR, "Please indicate the username of the user to be removed from the project")
            }

            const userToRemoveInfo = await auth.getUserByUsername(usernameToRemove)
            if (userToRemoveInfo){
                const project = await db.getProjectById(projectId)

                if (project.owner !== userMakingRequest.id && userMakingRequest.username !== "superuser") throw error.create(error.FORBIDDEN, "User doesn't have access to this project")

                const index = project.members.indexOf(userToRemoveInfo.id);
                if (index === -1) {
                    throw error.create(error.CONFLICT, "User doesn't belong to project")
                }

                return db.removeUserFromProject(projectId, index)
                    .then(res => {
                        return response.create(response.OK, `${res}`)
                    })

            } else {
                throw error.create(error.NOT_FOUND, "User doesn't exist")
            }
        },
        addCredential: function (projectId,credentialName,credentialSource,credentials) {
            switch (credentialSource) {
                case "Jira" : checkJIRACredentials(credentials); break;
                case "Azure" : checkAZURECredentials(credentials); break;
                case "Squash" : checkSQUASHCredentials(credentials); break;
            }
            return db.addCredential(projectId,credentialName,credentialSource,credentials)
        },
        getCredentials: function (projectId) {
            return db.getCredentials(projectId)
        },
        getCredentialsById: function (projectId, credentialId) {
            return db.getCredentialsById(projectId, credentialId)
        },
        deleteCredential: function (projectId, credentialId) {
            return db.deleteCredential(projectId,credentialId)
        }
    };
}

module.exports = services;

function checkJIRACredentials(credentials) {
    if(credentials.email === undefined || credentials.email == "")
        throw new Error("Email credential not defined or empty")
    if(credentials.token === undefined || credentials.token == "")
        throw new Error("Token credential not defined or empty")
    if(credentials.APIPath === undefined || credentials.APIPath == "")
        throw new Error("APIPath credential not defined or empty")
    if(credentials.APIVersion === undefined || credentials.APIVersion == "")
        throw new Error("APIVersion credential not defined or empty")
    const split = credentials.APIPath.split('.')
    if(split.length !== 3 || split[1] !== 'atlassian') throw new Error("APIPath incorrect for JIRA")
    if(credentials.APIVersion < 2 || credentials.APIVersion > 3)
        throw new Error("Invalid API Version")
}

function checkAZURECredentials(credentials) {
    if(credentials.email === undefined || credentials.email == "")
        throw new Error("Email credential not defined or empty")
    if(credentials.token === undefined || credentials.token == "")
        throw new Error("Token credential not defined or empty")
    if(credentials.Instance === undefined || credentials.Instance == "")
        throw new Error("Instance credential not defined or empty")
    if(credentials.APIPath === undefined || credentials.APIPath == "")
        throw new Error("APIPath credential not defined or empty")
}

function checkSQUASHCredentials(credentials) {
    if(credentials.username === undefined || credentials.username == "")
        throw new Error("Username credential not defined or empty")
    if(credentials.password === undefined || credentials.password == "")
        throw new Error("Password credential not defined or empty")
    if(credentials.APIPath === undefined || credentials.APIPath == "")
        throw new Error("APIPath credential not defined or empty")
}