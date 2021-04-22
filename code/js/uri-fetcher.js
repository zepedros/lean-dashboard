'use strict'
const fetch = require('node-fetch')
//const header = { 'Content-Type': 'application/json' }
const error = require("./error")
const URI_METHOD = {GET: "get",POST:"post",PUT:"put",DELETE: "delete"}

module.exports = {
    makeGetRequest : async function makeGetRequest(uri,headers, body) {
      return makeRequest(uri, URI_METHOD.GET, body, headers)
    },

    makePostRequest:async function makePostRequest(uri, body) {
        return makeRequest(uri, URI_METHOD.POST, body)
    },

    makePutRequest: async function makePutRequest(uri,body) {
        return makeRequest(uri, URI_METHOD.PUT, body)
    },

    makeDeleteRequest: async function makeDeleteRequest(uri,body) {
        return makeRequest(uri, URI_METHOD.DELETE, body)
    }
}

async function makeRequest(uri, method, body, headers) {
    console.log(`Making a request to ${uri} `)
    try{
      const response =  await fetch(uri,options(method,body,headers))
      return await response.json();
    }
    catch(err){
      throw error.create(err.status || 400, err.reason ||'Something went wrong')
    }
}

function options(method,body, header) {
        return {
            method: method,
             body: body?JSON.stringify(body): undefined,
             headers: header
          }
    }
