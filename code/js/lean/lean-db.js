const error = require('../error')
const fetch = require('../uri-fetcher')
const etlDb = require('../etl/etl-db')

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
const ES_URL = 'http://localhost:9200/';

module.exports = {

    createProject: function (name, description, user){
        const body = {
            name: name ,
            description: description,
            owner: user,
            members: [],
            dashboards : []
        }

        const uri = `${ES_URL}lean-projects/_doc/`
        return fetch.makePostRequest(uri,body)
            .then(body => {
                if(!body.error) return body._id
                else return error.create(error.DATABASE_ERROR,`Bad Gateway: Error in DataBase, too many requests!`)
             })
    },

    getAllProjects: function (){
        const uri = `${ES_URL}lean-projects/_search`
        return fetch.makeGetRequest(uri)
            .then(body => {
                if(body.hits){
                    if(body.hits.hits.length){
                        return body.hits.hits.map(hit => {
                            hit._source.id = hit._id
                            return hit._source
                        })
                    }
                }
            })
    },
    //not wrong at all but is checking in prop owner and must check in prop members too
    getProjects: function (user) {
        const uri = `${ES_URL}lean-projects/_search?q=owner:${user}`
        return fetch.makeGetRequest(uri)
            .then(body => {
                if(body.hits){
                    if(body.hits.hits.length){
                        return body.hits.hits.map(hit => {
                            hit._source.id = hit._id
                            return hit._source
                        })
                    }
                }
            })
    },

    getProjectById: function(projectId){
        const uri = `${ES_URL}lean-projects/_doc/${projectId}`
        return fetch.makeGetRequest(uri)
            .then(body=> {
                if(body.found){
                    body._source.id=body._id
                    return body._source
                }
                else{
                   throw error.create(error.NOT_FOUND,'Project not found')
                }
            })
    },

    updateProject: function(projectId, newName, newDesc){
        const body = {
            "script": {
                "source": "ctx._source.name = params.name; ctx._source.desc = params.desc",
                "params": {
                    "name": `${newName}`,
                    "desc": `${newDesc}`
                }
            }
        };

        const uri = `${ES_URL}lean-projects/_update/${projectId}`
        return fetch.makePostRequest(uri,body)
            .then(result=> {
                    if(result.result === "updated")
                        return projectId
                    else throw error.create(error.NOT_FOUND,'Project does not exist')
                }
            )
    },


    deleteProject : async function(id){
    const projectDashboards = await this.getProjectById(id)
                                        .then(body => body.dashboards)
    for(i = 0; i<projectDashboards.length;i++){
        await this.removeDashboardFromProject(id,projectDashboards[i],i)
    }
    const uri = `${ES_URL}lean-projects/_doc/${id}?refresh=true`
    return fetch.makeDeleteRequest(uri)
        .then(body => {
            if(body.result === 'deleted') return body
            else return error.create(error.NOT_FOUND,'Project not found')
        })
    },
    addDashboardToProject: async function(projectId, name, description) {
        const uriProject = `${ES_URL}lean-projects/_update/${projectId}`
        const dashboard = {
            "name": name,
            "description": description,
            "widgets": []
        }

        const uri = `${ES_URL}lean-dashboards/_doc/`
        const response = await fetch.makePostRequest(uri, dashboard)
        if (!response.error) {
            const updateProject = {
                "script": {
                    "source": "ctx._source.dashboards.add(params.dashboardId)",
                    "params": {
                        "dashboardId": `${response._id}`
                    }
                }
            };
            return await fetch.makePostRequest(uriProject, updateProject)
                .then(body=> {
                    return response._id
                })
        }
    },

    removeDashboardFromProject: async function(projectId,dashboardId, dashboardIndex){
        const uri = `${ES_URL}lean-dashboards/_doc/${dashboardId}?refresh=true`
        var body = {
            "script": {
                "lang": "painless",
                "inline": "ctx._source.dashboards.remove(params.dashboard)",
                "params": {
                    "dashboard": dashboardIndex
                }
            }
        }
        return fetch.makePostRequest(`${ES_URL}lean-projects/_update/${projectId}`,body)
            .then( await fetch.makeDeleteRequest(uri))
                .then(body => {
                    if(body.result === 'updated') return body
                    else return Promise.reject(error.create(error.NOT_FOUND,'Dashboard not found'))
                })
    },

    getDashboardFromProject: async function(projectId,dashboardId){
        const uri = `${ES_URL}lean-dashboards/_doc/${dashboardId}`
        return fetch.makeGetRequest(uri)
            .then(response => {
                if(response.found){
                    return response._source
                }
                else return error.create(error.NOT_FOUND,'Dashboard not found')
        })

    },
    updateDashboardFromProject: async function(dashboardId, newName, newDesc){
        const body = {
            "script": {
                "source": "ctx._source.name = params.name; ctx._source.description = params.description",
                "params": {
                    "name": `${newName}`,
                    "description": `${newDesc}`
                }
            }
        };

        const uri = `${ES_URL}lean-dashboards/_update/${dashboardId}`
        return fetch.makePostRequest(uri,body)
            .then(result=> {
                    if(result.result === "updated")
                        return dashboardId
                    else throw error.create(error.NOT_FOUND,'Dashboard does not exist')
                }
            )
    },

    getWidgetTemplates: function (){
        const uri = `${ES_URL}etl-templates/_search`
        return fetch.makeGetRequest(uri)
            .then(body => {
                if(body.hits){
                    if(body.hits.hits.length){
                        return body.hits.hits.map(hit => {
                            hit._source.id = hit._id
                            return hit._source
                        })
                    }
                }
            })
    },

    addWidgetToDashboard: function(dashboardId,widgetId,timeSettings,credentials){
        const uri = `${ES_URL}etl-templates/_doc/${widgetId}`
        const uriWidget  = `${ES_URL}etl-widgets/_doc`
        const dashboard = `${ES_URL}lean-dashboards/_update/${dashboardId}`
        return fetch.makeGetRequest(uri)
            .then(body=> {
                if(body.found){
                    const bodyWidget = {
                        name: body._source.name,
                        function: body._source.function,
                        source: body._source.source,
                        params: [],
                        timeSettings: timeSettings,
                        credentials: credentials,
                        data: body._source.data
                    }
                    return fetch.makePostRequest(uriWidget,bodyWidget)
                        .then(response => {
                            const widget = {
                                "script": {
                                    "source": "ctx._source.widgets.add(params.widget)",
                                    "params": {
                                        "widget":response._id
                                    }
                                }
                            };
                            fetch.makePostRequest(dashboard,widget)
                                .then(result=>{
                                    if(result.result == "updated")
                                        return dashboardId
                                })
                        })
                }
                else{
                    throw error.create(error.NOT_FOUND,'Widget not found')
                }
            })

    },

    removeWidgetFromDashboard: function (){},

    addTeamMembers: function(){},
    removeTeamMembers: function(){},
    getProfile: function(){},
    updateProfile: function (){},
    removeUser: function() {}
}