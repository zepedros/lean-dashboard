'use strict';

function services(data, db){
 
    const theServices = {
    
    getIssuesJira: async function(){
     return data.getIssuesJira()
    },
    getIssuesByIdJira : async function(id){
      return data.getIssuesByIdJira(id)
    },
    getProjectsJira : function() {
      return data.getProjectsJira()
    },
    getProjectByIdJira : function(id){
      return data.getProjectByIdJira(id)
    },
    postIssues : function(){
      return db.postIssues()
    } 
  };
  return theServices;
}

module.exports = services;
