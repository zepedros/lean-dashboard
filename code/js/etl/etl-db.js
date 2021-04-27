/***
 * TODO
 * We are as of now just returning mock objects. Implementation to both store and get info from ElasticSearch will be added in the future
 */


const fetch = require('../uri-fetcher');
const data = require('./etl-data');

const ES_URL = 'http://localhost:9200/';

module.exports = {


    postIssues : async function(){
        const issues = await data.getIssuesJira()
        const uri = `http://localhost:9200/lean-etl/_doc`
        return fetch.makePostRequest(uri,issues)
    },


    getIssues: async function (){
        const uri = `${ES_URL}lean-etl/_search`;
        const res = await fetch.makeGetRequest(uri)
        const hits = res && res.hits
            && res.hits.hits;
        return hits
    },

    getIssuesById: function (id){
        //id is not yet used, since we are just returning mock objects
        return {
            "id": "10003",
            "key": "LEAN-4",
            "description": [
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "type": "text",
                            "text": "Test test tes"
                        }
                    ]
                }
            ],
            "created": "2021-04-22T16:34:39.713+0100",
            "summary": "Done Issue Test",
            "updated": "2021-04-25T19:39:09.113+0100",
            "state": "Done",
            "creator": []
        }
    },

    getProjects: function (){
        return {
            "project": [
                {
                    "key": "LEAN",
                    "id": "10000",
                    "name": "LeanDashboardTest",
                    "projectTypeKey": "business"
                },
                {
                    "key": "SEC",
                    "id": "10001",
                    "name": "SecondProjectForTests",
                    "projectTypeKey": "business"
                }
            ],
            "total": 2
        }
    },

    getProjectById: function (id){
        //id is not yet used, since we are just returning mock objects
        return {
            "id": "10000",
            "key": "LEAN",
            "description": "",
            "name": "Lean Dashboard"
        }
    }

}