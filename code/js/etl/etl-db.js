/***
 * TODO
 * We are as of now just returning mock objects. Implementation to both store and get info from ElasticSearch will be added in the future
 */


const fetch = require('../uri-fetcher');
const data = require('./etl-data');

const ES_URL = 'http://localhost:9200/';

module.exports = {

    /*
    TODO remove this method
     */
    postProjects: async function(){
        const projects = await data.getProjectsJira()
        let projectMap = new Map()

        projects.values.forEach(project => {
            project.issues = []
            projectMap.set(project.id, project)
        })

        const issues = await data.getIssuesJira()

        issues.forEach(issue => {
            projectMap.get(issue.idProject).issues.push(issue)
        })

        projectMap.forEach((values,keys) => {
            const uri = `http://localhost:9200/lean-etl-project/_doc/${keys}`
            fetch.makePutRequest(uri,values)
        })
    },

    postSprint: async function(){
      const sprints = await data.getAllSprintsJira()
      sprints.forEach(sprint => {
          const uri = `http://localhost:9200/lean-etl-widgets/_doc/${sprint.projectId}`
      })
    },

    getIssues: async function (){
        const uri = `${ES_URL}lean-etl-issues/_search`;
        const res = await fetch.makeGetRequest(uri)
        const hits = res && res.hits
            && res.hits.hits;
        return hits
    },

    postJiraIssuesDataTable: async function(){
        let issues = (await data.getIssuesJira()).issues.map(issue => {
            return {
                key : issue.key,
                summary : issue.summary,
                issuetype_name : issue.issuetype_name,
                priority : issue.priority,
                state: issue.state
            }
        })

        let widget = {
            name : "Jira issues data table",
            columns: [
                'Key',
                'Summary',
                'Issue Type',
                'Priority',
                'State'
            ],
            data : issues
        }

        const uri  = `${ES_URL}etl-widgets/_doc`
        return await fetch.makePostRequest(uri,widget)
    },

    postJiraSprintIssuesBarChart: async function(){
        let widget = {
            name : "Jira issues pie chart",
            data : []
        }

        const sprints = (await data.getAllSprintsJira()).filter(sprint => sprint.state == 'active')
        let a = this.postJiraSprintDateGaugeChart()
        for (const sprint of sprints){
            const issues = (await data.getSprintIssues(sprint.id)).issues.map(issue => issue.state)

            let counts = {}
            issues.forEach(
                function(x) {
                    counts[x] = (counts[x] || 0)+1;
                });

            let alisa = []
            for (const prop in counts){
                alisa.push({
                    [prop] : counts[prop]
                })
            }
            widget.data.push({
                sprintName : sprint.name,
                counts : alisa
            })
        }

        const uri  = `${ES_URL}etl-widgets/_doc`
        return await fetch.makePostRequest(uri,widget)
    },

    postJiraSprintDateGaugeChart : async function() {

        let widget = {
            name: "Jira sprint gauge chart",
            data: []
        }

        const sprints = (await data.getAllSprintsJira()).filter(sprint => sprint.state == 'active')

        sprints.map(sprint => {

            let today = new Date().toISOString().slice(0,10)
            let remaining_days = (new Date(sprint.endDate.substring(0,10))- new Date(today))/ (1000 * 3600 * 24)
            let past_days = (new Date(today)-new Date(sprint.startDate.substring(0,10))) / (1000 * 3600 * 24)
            let difference_in_days = (new Date(sprint.endDate.substring(0,10))- (new Date(sprint.startDate.substring(0,10))))/ (1000 * 3600 * 24)
            let percentage = parseInt((past_days*100)/difference_in_days)
            widget.data.push({
                sprintName: sprint.name,
                info: {
                    remaining_days: remaining_days,
                    past_days: past_days,
                    difference_in_days: difference_in_days,
                    percentage: percentage
                }
            })
        })
        const uri  = `${ES_URL}etl-widgets/_doc`
        return await fetch.makePostRequest(uri,widget)
    }
}