/***
 * TODO
 * We are as of now just returning mock objects. Implementation to both store and get info from ElasticSearch will be added in the future
 */


const fetch = require('../uri-fetcher');
//const data = require('./etl-data');
const templates = [
    {
        name: 'Jira sprint gauge chart',
        function: 'postJiraSprintDateGaugeChart',
        source: 'Jira',
        params: [],
        type:"GaugeChart",
        data: [{
            "sprintName": "Sprint",
            "info": {
                "remaining_days": 1,
                "past_days": 2,
                "difference_in_days": 3,
                "percentage": 4
            }
        }]
    },
    {
        name: 'Jira issues bar chart',
        function: 'postJiraSprintIssuesBarChart',
        source: 'Jira',
        params: [],
        type:"BarChart",
        data: [{
            "name": "Sprint",
            "counts": [
                {
                    "To Do": 1
                },
                {
                    "In Progress": 1
                },
                {
                    "Done": 1
                }
            ]
        }]
    },
    {
        name: "Jira issues data table",
        function: 'postJiraIssuesDataTable',
        source: 'Jira',
        params: [],
        type:"DataTable",
        data: [{
            "key": "key",
            "summary": "a summary",
            "issuetype_name": "type of issue",
            "state": "state of issue"
        }]
    },
    {
        name: 'Squash test results pie chart',
        function: 'postSquashTestsPieChart',
        source: 'Squash',
        params: ["Project Name"],
        type:"PieChart",
        data: [{
            "total": 10,
            "counts": [
                {
                    "status": "SUCCESS",
                    "percentage": "20"
                },
                {
                    "status": "READY",
                    "percentage": "20"
                },
                {
                    "status": "FAILURE",
                    "percentage": "20"
                },
                {
                    "status": "RUNNING",
                    "percentage": "20"
                },
                {
                    "status": "BLOCKED",
                    "percentage": "20"
                }
            ]
        }]
    },
    {
        name: 'Squash test results bar chart',
        function: 'postSquashTestsBarChart',
        source: 'Squash',
        params: ["Project Name"],
        type:"BarChart",
        data: [
            {
                "name": "Squash Tests Bar Chart",
                "counts": [
                    {
                        "SUCCESS": 10
                    },
                    {
                        "READY": 30
                    },
                    {
                        "FAILURE": 5
                    },
                    {
                        "RUNNING": 20
                    },
                    {
                        "BLOCKED": 10
                    }
                ]
            }
        ]
    },
    {
        name: 'Squash test per iteration data table',
        function: 'postSquashTestPerIterationDataTable',
        source: 'Squash',
        params: ["Project Name"],
        type:"DataTable",
        data: [{
            "campaign": 1,
            "iteration": "Iteration",
            "counts": [
                {
                    "status": "status",
                    "counts": 1
                },
                {
                    "status": "otherstatus",
                    "counts": 2
                }
            ]
        }]
    },
    {
        name: 'Azure Work Item by State Bar Graph',
        function: 'postAzureWorkItemByStateBarGraph',
        source: 'Azure',
        params: ["Team Name", "Iteration Name"],
        type: "BarChart",
        data: [
            {
                "name":"",
                "counts":[
                    {
                        "total": 20
                    },
                    {
                        "done": 2
                    },
                    {
                        "new": 4
                    },
                    {
                        "approved": 6
                    },
                    {
                        "committed": 8
                    }

                ]
            }
        ]
    },
    {
        name: "Azure iterations data table",
        function: 'postAzureIterationDataTable',
        source: 'Azure',
        params: ["Team Name"],
        type:"DataTable",
        data: [{
            "name" : "Iteration Name",
            "startDate" : "2021-04-18T00:00:00Z",
            "finishDate" : "2021-05-09T00:00:00Z",
            "timeFrame": "past"
        }]
    },
    {
        name: 'Azure Bug by State Pie Chart',
        function: 'postAzureBugByStatePieChart',
        source: 'Azure',
        params: ["Team Name", "Iteration Name"],
        type:"PieChart",
        data: [
            {
                "total": 10,
                "counts": [
                    {
                        "status": "New",
                        "percentage": "20"
                    },
                    {
                        "status": "Approved",
                        "percentage": "20"
                    },
                    {
                        "status": "Committed",
                        "percentage": "20"
                    },
                    {
                        "status": "Done",
                        "percentage": "20"
                    },
                    {
                        "status": "Removed",
                        "percentage": "20"
                    }
                ]
            }
        ]
    }
]

const ES_URL = process.env.ELASTIC_URL

module.exports = {
    getIssues: async function (){
        const uri = `${ES_URL}lean-etl-issues/_search`;
        const res = await fetch.makeGetRequest(uri)
        const hits = res && res.hits
            && res.hits.hits;
        return hits
    },

    getWidget: async function (id) {
        const uri = `${ES_URL}etl-widgets/_doc/${id}`;
        const res = await fetch.makeGetRequest(uri)
        return res._source
    },

    postWidget: async function(widget,id) {
        if(id === undefined){
            const uri  = `${ES_URL}etl-widgets/_doc`
            return await fetch.makePostRequest(uri,widget)
        } else {
            const uri = `${ES_URL}etl-widgets/_update/${id}`
            const body = {
                "script" : {
                    "source": "ctx._source.data = params.data",
                    "lang": "painless",
                    "params": {
                        "data": widget.data
                    }
                }
            }
            return await fetch.makePostRequest(uri,body)
        }
    },

    createWidgetTemplates: async function(){
        const uri  = `${ES_URL}etl-templates/_doc`
        for(const template of templates) {
            const body = {
                name: template.name,
                function: template.function,
                source: template.source,
                type: template.type,
                params: template.params,
                timeSettings: {},
                credentials: {},
                data: template.data
            }
            await fetch.makePostRequest(uri,body)
        }
    },

    deleteWidgetTemplates: async function(){
        const uri  = `${ES_URL}etl-templates/`
        await fetch.makeDeleteRequest(uri)
    },

    addIdToSchedule: async function(id) {
        const uri  = `${ES_URL}scheduler-ids/_update/1`
        const body = {
            "script" : {
                "source": "ctx._source.ids.add(params.id)",
                "lang": "painless",
                "params": {
                    "id" : id
                }
            }
        }
        await fetch.makePostRequest(uri,body)
    },

    deleteIdFromSchedule : async function(id) {
        const uri  = `${ES_URL}scheduler-ids/_update/1`
        const body = {
            "script" : {
                "source":
                    "for (int i=ctx._source.ids.length-1; i>=0; i--) {\n" +
                    "                    if (ctx._source.ids[i] == params.idToRemove) {\n" +
                    "                        ctx._source.ids.remove(i);\n" +
                    "                    }\n" +
                    "                }",
                "lang": "painless",
                "params": {
                    "idToRemove" : id
                }
            }
        }
        await fetch.makePostRequest(uri,body)
    },

    getAllScheduledIds: async function() {
        const uri  = `${ES_URL}scheduler-ids/_doc/1`
        const resp = await fetch.makeGetRequest(uri)
        return resp
    },

    createScheduleArray: async function() {
        const uri  = `${ES_URL}scheduler-ids/_doc/1`
        const body = {
            "ids": []
        }
        return await fetch.makePostRequest(uri, body)
    }
}