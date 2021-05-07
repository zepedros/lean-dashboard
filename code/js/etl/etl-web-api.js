'use strict';

function webapi(app, services) {
    const theWebApi = {
        getIssuesJira: function (req, res) {
            services.getIssuesJira()
                .then(resp => {
                    console.log("Get Issues")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        postIssuesJira: function (req, res) {
            services.postIssuesJira()
                .then(resp => {
                    console.log("Posting Jira issues data table")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        postJiraSprintIssuesBarChart: function (req, res) {
            services.postJiraSprintIssuesBarChart()
                .then(resp => {
                    console.log("Posting sprint issues bar chart")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },

        getIssuesByIdJira: function (req, res) {
            services.getIssuesByIdJira(req.params.id)
                .then(resp => {
                    console.log("Get Issue")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        getProjectsJira: function (req, res) {
            services.getProjectsJira()
                .then(resp => {
                    console.log("Get Projects from Jira")
                    answerHandler(resp, res)

                })
                .catch(err => errHandler(err, res))
        },
        getProjectByIdJira: function (req, res) {
            services.getProjectByIdJira(req.params.id)
                .then(resp => {
                    console.log("Get Project")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        getProjectsSquash: function (req, res) {
            services.getProjectsSquash()
                .then(resp => {
                    console.log("Get squash projects")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        getProjectCampaignsSquash: function (req, res) {
            services.getProjectCampaignsSquash(req.params.id)
                .then(resp => {
                    console.log("Get squash campaigns for project")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        getProjectTestsSquash: function (req, res) {
            services.getProjectTestsSquash(req.params.id)
                .then(resp => {
                    console.log("Get squahs tests for project")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        getSquashCampaignById: function (req, res) {
            services.getSquashCampaignById(req.params.id, req.params.cid)
                .then(resp => {
                    console.log("Get squash campaign by id for project")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        getSquashTestById: function (req, res) {
            services.getSquashTestById(req.params.id, req.params.tid)
                .then(resp => {
                    console.log("Get squash test by id for project")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        getAzureProjects: function (req,res) {
            services.getAzureProjects()
                .then(resp => {
                    console.log("Get Azure projects")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        getAzureTeams: function (req,res) {
            services.getAzureTeams(req.params.id)
                .then(resp => {
                    console.log("Get Azure teams")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        postIssues: function (req, res) {
            services.postIssues()
                .then(resp => {
                    console.log("Post Issues")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        postProjects: function (req, res) {
            services.postProjects()
                .then(resp => {
                    console.log("Post Projects")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },
        getAllSprintsJira : function (req, res){
            services.getAllSprintsJira()
                .then(resp => {
                    console.log("Post Sprint")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err,res))
        },

        getSprintIssues : function (req,res){
            services.getSprintIssues(req.params.id)
                .then(resp=> {
                    console.log("Get Sprint Issues")
                    answerHandler(resp,res)
                })
                .catch(err => errHandler(err,res))
        },
        getSquashTestsSuites: function (req,res){
            services.getSquashTestsSuites()
                .then(resp => {
                    console.log("Get tests suites")
                    answerHandler(resp,res)
                })
                .catch(err => errHandler(err,res))
        }
    };

    app.get('/lean-etl/issuesJira', theWebApi.getIssuesJira) //testing
    app.post('/lean-etl/issuesJira', theWebApi.postIssuesJira)
    app.post('/lean-etl/sprintIssuesJira', theWebApi.postJiraSprintIssuesBarChart)
    app.get('/lean-etl/issueByIdJira/:id', theWebApi.getIssuesByIdJira)//testing

    app.get('/lean-etl/projectsJira', theWebApi.getProjectsJira)//testing
    app.get('/lean-etl/projectsJira/:id', theWebApi.getProjectByIdJira)//testing

    app.get('/lean-etl/projectsSquash', theWebApi.getProjectsSquash)//testing
    app.get('/lean-etl/projectsSquash/:id/campaigns', theWebApi.getProjectCampaignsSquash)//testing
    app.get('/lean-etl/projectsSquash/:id/campaigns/:cid', theWebApi.getSquashCampaignById)//testing
    app.get('/lean-etl/projectsSquash/:id/tests', theWebApi.getProjectTestsSquash)//testing
    app.get('/lean-etl/projectsSquash/:id/tests/:tid', theWebApi.getSquashTestById)//testing
    app.get('/lean-etl/projectsSquash/testsSuites',theWebApi.getSquashTestsSuites)

    app.get('/lean-etl/projectsAzure', theWebApi.getAzureProjects) //testing
    app.get('/lean-etl/projectsAzure/:id/teams', theWebApi.getAzureTeams) //testing
    app.post('/lean-etl/issues', theWebApi.postIssues)
    app.post('/lean-etl/projects', theWebApi.postProjects)

    app.get('/lean-etl/sprint',theWebApi.getAllSprintsJira)
    app.get('/lean-etl/sprint/:id/issues',theWebApi.getSprintIssues)

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
