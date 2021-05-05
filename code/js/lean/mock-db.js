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

module.exports = {
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
    }
}