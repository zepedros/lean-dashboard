const error = require('../error')
const fetch = require('../uri-fetcher')
const scheduler = require("../etl/scheduler/etl-scheduler");

const config = {
    host: 'localhost',
    port: 9200,
    index: "lean-etl"
}

const header = {'Content-type': 'application/json'}

const baseUri = `http://${config.host}:${config.port}/${config.index}/`
const Uri = {
    GET_ALL_ISSUES: `${baseUri}_search/`,
    GET_GROUP_BY_ID: (id) => `${baseUri}_doc/${id}`,
    CREAT_GROUP: `${baseUri}_doc/`
}
const ES_URL = 'http://localhost:9200/';

module.exports = {

    createProject: function (name, description, userId, formattedStartDate, formattedEndDate) {
        const body = {
            name: name,
            description: description,
            state: "Open",
            owner: userId,
            members: [],
            credentials: [],
            dashboards: [],
            startDate: formattedStartDate,
            endDate: formattedEndDate
        }

        const uri = `${ES_URL}lean-projects/_doc/`
        return fetch.makePostRequest(uri, body)
            .then(body => {
                if (!body.error) return body._id
                else return error.makeErrorResponse(error.DATABASE_ERROR, `Bad Gateway: Error in DataBase, too many requests!`)
            })
    },

    getAllProjects: function (userMakingRequest) {
        //const uri = `${ES_URL}lean-projects/_search`
        const uri = `${ES_URL}lean-projects/_search?size=1000&q=members:${userMakingRequest.id} owner:${userMakingRequest.id}&default_operator=OR`
        return fetch.makeGetRequest(uri)
            .then(body => {
                if (body.hits) {
                    if (body.hits.hits) {
                        return body.hits.hits.map(hit => {
                            hit._source.id = hit._id
                            return hit._source
                        })
                    }
                }
            })
    },

    getProjects: function (user, userMakingRequest) {
        const uri = userMakingRequest.id === 1 ?
            `${ES_URL}lean-projects/_search?size=1000`
            :
            `${ES_URL}lean-projects/_search?size=1000&q=members:${userMakingRequest.id} owner:${userMakingRequest.id}&default_operator=OR`
        return fetch.makeGetRequest(uri)
            .then(body => {
                if (body.hits) {
                    if (body.hits.hits) {
                        return body.hits.hits.map(hit => {
                            hit._source.id = hit._id
                            return hit._source
                        })
                    }
                }
            })
    },

    getProjectById: function (projectId) {
        const uri = `${ES_URL}lean-projects/_doc/${projectId}`
        return fetch.makeGetRequest(uri)
            .then(body => {
                if (body.found) {
                    body._source.id = body._id
                    return body._source
                } else {
                    throw error.makeErrorResponse(error.NOT_FOUND, 'Project not found')
                }
            })
    },

    updateProject: function (projectId, newName, newDesc) {
        let source = newName ? "ctx._source.name = params.name; " : ""
        source += newDesc ? "ctx._source.description = params.desc" : ""
        const body = {
            "script": {
                "source": source,
                "params": {
                    "name": `${newName}`,
                    "desc": `${newDesc}`
                }
            }
        };

        const uri = `${ES_URL}lean-projects/_update/${projectId}`
        return fetch.makePostRequest(uri, body)
            .then(result => {
                    if (result.result === "updated")
                        return projectId
                    else throw error.makeErrorResponse(error.NOT_FOUND, 'Project does not exist')
                }
            )
    },

    changeProjectOwner: async function (projectId, newOwnerInfo) {
        const source = "ctx._source.owner = params.newOwnerId;"
        const body = {
            "script": {
                "source": source,
                "params": {
                    "newOwnerId": newOwnerInfo.id,
                }
            }
        };
        const uri = `${ES_URL}lean-projects/_update/${projectId}`
        return fetch.makePostRequest(uri, body)
            .then(result => {
                    if (result.result === "updated")
                        return projectId
                    else throw error.makeErrorResponse(error.NOT_FOUND, 'Project does not exist')
                }
            )
    },

    deleteProject: async function (id, user) {
        const projectState = await this.getProjectById(id)
            .then(body => body.state)
        if(projectState == "Open") {
            const body = {
                "script": {
                    "source": "ctx._source.state = params.state;",
                    "params": {
                        "state": "Archived"
                    }
                }
            };

            const uri = `${ES_URL}lean-projects/_update/${id}`
            return fetch.makePostRequest(uri, body)
                .then(result => {
                        if (result.result === "updated")
                            return id
                        else throw error.makeErrorResponse(error.NOT_FOUND, 'Project does not exist')
                    }
                )
        } else {
            return Promise.reject(error.makeErrorResponse(error.NOT_FOUND, 'Project was already archived'))
            /*
            const projectDashboards = await this.getProjectById(id)
                .then(body => body.dashboards)
            for (i = 0; i < projectDashboards.length; i++) {
                const widgets = await this.getDashboardFromProject(id, projectDashboards[i])
                    .then(body => body.widgets)
                for (l = 0; l < widgets.length; l++) {
                    await this.removeWidgetFromDashboard(id, projectDashboards[i], widgets[l])
                }
                await this.removeDashboardFromProject(id, projectDashboards[i], i)
            }
            const projectCredentials = await this.getProjectById(id)
                .then(body => body.credentials)
            for(i = 0; i < projectCredentials.length; i++) {
                await this.deleteCredential(id,projectCredentials[i])
            }
            const uri = `${ES_URL}lean-projects/_doc/${id}?refresh=true`
            return fetch.makeDeleteRequest(uri)
                .then(body => {
                    if (body.result === 'deleted') return body
                    else return error.makeErrorResponse(error.NOT_FOUND, 'Project not found')
                })*/
        }

    },
    addDashboardToProject: async function (projectId, name, description) {
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
                .then(body => {
                    return response._id
                })
        } else return Promise.reject(error.makeErrorResponse(error.DATABASE_ERROR, 'Add Dashboard to Project Failed'))

    },

    removeDashboardFromProject: async function (projectId, dashboardId, dashboardIndex) {
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
        return fetch.makePostRequest(`${ES_URL}lean-projects/_update/${projectId}`, body)
            .then(await fetch.makeDeleteRequest(uri))
            .then(body => {
                if (body.result === 'updated') return body
                else return Promise.reject(error.makeErrorResponse(error.NOT_FOUND, 'Dashboard not found'))
            })
    },

    getDashboardById: async function (dashboardId) {
        const uri = `${ES_URL}lean-dashboards/_doc/${dashboardId}`
        return fetch.makeGetRequest(uri)
            .then(response => {
                if (response.found) {
                    response._source.id = response._id
                    return response._source
                } else return Promise.reject(error.makeErrorResponse(error.NOT_FOUND, 'Dashboard not found'))
            })

    },

    getDashboardsFromProject: async function (project) {
        let dashboards = []
        for (const dashboardId of project.dashboards) {
            await this.getDashboardById(dashboardId)
                .then(response => {
                    if (response) {
                        dashboards.push(response)
                    }
                })
        }
        return dashboards
    },

    updateDashboardFromProject: async function (dashboardId, newName, newDesc) {
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
        return fetch.makePostRequest(uri, body)
            .then(result => {
                    if (result.result === "updated")
                        return dashboardId
                    else throw error.makeErrorResponse(error.NOT_FOUND, 'Dashboard does not exist')
                }
            )
    },

    getWidgetTemplates: async function () {
        const uri = `${ES_URL}etl-templates/_search?size=100`
        return fetch.makeGetRequest(uri)
            .then(body => {
                if (body.hits) {
                    if (body.hits.hits.length) {
                        return body.hits.hits.map(hit => {
                            hit._source.id = hit._id
                            return hit._source
                        })
                    }
                }
            })
    },

    addWidgetToDashboard: async function (projectId, dashboardId, widgetId, timeSettings, credentials) {
        const uri = `${ES_URL}etl-templates/_doc/${widgetId}`
        const uriWidget = `${ES_URL}etl-widgets/_doc`
        const uriDashboard = `${ES_URL}lean-dashboards/_update/${dashboardId}`
        const aux = await checkCredentialsInProject(this, projectId, credentials);
        if (aux.length === 0) {
            throw error.makeErrorResponse(error.NOT_FOUND, "Credentials do not exist")
        }
        let bodyWidget
        return fetch.makeGetRequest(uri)
            .then(body => {
                if (body.found) {
                    bodyWidget = {
                        name: body._source.name,
                        function: body._source.function,
                        source: body._source.source,
                        type: body._source.type,
                        params: [],
                        updateTime: timeSettings,
                        credentials: aux[0].credentials,
                        data: body._source.data
                    }
                    return fetch.makePostRequest(uriWidget, bodyWidget)
                        .then(response => {
                            const widget = {
                                "script": {
                                    "source": "ctx._source.widgets.add(params.widget)",
                                    "params": {
                                        "widget": response._id
                                    }
                                }
                            };
                            return fetch.makePostRequest(uriDashboard, widget)
                                .then(result => {
                                    if (result.result === "updated")
                                        return response._id
                                })

                        })
                } else {
                    throw error.makeErrorResponse(error.NOT_FOUND, 'Widget not found')
                }
            })

    },

    getWidget: async function (widgetId) {
        const uriWidget = `${ES_URL}etl-widgets/_doc/${widgetId}`
        return fetch.makeGetRequest(uriWidget)
            .then(body => {
                if (body.found) {
                    body._source.id = body._id
                    return body._source
                } else {
                    throw error.makeErrorResponse(error.NOT_FOUND, 'Widget not found')
                }
            })
    },

    updateWidget: async function (projectId, widgetId, newTimeSettings, newCredentials) {
        const uriWidget = `${ES_URL}etl-widgets/_update/${widgetId}`
        const aux = await checkCredentialsInProject(this, projectId, newCredentials)
        if (aux.length === 0) {
            throw error.makeErrorResponse(error.NOT_FOUND, "Credentials do not exist")
        }
        var body = {
            "script": {
                "lang": "painless",
                "inline": "ctx._source.credentials=params.credentials;ctx._source.updateTime=params.timeSettings",
                "params": {
                    "timeSettings": newTimeSettings,
                    "credentials": aux[0].credentials
                }
            }
        }
        return fetch.makePostRequest(uriWidget, body)
            .then(result => {
                    if (result.result === "updated")
                        return widgetId
                    else throw error.makeErrorResponse(error.NOT_FOUND, 'Widget does not exist')
                }
            )
    },

    removeWidgetFromDashboard: async function (projectId, dashboardId, widgetId) {
        const uri = `${ES_URL}etl-widgets/_doc/${widgetId}?refresh=true`
        const dashboardWidget = await this.getDashboardById(dashboardId)
            .then(body => body.widgets)
        const widgetIndex = dashboardWidget.findIndex(w => w === widgetId)
        if (widgetIndex === -1) {
            return Promise.reject(error.makeErrorResponse(error.NOT_FOUND, 'Widget does not exists'))
        } else {
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
            await fetch.makePostRequest(uriDashboard, body)
                .then(result => {
                        if (result.result !== "updated")
                            throw error.makeErrorResponse(error.NOT_FOUND, 'Dashboard does not exist')
                    }
                )
            return fetch.makeDeleteRequest(uri)
                .then(body => {
                    if (body.result === 'deleted') {
                        scheduler.deleteJob(widgetId)
                        return dashboardId
                    }
                    else return error.makeErrorResponse(error.NOT_FOUND, 'Widget not found')
                })
        }
    },

    addUserToProject: async function (projectId, userId) {
        const uriProject = `${ES_URL}lean-projects/_update/${projectId}`
        const updateProject = {
            "script": {
                "source": "ctx._source.members.add(params.userId)",
                "params": {
                    "userId": userId
                }
            }
        };
        return fetch.makePostRequest(uriProject, updateProject)
            .then(body => {
                return body._id
            })
    },

    removeUserFromProject: async function (projectId, usernameIndex) {
        const uriProject = `${ES_URL}lean-projects/_update/${projectId}`
        const updateProject = {
            "script": {
                "source": "ctx._source.members.remove(params.index)",
                "params": {
                    "index": usernameIndex
                }
            }
        };
        return fetch.makePostRequest(uriProject, updateProject)
            .then(body => {
                return body._id
            })
    },

    getCredentials: async function (projectId) {
        const project = await this.getProjectById(projectId)
        const credentials = []
        for (let i = 0; i < project.credentials.length; i++) {
            let uri = `${ES_URL}lean-credentials/_doc/${project.credentials[i]}`
            let credential = await fetch.makeGetRequest(uri)
            let result = {
                "id": credential._id,
                "credentials": credential._source
            }
            credentials.push(result)
        }
        if (credentials.length === 0) {
            throw error.makeErrorResponse(error.NOT_FOUND, 'This project has no credentials')
        }
        return credentials
    },

    getCredentialsById: async function (projectId, credentialId) {
        const project = await this.getProjectById(projectId)
        if (project.credentials.includes(credentialId)) {
            const uri = `${ES_URL}lean-credentials/_doc/${credentialId}`
            return await fetch.makeGetRequest(uri)
                .then(body => {
                    return body._source
                })

        } else throw error.makeErrorResponse(error.DATABASE_ERROR, 'CredentialId does not exist within the project')
    },

    addCredential: async function (projectId, credentialName, credentialSource, credentials) {
        const project = await this.getProjectById(projectId)
        const aux = await checkCredentialsInProject(this, projectId, credentialName)
        if (aux.length !== 0) {
            throw error.makeErrorResponse(error.CONFLICT, "Credential name already exists")
        }
        const uriProject = `${ES_URL}lean-projects/_update/${projectId}`
        const uri = `${ES_URL}lean-credentials/_doc`
        const credential = {
            "name": credentialName,
            "source": credentialSource,
            "credential": credentials
        }
        const response = await fetch.makePostRequest(uri, credential)
        if (!response.error) {
            const updateProject = {
                "script": {
                    "source": "ctx._source.credentials.add(params.credentialId)",
                    "params": {
                        "credentialId": `${response._id}`
                    }
                }
            };
            return await fetch.makePostRequest(uriProject, updateProject)
                .then(body => {
                    if (body.result === 'updated') return response._id
                    else throw error.makeErrorResponse(error.makeErrorResponse(error.DATABASE_ERROR, 'Could not associate to the project'))
                })
                .catch(err => {
                    console.log('bad')
                })
        } else throw error.makeErrorResponse(error.DATABASE_ERROR, 'Add Credential to Project Failed')
    },
    deleteCredential: async function (projectId, credentialId) {
        const project = await this.getProjectById(projectId)
        if (project.credentials.includes(credentialId)) {
            const uri = `${ES_URL}lean-credentials/_doc/${credentialId}?refresh=true`
            let body = {
                "script": {
                    "lang": "painless",
                    "inline": "ctx._source.credentials.remove(params.credential)",
                    "params": {
                        "credential": project.credentials.indexOf(credentialId)
                    }
                }
            }
            return fetch.makePostRequest(`${ES_URL}lean-projects/_update/${projectId}`, body)
                .then(() => {
                        return fetch.makeDeleteRequest(uri)
                            .then(body => {
                                if (body.result === 'deleted') return body._id
                            })
                            .catch(err => {
                                console.log('bad')
                            })
                    }
                ).catch(err => {
                    console.log('abc')
                })
        } else throw error.makeErrorResponse(error.DATABASE_ERROR, 'CredentialId does not exist within the project')
    },
    updateCredential: async function (projectId, credentialId, credentialName, credentialSource, credentials) {
        const project = await this.getProjectById(projectId)
        if (project.credentials.includes(credentialId)) {
            const credential = await this.getCredentialsById(projectId, credentialId)
            if (credentialName !== credential.name) {
                const aux = await checkCredentialsInProject(this, projectId, credentialName)
                if (aux.length !== 0) {
                    throw error.makeErrorResponse(error.CONFLICT, "Credential with that name already exists")
                }
            }
            const uri = `${ES_URL}lean-credentials/_update/${credentialId}`
            let body = {
                "script": {
                    "lang": "painless",
                    "inline": "ctx._source = params.credential",
                    "params": {
                        "credential": {
                            "name": credentialName,
                            "source": credentialSource,
                            "credential": credentials
                        }
                    }
                }
            }
            return fetch.makePostRequest(uri, body)
                .then(body => {
                    if (body.result === 'updated') {
                        project.dashboards.forEach(dashboardId => {
                            this.getDashboardById(projectId, dashboardId)
                                .then(result => {
                                    result.widgets.forEach(widgetId => {
                                        this.getWidget(widgetId)
                                            .then(result => {
                                                if (result.credentials.name === credential.name) {
                                                    this.updateWidget(projectId, widgetId, result.updateTime, credentialName)
                                                        .then(updatedWidget => {
                                                            scheduler.reSchedule(updatedWidget)
                                                        })
                                                }
                                            })
                                            .catch(err => {
                                                throw error.makeErrorResponse(err)
                                            })
                                    })
                                })
                                .catch(err => {
                                    throw error.makeErrorResponse(err)
                                })
                        })
                        return body._id
                    } else throw error.makeErrorResponse(error.DATABASE_ERROR, 'Could not update credential')
                }).catch(err => {
                    console.log('abc')
                })
        } else throw error.makeErrorResponse(error.DATABASE_ERROR, 'CredentialId does not exist within the project')
    }
}

async function checkCredentialsInProject(db, projectId, credentials) {
    let projectCredentials
    try {
        projectCredentials = await db.getCredentials(projectId)
    } catch (ex) {
        //exception caused by absense of credentials
        projectCredentials = []
    }
    const aux = projectCredentials.filter((credential) => {
        if (credential.credentials.name === credentials) {
            return credential
        }
    })
    return aux;
}