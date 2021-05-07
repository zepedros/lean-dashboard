'use strict'

const fetcher = require("../uri-fetcher")

const error = require('../error')

const jira_transformer = require('./transform/etl-jira-transformer')
const squash_transformer = require('./transform/etl-squash-transformer')
const azure_transformer = require('./transform/elt-azure-transformer')

const HEADERS = {
    'Authorization': `Basic ${Buffer.from(
        'leandashboardproject@gmail.com:LPcyGdZolN906MvzdwPHF045'
    ).toString('base64')}`,
    'Accept': 'application/json'
}
const SQUASH_HEADERS = {
    'Authorization': `Basic ${Buffer.from(
        'guest_tpl:password'
    ).toString('base64')}`,
    'Accept': 'application/json'
}
const AZURE_HEADERS = {
    'Authorization': `Basic ${Buffer.from(
        'leandashboardproject@gmail.com:cwryfikv3hrslmoqiz4wz2otexf7o5aj4qtouhm37ndglel5dkbq'
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

        let firstRequest = (await fetcher.makeGetRequest(url, HEADERS))
        firstRequest.issues.forEach(issue => ret.issues.push(jira_transformer.getJiraIssueObject(issue)))

        const total = firstRequest.total
        ret.total = total

        startAt += maxResults
        while (startAt < total) {
            let url = `https://leandashboard.atlassian.net/rest/api/3/search?jql=&startAt=${startAt}&maxResults=${maxResults}`
            let request = await fetcher.makeGetRequest(url, HEADERS)
            request.issues.forEach(issue => ret.issues.push(jira_transformer.getJiraIssueObject(issue)))
            startAt += maxResults
        }
        return ret
    },

    getIssuesByIdJira: async function (id) {
        const url = `https://leandashboard.atlassian.net/rest/api/3/issue/${id}`
        const response = await fetcher.makeGetRequest(url, HEADERS)
        return jira_transformer.getJiraIssueObject(response)
    },

    getProjectsJira: async function () {
        const url = `https://leandashboard.atlassian.net/rest/api/3/project/search`
        const response = await fetcher.makeGetRequest(url, HEADERS)

        let jsonData = {
            projects: response.values.map(jira_transformer.getJiraProjectObject)
        };
        jsonData.total = response.total

        return jsonData
    },

    getProjectByIdJira: async function (id) {
        const url = `https://leandashboard.atlassian.net/rest/api/3/project/${id}`
        const response = await fetcher.makeGetRequest(url, HEADERS)
        return jira_transformer.getJiraProjectObject(response)
    },

    getProjectsSquash: async function () {
        let ret = {
            projects: [],
            total: 0
        }

        let page = 0
        let maxPages = 0
        const maxResults = 50

        const url = `https://demo.squashtest.org/squash/api/rest/latest/projects?page=${page}&size=${maxResults}`
        let firstRequest = await fetcher.makeGetRequest(url, SQUASH_HEADERS)

        ret.total = firstRequest.page.totalElements
        maxPages += firstRequest.page.totalPages

        firstRequest._embedded.projects
            .forEach(project =>
                ret.projects
                    .push(squash_transformer.getSquashProjectsObject(project)))

        page++
        while (page < maxPages) {
            const url = `https://demo.squashtest.org/squash/api/rest/latest/projects?page=${page}&size=${maxResults}`
            const request = await fetcher.makeGetRequest(url, SQUASH_HEADERS)
            request._embedded.projects
                .forEach(project =>
                    ret.projects
                        .push(squash_transformer.getSquashProjectsObject(project)))
            page++
        }
        return ret
    },
    getProjectCampaignsSquash: async function (projectId) {
        const url = `https://demo.squashtest.org/squash/api/rest/latest/projects/${projectId}/campaigns`
        const response = await fetcher.makeGetRequest(url, SQUASH_HEADERS)

        let jsonData = {
            campaigns: [],
            total : response._embedded.campaigns.length
        };

        for (const campaign of response._embedded.campaigns) {
            jsonData.campaigns.push(await this.getSquashCampaignById(projectId, campaign.id))
        }

        return jsonData
    },
    getSquashCampaignById : async function (projectId, campaignId) {
        const url = `https://demo.squashtest.org/squash/api/rest/latest/campaigns/${campaignId}`
        const campaign = await fetcher.makeGetRequest(url, SQUASH_HEADERS)
        if (campaign.project.id != projectId){
            throw error.create(404,"Campaign not present in project")
        }
        return squash_transformer.getSquashCampaignObject(campaign)
    },
    getProjectTestsSquash: async function (projectId) {
        const url = `https://demo.squashtest.org/squash/api/rest/latest/projects/${projectId}/test-cases`
        const response = await fetcher.makeGetRequest(url, SQUASH_HEADERS)

        const jsonData = {
            "test-cases": [],
            total: response._embedded["test-cases"].length
        };

        for (const test of response._embedded["test-cases"]){
            jsonData["test-cases"].push(await this.getSquashTestById(projectId, test.id))
        }

        return jsonData
    },
    getSquashTestById : async function (projectId,testId) {
        const url = `https://demo.squashtest.org/squash/api/rest/latest/test-cases/${testId}`
        const test = await fetcher.makeGetRequest(url, SQUASH_HEADERS)
        if (test.project.id != projectId){
            throw error.create(404,"Test not present in project")
        }
        return squash_transformer.getSquashTestObject(test)
    },
    getSquashTestsSuites : async function(){

        let testsSuites = []
        const projects = await this.getProjectsSquash(50)

        //for(const project of projects.projects){
            const campaigns =  await this.getSquashCampaignById(5,18)
            //for(const campaign of campaigns.campaigns){
                for(const iteration of campaigns.iterations){
                    const url = `https://demo.squashtest.org/squash/api/rest/latest/iterations/${iteration.id}/test-plan`
                    const ret = await fetcher.makeGetRequest(url,SQUASH_HEADERS)
                    testsSuites.push(ret)
             //   }
         //   }
        }
        return testsSuites
    },

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

    getAllSprintsJira : async function () {
        let sprints = []
        const url = `https://leandashboard.atlassian.net/rest/agile/1.0/board/`
        const boards = await fetcher.makeGetRequest(url,HEADERS)

        for(const board of boards.values){
            const url =  `https://leandashboard.atlassian.net/rest/agile/1.0/board/${board.id}/sprint`
            const res = await fetcher.makeGetRequest(url,HEADERS)
            res.values.forEach(sprint => {
                sprint['projectId'] = board.location.projectId
                sprints.push(jira_transformer.getJiraSprintObject(sprint))
            })
        }
        return sprints
    },

    getSprintIssues: async function(sprintId) {
        let sprintIssue = {
            sprintId: sprintId,
            issues: []
        }
        const url = `https://leandashboard.atlassian.net/rest/agile/1.0/sprint/${sprintId}/issue`
        let res = await fetcher.makeGetRequest(url, HEADERS)

        sprintIssue.issues = res.issues.map(issue => jira_transformer.getJiraIssueObject(issue))

        return sprintIssue
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
    }
}