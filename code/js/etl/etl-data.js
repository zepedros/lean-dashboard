'use strict'

const { json } = require("express")
const error = require("../error")
const fetcher = require("../uri-fetcher")
const HEADERS = {
    'Authorization': `Basic ${Buffer.from(
      'leandashboardproject@gmail.com:LPcyGdZolN906MvzdwPHF045'
    ).toString('base64')}`,
    'Accept': 'application/json'
  }
const SQUASHHEADERS = {
    'Authorization': `Basic ${Buffer.from(
        'guest_tpl:password'
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
    },
    getProjectsSquash : async function() {
        const url = `https://demo.squashtest.org/squash/api/rest/latest/projects`
        const headers = SQUASHHEADERS
        const response = await fetcher.makeGetRequest(url,headers)
        return getSquashProjects(response)
    },
    getProjectCampaignsSquash : async function(id) {
        const url = `https://demo.squashtest.org/squash/api/rest/latest/projects/${id}/campaigns`
        const headers = SQUASHHEADERS
        const response = await fetcher.makeGetRequest(url,headers)
        return getSquashCampaigns(response)
    },
    getProjectTestsSquash : async function(id) {
        const url = `https://demo.squashtest.org/squash/api/rest/latest/projects/${id}/test-cases`
        const headers = SQUASHHEADERS
        const response = await fetcher.makeGetRequest(url,headers)
        return getSquashTests(response)
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

function getSquashProjects(refObject){
    var jsonData = {
        project :  []
    };
    jsonData.total = refObject._embedded.projects.length

    for(var i = 0; i < jsonData.total; i++) {
        var item = refObject._embedded.projects[i]
        jsonData.project.push({
            "id" : item.id,
            "name": item.name
        })
    }
    return jsonData
}

async function getSquashCampaigns(refObject) {
    var jsonData = {
        campaigns: []
    };
    jsonData.total = refObject._embedded.campaigns.length

    for (var i = 0; i < jsonData.total; i++) {
        var item = refObject._embedded.campaigns[i]
        let campaign =  await fetcher.makeGetRequest(
            `https://demo.squashtest.org/squash/api/rest/latest/campaigns/${item.id}`,
            SQUASHHEADERS)
        jsonData.campaigns.push({
            "id": campaign.id,
            "name": campaign.name,
            "reference": campaign.reference,
            "description" : campaign.description,
            "status" : campaign.status,
            "creation_date" : campaign.created_on,
            "start_date" : campaign.actual_start_date,
            "end_date" : campaign.actual_end_date,
            "test_plan" : campaign.test_plan
        })
    }
    return jsonData
}

async function getSquashTests(refObject) {
    var jsonData = {
        "test-cases" : []
    };
    jsonData.total = refObject._embedded["test-cases"].length

    for (var i = 0; i < jsonData.total; i++) {
        var item = refObject._embedded["test-cases"][i]
        let test =  await fetcher.makeGetRequest(
            `https://demo.squashtest.org/squash/api/rest/latest/test-cases/${item.id}`,
            SQUASHHEADERS)
        jsonData["test-cases"].push({
            "id": test.id,
            "name": test.name,
            "reference": test.reference,
            "status" : test.status,
            "importance" : test.importance,
            "creation_date" : test.created_on
        })
    }
    return jsonData
}