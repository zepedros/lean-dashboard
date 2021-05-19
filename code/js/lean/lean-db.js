const error = require('../error')
const fetch = require('../uri-fetcher')

const config = {
    host: 'localhost',
    port: 9200,
    index: "lean-etl"
}

const header = { 'Content-type': 'application/json'}

const baseUri = `http://${config.host}:${config.port}/${config.index}/`
const Uri = {
    GET_ALL_ISSUES: `${baseUri}_search/`,
    GET_GROUP_BY_ID: (id)=>`${baseUri}_doc/${id}`,
    CREAT_GROUP: `${baseUri}_doc/`
}
const ES_URL = 'http://localhost:9200/';

module.exports = {

    createProject: function (name, description, user){
        const body = {
            name: name ,
            description: description,
            owner: user,
            members: [],
            dashboards : [
                {
                    id:generateIdDashboard(),
                    name: "Default dashboard",
                    description : "initial dashboard",
                    widgets: []
                }
            ]
        }

        const uri = `${ES_URL}lean-projects/_doc/`
        return fetch.makePostRequest(uri,body)
            .then(body => {
                if(!body.error) return body._id
             })
    },

    getAllProjects: function (){
        const uri = `${ES_URL}lean-projects/_search`
        return fetch.makeGetRequest(uri)
            .then(body => {
                if(body.hits){
                    if(body.hits.hits.length){
                        return body.hits.hits.map(hit => {
                            hit._source.id = hit._id
                            return hit._source
                        })
                    }
                }
            })
    },
    //not wrong at all but is checking in prop owner and must check in prop members too
    getProjects: function (user) {
        const uri = `${ES_URL}lean-projects/_search?q=owner:${user}`
        return fetch.makeGetRequest(uri)
            .then(body => {
                if(body.hits){
                    if(body.hits.hits.length){
                        return body.hits.hits.map(hit => {
                            hit._source.id = hit._id
                            return hit._source
                        })
                    }
                }
            })
    },

    getProjectById: function(projectId){
        const uri = `${ES_URL}lean-projects/_doc/${projectId}`
        return fetch.makeGetRequest(uri)
            .then(body=> {
                if(body.found){
                    body._source.id=body._id
                    return body._source
                }
                else{
                   throw error.create(error.NOT_FOUND,'Project not found')
                }
            })
    },

    updateProject: function(projectId, newName, newDesc){
        var body = {
            "script": {
                "source": "ctx._source.name = params.name; ctx._source.desc = params.desc",
                "params": {
                    "name": `${newName}`,
                    "desc": `${newDesc}`
                }
            }
        };

        const uri = `${ES_URL}lean-projects/_update/${projectId}`
        return fetch.makePostRequest(uri,body)
            .then(body=> {
                if(body.result === 'updated'){
                    return body._id
                }else return error.create(error.NOT_FOUND,'Project not updated')
            })
    },


    deleteProject : async function(id){

    const uri = `http://localhost:9200/lean-projects/_doc/${id}?refresh=true`
    return fetch.makeDeleteRequest(uri)
        .then(body => {
            if(body.result === 'deleted') return body
            else return error.create(error.NOT_FOUND,'Project not found')
        })
    },
    addDashboardToProject: async function(projectId, name, description){
        const id = generateIdDashboard()
        const body = {
            "script": {
                "lang": "painless",
                "inline":"ctx._source.dashboards.add(params)",
                "params":{
                    "id": id,
                    "name": name,
                    "description" : description,
                    "widgets": []
                }
            }
        }

        const uri = `${ES_URL}lean-projects/_update/${projectId}`
        return fetch.makePostRequest(uri,body)
            .then(body=> {
                if(body.result === 'updated'){
                    return id
                }else return error.create(error.NOT_FOUND,'Project not updated')
            })
    },

    removeDashboardFromProject: async function(projectId, dashboardIndex){
        var body = {
            "script": {
                "lang": "painless",
                "inline": "ctx._source.dashboards.remove(params.dashboard)",
                "params": {
                    "dashboard": dashboardIndex
                }
            }
        }
        return fetch.makePostRequest(`${ES_URL}lean-projects/_update/${projectId}`,body)
    },

    addWidgetToDashboard: function(id, widgetId){

    },

    removeWidgetFromDashboard: function (){}
}

function generateIdDashboard() {
    var length = 20,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}