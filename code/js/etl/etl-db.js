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


    getIssues: function () {
        return {
            "issue": [
                {
                    "key": "SEC-1",
                    "id": "10004",
                    "summary": "Second Project Issue",
                    "reportes": "6081966b739dd40069ce327a",
                    "state": "To Do",
                    "created": "2021-04-26T17:03:58.869+0100"
                },
                {
                    "key": "LEAN-4",
                    "id": "10003",
                    "summary": "Done Issue Test",
                    "reportes": "6081966b739dd40069ce327a",
                    "state": "Done",
                    "created": "2021-04-22T16:34:39.713+0100"
                },
                {
                    "key": "LEAN-3",
                    "id": "10002",
                    "summary": "Progress Issue Test",
                    "reportes": "6081966b739dd40069ce327a",
                    "state": "In Progress",
                    "created": "2021-04-22T16:34:33.127+0100"
                },
                {
                    "key": "LEAN-2",
                    "id": "10001",
                    "summary": "Another Issue Test",
                    "reportes": "6081966b739dd40069ce327a",
                    "state": "To Do",
                    "created": "2021-04-22T16:33:36.457+0100"
                },
                {
                    "key": "LEAN-1",
                    "id": "10000",
                    "summary": "Test Issue",
                    "reportes": "6081966b739dd40069ce327a",
                    "state": "To Do",
                    "created": "2021-04-22T16:33:17.540+0100"
                }
            ],
            "total": 5
        }
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