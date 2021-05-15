'use strict';
const jiraTransformer = require('./transform/etl-jira-transformer')
const squashTransformer = require('./transform/etl-squash-transformer')
function services(azureData, jiraData, squashData, db, auth) {

    const error = require('../error')

    const theServices = {

        getIssuesJira: async function () {
            return jiraData.getIssuesJira()
        },

        postIssuesJira: async function (){
            const data = await jiraTransformer.jiraIssuesDataTableTransform(jiraData)
            return await db.postWidget(data)
        },

        postJiraSprintIssuesBarChart: async function(){
            const data = await jiraTransformer.jiraSprintIssuesBarChart(jiraData)
            return await db.postWidget(data)
        },

        postSquashTestsPieChart: async function(id) {
            const data = await squashTransformer.squashProjectTestsPieChart(id,squashData)
            return await db.postWidget(data)
        },

        postJiraSprintDateGaugeChart: async function(){
            const data = await jiraTransformer.jiraSprintDateGaugeChart(jiraData)
            return await db.postWidget(data)
        },

        postSquashTestPerIterationDataTable: async function(id,widgetId) {
            const data = await squashTransformer.squashTestPerIterationDataTable(id,squashData)
            return await db.postWidget(data,widgetId)
        },

        getIssuesByIdJira: async function (id) {
            return jiraData.getIssuesByIdJira(id)
        },
        getProjectsJira: function () {
            return jiraData.getProjectsJira()
        },
        getProjectByIdJira: function (id) {
            return jiraData.getProjectByIdJira(id)
        },
        getProjectsSquash: function () {
            return squashData.getProjectsSquash()
        },
        getProjectCampaignsSquash: function (id) {
            return squashData.getProjectCampaignsSquash(id)
        },
        getProjectTestsSquash: function (id) {
            return squashData.getProjectTestsSquash(id)
        },
        getSquashCampaignById: function (projectId, campaignId) {
            return squashData.getSquashCampaignById(projectId,campaignId)
        },
        getSquashTestById: function (projectId, testId) {
            return squashData.getSquashTestById(projectId,testId)
        },
        getAzureProjects: function () {
            return azureData.getAzureProjects()
        },
        getAzureTeams: function (id) {
            return azureData.getAzureTeams(id)
        },
        postIssues: function () {
            return db.postIssues()
        },
        postProjects: function () {
            return db.postProjects()
        },
        getAllSprintsJira: function () {
            return jiraData.getAllSprintsJira()
        },
        getSprintIssuesJira: function (sprintId){
            return jiraData.getSprintIssuesJira(sprintId)
        },
        getSquashTestsPlans: function (projectId){
            return squashData.getSquashTestsPlans(projectId)
        },
        getAzureIterations: function (teamName){
            return azureData.getAzureIterations(teamName)
        },
        getAzureIterationWorkItems: function (teamName, iterationId) {
            return azureData.getAzureIterationWorkItems(teamName,iterationId)
        }
    };
    return theServices;
}

module.exports = services;
