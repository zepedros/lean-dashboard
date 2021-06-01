'use strict';
const jiraTransformer = require('./transform/etl-jira-transformer')
const squashTransformer = require('./transform/etl-squash-transformer')
function services(azureData, jiraData, squashData, db, auth) {

    const error = require('../error')

    //TODO verificacao das credentials, pedido para jira e azure DEVE ter email e token, para squash username e password
    /*
    "credentials": {
        "email" : "leandashboardproject@gmail.com",
        "token" : "LPcyGdZolN906MvzdwPHF045",
        "username" : "guest_tpl",
        "password" : "password",
        "APIPath" : "leandashboard.atlassian.net",
        "APIVersion" : 3
    }
     */
    const theServices = {

        getIssuesJira: async function (credentials) {
            return jiraData.getIssuesJira(credentials)
        },

        postJiraIssuesDataTable: async function (widgetId,credentials){
            const data = await jiraTransformer.jiraIssuesDataTableTransform(jiraData, credentials)
            return await db.postWidget(data, widgetId)
        },

        postJiraSprintIssuesBarChart: async function(widgetId,credentials){
            const data = await jiraTransformer.jiraSprintIssuesBarChart(jiraData, credentials)
            return await db.postWidget(data,widgetId)
        },

        postSquashTestsPieChart: async function(id,widgetId,credentials) {
            const data = await squashTransformer.squashProjectTestsPieChart(id,squashData,credentials)
            return await db.postWidget(data, widgetId)
        },

        postJiraSprintDateGaugeChart: async function(widgetId, credentials){
            const data = await jiraTransformer.jiraSprintDateGaugeChart(jiraData, credentials)
            return await db.postWidget(data, widgetId)
        },

        postSquashTestPerIterationDataTable: async function(id,widgetId, credentials) {
            let data = await squashTransformer.squashTestPerIterationDataTable(id,squashData, credentials)
            return await db.postWidget(data,widgetId)
        },

        getIssuesByIdJira: async function (id, credentials) {
            return jiraData.getIssuesByIdJira(id, credentials)
        },
        getProjectsJira: function (credentials) {
            return jiraData.getProjectsJira(credentials)
        },
        getProjectByIdJira: function (id, credentials) {
            return jiraData.getProjectByIdJira(id, credentials)
        },
        getProjectsSquash: function (credentials) {
            return squashData.getProjectsSquash(credentials)
        },
        getProjectCampaignsSquash: function (id, credentials) {
            return squashData.getProjectCampaignsSquash(id, credentials)
        },
        getProjectTestsSquash: function (id, credentials) {
            return squashData.getProjectTestsSquash(id, credentials)
        },
        getSquashCampaignById: function (projectId, campaignId, credentials) {
            return squashData.getSquashCampaignById(projectId,campaignId, credentials)
        },
        getSquashTestById: function (projectId, testId, credentials) {
            return squashData.getSquashTestById(projectId,testId, credentials)
        },
        getAzureProjects: function (credentials) {
            return azureData.getAzureProjects(credentials)
        },
        getAzureTeams: function (id, credentials) {
            return azureData.getAzureTeams(id, credentials)
        },
        postIssues: function () {
            return db.postIssues()
        },
        postProjects: function () {
            return db.postProjects()
        },
        getAllSprintsJira: function (credentials) {
            return jiraData.getAllSprintsJira(credentials)
        },
        getSprintIssuesJira: function (sprintId, credentials){
            return jiraData.getSprintIssuesJira(sprintId, credentials)
        },
        getSquashTestsPlans: function (projectId, credentials){
            return squashData.getSquashTestsPlans(projectId, credentials)
        },
        getAzureIterations: function (teamName, credentials){
            return azureData.getAzureIterations(teamName, credentials)
        },
        getAzureIterationWorkItems: function (teamName, iterationId, credentials) {
            return azureData.getAzureIterationWorkItems(teamName,iterationId, credentials)
        }
    };
    return theServices;
}
module.exports = services;