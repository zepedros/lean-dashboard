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

module.exports = {
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
            total: 0
        }
        if(response._embedded !== undefined) {
            jsonData.total = response._embedded.campaigns.length
            for (const campaign of response._embedded.campaigns) {
                try {
                    jsonData.campaigns.push(await this.getSquashCampaignById(projectId, campaign.id))
                } catch(error) {
                    console.log(`no access to ${campaign.id}`)
                }
            }
        }
        return jsonData
    },
    getSquashCampaignById : async function (projectId, campaignId) {
        const url = `https://demo.squashtest.org/squash/api/rest/latest/campaigns/${campaignId}`
        const campaign = await fetcher.makeGetRequest(url, SQUASH_HEADERS)
        if (campaign.project.id != projectId) {
            throw error.create(404, "Campaign not present in project")
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
    getSquashTestsPlans : async function(projectId) {
        let result = []
        let campaigns = await this.getProjectCampaignsSquash(projectId)
        for (const campaign of campaigns.campaigns) {
            for (const iteration of campaign.iterations) {
                const url = `https://demo.squashtest.org/squash/api/rest/latest/iterations/${iteration.id}/test-plan`
                let ret = await fetcher.makeGetRequest(url, SQUASH_HEADERS)
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