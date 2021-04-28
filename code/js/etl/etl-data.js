'use strict'

const { json } = require("express")
const error = require("../error")
const fetcher = require("../uri-fetcher")
const it = require('./etl-issue-transform');
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

    getIssuesJira: async function(maxResults) {
        let ret = {
            issues: [],
            total: 0
        }
        const mockMaxResults = 50
        let startAt = 0
        let url = `https://leandashboard.atlassian.net/rest/api/3/search?jql=&startAt=${startAt}&maxResults=${mockMaxResults}`

        let firstRequest  = processBody(await fetcher.makeGetRequest(url,HEADERS))
        ret.issues.push(firstRequest.issues)

        const total = firstRequest.total
        ret.total = firstRequest.total

        startAt+= mockMaxResults
        while (startAt < total){
            let url = `https://leandashboard.atlassian.net/rest/api/3/search?jql=&startAt=${startAt}&maxResults=${mockMaxResults}`
            let r = await fetcher.makeGetRequest(url,HEADERS)
            let processedBody  = processBody(r)
            ret.issues.push(processedBody.issues)
            startAt += mockMaxResults
        }
        return ret.issues.flatMap(issue => issue)
    },

    getIssuesByIdJira: async function(id) {
        
        const url = `https://leandashboard.atlassian.net/rest/api/3/issue/${id}`
        const headers = HEADERS
        const response = await fetcher.makeGetRequest(url,headers)
        return it.getIssueObject(response)
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

    getTeamJira : async function() {
        const url = `https://leandashboard.atlassian.net/rest/api/3/role`
        const headers = HEADERS
        const response = await fetcher.makeGetRequest(url,headers)
        return response
    },
    getProjectsSquash : async function(maxResults) {
        let ret = {
            projects: [],
            total: 0
        }
        let page = 0
        let maxPages = 0
        maxResults = 50
        const url = `https://demo.squashtest.org/squash/api/rest/latest/projects?page=${page}&size=${maxResults}`
        let firstRequest = await fetcher.makeGetRequest(url,SQUASHHEADERS)
        ret.total = firstRequest.page.totalElements
        maxPages += firstRequest.page.totalPages
        ret.projects.push(getSquashProjects(firstRequest._embedded))
        page++
        while (page < maxPages) {
            const url = `https://demo.squashtest.org/squash/api/rest/latest/projects?page=${page}&size=${maxResults}`
            const request = await fetcher.makeGetRequest(url,SQUASHHEADERS)
            ret.projects.push(getSquashProjects(request._embedded))
            page++
        }
        return ret.projects.flatMap(project => project)
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
        it.getIssuesObject(body);
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
    jsonData.roles = refObject.roles
    return jsonData
}

function getSquashProjects(body){
    return Array.isArray(body) ?
        body.map(show => getSquashProjectsObject(show))
        :
        it.getSquashProjectsObject(body);
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