const error = require('../error')
const fetch = require('../uri-fetcher')

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

    getProjects: function (user) {
        const uri = `${ES_URL}lean-projects/_search?q=members:${user} owner:${user}&default_operator=OR`
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
        const widgets = await this.getDashboardFromProject(id,projectDashboards[i])
            .then(body => body.widgets)
        for(l = 0; l < widgets.length; l++){
            await this.removeWidgetFromDashboard(id,projectDashboards[i],widgets[l])
        }
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
        else return Promise.reject(error.create(error.DATABASE_ERROR,'Add Dashboard to Project Failed'))

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
                    response._source.id = response._id
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

    getWidgetTemplates: async function (){
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

    addWidgetToDashboard: async function(dashboardId,widgetId,timeSettings,credentials){
        const uri = `${ES_URL}etl-templates/_doc/${widgetId}`
        const uriWidget  = `${ES_URL}etl-widgets/_doc`
        const uriDashboard = `${ES_URL}lean-dashboards/_update/${dashboardId}`

        let bodyWidget
        return fetch.makeGetRequest(uri)
            .then(body=> {
                if(body.found){
                    bodyWidget = {
                        name: body._source.name,
                        function: body._source.function,
                        source: body._source.source,
                        params: [],
                        updateTime: timeSettings,
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
                            return fetch.makePostRequest(uriDashboard,widget)
                                .then(result=>{
                                    if(result.result === "updated")
                                        return response._id
                                })

                        })
                }
                else{
                    throw error.create(error.NOT_FOUND,'Widget not found')
                }
            })

    },

    updateWidget: async function(widgetId,newTimeSettings,newCredentials){
        const uriWidget =  `${ES_URL}etl-widgets/_update/${widgetId}`
        var body = {
            "script": {
                "lang": "painless",
                "inline": "ctx._source.credentials=params.credentials;ctx._source.updateTime=params.timeSettings",
                "params": {
                    "timeSettings":newTimeSettings,
                    "credentials": newCredentials
                }
            }
        }
        return fetch.makePostRequest(uriWidget,body)
            .then(result=> {
                    if(result.result === "updated")
                        return widgetId
                    else throw error.create(error.NOT_FOUND,'Widget does not exist')
                }
            )
    },

    removeWidgetFromDashboard: async function (projectId,dashboardId,widgetId) {
        const uri = `${ES_URL}etl-widgets/_doc/${widgetId}?refresh=true`
        const dashboardWidget = await this.getDashboardFromProject(projectId, dashboardId)
            .then(body => body.widgets)
        const widgetIndex = dashboardWidget.findIndex(w => w === widgetId)
        if(widgetIndex === -1){
            return Promise.reject(error.create(error.NOT_FOUND,'Widget does not exists'))
        }
        else{
            var body = {
                "script": {
                    "lang": "painless",
                    "inline": "ctx._source.widgets.remove(params.widget)",
                    "params": {
                        "widget": widgetIndex
                    }
                }
            }
            const uriDashboard = `${ES_URL}lean-dashboards/_update/${dashboardId}`
            await fetch.makePostRequest(uriDashboard,body)
                .then(result=> {
                        if(result.result !== "updated")
                            throw error.create(error.NOT_FOUND,'Dashboard does not exist')
                    }
                )
            return fetch.makeDeleteRequest(uri)
                .then(body => {
                    if(body.result === 'deleted') return dashboardId
                    else return error.create(error.NOT_FOUND,'Widget not found')
                })
        }
    },

    addUserToProject: async function(projectId, username){
        const uriProject = `${ES_URL}lean-projects/_update/${projectId}`
        const updateProject = {
            "script": {
                "source": "ctx._source.members.add(params.username)",
                "params": {
                    "username": `${username}`
                }
            }
        };
        return fetch.makePostRequest(uriProject, updateProject)
            .then(body=> {
                return body._id
            })
    },

    removeUserFromProject: async function(projectId, usernameIndex){
        const uriProject = `${ES_URL}lean-projects/_update/${projectId}`
        const updateProject = {
            "script": {
                "source" : "ctx._source.members.remove(params.index)",
                "params": {
                    "index": usernameIndex
                }
            }
        };
        return fetch.makePostRequest(uriProject, updateProject)
            .then(body=> {
                return body._id
            })
    },
}