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
            const uri = `${ES_URL}etl-widgets/_doc/${id}`
            return await fetch.makePostRequest(uri,widget)
        }
    }
}