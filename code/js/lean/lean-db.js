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

    postLeanProject: function (name, description, user){
        const body = {
            name: name ,
            description: description,
            owner: user,
            members: [],
            dashboards : [
                {
                    name: "Default dashboard",
                    description : "initial dashboard",
                    widgets: []
                }
            ]
        }

        const uri = `${ES_URL}lean-projects/_doc/`
        return fetch.makePostRequest(uri,body)
    },

    postDashboardToProject: async function(projectId, name, description){

        const body = {
            "script": {
                "lang": "painless",
                "inline":"ctx._source.dashboards.add(params)",
                "params":{
                    "name": name,
                    "description" : description,
                    "widgets": []
                }
            }
        }

        const uri = `${ES_URL}lean-projects/_update/${projectId}`
        return fetch.makePostRequest(uri,body)
    },

    addWidgetToProject: function(id, widgetId){

    },

    getIssues: async function (){
        const uri = Uri.GET_ALL_ISSUES;
        const res = await fetch.makeGetRequest(uri, header)
        const hits = res && res.hits
            && res.hits.hits;
        return hits
    },
    createProject : async function(name,description){
        const project = {name:name, description:description, team:[], duration:[], issues:[],tests:[]}
        const uri = `http://localhost:9200/lean/_doc/`
        return fetch.makePostRequest(uri,project)
            .then(res => {
                project.id = res._id
                return project
            })
    },
    deleteProject : async function(id){

        const uri = `http://localhost:9200/lean-projects/_doc/${id}?refresh=true`
        return fetch.makeDeleteRequest(uri)


    }
}