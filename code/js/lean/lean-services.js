'use strict';

const error = require('../error')
const response = require('../responses')
const scheduler = require('../etl/scheduler/etl-scheduler')
//a map with all the scheduled jobs so that they can be stopped and deleted or reconfigured

function services(db, auth){

    return {

        createProject: function(name, description, userId){
            if(name && description)
                return db.createProject(name,description,userId)
                    .then(id => {
                        return response.makePostResponse(response.CREATED,`${id}`)
                    })
            else{
                return Promise.reject(error.makeErrorResponse(
                    error.ARGUMENT_ERROR,
                    'Please give the project a name and a description'
                ))
            }
        },
        getAllProjects:function (){
            return db.getAllProjects()
        },
        getProjects: async function (user, userMakingRequest) {
            if (user !== userMakingRequest.username && userMakingRequest.id !== 1)
                throw error.makeErrorResponse(error.FORBIDDEN, "You can't access this user's projects")
            return db.getProjects(user, userMakingRequest)
        },
        getProjectById: async function (id, userMakingRequest) {
            const project = await db.getProjectById(id)
            if(project.owner !== userMakingRequest.id && project.members.indexOf(userMakingRequest.id) === -1 && userMakingRequest.id !== 1){
                throw error.makeErrorResponse(error.FORBIDDEN, "This user doesn't have access to this project")
            }
            return project
        },
        updateProject: async function(projectId, newName,newDesc, userMakingRequest){
            //check if user has access to this project. If not, error is thrown
            return this.getProjectById(projectId, userMakingRequest)
                .then(project => {
                    //check if the user making request is the owner or superuser
                    if (project.owner !== userMakingRequest.id && userMakingRequest.id !== 1){
                        return Promise.reject(
                            error.makeErrorResponse(error.FORBIDDEN,'You cannot modify this project. Only the manager has that access.')
                        )
                    }

                    //check parameters
                    if(!projectId){
                        return Promise.reject(
                            error.makeErrorResponse(error.ARGUMENT_ERROR,'Please insert a project ID')
                        )
                    }
                    //we know only send an error if the body has no name AND description, because we can just update one of them at a time
                    if(!newName && !newDesc){
                        return Promise.reject(
                            error.makeErrorResponse(
                                error.ARGUMENT_ERROR,
                                'Please insert a new name and description to update a project'
                            )
                        )
                    }

                    return db.updateProject(projectId,newName,newDesc)
                        .then(id => {
                            //if update is successful, return a new OK response
                            return response.makePostResponse(response.OK,`${id}`)
                        })
                })
        },
        deleteProject: function (id, userMakingRequest){
            return this.getProjectById(id, userMakingRequest)
                .then(project => {
                    if (project.owner !== userMakingRequest.id && userMakingRequest.id !== 1){
                        return Promise.reject(
                            error.makeErrorResponse(error.FORBIDDEN,'You cannot delete this project. Only the manager has that access.')
                        )
                    }
                    //check parameters
                    if(!id){
                        return Promise.reject(
                            error.makeErrorResponse(error.ARGUMENT_ERROR,'Please insert a project ID')
                        )
                    }
                    return db.deleteProject(id)
                        .then(() => {return response.makePostResponse(response.OK,"")})
                })
        },

        addDashboardToProject: function (projectId, name, description){
            if(!name){
                return Promise.reject(
                    error.makeErrorResponse(
                        400,
                        'Bad Request, please insert valid parameter'
                    )
                )
            }

            return this.getProjectById(projectId)
                    .then(project => {
                        return db.addDashboardToProject(project.id, name, description)
                            .then(dashboardId => {
                                return response.makePostResponse(201, `${projectId}/dashboard/${dashboardId}`)
                            })
                    })

        },
        removeDashboardFromProject: function (projectId, dashboardId){
            if(!projectId){
                return Promise.reject(
                    error.makeErrorResponse(
                        error.ARGUMENT_ERROR,
                        'Please indicate a valid project ID'
                    )
                )
            }
            return db.getProjectById(projectId)
                .then(project => {
                    const dashboardIndex = project.dashboards.findIndex(d => d === dashboardId)
                    if(dashboardIndex === -1){
                        return Promise.reject(error.makeErrorResponse(error.NOT_FOUND,'Dashboard does not exists'))
                    }
                    return db.removeDashboardFromProject(projectId,dashboardId,dashboardIndex)
                        .then(() => {
                            response.makePostResponse(response.OK,`${projectId}`)
                        })
                })
        },

        getDashboardFromProject: function(projectId,dashboardId){
            if(!projectId){
                return Promise.reject(
                    error.makeErrorResponse(
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
                    error.makeErrorResponse(error.ARGUMENT_ERROR,'Please insert a valid parameter')
                )
            }
            if(!newName || !newDesc){
                return Promise.reject(
                    error.makeErrorResponse(
                        error.ARGUMENT_ERROR,
                        'Please insert a new name and description to update a dashboard'
                    )
                )
            }
            return db.getProjectById(projectId)
                .then(() => {
                    return db.updateDashboardFromProject(dashobardId,newName,newDesc)
                        .then(id => {
                            return response.makePostResponse(response.OK,`${projectId}/dashboard/${id}`)
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
            return db.addWidgetToDashboard(projectId,dashboardId, templateId, timeSettings, credentials)
                .then(createdId => {
                    scheduler.scheduleWidget(createdId, true)
                    return response.makePostResponse(response.OK, `${projectId}/dashboard/`, dashboardId)
                })
        },

        updateWidget: function (projectId,dashboardId,widgetId,timeSettings,credentials){
            return db.updateWidget(projectId,widgetId,timeSettings,credentials)
                .then(()=>{
                    scheduler.reSchedule(widgetId)
                    return response.makePostResponse(response.OK,`${projectId}/dashboard/${dashboardId}`)
                })
        },
        removeWidgetFromDashboard: function (projectId,dashboardId,widgetId){
            return db.removeWidgetFromDashboard(projectId,dashboardId,widgetId)
                .then(dashboardId => {
                    scheduler.deleteJob(widgetId)
                    return response.makePostResponse(response.OK,`${projectId}/dashboard/${dashboardId}`)
                })
        },
        createUser: async function (username,password, first_name, last_name) {
            return await auth.createUser(username, password)
        },

        loginLocal: async function(req, res){
            return await auth.loginLocal(req, res)
        },

        logout: async function(req, res){
            return await auth.logout(req, res)
        },

        addUserToProject: async function (projectId, usernameToAdd, userMakingRequest){
            if (!usernameToAdd) throw error.makeErrorResponse(error.ARGUMENT_ERROR, "Please indicate the username of the user to be added to the project")


            const userToAddInfo = await auth.getUserByUsername(usernameToAdd)
            if (!userToAddInfo) throw error.makeErrorResponse(error.NOT_FOUND, "User doesn't exist")
            const project = await db.getProjectById(projectId)

            if (project.owner !== userMakingRequest.id && userMakingRequest.username !== "superuser") throw error.makeErrorResponse(error.FORBIDDEN, "User doesn't have access to this project")
            if (project.members.includes(userToAddInfo.id)) throw error.makeErrorResponse(error.CONFLICT, "User already belongs to project")

            return db.addUserToProject(projectId, userToAddInfo.id)
                .then(res => {
                    return response.makePostResponse(response.CREATED, `${res}`)
                })
                .catch(err => err)
        },

        removeUserFromProject: async function(projectId, usernameToRemove, userMakingRequest){
            if (!usernameToRemove) throw error.makeErrorResponse(error.ARGUMENT_ERROR, "Please indicate the username of the user to be removed from the project")



            const userToRemoveInfo = await auth.getUserByUsername(usernameToRemove)
            if(!userToRemoveInfo)  throw error.makeErrorResponse(error.NOT_FOUND, "User doesn't exist")
            const project = await db.getProjectById(projectId)

            if (project.owner !== userMakingRequest.id && userMakingRequest.username !== "superuser") throw error.makeErrorResponse(error.FORBIDDEN, "User doesn't have access to this project")

            const index = project.members.indexOf(userToRemoveInfo.id);
            if (index === -1) {
                throw error.makeErrorResponse(error.CONFLICT, "User doesn't belong to project")
            }

            return db.removeUserFromProject(projectId, index)
                .then(res => {
                    return response.makePostResponse(response.OK, `${res}`)
                })
                .catch(err => err)
        },

        giveUserRole: async function(usernameToGiveRole, userMakingRequest,role, endDate){
            //verify if a role was given in the body
            if (!role ) throw error.makeErrorResponse(error.ARGUMENT_ERROR, "Please indicate in the body a role to give to the user")

            //get the user info, to get the id and verify if exists
            const userToGiveRoleInfo = await auth.getUserByUsername(usernameToGiveRole)

            if(!userToGiveRoleInfo) throw error.makeErrorResponse(error.NOT_FOUND, "User to be give a role doesn't exist")

            //get role info for id
            const roleInfo = await auth.getRoleByName(role)

            //end date is either give, or null (null = no end date)
            const formattedEndDate = endDate? new Date(endDate) : null

            return await auth.giveUserRole(userToGiveRoleInfo, roleInfo, new Date(), formattedEndDate, userMakingRequest)
        },

        removeRoleFromUser: async function(usernameToRemoveRole, userMakingRequest,role){
            //verify if a role was given in the body
            if (!role) throw error.makeErrorResponse(error.ARGUMENT_ERROR, "Please indicate in the body a role to give to the user")

            //get the user info, to get the id and verify if exists
            const userToGiveRoleInfo = await auth.getUserByUsername(usernameToRemoveRole)

            if(!userToGiveRoleInfo) throw error.makeErrorResponse(error.NOT_FOUND, "User to be give a role doesn't exist")

            //get role info for id
            const roleInfo = await auth.getRoleByName(role)

            if (roleInfo.role === 'manager'){
                const projects = db.getProjects(usernameToRemoveRole.username)
                console.log(projects)
            }

            return await auth.removeRoleFromUser(userToGiveRoleInfo, roleInfo)

        },

        addCredential: function (projectId,credentialName,credentialSource,credentials) {
            try {
                checkCredentials(credentialSource,credentials)
            } catch (ex) {
                return Promise.reject(ex)
            }
            return db.addCredential(projectId,credentialName,credentialSource,credentials)
                .then(credentialId => {
                    return response.makePostResponse(200, `${projectId}/credentials/${credentialId}`)
                })
                .catch(err => {
                    throw err
                })
        },
        getCredentials: function (projectId) {
            return db.getCredentials(projectId)
        },
        getCredentialsById: function (projectId, credentialId) {
            return db.getCredentialsById(projectId, credentialId)
        },
        deleteCredential: function (projectId, credentialId) {
            return db.deleteCredential(projectId,credentialId)
                .then(credId => {
                    return response.makePostResponse(201, `${projectId}/credentials/${credId}`)
                })
        },
        updateCredential : function (projectId, credentialId,credentialName,credentialSource,credentials) {
            try {
                checkCredentials(credentialSource,credentials)
            } catch (ex) {
                return Promise.reject(ex)
            }
            return db.updateCredential(projectId, credentialId,credentialName,credentialSource,credentials)
        }
    };
}

module.exports = services;

function checkCredentials(credentialSource,credentials) {
    switch (credentialSource) {
        case "Jira" : checkJIRACredentials(credentials); break;
        case "Azure" : checkAZURECredentials(credentials); break;
        case "Squash" : checkSQUASHCredentials(credentials); break;
        default : throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Wrong source')
    }
}

function checkJIRACredentials(credentials) {
    if(credentials === undefined ||
        (credentials.email === undefined || credentials.email === "") ||
        (credentials.token === undefined || credentials.token === "") ||
        (credentials.APIPath === undefined || credentials.APIPath === "") ||
        (credentials.APIVersion === undefined || credentials.APIVersion === ""))
        throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Wrong or empty credentials')
}

function checkAZURECredentials(credentials) {
    if(credentials === undefined || (credentials.email === undefined || credentials.email === "")
        || (credentials.token === undefined || credentials.token === "") ||
        (credentials.Instance === undefined || credentials.Instance === ""))
        throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Wrong or empty credentials')
}

function checkSQUASHCredentials(credentials) {
    if(credentials === undefined || (credentials.username === undefined || credentials.username === "")
        || (credentials.password === undefined || credentials.password === "") ||
        (credentials.APIPath === undefined || credentials.APIPath === ""))
        throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Wrong or empty credentials')
}