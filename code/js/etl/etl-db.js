/***
 * TODO
 * We are as of now just returning mock objects. Implementation to both store and get info from ElasticSearch will be added in the future
 */


const fetch = require('../uri-fetcher');
const data = require('./etl-data');

const ES_URL = 'http://localhost:9200/';

module.exports = {

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
      const sprints = await data.getSprintJira()
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
}