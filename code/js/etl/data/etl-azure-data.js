'use strict'

const fetcher = require('../../uri-fetcher')
const error = require('../../error')
const azure_transformer = require('../transform/elt-azure-transformer')
const AZURE_HEADERS = {
    'Authorization': `Basic ${Buffer.from(
        'leandashboardproject@gmail.com:cwryfikv3hrslmoqiz4wz2otexf7o5aj4qtouhm37ndglel5dkbq'
    ).toString('base64')}`,
    'Accept': 'application/json'
}

function buildURI(credentials) {
    return `https://${credentials.Instance}/`
}

function buildHeader(credentials) {
    return {
        'Authorization': `Basic ${Buffer.from(
            `${credentials.email}:${credentials.token}`
        ).toString('base64')}`,
        'Accept': 'application/json'
    }
}

module.exports = {
    getAzureProjects: async function (credentials) {
        const url = `${buildURI(credentials)}_apis/projects?api-version=6.1-preview.4`
        const headers = buildHeader(credentials)
        let projects
        try {
            projects = await fetcher.makeGetRequest(url, headers)
        } catch (ex) {
            if (ex.type === 'invalid-json') {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Credentials Wrong')
            } else {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'APIPath does not exist')
            }
        }
        if (projects.ok === false) throw error.makeErrorResponse(projects.status, projects.statusText)
        let jsonData = {
            projects: [],
            total : projects.count || 0
        }

        jsonData.projects = projects.value.map(item => {
            return azure_transformer.getAzureProjectObject(item)
        })
        return jsonData
    },
    getAzureTeams: async function (id, credentials) {
        const url = `${buildURI(credentials)}_apis/projects/${id}/teams?$expandIdentity=true&api-version=6.1-preview.3`
        const headers = buildHeader(credentials)
        let teams
        try {
            teams = await fetcher.makeGetRequest(url, headers)
        } catch (ex) {
            if (ex.type === 'invalid-json') {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Credentials Wrong')
            } else {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'APIPath does not exist')
            }
        }
        if (teams.ok === false) throw error.makeErrorResponse(teams.status, teams.statusText)
        let jsonData = {
            teams: [],
            total : teams.count
        };

        jsonData.teams = teams.value.map(item => {
            return azure_transformer.getAzureTeamObject(item)
        })
        return jsonData
    },
    getAzureIterations: async function(teamName, credentials) {
        const url = `${buildURI(credentials)}${teamName}/_apis/work/teamsettings/iterations?api-version=6.0`
        const headers = buildHeader(credentials)
        let iterations
        try {
            iterations = await fetcher.makeGetRequest(url, headers)
        } catch (ex) {
            if (ex.type === 'invalid-json') {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Credentials Wrong')
            } else {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'APIPath does not exist')
            }
        }
        if (iterations.ok === false) throw error.makeErrorResponse(iterations.status, iterations.statusText)
        let jsonData = {
            iterations: [],
            total : iterations.count
        };
        jsonData.iterations = iterations.value.map(item => {
            return azure_transformer.getAzureIterationObject(item)
        })
        return jsonData
    },
    getAzureIterationWorkItems: async function(teamName,iterationId, credentials) {
        const url = `${buildURI(credentials)}${teamName}/_apis/work/teamsettings/iterations/${iterationId}/workitems?api-version=6.1-preview.1`
        const headers = buildHeader(credentials)
        let workItems
        try {
            workItems = await fetcher.makeGetRequest(url, headers)
        } catch (ex) {
            if (ex.type === 'invalid-json') {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Credentials Wrong')
            } else {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'APIPath does not exist')
            }
        }
        if (workItems.ok === false) throw error.makeErrorResponse(workItems.status, workItems.statusText)
        let jsonData = {
            iterationId: iterationId,
            workItems: [],
            total : workItems.length
        };
        for(const workItem of workItems.workItemRelations) {
            jsonData.workItems.push(await this.getAzureWorkItem(workItem.target.id, credentials))
        }
        return jsonData
    },
    getAzureTestCases: async function(teamName, credentials) {
        const url = `${buildURI(credentials)}${teamName}/_apis/wit/wiql?api-version=6.0`
        let headers = buildHeader(credentials)
        headers["Content-Type"] = "application/json"
        const body = {
            "query": "Select [System.Id], [System.Title], [System.State] From WorkItems Where [System.WorkItemType] = 'Test Case'"
        }
        let testCases
        try {
            testCases = await fetcher.makePostRequest(url,body, headers)
        } catch (ex) {
            if (ex.type === 'invalid-json') {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Credentials Wrong')
            } else {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'APIPath does not exist')
            }
        }
        if (testCases.ok === false) throw error.makeErrorResponse(testCases.status, testCases.statusText)
        let jsonData = {
            workItems: [],
            total : testCases.workItems.length
        };
        for(const testCase of testCases.workItems) {
            jsonData.workItems.push(await this.getAzureWorkItem(testCase.id, credentials))
        }
        return jsonData
    },
    getAzureWorkItem: async function(workItemId, credentials) {
        const url = `${buildURI(credentials)}_apis/wit/workitems/${workItemId}?api-version=6.1-preview.3`
        const headers = buildHeader(credentials)
        let workItem
        try {
            workItem = await fetcher.makeGetRequest(url, headers)
        } catch (ex) {
            if (ex.type === 'invalid-json') {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Credentials Wrong')
            } else {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'APIPath does not exist')
            }
        }
        if (workItem.ok === false) throw error.makeErrorResponse(workItem.status, workItem.statusText)
        return azure_transformer.getAzureWorkItemObject(workItem)
    },
    getIterationByName: async function(teamName, iterationName, credentials) {
        const iterations = await this.getAzureIterations(teamName,credentials)
        const iteration = iterations.iterations.filter(iteration=>{
            if(iteration.name === iterationName)
                return iteration
        })
        if(iteration[0]) {
            return iteration[0].id
        } else {
            return 0
        }
    }
}
