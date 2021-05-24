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
        data: [{
            "sprintName": "Sprint",
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
        name: 'Squash test results pie chart',
        function: 'postSquashTestsPieChart',
        source: 'Squash',
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
        name: 'Squash test per iteration data table',
        function: 'postSquashTestPerIterationDataTable',
        source: 'Squash',
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
    }
]

const ES_URL = 'http://localhost:9200/';

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
                params: [],
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
    }
}