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
module.exports = {
    getAzureProjects: async function () {
        const url = `https://dev.azure.com/leandashboardproject/_apis/projects?api-version=6.1-preview.4`
        const projects = await fetcher.makeGetRequest(url, AZURE_HEADERS)

        let jsonData = {
            projects: [],
            total : projects.count || 0
        }

        jsonData.projects = projects.value.map(item => {
            return azure_transformer.getAzureProjectObject(item)
        })
        return jsonData
    },
    getAzureTeams: async function (id) {
        const url = `https://dev.azure.com/leandashboardproject/_apis/projects/${id}/teams?$expandIdentity=true&api-version=6.1-preview.3`
        let teams = await fetcher.makeGetRequest(url, AZURE_HEADERS)

        let jsonData = {
            teams: [],
            total : teams.count
        };

        jsonData.teams = teams.value.map(item => {
            return azure_transformer.getAzureTeamObject(item)
        })
        return jsonData
    },
    getAzureIterations: async function(teamName) {
        const url = `https://dev.azure.com/leandashboardproject/${teamName}/_apis/work/teamsettings/iterations?api-version=6.0`
        let iterations = await fetcher.makeGetRequest(url, AZURE_HEADERS)
        let jsonData = {
            iterations: [],
            total : iterations.count
        };
        jsonData.iterations = iterations.value.map(item => {
            return azure_transformer.getAzureIterationObject(item)
        })
        return jsonData
    },
    getAzureIterationWorkItems: async function(teamName,iterationId) {
        const url = `https://dev.azure.com/leandashboardproject/${teamName}/_apis/work/teamsettings/iterations/${iterationId}/workitems?api-version=6.1-preview.1`
        let workItems = await fetcher.makeGetRequest(url, AZURE_HEADERS)
        let jsonData = {
            iterationId: iterationId,
            workItems: [],
            total : workItems.length
        };
        for(const workItem of workItems.workItemRelations) {
            jsonData.workItems.push(await this.getAzureWorkItem(workItem.target.id))
        }
        return jsonData
    },
    getAzureWorkItem: async function(workItemId) {
        const url = `https://dev.azure.com/leandashboardproject/_apis/wit/workitems/${workItemId}?api-version=6.1-preview.3`
        let workItem = await fetcher.makeGetRequest(url, AZURE_HEADERS)
        return azure_transformer.getAzureWorkItemObject(workItem)
    }
}
