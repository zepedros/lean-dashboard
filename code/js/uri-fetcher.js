'use strict'
const fetch = require('node-fetch')
const defaultHeaders = {'Content-type': 'application/json'}
const error = require("./error")
const URI_METHOD = {GET: "get", POST: "post", PUT: "put", DELETE: "delete"}

module.exports = {
    makeGetRequest: async function makeGetRequest(uri, headers, body) {
        return makeRequest(uri, URI_METHOD.GET, body, headers || defaultHeaders)
    },

    makePostRequest: async function makePostRequest(uri, body, headers) {
        return makeRequest(uri, URI_METHOD.POST, body, headers || defaultHeaders)
    },

    makePutRequest: async function makePutRequest(uri, body, headers) {
        return makeRequest(uri, URI_METHOD.PUT, body, headers || defaultHeaders)
    },

    makeDeleteRequest: async function makeDeleteRequest(uri, body, headers) {
        return makeRequest(uri, URI_METHOD.DELETE, body, headers || defaultHeaders)
    }
}

async function makeRequest(uri, method, body, headers) {
    console.log(`Making a request to ${uri} `)
    const response = await fetch(uri, options(method, body, headers))
   /* if (!response.ok ){
        throw error.create(response.status, response.statusText)
    }*/
    return await response.json();
}

function options(method, body, header) {
    return {
        method: method,
        body: body ? JSON.stringify(body) : undefined,
        headers: header
    }
}
