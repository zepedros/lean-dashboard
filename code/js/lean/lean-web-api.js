'use strict';

function webapi(app,services, auth){

    const theWebApi = {

        getIssues: function(req, res) {
            services.getIssues()
                .then(resp => {
                    console.log("Get Issues was executed")
                    answerHandler(resp,res)
                })
                .catch(err => errHandler(err,res))
        },

        getIssuesById : function(req, res){
            services.getIssuesById(req.params.id)
                .then(resp => {
                    console.log("Get Issue")
                    answerHandler(resp,res)
                })
                .catch(err => errHandler(err,res))
        },
        getProjects : function(req,res){
            services.getProjects()
                .then(resp => {
                    console.log("Get Projects")
                    answerHandler(resp,res)
                })
        },
        getProjectById : function(req,res) {
            services.getProjectById(req.params.id)
                .then(resp => {
                    console.log("Get Project")
                    answerHandler(resp,res)
                })
                .catch(err => errHandler(err,res))
        },
       createProject : function (req,res) {
            services.createProject(req.body.name,req.body.description)
                .then(resp => {
                    console.log(`Creating project with the name  "${req.body.name}" and the description "${req.body.description}"`)
                    answerHandler(resp,res,201) 
                })
        },
        postDashboardToProject: function (req,res){
           services.postDashboardToProject(req.params.id, req.body.name, req.body.description)
                .then(resp => {
                    console.log(`Creating new dashboard`)
                    answerHandler(resp,res,201)
                })
               .catch(err => errHandler(err,res))
        },
        postLeanProject : function (req,res){
            services.postLeanProject(req.body.name, req.body.description, req.body.userId)
                .then(resp => {
                    console.log("Create Lean Project")
                    answerHandler(resp,res)
                })
                .catch(err => errHandler(err,res))
        },
        deleteProject : function (req,res){
            services.deleteProject(req.params.id)
                .then(resp => {
                    console.log("Removing Project")
                    answerHandler(resp,res)
                })
                .catch(err => errHandler(err,res))
        },

        createUser: function(req,res)  {
            services.createUser(req.body.username, req.body.password, req.body.first_name, req.body.last_name)
                .then(resp => answerHandler(resp,res))
                .catch(err => errHandler(err,res))
        },

        login: async function (req, res) {
            const userinfo = req.body;
            const username = userinfo.username;
            const password = userinfo.password;

            try {
                const user = await auth.getUser(username, password);
                await login(req, user);

                res.json({ user: username });
            } catch (err) {
                res.status(401).send({ error: err });
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

        logout: function (req, res) {
            req.logout();
            res.send();
        }
    };


    app.post('/lean/project',theWebApi.createProject)
    app.get('/lean/issues',theWebApi.getIssues);
    app.get('/lean/issueById/:id',theWebApi.getIssuesById)
    app.get('/lean/projects',theWebApi.getProjects)
    app.get('/lean/projects/:id',theWebApi.getProjectById)
    app.post('/lean/projects/:id/dashboard',theWebApi.postDashboardToProject)

    app.post('/lean/createProject',theWebApi.postLeanProject)
    app.delete('/lean/deleteProject/:id',theWebApi.deleteProject)


    app.put('/lean/register',theWebApi.createUser)
    app.post('/lean/login', theWebApi.login)
    app.post('/lean/logout', theWebApi.logout);

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
