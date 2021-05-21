'use strict';

function webapi(app,services, auth, authization){

    const theWebApi = {

        createProject: function (req, res) {
            services.createProject(req.body.name, req.body.description, req.body.user)
                .then(resp => {
                    console.log(`Creating project with the name  "${req.body.name}" and the description "${req.body.description}"`)
                    answerHandler(resp, res, 201)
                })
                .catch(err => errHandler(err,res))

        },
        getAllProjects : function (req,res){
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
                .catch(err => errHandler(err,res))
        },
        getProjectById: function (req, res) {
            services.getProjectById(req.params.id)
                .then(resp => {
                    console.log("Get Project")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        updateProject: function(req,res) {
          services.updateProject(req.params.id, req.body.name, req.body.description)
              .then(resp => {
                  console.log(`Updating Project`)
                  answerHandler(resp,res)
              })
              .catch(err=> errHandler(err,res))
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
        removeDashboardFromProject: function (req,res){
            services.removeDashboardFromProject(req.params.id,req.params.dashboardId)
                .then(resp => {
                    console.log("Removing Dashboard")
                    answerHandler(resp,res)
                })
                .catch(err=> errHandler(err,res))
        },
        getDashboardFromProject: function(req,res){
          services.getDashboardFromProject(req.params.id,req.params.dashboardId)
              .then(resp => {
                  console.log("Get Dashboard")
                  answerHandler(resp, res)
              })
              .catch(err => errHandler(err,res))
        },

        updateDashboardFromProject:function(req,res){
            services.updateDashboardFromProject(req.params.id,req.params.dashboardId, req.body.name, req.body.description)
                .then(resp =>{
                    console.log("Updating Dashboard")
                    answerHandler(resp,res)
                })
                .catch(err => errHandler(err,res))
        },

        createUser: function (req, res) {
            services.createUser(req.body.username, req.body.password, req.body.first_name, req.body.last_name)
                .then(resp => answerHandler(resp, res, resp.statusCode))
                .catch(err => errHandler(err, res))
        },

        /*
        login: async function (req, res) {
            const userinfo = req.body;
            const username = userinfo.username;
            const password = userinfo.password;

            try {
                const user = await services.getUserByUsernameAndPassword(username, password);
                await login(req, user);

                res.json({user: username});
            } catch (err) {
                res.status(401).send({error: err});
            }

            function login(req, user) {
                return new Promise((resolve, reject) => {
                    req.login(user, (err, result) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(result);
                        }
                    });
                });
            }
        },
        */

        logout: function (req, res) {
            services.logout(req, res)
        },

        loginLocal: async function(req, res){
            services.loginLocal(req, res)
        }
    };

    app.get('/lean/projects',theWebApi.getAllProjects)
    app.get('/lean/projects/user/:user',theWebApi.getProjects)
    app.get('/lean/projects/:id',theWebApi.getProjectById)
    app.post('/lean/projects/:id/dashboard',theWebApi.addDashboardToProject)
    app.delete('/lean/projects/:id/dashboard/:dashboardId',theWebApi.removeDashboardFromProject)
    app.get('/lean/projects/:id/dashboard/:dashboardId',theWebApi.getDashboardFromProject)
    app.post('/lean/projects/:id/dashboard/:dashboardId',theWebApi.updateDashboardFromProject)

    app.post('/lean/projects',theWebApi.createProject)
    app.post('/lean/projects/:id',theWebApi.updateProject)
    app.delete('/lean/projects/:id',theWebApi.deleteProject)


    app.post('/lean/register',theWebApi.createUser)
    app.post('/lean/login', authization.authenticate.usingLocal, theWebApi.loginLocal)
    app.post('/lean/logout', authization.authenticate.logout, theWebApi.logout);


    return theWebApi;
}

function errHandler(resp,res){
    console.log(resp)
    if(!resp.statusCode){
        res.status(400).send({message: "An error occurred"})
    }else {
        res.status(resp.statusCode)
        res.statusMessage = resp.statusMessage
        res.send(resp)
    }
}

function answerHandler(resp,res, statusCode){
    res.status(statusCode || 200).send(resp);
}

module.exports = webapi
