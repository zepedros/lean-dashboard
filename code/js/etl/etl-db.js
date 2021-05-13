/***
 * TODO
 * We are as of now just returning mock objects. Implementation to both store and get info from ElasticSearch will be added in the future
 */


const fetch = require('../uri-fetcher');
//const data = require('./etl-data');

const ES_URL = 'http://localhost:9200/';

module.exports = {
    getIssues: async function (){
        const uri = `${ES_URL}lean-etl-issues/_search`;
        const res = await fetch.makeGetRequest(uri)
        const hits = res && res.hits
            && res.hits.hits;
        return hits
    },

    postWidget: async function(widget) {
        const uri  = `${ES_URL}etl-widgets/_doc`
        return await fetch.makePostRequest(uri,widget)
    }
}