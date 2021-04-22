'use strict'

const error = require("./error")
const fetcher = require("./uri-fetcher")

module.exports = {

    getIssues: async function() {
        const url = 'https://leandashboard.atlassian.net/rest/api/3/search?jql='
        const headers = {
            'Authorization': `Basic ${Buffer.from(
              'leandashboardproject@gmail.com:LPcyGdZolN906MvzdwPHF045'
            ).toString('base64')}`,
            'Accept': 'application/json'
          }
        return makeRequest(url, headers)
    }

}

async function makeRequest(url, headers) {
    const response = await fetcher.makeGetRequest(url, headers)
    //return response
    return processBody(response)
}


function processBody(body) {
    return Array.isArray(body) ?
        body.map(show => getShowObject(show))
        :
        getShowObject(body);
}

function getShowObject(refObject) {
    return {
        total: refObject.total,
        issues: refObject.issues,
    }
}
