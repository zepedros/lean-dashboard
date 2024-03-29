'use strict';

function webapi(app, services, auth, authization, express) {
    const path = require('path');
    const theWebApi = {

        createProject: function (req, res) {
            const user = req.user
            services.createProject(req.body.name, req.body.description, user.id, req.body.startDate, req.body.endDate)
                .then(resp => {
                    console.log(`Creating project with the name  "${req.body.name}" and the description "${req.body.description}"`)
                    answerHandler(resp, res, 201)
                })
                .catch(err => errHandler(err, res))

        },
        getAllProjects: function (req, res) {
            const alisa = req.headers
            services.getAllProjects(req.user)
                .then(resp => {
                    console.log("Get All Lean Dashboards Projects")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        getProjects: function (req, res) {
            services.getProjects(req.params.user, req.user)
                .then(resp => {
                    console.log("Get Projects")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        getProjectById: function (req, res) {
            services.getProjectById(req.params.id, req.user)
                .then(resp => {
                    console.log("Get Project")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        updateProject: function (req, res) {
            services.updateProject(req.params.id, req.body.name, req.body.description, req.user)
                .then(resp => {
                    console.log(`Updating Project`)
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        changeProjectOwner: function (req, res) {
            services.changeProjectOwner(req.params.id, req.body.newOwner, req.user)
                .then(resp => {
                    console.log(`Updating Project owner`)
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        deleteProject: function (req, res) {
            services.deleteProject(req.params.id, req.user)
                .then(resp => {
                    console.log("Removing Project")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        addDashboardToProject: function (req, res) {
            services.addDashboardToProject(req.params.id, req.body.name, req.body.description, req.user)
                .then(resp => {
                    console.log(`Creating new dashboard`)
                    answerHandler(resp, res, 201)
                })
                .catch(err => errHandler(err, res))
        },

        removeDashboardFromProject: function (req, res) {
            services.removeDashboardFromProject(req.params.id, req.params.dashboardId, req.user)
                .then(resp => {
                    console.log("Removing Dashboard")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        getDashboardById: function (req, res) {
            services.getDashboardById(req.params.id, req.params.dashboardId, req.user)
                .then(resp => {
                    console.log("Get Dashboard")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        getDashboardsFromProject: function (req, res) {
            services.getDashboardsFromProject(req.params.id, req.user)
                .then(resp => {
                    console.log("Get Dashboards")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        updateDashboardFromProject: function (req, res) {
            services.updateDashboardFromProject(req.params.id, req.params.dashboardId, req.body.name, req.body.description, req.user)
                .then(resp => {
                    console.log("Updated Dashboard")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        getWidgetTemplates: function (req, res) {
            services.getWidgetTemplates(req.user)
                .then(resp => {
                    console.log("Get All Templates")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        getWidget: function (req, res) {
            services.getWidget(req.params.id, req.params.dashboardId, req.params.widgetsId)
                .then(resp => {
                    console.log("Get Widget")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        addWidgetToDashboard: function (req, res) {
            services.addWidgetToDashboard(req.params.id, req.params.dashboardId, req.params.widgetsId, req.body.timeSettings, req.body.credentials, req.body.params, req.user)
                .then(resp => {
                    console.log("Add Widget to Dashboard")
                    answerHandler(resp, res,201)
                })
                .catch(err => errHandler(err, res))
        },

        updateWidget: function (req, res) {
            services.updateWidget(req.params.id, req.params.dashboardId, req.params.widgetsId, req.body.timeSettings, req.body.credentials, req.body.params, req.user)
                .then(resp => {
                    console.log("Update Widget")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        removeWidgetFromDashboard: function (req, res) {
            services.removeWidgetFromDashboard(req.params.id, req.params.dashboardId, req.params.widgetsId, req.user)
                .then(resp => {
                    console.log("Remove Widget from Dashboard")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        createUser: function (req, res) {
            services.createUser(req.body.username, req.body.password, req.body.first_name, req.body.last_name)
                .then(resp => answerHandler(resp, res, resp.statusCode))
                .catch(err => errHandler(err, res))
        },

        getAllUsers: function (req, res){
            services.getAllUsers(req.user)
                .then(resp => answerHandler(resp, res, resp.statusCode))
                .catch(err => errHandler(err, res))
        },

        getUserById: function (req, res) {
            services.getUserById(req.params.id, req.user)
                .then(resp => answerHandler(resp, res))
                .catch(err => errHandler(err, res))
        },

        getUserByUsername: function (req, res) {
            services.getUserByUsername(req.params.username,req.user)
                .then(resp => answerHandler(resp, res))
                .catch(err => errHandler(err, res))
        },

        deleteUser: function (req, res) {
            services.deleteUser(req.params.username, req.user)
                .then(resp => answerHandler(resp, res))
                .catch(err => errHandler(err, res))
        },

        editUsername: function (req, res) {
            services.editUsername(req.params.username, req.body.newUsername, req.user)
                .then(resp => answerHandler(resp, res))
                .catch(err => errHandler(err, res))
        },

        editPassword: function (req, res) {
            services.editPassword(req.params.username, req.body.newPassword, req.user)
                .then(resp => answerHandler(resp, res))
                .catch(err => errHandler(err, res))
        },

        logout: async function (req, res) {
            await services.logout(req, res)
        },

        loginLocal: async function (req, res) {
            await services.loginLocal(req, res)
                .then(resp => answerHandler(resp, res))
                .catch(err => errHandler(err, res))
        },

        addUserToProject: function (req, res) {
            services.addUserToProject(req.params.id, req.body.username, req.user)
                .then(resp => {
                    console.log("User added to Project")
                    answerHandler(resp, res, 201)
                })
                .catch(err => errHandler(err, res))
        },

        removeUserFromProject: function (req, res) {
            const user = req.user
            services.removeUserFromProject(req.params.id, req.params.username, user)
                .then(resp => {
                    console.log("User removed from Project")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        getCredentials: function (req, res) {
            services.getCredentials(req.params.id, req.user)
                .then(resp => {
                    console.log("Get Credentials")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        getCredentialsById: function (req, res) {
            services.getCredentialsById(req.params.id, req.params.credentialId, req.user)
                .then(resp => {
                    console.log("Get Credentials by Id")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        addCredential: function (req, res) {
            services.addCredential(req.params.id, req.body.name, req.body.source, req.body.credential, req.user)
                .then(resp => {
                    console.log("Added Credential to Project")
                    answerHandler(resp, res, 201)
                })
                .catch(err => errHandler(err, res))
        },

        deleteCredential: function (req, res) {
            services.deleteCredential(req.params.id, req.params.credentialId, req.user)
                .then(resp => {
                    console.log("Deleted Credential from Project")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        updateCredential: function (req, res) {
            services.updateCredential(req.params.id, req.params.credentialId, req.body.name, req.body.source, req.body.credential, req.user)
                .then(resp => {
                    console.log("Updated Credential in Project")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        giveUserRole: function (req, res) {
            const userMakingRequest = req.user
            const body = req.body
            const username = req.params.username
            services.giveUserRole(username, userMakingRequest, body.role, body.endDate)
                .then(resp => {
                    console.log(`User ${username} was given the role ${body.role}`)
                    answerHandler(resp, res, 201)
                })
                .catch(err => errHandler(err, res))
        },

        getUserRoles: function (req, res) {
            const username = req.params.username
            const userMakingRequest = req.user
            services.getUserRoles(username, userMakingRequest)
                .then(resp => {
                    console.log(`User ${username} has roles ${resp}`)
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        removeRoleFromUser: function (req, res) {
            const userMakingRequest = req.user
            const username = req.params.username
            const role = req.params.role
            services.removeRoleFromUser(username, userMakingRequest, role)
                .then(resp => {
                    console.log(`User ${username} got the role ${role} removed`)
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        }

    };

    app.get('/api/lean/projects', theWebApi.getAllProjects)
    app.get('/api/lean/projects/user/:user', theWebApi.getProjects)
    app.get('/api/lean/projects/:id', theWebApi.getProjectById)

    app.post('/api/lean/projects', theWebApi.createProject)
    app.put('/api/lean/projects/:id', theWebApi.updateProject)
    app.put('/api/lean/projects/:id/owner', theWebApi.changeProjectOwner)
    app.delete('/api/lean/projects/:id', theWebApi.deleteProject)

    app.post('/api/lean/projects/:id/users', theWebApi.addUserToProject)
    app.delete('/api/lean/projects/:id/users/:username', theWebApi.removeUserFromProject)
    app.get('/api/lean/users/:username/roles', theWebApi.getUserRoles)


    app.post('/api/lean/projects/:id/dashboard', theWebApi.addDashboardToProject)
    app.delete('/api/lean/projects/:id/dashboard/:dashboardId', theWebApi.removeDashboardFromProject)
    app.get('/api/lean/projects/:id/dashboards', theWebApi.getDashboardsFromProject)
    app.get('/api/lean/projects/:id/dashboard/:dashboardId', theWebApi.getDashboardById)
    app.put('/api/lean/projects/:id/dashboard/:dashboardId', theWebApi.updateDashboardFromProject)


    app.get('/api/lean/projects/widgets/templates', theWebApi.getWidgetTemplates)
    app.get('/api/lean/projects/:id/dashboard/:dashboardId/widgets/:widgetsId', theWebApi.getWidget)
    app.post('/api/lean/projects/:id/dashboard/:dashboardId/widgets/:widgetsId', theWebApi.addWidgetToDashboard)
    app.delete('/api/lean/projects/:id/dashboard/:dashboardId/widgets/:widgetsId', theWebApi.removeWidgetFromDashboard)
    app.put('/api/lean/projects/:id/dashboard/:dashboardId/widgets/:widgetsId', theWebApi.updateWidget)

    app.get('/api/lean/projects/:id/credentials', theWebApi.getCredentials)
    app.get('/api/lean/projects/:id/credentials/:credentialId', theWebApi.getCredentialsById)
    app.post('/api/lean/projects/:id/credentials', theWebApi.addCredential)
    app.delete('/api/lean/projects/:id/credentials/:credentialId', theWebApi.deleteCredential)
    app.put('/api/lean/projects/:id/credentials/:credentialId', theWebApi.updateCredential)


    app.post('/lean/register', theWebApi.createUser)
    app.get('/api/lean/users/:id', theWebApi.getUserById)
    app.get('/api/lean/users', theWebApi.getAllUsers)
    app.get('/api/lean/users/username/:username', theWebApi.getUserByUsername)
    app.delete('/api/lean/users/:username', theWebApi.deleteUser)
    app.put('/lean/users/:username/username', theWebApi.editUsername)
    app.put('/lean/users/:username/password', theWebApi.editPassword)
    app.post('/lean/login', async (req, res, next) => {
        await authization.authenticate.usingLocal(req, res, err => {
            if (err) {
                const myError = {
                    statusCode: err.status,
                    message: err.message
                }
                errHandler(myError, res)
            }
            next()
        })
    }, theWebApi.loginLocal)
    app.post('/lean/logout', async (req, res, next) => {
        await authization.authenticate.logout(req, res, err => {
            if (err) {
                const myError = {
                    statusCode: err.status,
                    statusMessage: err.message
                }
                errHandler(myError, res)
            }
            next()
        })
    }, theWebApi.logout)
    app.post('/api/lean/users/:username/roles', theWebApi.giveUserRole)
    app.delete('/api/lean/users/:username/roles/:role', theWebApi.removeRoleFromUser)

    if (process.env.NODE_ENV === 'production') {
        app.use(express.static(path.join(__dirname, '../leandashboard-ui/build')));
        app.get('/*', function (req, res) {
            res.sendFile(path.join(__dirname, '../leandashboard-ui/build', 'index.html'));
        })
    }

    return theWebApi;
}

function errHandler(resp, res) {
    console.log(resp)
    if (!resp.statusCode) {
        res.status(400).send({message: "An error occurred"})
    } else {
        res.status(resp.statusCode)
        res.statusMessage = resp.statusMessage
        res.send(resp)
    }
}

function answerHandler(resp, res, statusCode) {
    res.status(statusCode || 200).send(resp);
}

module.exports = webapi
