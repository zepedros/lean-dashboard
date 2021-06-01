'use strict'

const fetcher = require('../../uri-fetcher')
const error = require('../../error')
const jira_transformer = require('../transform/etl-jira-transformer')

const JIRA_HEADERS = {
    'Authorization': `Basic ${Buffer.from(
        'leandashboardproject@gmail.com:LPcyGdZolN906MvzdwPHF045'
    ).toString('base64')}`,
    'Accept': 'application/json'
}

function buildURI(credentials) {
    return `https://${credentials.APIPath}/rest/api/${credentials.APIVersion}`
}

function buildAgileURI(credentials) {
    return `https://${credentials.APIPath}/rest/agile`
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
    getIssuesJira: async function (credentials) {
        let ret = {
            issues: [],
            total: 0
        }
        const maxResults = 50
        let startAt = 0
        let url = `${buildURI(credentials)}/search?jql=&startAt=${startAt}&maxResults=${maxResults}`
        const header = buildHeader(credentials)
        let firstRequest = (await fetcher.makeGetRequest(url, header))
        firstRequest.issues.forEach(issue => ret.issues.push(jira_transformer.getJiraIssueObject(issue)))

        const total = firstRequest.total
        ret.total = total

        startAt += maxResults
        while (startAt < total) {
            let url = `${buildURI(credentials)}/search?jql=&startAt=${startAt}&maxResults=${maxResults}`
            let request = await fetcher.makeGetRequest(url, header)
            request.issues.forEach(issue => ret.issues.push(jira_transformer.getJiraIssueObject(issue)))
            startAt += maxResults
        }
        return ret
    },

    getIssuesByIdJira: async function (id, credentials) {
        const url = `${buildURI(credentials)}/issue/${id}`
        const header = buildHeader(credentials)
        const response = await fetcher.makeGetRequest(url, header)
        return jira_transformer.getJiraIssueObject(response)
    },

    getProjectsJira: async function (credentials) {
        const url = `${buildURI(credentials)}/project/search`
        const header = buildHeader(credentials)
        const response = await fetcher.makeGetRequest(url, header)

        let jsonData = {
            projects: response.values.map(jira_transformer.getJiraProjectObject)
        };
        jsonData.total = response.total

        return jsonData
    },

    getProjectByIdJira: async function (id, credentials) {
        const url = `${buildURI(credentials)}/project/${id}`
        const header = buildHeader(credentials)
        const response = await fetcher.makeGetRequest(url, header)
        if (!response.ok) throw error.makeErrorResponse(response.status, response.statusText)
        const isOk = response.ok
        return jira_transformer.getJiraProjectObject(await response.json())
    },

    getAllSprintsJira : async function (credentials) {
        let sprints = []
        const url = `${buildAgileURI(credentials)}/1.0/board/`
        const header = buildHeader(credentials)
        const boards = await fetcher.makeGetRequest(url,header)

        for(const board of boards.values){
            const url =  `${buildAgileURI(credentials)}/1.0/board/${board.id}/sprint`
            const res = await fetcher.makeGetRequest(url,header)
            res.values.forEach(sprint => {
                sprint['projectId'] = board.location.projectId
                sprints.push(jira_transformer.getJiraSprintObject(sprint))
            })
        }
        return sprints
    },

    getSprintIssuesJira: async function(sprintId, credentials) {
        let sprintIssue = {
            sprintId: sprintId,
            issues: []
        }
        const url = `${buildAgileURI(credentials)}/1.0/sprint/${sprintId}/issue`
        const header = buildHeader(credentials)
        let res = await fetcher.makeGetRequest(url, header)

        sprintIssue.issues = res.issues.map(issue => jira_transformer.getJiraIssueObject(issue))

        return sprintIssue
    },
}