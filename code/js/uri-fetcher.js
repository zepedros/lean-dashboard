'use strict'
const fetch = require('node-fetch')
const defaultHeader = {'Content-type': 'application/json'}
const error = require("./error")
const URI_METHOD = {GET: "get", POST: "post", PUT: "put", DELETE: "delete"}

module.exports = {
    makeGetRequest: async function makeGetRequest(uri, headers, body, params) {
        return makeRequest(uri, URI_METHOD.GET, body, headers || defaultHeader, params)
    },

    makePostRequest: async function makePostRequest(uri, body, headers) {
        return makeRequest(uri, URI_METHOD.POST, body, headers || defaultHeader)
    },

    makePutRequest: async function makePutRequest(uri, body, headers) {
        return makeRequest(uri, URI_METHOD.PUT, body, headers || defaultHeader)
    },

    makeDeleteRequest: async function makeDeleteRequest(uri, body) {
        return makeRequest(uri, URI_METHOD.DELETE, body)
    }
}

async function makeRequest(uri, method, body, headers, params) {
    console.log(`Making a request to ${uri} `)
    const response = await fetch(uri, options(method, body, headers, params))
    if (!response.ok ){
        throw error.create(response.status, response.statusText)
    }
    return await response.json();
}

function options(method, body, header, params) {
    return {
        method: method,
        body: body ? JSON.stringify(body) : undefined,
        headers: header,
        params: params

    }
}
