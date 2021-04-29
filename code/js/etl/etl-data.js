'use strict'

const fetcher = require("../uri-fetcher")
const issue_transformer = require('./etl-issue-transform');
const project_transformer = require('./etl-project-transform')
const campaign_transformer = require('./etl-campaign-transform')
const test_transformer = require('./etl-test-transform')

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
module.exports = {

    getIssuesJira: async function () {
        let ret = {
            issues: [],
            total: 0
        }
        const mockMaxResults = 50
        let startAt = 0
        let url = `https://leandashboard.atlassian.net/rest/api/3/search?jql=&startAt=${startAt}&maxResults=${mockMaxResults}`

        let firstRequest = processLeanIssuesBody(await fetcher.makeGetRequest(url, HEADERS))
        ret.issues.push(firstRequest.issues)

        const total = firstRequest.total
        ret.total = firstRequest.total

        startAt += mockMaxResults
        while (startAt < total) {
            let url = `https://leandashboard.atlassian.net/rest/api/3/search?jql=&startAt=${startAt}&maxResults=${mockMaxResults}`
            let r = await fetcher.makeGetRequest(url, HEADERS)
            let processedBody = processLeanIssuesBody(r)
            ret.issues.push(processedBody.issues)
            startAt += mockMaxResults
        }
        ret.issues = ret.issues.flatMap(issue => issue)
        return ret
    },

    getIssuesByIdJira: async function (id) {

        const url = `https://leandashboard.atlassian.net/rest/api/3/issue/${id}`
        const response = await fetcher.makeGetRequest(url, HEADERS)
        return processLeanIssuesBody(response)
    },

    getProjectsJira: async function () {
        const url = `https://leandashboard.atlassian.net/rest/api/3/project/search`
        const response = await fetcher.makeGetRequest(url, HEADERS)
        return processLeanProjectsBody(response)
    },

    getProjectByIdJira: async function (id) {
        const url = `https://leandashboard.atlassian.net/rest/api/3/project/${id}`
        const response = await fetcher.makeGetRequest(url, HEADERS)
        return project_transformer.getJiraProjectObject(response)
    },

    /*
    *TODO getTeam from Jira needs to be implemented and given a route on etl-web-api
     */
    getTeamJira: async function () {
        const url = `https://leandashboard.atlassian.net/rest/api/3/role`
        return await fetcher.makeGetRequest(url, HEADERS)
    },

    getProjectsSquash: async function (maxResults) {
        let ret = {
            projects: [],
            total: 0
        }
        let page = 0
        let maxPages = 0
        maxResults = 50

        const url = `https://demo.squashtest.org/squash/api/rest/latest/projects?page=${page}&size=${maxResults}`
        let firstRequest = await fetcher.makeGetRequest(url, SQUASH_HEADERS)

        ret.total = firstRequest.page.totalElements
        maxPages += firstRequest.page.totalPages

        ret.projects.push(processSquashProjectsBody(firstRequest._embedded))
        page++

        while (page < maxPages) {
            const url = `https://demo.squashtest.org/squash/api/rest/latest/projects?page=${page}&size=${maxResults}`
            const request = await fetcher.makeGetRequest(url, SQUASH_HEADERS)
            ret.projects.push(processSquashProjectsBody(request._embedded))
            page++
        }
        ret.projects = ret.projects.flatMap(project => project)
        return ret
    },
    getProjectCampaignsSquash: async function (id) {
        const url = `https://demo.squashtest.org/squash/api/rest/latest/projects/${id}/campaigns`
        const response = await fetcher.makeGetRequest(url, SQUASH_HEADERS)
        return getSquashCampaigns(response)
    },
    getProjectTestsSquash: async function (id) {
        const url = `https://demo.squashtest.org/squash/api/rest/latest/projects/${id}/test-cases`
        const headers = SQUASH_HEADERS
        const response = await fetcher.makeGetRequest(url, headers)
        return getSquashTests(response)
    }
}


function processLeanIssuesBody(body) {
    return Array.isArray(body.issues) ?
        issue_transformer.getLeanIssues(body)
        :
        issue_transformer.getLeanIssueObject(body);
}

function processLeanProjectsBody(body) {
    return Array.isArray(body.values) ?
        project_transformer.getJiraProjects(body)
        :
        project_transformer.getJiraProjectObject(body);
}

function processSquashProjectsBody(body) {
    return Array.isArray(body) ?
        body.map(project => project_transformer.getSquashProjectsObject(project))
        :
        project_transformer.getSquashProjectsObject(body);
}

function processSquashCampaignsBody(body){
    return Array.isArray(body) ?
        body.map(campaign => campaign_transformer.getSquashCampaignObject(campaign))
        :
        campaign_transformer.getSquashCampaignObject(body)
}

function processSquashTestsBody(body){
    return Array.isArray(body) ?
        body.map(test => test_transformer.getSquashTestObject(test))
        :
        test_transformer.getSquashTestObject(body)
}

async function getSquashCampaigns(refObject) {
    let jsonData = {
        campaigns: []
    };
    jsonData.total = refObject._embedded.campaigns.length
    for (const campaign of refObject._embedded.campaigns) {
        let expandedCampaign = await fetcher.makeGetRequest(
            `https://demo.squashtest.org/squash/api/rest/latest/campaigns/${campaign.id}`,
            SQUASH_HEADERS)
        jsonData.campaigns.push(processSquashCampaignsBody(expandedCampaign))
    }
    return jsonData
}

async function getSquashTests(refObject) {
    var jsonData = {
        "test-cases": []
    };
    jsonData.total = refObject._embedded["test-cases"].length

    for (const test of refObject._embedded["test-cases"]){
        let expandedTest = await fetcher.makeGetRequest(
            `https://demo.squashtest.org/squash/api/rest/latest/test-cases/${test.id}`,
            SQUASH_HEADERS)
        jsonData["test-cases"].push(processSquashTestsBody(expandedTest))
    }
    return jsonData
}