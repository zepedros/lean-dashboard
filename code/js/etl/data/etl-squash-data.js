'use strict'

const fetcher = require('../../uri-fetcher')
const error = require('../../error')
const squash_transformer = require('../transform/etl-squash-transformer')
const SQUASH_HEADERS = {
    'Authorization': `Basic ${Buffer.from(
        'guest_tpl:password'
    ).toString('base64')}`,
    'Accept': 'application/json'
}

function buildURI(credentials) {
    return `https://${credentials.APIPath}/squash/api/rest/latest`
}
function buildHeader(credentials) {
    return {
        'Authorization': `Basic ${Buffer.from(
            `${credentials.username}:${credentials.password}`
        ).toString('base64')}`,
        'Accept':'application/json'
    }
}
module.exports = {
    getProjectsSquash: async function (credentials) {
        let ret = {
            projects: [],
            total: 0
        }

        let page = 0
        let maxPages = 0
        const maxResults = 50

        const url = `${buildURI(credentials)}/projects?page=${page}&size=${maxResults}`
        const header = buildHeader(credentials)
        let firstRequest = await fetcher.makeGetRequest(url, header)

        ret.total = firstRequest.page.totalElements
        maxPages += firstRequest.page.totalPages

        firstRequest._embedded.projects
            .forEach(project =>
                ret.projects
                    .push(squash_transformer.getSquashProjectsObject(project)))

        page++
        while (page < maxPages) {
            const url = `${buildURI(credentials)}/projects?page=${page}&size=${maxResults}`
            const request = await fetcher.makeGetRequest(url, header)
            request._embedded.projects
                .forEach(project =>
                    ret.projects
                        .push(squash_transformer.getSquashProjectsObject(project)))
            page++
        }
        return ret
    },
    getProjectCampaignsSquash: async function (projectId, credentials) {
        const url = `${buildURI(credentials)}/projects/${projectId}/campaigns`
        const header = buildHeader(credentials)
        const response = await fetcher.makeGetRequest(url, header)

        let jsonData = {
            campaigns: [],
            total: 0
        }
        if(response._embedded !== undefined) {
            jsonData.total = response._embedded.campaigns.length
            for (const campaign of response._embedded.campaigns) {
                try {
                    jsonData.campaigns.push(await this.getSquashCampaignById(projectId, campaign.id, credentials))
                } catch(error) {
                    console.log(`no access to ${campaign.id}`)
                }
            }
        }
        return jsonData
    },
    getSquashCampaignById : async function (projectId, campaignId, credentials) {
        const url = `${buildURI(credentials)}/campaigns/${campaignId}`
        const header = buildHeader(credentials)
        const campaign = await fetcher.makeGetRequest(url, header)
        if (campaign.project.id != projectId) {
            throw error.makeErrorResponse(404, "Campaign not present in project")
        }
        return squash_transformer.getSquashCampaignObject(campaign)
    },
    getProjectTestsSquash: async function (projectId, credentials) {
        const url = `${buildURI(credentials)}/projects/${projectId}/test-cases`
        const header = buildHeader(credentials)
        const response = await fetcher.makeGetRequest(url, header)

        const jsonData = {
            "test-cases": [],
            total: response._embedded["test-cases"].length
        };

        for (const test of response._embedded["test-cases"]){
            jsonData["test-cases"].push(await this.getSquashTestById(projectId, test.id, credentials))
        }

        return jsonData
    },
    getSquashTestById : async function (projectId,testId, credentials) {
        const url = `${buildURI(credentials)}/test-cases/${testId}`
        const header = buildHeader(credentials)
        const test = await fetcher.makeGetRequest(url, header)
        if (test.project.id != projectId){
            throw error.makeErrorResponse(404,"Test not present in project")
        }
        return squash_transformer.getSquashTestObject(test)
    },
    getSquashTestsPlans : async function(projectId, credentials) {
        let result = []
        let campaigns = await this.getProjectCampaignsSquash(projectId, credentials)
        const header = buildHeader(credentials)
        for (const campaign of campaigns.campaigns) {
            for (const iteration of campaign.iterations) {
                const url = `${buildURI(credentials)}/iterations/${iteration.id}/test-plan`
                let ret = await fetcher.makeGetRequest(url, header)
                if (ret._embedded !== undefined) { //checks if it exists
                    let test_plan = {
                        "campaign": campaign.id,
                        "test-items": []
                    }
                    for (const test_item of ret._embedded["test-plan"]) {
                        test_plan["test-items"].push(squash_transformer.getSquashTestPlanObject(test_item))
                    }
                    result.push(test_plan)
                }
            }
        }
        return result
    },
}