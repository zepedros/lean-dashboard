'use strict';

const error = require('../error')
const response = require('../responses')
const scheduler = require('../etl/scheduler/etl-scheduler')

//a map with all the scheduled jobs so that they can be stopped and deleted or reconfigured

function services(db, auth) {

    return {

        createProject: function (name, description, userId, startDate, endDate) {
            if (name && description && startDate && endDate) {
                //end date is either give, or null (null = no end date)
                const formattedStartDate = startDate ? new Date(startDate) : null
                const formattedEndDate = endDate ? new Date(endDate) : null

                //massive verification. checks if start date is prior to end;
                // if the end date is prior to the current date;
                // formattedStartDate.getTime() !== formattedStartDate.getTime() checks if the dates are valid and not random string passed in the body
                if (formattedEndDate < formattedStartDate || formattedEndDate < new Date() || formattedStartDate.getTime() !== formattedStartDate.getTime() || formattedEndDate.getTime() !== formattedEndDate.getTime()) {
                    return Promise.reject(error.makeErrorResponse(
                        error.ARGUMENT_ERROR,
                        'Please enter the correct start and end dates for the project. Make sure the start date is prior to the end date and that the end date is prior to the current date'
                    ))
                }
                return db.createProject(name, description, userId, formattedStartDate, formattedEndDate)
                    .then(id => {
                        return response.makePostResponse(response.CREATED, `${id}`)
                    })
            } else {
                return Promise.reject(error.makeErrorResponse(
                    error.ARGUMENT_ERROR,
                    'Please give the project a name, a description and a start and end date for the project'
                ))
            }
        },
        getAllProjects: function () {
            return db.getAllProjects()
        },
        getProjects: async function (user, userMakingRequest) {
            if (user !== userMakingRequest.username && userMakingRequest.id !== 1)
                throw error.makeErrorResponse(error.FORBIDDEN, "You can't access this user's projects")
            return db.getProjects(user, userMakingRequest)
        },


        //CODIGO DO ZE, TODO USERMAKINGREQUEST NOS OUTROS METODOS QUE CHAMAM ESTE NO SERVICES

        getProjectById: async function (id, userMakingRequest) {
            const project = await db.getProjectById(id)
            if (project.owner !== userMakingRequest.id && project.members.indexOf(userMakingRequest.id) === -1 && userMakingRequest.id !== 1) {
                throw error.makeErrorResponse(error.FORBIDDEN, "This user doesn't have access to this project")
            }
            return project
        },

        /*
        getProjectById: async function (id) {
            return db.getProjectById(id)
        },*/
        updateProject: async function (projectId, newName, newDesc, userMakingRequest) {
            //check parameters
            if (!projectId) {
                return Promise.reject(
                    error.makeErrorResponse(error.ARGUMENT_ERROR, 'Please insert a project ID')
                )
            }
            //we know only send an error if the body has no name AND description, because we can just update one of them at a time
            if (!newName && !newDesc) {
                return Promise.reject(
                    error.makeErrorResponse(
                        error.ARGUMENT_ERROR,
                        'Please insert a new name and description to update a project'
                    )
                )
            }

            //check if user has access to this project. If not, error is thrown
            return this.getProjectById(projectId, userMakingRequest)
                .then(project => {
                    //check if the user making request is the owner or superuser
                    if (project.owner !== userMakingRequest.id && userMakingRequest.id !== 1) {
                        return Promise.reject(
                            error.makeErrorResponse(error.FORBIDDEN, 'You cannot modify this project. Only the manager has that access.')
                        )
                    }

                    return db.updateProject(projectId, newName, newDesc)
                        .then(id => {
                            //if update is successful, return a new OK response
                            return response.makePostResponse(response.OK, `${id}`)
                        })
                })
        },

        changeProjectOwner: async function (projectId, newOwner, userMakingRequest) {
            //check parameters
            if (!projectId) {
                return Promise.reject(error.makeErrorResponse(error.ARGUMENT_ERROR, 'Please insert a project ID'))
            }
            //we know only send an error if the body has no name AND description, because we can just update one of them at a time
            if (!newOwner) {
                return Promise.reject(error.makeErrorResponse(error.ARGUMENT_ERROR, 'Please insert a new name and description to update a project'))
            }
            //check if the user making request is the owner or superuser
            if (userMakingRequest.id !== 1) {
                return Promise.reject(error.makeErrorResponse(error.FORBIDDEN, `You cannot modify this project's owner . Only the superuser has that access.`))
            }

            //check if the user exists by retrieving information and then check if the user is a manager
            const newOwnerInfo = await auth.getUserByUsername(newOwner)
            if (!await auth.checkIfUserHasRole(newOwnerInfo, "manager") && !await auth.checkIfUserHasRole(newOwnerInfo, "admin")) {
                return Promise.reject(error.makeErrorResponse(error.FORBIDDEN, `This user can't be a project owner because it doesn't have manager permissions`))
            }
            return this.getProjectById(projectId, userMakingRequest)
                .then(project => {
                    return db.changeProjectOwner(projectId, newOwnerInfo)
                        .then(id => {
                            //if update is successful, return a new OK response
                            return response.makePostResponse(response.OK, `${id}`)
                        })
                })
        },

        deleteProject: function (id, userMakingRequest) {
            //check parameters
            if (!id) {
                return Promise.reject(
                    error.makeErrorResponse(error.ARGUMENT_ERROR, 'Please insert a project ID')
                )
            }
            return this.getProjectById(id, userMakingRequest)
                .then(project => {
                    if (project.owner !== userMakingRequest.id && userMakingRequest.id !== 1) {
                        return Promise.reject(
                            error.makeErrorResponse(error.FORBIDDEN, 'You cannot delete this project. Only the manager has that access.')
                        )
                    }
                    return db.deleteProject(id)
                        .then(() => {
                            return response.makePostResponse(response.OK, "")
                        })
                })
        },

        addDashboardToProject: function (projectId, name, description, userMakingRequest) {
            if (!name || !description) {
                return Promise.reject(
                    error.makeErrorResponse(
                        400,
                        'Please add a name and a description to the body'
                    )
                )
            }
            return this.getProjectById(projectId, userMakingRequest)
                .then(project => {
                    if (project.owner !== userMakingRequest.id && userMakingRequest.id !== 1) {
                        return Promise.reject(
                            error.makeErrorResponse(error.FORBIDDEN, 'You cannot add a dashboard to this project. Only the manager has that access.')
                        )
                    }
                    return db.addDashboardToProject(project.id, name, description)
                        .then(dashboardId => {
                            return response.makePostResponse(201, `${projectId}/dashboard/${dashboardId}`)
                        })
                })

        },
        removeDashboardFromProject: function (projectId, dashboardId, userMakingRequest) {

            if (!projectId) {
                return Promise.reject(
                    error.makeErrorResponse(
                        error.ARGUMENT_ERROR,
                        'Please indicate a valid project ID'
                    )
                )
            }
            if (!dashboardId) {
                return Promise.reject(
                    error.makeErrorResponse(
                        error.ARGUMENT_ERROR,
                        'Please indicate a valid dashboard ID'
                    )
                )
            }

            return this.getProjectById(projectId, userMakingRequest)
                .then(project => {
                    if (project.owner !== userMakingRequest.id && userMakingRequest.id !== 1) {
                        return Promise.reject(
                            error.makeErrorResponse(error.FORBIDDEN, 'You cannot remove a dashboard from this project. Only the manager has that access.')
                        )
                    }
                    const dashboardIndex = project.dashboards.findIndex(d => d === dashboardId)
                    if (dashboardIndex === -1) {
                        return Promise.reject(error.makeErrorResponse(error.NOT_FOUND, 'Dashboard does not exists'))
                    }
                    return db.removeDashboardFromProject(projectId, dashboardId, dashboardIndex)
                        .then(() => {
                            return response.makeResponse(response.OK, 'Dashboard was removed successfully')
                        })
                })
        },

        getDashboardFromProject: function (projectId, dashboardId, userMakingRequest) {
            if (!projectId) {
                return Promise.reject(
                    error.makeErrorResponse(
                        error.ARGUMENT_ERROR,
                        'Please indicate a valid project ID'
                    )
                )
            }
            return db.getProjectById(projectId, userMakingRequest)
                .then(project => {
                    if (project.owner !== userMakingRequest.id || project.members.includes(userMakingRequest.id, 0) && userMakingRequest.id !== 1) {
                        return Promise.reject(
                            error.makeErrorResponse(error.FORBIDDEN, 'You cannot access dashboards from this project. Only the manager and team members have that access.')
                        )
                    }
                    return db.getDashboardsFromProject(project)
                })
        },

        getDashboardsFromProject: function (projectId, userMakingRequest) {
            if (!projectId) {
                return Promise.reject(
                    error.makeErrorResponse(
                        error.ARGUMENT_ERROR,
                        'Please indicate a valid project ID'
                    )
                )
            }
            return db.getProjectById(projectId, userMakingRequest)
                .then(project => {
                    if (project.owner !== userMakingRequest.id && userMakingRequest.id !== 1) {
                        return Promise.reject(
                            error.makeErrorResponse(error.FORBIDDEN, 'You cannot access dashboards from this project. Only the manager and team members have that access.')
                        )
                    }
                    return db.getDashboardsFromProject(project)
                })
        },
        updateDashboardFromProject: function (projectId, dashboardId, newName, newDesc, userMakingRequest) {
            if (!projectId || !dashboardId) {
                return Promise.reject(
                    error.makeErrorResponse(error.ARGUMENT_ERROR, 'Please insert both a project and dashboard ID')
                )
            }
            if (!newName && !newDesc) {
                return Promise.reject(
                    error.makeErrorResponse(
                        error.ARGUMENT_ERROR,
                        'Please insert a new name and/or description to update the dashboard'
                    )
                )
            }
            return db.getProjectById(projectId, userMakingRequest)
                .then(project => {
                    if (project.owner !== userMakingRequest.id && userMakingRequest.id !== 1) {
                        return Promise.reject(
                            error.makeErrorResponse(error.FORBIDDEN, 'You cannot update dashboards from this project. Only the manager has that access.')
                        )
                    }
                    return db.updateDashboardFromProject(dashboardId, newName, newDesc)
                        .then(id => {
                            return response.makePostResponse(response.OK, `${projectId}/dashboard/${id}`)
                        })
                })
        },
        getWidgetTemplates: async function (userMakingRequest) {
            if (userMakingRequest.id === 1 || await auth.checkIfUserHasRole(userMakingRequest, "manager")) {
                return db.getWidgetTemplates()
            } else {
                return Promise.reject(
                    error.makeErrorResponse(error.FORBIDDEN, 'You cannot access widget templates. Only the manager has that access.')
                )
            }
        },

        //check if projectId and dashboardId
        getWidget: function (projectId, dashboardId, widgetId) {
            return db.getWidget(widgetId)
        },

        addWidgetToDashboard: function (projectId, dashboardId, templateId, timeSettings, credentials, userMakingRequest) {
            if (!projectId || !dashboardId || !templateId)
                return Promise.reject(
                    error.makeErrorResponse(error.ARGUMENT_ERROR, 'Please indicate an ID for the project, dashboard and widget template in the path')
                )
            if (!timeSettings || !credentials)
                return Promise.reject(
                    error.makeErrorResponse(error.ARGUMENT_ERROR, 'Please indicate the refresh settings and the credentials in the body of the request')
                )
            return db.getProjectById(projectId, userMakingRequest)
                .then(project => {
                    if (project.owner !== userMakingRequest.id && userMakingRequest.id !== 1) {
                        return Promise.reject(
                            error.makeErrorResponse(error.FORBIDDEN, 'You cannot update dashboards from this project. Only the manager has that access.')
                        )
                    }
                    return db.addWidgetToDashboard(projectId, dashboardId, templateId, timeSettings, credentials)
                        .then(createdId => {
                            scheduler.scheduleWidget(createdId, true)
                            return response.makePostResponse(response.CREATED, `${projectId}/dashboard/`, dashboardId)
                        })
                })
        },

        updateWidget: function (projectId, dashboardId, widgetId, timeSettings, credentials, userMakingRequest) {
            if (!projectId || !dashboardId || !widgetId)
                return Promise.reject(
                    error.makeErrorResponse(error.ARGUMENT_ERROR, 'Please indicate an ID for the project, dashboard and widget in the path')
                )

            //TODO Allow user to giver either time settings or credentials. not both
            if (!timeSettings || !credentials)
                return Promise.reject(
                    error.makeErrorResponse(error.ARGUMENT_ERROR, 'Please indicate the refresh settings or the type credentials you wish to update in the body of the request')
                )
            return db.getProjectById(projectId, userMakingRequest)
                .then(project => {
                    if (project.owner !== userMakingRequest.id && userMakingRequest.id !== 1) {
                        return Promise.reject(
                            error.makeErrorResponse(error.FORBIDDEN, 'You cannot update dashboards from this project. Only the manager has that access.')
                        )
                    }
                    return db.updateWidget(projectId, widgetId, timeSettings, credentials)
                        .then(() => {
                            scheduler.reSchedule(widgetId)
                            return response.makePostResponse(response.OK, `${projectId}/dashboard/${dashboardId}`)
                        })
                })
        },
        removeWidgetFromDashboard: function (projectId, dashboardId, widgetId, userMakingRequest) {
            return db.getProjectById(projectId, userMakingRequest)
                .then(project => {
                    if (project.owner !== userMakingRequest.id && userMakingRequest.id !== 1) {
                        return Promise.reject(
                            error.makeErrorResponse(error.FORBIDDEN, 'You cannot remove dashboards from this project. Only the manager has that access.')
                        )
                    }
                    return db.removeWidgetFromDashboard(projectId, dashboardId, widgetId)
                        .then(dashboardId => {
                            scheduler.deleteJob(widgetId)
                            return response.makePostResponse(response.OK, `${projectId}/dashboard/${dashboardId}`)
                        })
                })
        },
        createUser: async function (username, password, first_name, last_name) {
            return await auth.createUser(username, password)
        },

        getUserById: async function(userId, userMakingRequest){
            if (!userMakingRequest) return Promise.reject((error.makeErrorResponse(error.UNAUTHORIZED, "You are not logged in")))
            return await auth.getUserById(userId)
        },

        deleteUser: async function (userToDelete, userMakingRequest) {
            //For now, only the super user can delete accounts
            if (userMakingRequest.id !== 1) {
                return Promise.reject((error.makeErrorResponse(error.FORBIDDEN, "You can't delete this user's account")))
            }
            const userToDeleteInfo = await auth.getUserByUsername(userToDelete)
            const userIsManager = await auth.checkIfUserHasRole(userToDeleteInfo, 'manager')
            return await this.getProjects(userToDelete, userToDeleteInfo)
                .then(projects => {
                    projects.forEach(project => this.removeUserFromProject(project.id, userToDelete, userMakingRequest))
                    if (userIsManager) {
                        projects
                            .filter(project => project.owner === userToDeleteInfo.id)
                            .forEach(project => {
                                this.changeProjectOwner(project.id, 'superuser', userMakingRequest)
                            })
                    }
                    return auth.deleteUser(userToDeleteInfo)
                })

        },

        editUsername: async function (username, newUsername, userMakingRequest) {
            if (!userMakingRequest) {
                return Promise.reject(
                    error.makeErrorResponse(error.FORBIDDEN, 'Error. The user is not authenticated')
                )
            }

            if (!newUsername) {
                return Promise.reject(
                    error.makeErrorResponse(error.ARGUMENT_ERROR, 'Please indicate a new username')
                )
            }

            if (userMakingRequest.username !== username && userMakingRequest.id !== 1) {
                return Promise.reject(
                    error.makeErrorResponse(error.FORBIDDEN, 'You cannot edit this users information.')
                )
            }

            const userToEdit = await auth.getUserByUsername(username)
            return await auth.editUsername(newUsername, userToEdit, userMakingRequest)
        },

        editPassword: async function (username, newPassword, userMakingRequest) {
            if (!userMakingRequest) {
                return Promise.reject(
                    error.makeErrorResponse(error.FORBIDDEN, 'Error. The user is not authenticated')
                )
            }

            if (!newPassword) {
                return Promise.reject(
                    error.makeErrorResponse(error.ARGUMENT_ERROR, 'Please indicate a new password')
                )
            }

            if (userMakingRequest.username !== username && userMakingRequest.id !== 1) {
                return Promise.reject(
                    error.makeErrorResponse(error.FORBIDDEN, 'You cannot edit this users information.')
                )
            }

            const userToEdit = await auth.getUserByUsername(username)
            return await auth.editPassword(newPassword, userToEdit)
        },

        loginLocal: async function (req, res) {
            return await auth.loginLocal(req, res)
        },

        logout: async function (req, res) {
            return await auth.logout(req, res)
        },

        addUserToProject: async function (projectId, usernameToAdd, userMakingRequest) {
            if (!usernameToAdd) throw error.makeErrorResponse(error.ARGUMENT_ERROR, "Please indicate the username of the user to be added to the project")


            const userToAddInfo = await auth.getUserByUsername(usernameToAdd)
            if (!userToAddInfo) throw error.makeErrorResponse(error.NOT_FOUND, "User doesn't exist")
            const project = await db.getProjectById(projectId, userMakingRequest)

            if (project.owner !== userMakingRequest.id && userMakingRequest.username !== "superuser") throw error.makeErrorResponse(error.FORBIDDEN, "User doesn't have access to this project")
            if (project.members.includes(userToAddInfo.id)) throw error.makeErrorResponse(error.CONFLICT, "User already belongs to project")

            return db.addUserToProject(projectId, userToAddInfo.id)
                .then(res => {
                    return response.makePostResponse(response.CREATED, `${res}`)
                })
                .catch(err => err)
        },

        removeUserFromProject: async function (projectId, usernameToRemove, userMakingRequest) {
            if (!usernameToRemove) throw error.makeErrorResponse(error.ARGUMENT_ERROR, "Please indicate the username of the user to be removed from the project")


            const userToRemoveInfo = await auth.getUserByUsername(usernameToRemove)
            if (!userToRemoveInfo) throw error.makeErrorResponse(error.NOT_FOUND, "User doesn't exist")
            const project = await db.getProjectById(projectId, userMakingRequest)

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


        giveUserRole: async function (usernameToGiveRole, userMakingRequest, role, endDate) {
            //verify if a role was given in the body
            if (!role) throw error.makeErrorResponse(error.ARGUMENT_ERROR, "Please indicate in the body a role to give to the user")

            //get the user info, to get the id and verify if exists
            const userToGiveRoleInfo = await auth.getUserByUsername(usernameToGiveRole)

            if (!userToGiveRoleInfo) throw error.makeErrorResponse(error.NOT_FOUND, "User to be give a role doesn't exist")

            //get role info for id
            const roleInfo = await auth.getRoleByName(role)

            //end date is either give, or null (null = no end date)
            const formattedEndDate = endDate ? new Date(endDate) : null

            return await auth.giveUserRole(userToGiveRoleInfo, roleInfo, new Date(), formattedEndDate, userMakingRequest)
        },

        removeRoleFromUser: async function (usernameToRemoveRole, userMakingRequest, role) {
            //verify if a role was given in the body
            if (!role) throw error.makeErrorResponse(error.ARGUMENT_ERROR, "Please indicate in the body a role to give to the user")

            //get the user info, to get the id and verify if exists
            const userToGiveRoleInfo = await auth.getUserByUsername(usernameToRemoveRole)

            if (!userToGiveRoleInfo) throw error.makeErrorResponse(error.NOT_FOUND, "User to be give a role doesn't exist")

            //get role info for id
            const roleInfo = await auth.getRoleByName(role)

            /*
            if (roleInfo.role === 'manager') {
                const projects = db.getProjects(usernameToRemoveRole.username)
                console.log(projects)
            }*/

            return await auth.removeRoleFromUser(userToGiveRoleInfo, roleInfo)

        },

        addCredential: function (projectId, credentialName, credentialSource, credentials, userMakingRequest) {
            try {
                checkCredentials(credentialSource, credentials)
            } catch (ex) {
                return Promise.reject(ex)
            }
            return db.getProjectById(projectId, userMakingRequest)
                .then(project => {
                    if (project.owner !== userMakingRequest.id && userMakingRequest.id !== 1) {
                        return Promise.reject(
                            error.makeErrorResponse(error.FORBIDDEN, 'You cannot add credentials to this project. Only the manager has that access.')
                        )
                    }
                    return db.addCredential(projectId, credentialName, credentialSource, credentials)
                        .then(credentialId => {
                            return response.makePostResponse(200, `${projectId}/credentials/${credentialId}`)
                        })
                        .catch(err => {
                            throw err
                        })
                })
        },
        getCredentials: function (projectId, userMakingRequest) {
            return db.getProjectById(projectId, userMakingRequest)
                .then(project => {
                    if (project.owner !== userMakingRequest.id && userMakingRequest.id !== 1) {
                        return Promise.reject(
                            error.makeErrorResponse(error.FORBIDDEN, 'You cannot get this projects credentials. Only the manager has that access.')
                        )
                    }
                    return db.getCredentials(projectId)
                })
        },
        getCredentialsById: function (projectId, credentialId, userMakingRequest) {
            return db.getProjectById(projectId, userMakingRequest)
                .then(project => {
                    if (project.owner !== userMakingRequest.id && userMakingRequest.id !== 1) {
                        return Promise.reject(
                            error.makeErrorResponse(error.FORBIDDEN, 'You cannot get this projects credentials. Only the manager has that access.')
                        )
                    }
                    return db.getCredentialsById(projectId, credentialId)
                })
        },
        deleteCredential: function (projectId, credentialId, userMakingRequest) {
            return db.getProjectById(projectId, userMakingRequest)
                .then(project => {
                    if (project.owner !== userMakingRequest.id && userMakingRequest.id !== 1) {
                        return Promise.reject(
                            error.makeErrorResponse(error.FORBIDDEN, 'You cannot delete this projects credentials. Only the manager has that access.')
                        )
                    }
                    return db.deleteCredential(projectId, credentialId)
                        .then(credId => {
                            return response.makePostResponse(200, `${projectId}/credentials/${credId}`)
                        })
                })
        },
        updateCredential: function (projectId, credentialId, credentialName, credentialSource, credentials, userMakingRequest) {
            try {
                checkCredentials(credentialSource, credentials)
            } catch (ex) {
                return Promise.reject(ex)
            }
            return db.getProjectById(projectId, userMakingRequest)
                .then(project => {
                    if (project.owner !== userMakingRequest.id && userMakingRequest.id !== 1) {
                        return Promise.reject(
                            error.makeErrorResponse(error.FORBIDDEN, 'You cannot update this projects credentials. Only the manager has that access.')
                        )
                    }
                    return db.updateCredential(projectId, credentialId, credentialName, credentialSource, credentials)
                })
        },
        getUserRoles: function (username, userMakingRequest) {
            if (userMakingRequest.username == username) {
                return auth.getUserRoles(userMakingRequest)
            }
            return Promise.reject('User does not have access to this request')
        }
    };
}

module.exports = services;

function checkCredentials(credentialSource, credentials) {
    switch (credentialSource) {
        case "Jira" :
            checkJIRACredentials(credentials);
            break;
        case "Azure" :
            checkAZURECredentials(credentials);
            break;
        case "Squash" :
            checkSQUASHCredentials(credentials);
            break;
        default :
            throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Wrong source')
    }
}

function checkJIRACredentials(credentials) {
    if (credentials === undefined ||
        (credentials.email === undefined || credentials.email === "") ||
        (credentials.token === undefined || credentials.token === "") ||
        (credentials.APIPath === undefined || credentials.APIPath === "") ||
        (credentials.APIVersion === undefined || credentials.APIVersion === ""))
        throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Wrong or empty credentials')
}

function checkAZURECredentials(credentials) {
    if (credentials === undefined || (credentials.email === undefined || credentials.email === "")
        || (credentials.token === undefined || credentials.token === "") ||
        (credentials.Instance === undefined || credentials.Instance === ""))
        throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Wrong or empty credentials')
}

function checkSQUASHCredentials(credentials) {
    if (credentials === undefined || (credentials.username === undefined || credentials.username === "")
        || (credentials.password === undefined || credentials.password === "") ||
        (credentials.APIPath === undefined || credentials.APIPath === ""))
        throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Wrong or empty credentials')
}