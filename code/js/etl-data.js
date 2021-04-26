'use strict'

const { json } = require("express")
const error = require("./error")
const fetcher = require("./uri-fetcher")
const HEADERS = {
    'Authorization': `Basic ${Buffer.from(
      'leandashboardproject@gmail.com:LPcyGdZolN906MvzdwPHF045'
    ).toString('base64')}`,
    'Accept': 'application/json'
  }
module.exports = {

    getIssuesJira: async function() {
        const url = 'https://leandashboard.atlassian.net/rest/api/3/search?jql='
        const headers = HEADERS
        //return makeRequest(url, headers)
        const response = await fetcher.makeGetRequest(url,headers)
        return processBody(response)
    },

    getIssuesByIdJira: async function(id) {
        
        const url = `https://leandashboard.atlassian.net/rest/api/3/issue/${id}`
        const headers = HEADERS
        //return makeRequest(url,headers)  
        const response = await fetcher.makeGetRequest(url,headers)
        return getIssueObject(response)
    },

    getProjectsJira : async function(){
        const url = `https://leandashboard.atlassian.net/rest/api/3/project/search`
        const headers = HEADERS
        const response = await fetcher.makeGetRequest(url,headers)
        return getProjectsObject(response)
    },

    getProjectByIdJira : async function(id){
        const url = `https://leandashboard.atlassian.net/rest/api/3/project/${id}`
        const headers = HEADERS
        const response = await fetcher.makeGetRequest(url,headers)
        return getProjectObject(response)
    }

}

async function makeRequest(url, headers) {
    const response = await fetcher.makeGetRequest(url, headers)
    //return response
    return processBody(response)
}


function processBody(body) {
    return Array.isArray(body) ?
        body.map(show => getIssuesObject(show))
        :
        getIssuesObject(body);
}

/*
* TODO add project name/id
*/
function getIssuesObject(refObject) {

    var jsonData = {
          issue :  []
    };

    jsonData.total = refObject.total 

    for(var i = 0; i < jsonData.total; i++){

        var item = refObject.issues[i]
        
        jsonData.issue.push({
            "key" : item.key,
            "id" : item.id,
            "summary" : item.fields.summary,
            //"assignee" : item.fields.assignee,  
            "reportes" : item.fields.reporter.accountId,
            "state" : item.fields.status.name,
            "created" : item.fields.created,
            "idProject" : item.fields.project.id,
            "projectName" : item.fields.project.name
        })
          
    }
     return jsonData 
}

//missing stuff
//priority missing
function getIssueObject(refObject) {
    
    var jsonData = {

    }
    jsonData.id = refObject.id
    jsonData.key = refObject.key
    jsonData.description = refObject.fields.description.content
    jsonData.created = refObject.fields.created
    jsonData.summary = refObject.fields.summary
    jsonData.updated = refObject.fields.updated
    jsonData.state = refObject.fields.status.name
    jsonData.creator = refObject.fields.creator.accountId
    jsonData.creator = refObject.fields.subtasks
    jsonData.priorityName = refObject.fields.priority.name
    jsonData.priorityId = refObject.fields.priority.id
    jsonData.idProject = refObject.fields.project.id
    jsonData.nameProject = refObject.fields.project.name
    //jsonData.creator = refObject.fields.comment

    return jsonData
}

function getProjectsObject(refObject) {
    var jsonData = {
        project :  []
  };
   jsonData.total = refObject.total
   
   for(var i = 0; i < jsonData.total; i++) {
        var item = refObject.values[i]
        jsonData.project.push({
            "key" : item.key,
            "id" : item.id,
            "name": item.name,
            "projectTypeKey" : item.projectTypeKey,
            "projectCategory" : item.projectCategory, //api documentation shows this but in ours projects doesnt show
            "insight" : item.insight //same here
        })

   }
   return refObject
}

function getProjectObject(refObject){
    var jsonData = {}

    jsonData.id = refObject.id
    jsonData.key = refObject.key
    jsonData.description = refObject.description
    jsonData.name = refObject.lead.displayName
    return jsonData
}