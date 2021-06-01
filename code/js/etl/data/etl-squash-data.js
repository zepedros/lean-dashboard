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
        let firstRequest
        try {

            firstRequest = await fetcher.makeGetRequest(url, header)
        } catch (ex) {
            if (ex.type === 'invalid-json') {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Credentials Wrong')
            } else {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'APIPath does not exist')
            }
        }
        if (firstRequest.ok === false) throw error.makeErrorResponse(firstRequest.status, firstRequest.statusText)
        ret.total = firstRequest.page.totalElements
        maxPages += firstRequest.page.totalPages

        firstRequest._embedded.projects
            .forEach(project =>
                ret.projects
                    .push(squash_transformer.getSquashProjectsObject(project)))

        page++
        while (page < maxPages) {
            const url = `${buildURI(credentials)}/projects?page=${page}&size=${maxResults}`
            let request
            try {
                request = await fetcher.makeGetRequest(url, header)
            } catch (ex) {
                if (ex.type === 'invalid-json') {
                    throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Credentials Wrong')
                } else {
                    throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'APIPath does not exist')
                }
            }
            if (request.ok === false) throw error.makeErrorResponse(request.status, request.statusText)
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
        let response
        try {
            response = await fetcher.makeGetRequest(url, header)
        } catch (ex) {
            if (ex.type === 'invalid-json') {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Credentials Wrong')
            } else {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'APIPath does not exist')
            }
        }
        if (response.ok === false) throw error.makeErrorResponse(response.status, response.statusText)
        if (!response._embedded) throw error.makeErrorResponse(error.NOT_FOUND, 'Project does not exist or has no Campaigns')
        let jsonData = {
            campaigns: [],
            total: 0
        }
        jsonData.total = response._embedded.campaigns.length
        for (const campaign of response._embedded.campaigns) {
            try {
                jsonData.campaigns.push(await this.getSquashCampaignById(projectId, campaign.id, credentials))
            } catch (error) {
                console.log(`no access to ${campaign.id}`)
            }
        }
        return jsonData
    },
    getSquashCampaignById : async function (projectId, campaignId, credentials) {
        const url = `${buildURI(credentials)}/campaigns/${campaignId}`
        const header = buildHeader(credentials)
        let campaign
        try {
            campaign = await fetcher.makeGetRequest(url, header)
        } catch (ex) {
            if (ex.type === 'invalid-json') {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Credentials Wrong')
            } else {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'APIPath does not exist')
            }
        }
        if (campaign.ok === false) throw error.makeErrorResponse(campaign.status, campaign.statusText)
        if (!campaign) throw error.makeErrorResponse(error.NOT_FOUND, 'Campaign does not exist')
        if (campaign.project.id != projectId) {
            throw error.makeErrorResponse(404, "Campaign not present in project")
        }
        return squash_transformer.getSquashCampaignObject(campaign)
    },
    getProjectTestsSquash: async function (projectId, credentials) {
        const url = `${buildURI(credentials)}/projects/${projectId}/test-cases`
        const header = buildHeader(credentials)
        let response
        try {
            response = await fetcher.makeGetRequest(url, header)
        } catch (ex) {
            if (ex.type === 'invalid-json') {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Credentials Wrong')
            } else {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'APIPath does not exist')
            }
        }
        if (response.ok === false) throw error.makeErrorResponse(response.status, response.statusText)
        if (!response._embedded) throw error.makeErrorResponse(error.NOT_FOUND, 'Project does not exist or has no test cases')
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
        let test
        try {
            test = await fetcher.makeGetRequest(url, header)
        } catch (ex) {
            if (ex.type === 'invalid-json') {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Credentials Wrong')
            } else {
                throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'APIPath does not exist')
            }
        }
        if (test.ok === false) throw error.makeErrorResponse(test.status, test.statusText)
        if(!test) throw error.makeErrorResponse(error.NOT_FOUND, 'Test does not exist')
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
                let ret
                try {
                    ret = await fetcher.makeGetRequest(url, header)
                } catch (ex) {
                    if (ex.type === 'invalid-json') {
                        throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'Credentials Wrong')
                    } else {
                        throw error.makeErrorResponse(error.ARGUMENT_ERROR, 'APIPath does not exist')
                    }
                }
                if (ret.ok === false) throw error.makeErrorResponse(ret.status, ret.statusText)
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