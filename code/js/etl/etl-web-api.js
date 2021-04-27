'use strict';

function webapi(app,services) {

    const theWebApi = {

        getIssuesJira: function (req, res) {
            services.getIssuesJira()
                .then(resp => {
                    console.log("Get Issues")
                    answerHandler(resp, res)
                })
                .catch(err => errHandler(err, res))
        },


    getIssuesByIdJira : function(req,res){
        services.getIssuesByIdJira(req.params.id)
        .then(resp => {
          console.log("Get Issue")
          answerHandler(resp,res)
        })
        .catch(err => errHandler(err,res))
    },
    getProjectsJira : function(req,res){
      services.getProjectsJira()
      .then(resp => {
        console.log("Get Projects")
        answerHandler(resp,res)
    })
    },
    getProjectByIdJira : function(req,res) {
      services.getProjectByIdJira(req.params.id)
      .then(resp => {
        console.log("Get Project")
        answerHandler(resp,res)
      })
      .catch(err => errHandler(err,res))
    },
    getTeamJira : function(req,res){
      services.getTeamJira()
      .then(resp=> {
        console.log("Get Team")
        answerHandler(resp,res)
      })
      .catch(err => errHandler(err,res))
    },
    getProjectsSquash: function (req, res) {
      services.getProjectsSquash()
          .then(resp => {
              console.log("Get squash projects")
              answerHandler(resp, res)
          })
          .catch(err => errHandler(err, res))
  },
  getProjectCampaignsSquash: function (req,res) {
      services.getProjectCampaignsSquash(req.params.id)
          .then(resp => {
              console.log("Get squash campaigns for project")
              answerHandler(resp,res)
          })
          .catch(err => errHandler(err,res))
  },
  getProjectTestsSquash : function (req,res) {
      services.getProjectTestsSquash(req.params.id)
          .then(resp => {
              console.log("Get squahs tests for project")
              answerHandler(resp,res)
          })
          .catch(err => errHandler(err,res))
  },
    postIssues : function(req,res) {
      services.postIssues()
      .then(resp => {
        console.log("Post Issues")
        answerHandler(resp,res)
      })
      .catch(err => errHandler(err,res))
    }
  };

  app.get('/leanDashboard/projectsJira/team',theWebApi.getTeamJira)

  app.get('/leanDasboard/issuesJira',theWebApi.getIssuesJira) //testing 
  app.get('/leanDasboard/issueByIdJira/:id',theWebApi.getIssuesByIdJira)//testing 

  app.get('/leanDashboard/projectsJira', theWebApi.getProjectsJira)//testing
  app.get('/leanDashboard/projectsJira/:id', theWebApi.getProjectByIdJira)//testing


  app.get('/leanDashboard/projectsSquash', theWebApi.getProjectsSquash)//testing
  app.get('/leanDashboard/projectsSquash/:id/campaigns', theWebApi.getProjectCampaignsSquash)//testing
  app.get('/leanDashboard/projectsSquash/:id/tests', theWebApi.getProjectTestsSquash)//testing


  app.post('/leanDashboard/issues', theWebApi.postIssues)

    return theWebApi;
}

function errHandler(resp,res){
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
