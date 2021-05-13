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

module.exports = {
    getIssuesJira: async function () {
        let ret = {
            issues: [],
            total: 0
        }
        const maxResults = 50
        let startAt = 0
        let url = `https://leandashboard.atlassian.net/rest/api/3/search?jql=&startAt=${startAt}&maxResults=${maxResults}`

        let firstRequest = (await fetcher.makeGetRequest(url, JIRA_HEADERS))
        firstRequest.issues.forEach(issue => ret.issues.push(jira_transformer.getJiraIssueObject(issue)))

        const total = firstRequest.total
        ret.total = total

        startAt += maxResults
        while (startAt < total) {
            let url = `https://leandashboard.atlassian.net/rest/api/3/search?jql=&startAt=${startAt}&maxResults=${maxResults}`
            let request = await fetcher.makeGetRequest(url, JIRA_HEADERS)
            request.issues.forEach(issue => ret.issues.push(jira_transformer.getJiraIssueObject(issue)))
            startAt += maxResults
        }
        return ret
    },

    getIssuesByIdJira: async function (id) {
        const url = `https://leandashboard.atlassian.net/rest/api/3/issue/${id}`
        const response = await fetcher.makeGetRequest(url, JIRA_HEADERS)
        return jira_transformer.getJiraIssueObject(response)
    },

    getProjectsJira: async function () {
        const url = `https://leandashboard.atlassian.net/rest/api/3/project/search`
        const response = await fetcher.makeGetRequest(url, JIRA_HEADERS)

        let jsonData = {
            projects: response.values.map(jira_transformer.getJiraProjectObject)
        };
        jsonData.total = response.total

        return jsonData
    },

    getProjectByIdJira: async function (id) {
        const url = `https://leandashboard.atlassian.net/rest/api/3/project/${id}`
        const response = await fetcher.makeGetRequest(url, JIRA_HEADERS)
        return jira_transformer.getJiraProjectObject(response)
    },

    getAllSprintsJira : async function () {
        let sprints = []
        const url = `https://leandashboard.atlassian.net/rest/agile/1.0/board/`
        const boards = await fetcher.makeGetRequest(url,JIRA_HEADERS)

        for(const board of boards.values){
            const url =  `https://leandashboard.atlassian.net/rest/agile/1.0/board/${board.id}/sprint`
            const res = await fetcher.makeGetRequest(url,JIRA_HEADERS)
            res.values.forEach(sprint => {
                sprint['projectId'] = board.location.projectId
                sprints.push(jira_transformer.getJiraSprintObject(sprint))
            })
        }
        return sprints
    },

    getSprintIssuesJira: async function(sprintId) {
        let sprintIssue = {
            sprintId: sprintId,
            issues: []
        }
        const url = `https://leandashboard.atlassian.net/rest/agile/1.0/sprint/${sprintId}/issue`
        let res = await fetcher.makeGetRequest(url, JIRA_HEADERS)

        sprintIssue.issues = res.issues.map(issue => jira_transformer.getJiraIssueObject(issue))

        return sprintIssue
    },
}