const fetch = require('./uri-fetcher');
const data = require('./etl-data');

const ES_URL = 'http://localhost:9200/';

module.exports = {
    issuesJira : function(issues){
        console.log(issues)
        const uri = `http://localhost:9200/lean-etl/_doc`
        return fetch.makePostRequest(uri,issues)
            .then(res => {
                return res
            })
    },

    postIssues : async function(){
        const issues = await data.getIssuesJira()
        const uri = `http://localhost:9200/lean-etl/_doc`
        return fetch.makePostRequest(uri,issues)
    }
}
