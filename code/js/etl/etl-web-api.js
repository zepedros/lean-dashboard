'use strict';

function webapi(app,services){

  const theWebApi = {

      getIssuesJira: function(req, res) {
      services.getIssuesJira()
      .then(resp => {
        console.log("Get Issues")
        answerHandler(resp,res)
    })
    .catch(err => errHandler(err,res))
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
    }
  };

  app.get('/leanDasboard/issuesJira',theWebApi.getIssuesJira);
  app.get('/leanDasboard/issueByIdJira/:id',theWebApi.getIssuesByIdJira)

  app.get('/leanDashboard/projectsJira',theWebApi.getProjectsJira)
  app.get('/leanDashboard/projectsJira/:id',theWebApi.getProjectByIdJira)

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
