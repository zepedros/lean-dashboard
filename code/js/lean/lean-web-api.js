'use strict';

function webapi(app, services, auth, authization) {

    const theWebApi = {

        createProject: function (req, res) {
            services.createProject(req.body.name, req.body.description, req.user.username)
                .then(resp => {
                    console.log(`Creating project with the name  "${req.body.name}" and the description "${req.body.description}"`)
                    answerHandler(resp, res, 201)
                })
                .catch(err => errHandler(err, res))

        },
        getAllProjects: function (req, res) {
            services.getAllProjects()
                .then(resp => {
                    console.log("Get All Lean Dashboards Projects")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        getProjects: function (req, res) {
            services.getProjects(req.params.user)
                .then(resp => {
                    console.log("Get Projects")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        getProjectById: function (req, res) {
            services.getProjectById(req.params.id)
                .then(resp => {
                    console.log("Get Project")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        updateProject: function (req, res) {
            services.updateProject(req.params.id, req.body.name, req.body.description)
                .then(resp => {
                    console.log(`Updating Project`)
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        addDashboardToProject: function (req, res) {
            services.addDashboardToProject(req.params.id, req.body.name, req.body.description)
                .then(resp => {
                    console.log(`Creating new dashboard`)
                    answerHandler(resp, res, 201)
                })
                .catch(err => errHandler(err, res))
        },
        deleteProject: function (req, res) {
            services.deleteProject(req.params.id)
                .then(resp => {
                    console.log("Removing Project")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        removeDashboardFromProject: function (req, res) {
            services.removeDashboardFromProject(req.params.id, req.params.dashboardId)
                .then(resp => {
                    console.log("Removing Dashboard")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        getDashboardFromProject: function (req, res) {
            services.getDashboardFromProject(req.params.id, req.params.dashboardId)
                .then(resp => {
                    console.log("Get Dashboard")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        updateDashboardFromProject: function (req, res) {
            services.updateDashboardFromProject(req.params.id, req.params.dashboardId, req.body.name, req.body.description)
                .then(resp => {
                    console.log("Updating Dashboard")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        getWidgetTemplates: function (req, res) {
            services.getWidgetTemplates()
                .then(resp => {
                    console.log("Get All Templates")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        addWidgetToDashboard: function (req, res) {
            services.addWidgetToDashboard(req.params.id, req.params.dashboardId, req.params.widgetsId, req.body.timeSettings, req.body.credentials)
                .then(resp => {
                    console.log("Add Widget to Dashboard")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        updateWidget: function(req,res){
            services.updateWidget(req.params.id, req.params.dashboardId, req.params.widgetsId, req.body.timeSettings, req.body.credentials)
                .then(resp => {
                    console.log("Update Widget")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        removeWidgetFromDashboard: function (req, res) {
            services.removeWidgetFromDashboard(req.params.id, req.params.dashboardId, req.params.widgetsId)
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

        logout: async function (req, res) {
            await services.logout(req, res)
        },

        loginLocal: async function (req, res) {
            await services.loginLocal(req, res)
        },

        addUserToProject: function (req, res){
            services.addUserToProject(req.params.id, req.body.username, req.user.username)
                .then(resp => {
                    console.log("User added to Project")
                    answerHandler(resp, res,201)
                })
                .catch(err => errHandler(err, res))
        },

        removeUserFromProject: function (req, res){
            services.removeUserFromProject(req.params.id, req.params.username, req.user.username)
                .then(resp => {
                    console.log("User removed from Project")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        giveUserRole: function (req, res){

        }
    };

    app.get('/api/lean/projects', theWebApi.getAllProjects)
    app.get('/api/lean/projects/user/:user', theWebApi.getProjects)
    app.get('/api/lean/projects/:id', theWebApi.getProjectById)

    app.post('/api/lean/projects', theWebApi.createProject)
    app.put('/api/lean/projects/:id', theWebApi.updateProject)
    app.delete('/api/lean/projects/:id', theWebApi.deleteProject)

    app.post('/api/lean/projects/:id/users', theWebApi.addUserToProject)
    app.delete('/api/lean/projects/:id/users/:username', theWebApi.removeUserFromProject)


    app.post('/api/lean/projects/:id/dashboard', theWebApi.addDashboardToProject)
    app.delete('/api/lean/projects/:id/dashboard/:dashboardId', theWebApi.removeDashboardFromProject)
    app.get('/api/lean/projects/:id/dashboard/:dashboardId', theWebApi.getDashboardFromProject)
    app.put('/api/lean/projects/:id/dashboard/:dashboardId', theWebApi.updateDashboardFromProject)


    app.get('/api/lean/projects/widgets/templates', theWebApi.getWidgetTemplates)
    app.post('/api/lean/projects/:id/dashboard/:dashboardId/widgets/:widgetsId', theWebApi.addWidgetToDashboard)
    app.delete('/api/lean/projects/:id/dashboard/:dashboardId/widgets/:widgetsId', theWebApi.removeWidgetFromDashboard)
    app.put('/api/lean/projects/:id/dashboard/:dashboardId/widgets/:widgetsId',theWebApi.updateWidget)




    app.post('/lean/register', theWebApi.createUser)
    app.post('/lean/login', async (req, res, next) => {
        await authization.authenticate.usingLocal(req, res, err => {
            if (err) {
                const myError = {
                    statusCode: err.status,
                    statusMessage: err.message
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
