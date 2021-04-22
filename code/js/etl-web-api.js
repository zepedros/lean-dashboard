'use strict';

function webapi(app,services){

  const theWebApi = {
      getIssues: function(req, res) {
      services.getIssues()
      .then(resp => {
        console.log("Get Issues")
        answerHandler(resp,res)
    })
    .catch(err => errHandler(err,res))
    }
  };

  app.get('/issues',theWebApi.getIssues);

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
