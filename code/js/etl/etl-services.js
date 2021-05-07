'use strict';

function services(data, db) {

    const theServices = {

        getIssuesJira: async function () {
            return data.getIssuesJira()
        },

        postIssuesJira: async function (){
            return db.postJiraIssuesDataTable()
        },

        postJiraSprintIssuesBarChart: async function(){
            return db.postJiraSprintIssuesBarChart()
        },

        postJiraSprintDateGaugeChart: async function(){
            return db.postJiraSprintDateGaugeChart()
        },

        getIssuesByIdJira: async function (id) {
            return data.getIssuesByIdJira(id)
        },
        getProjectsJira: function () {
            return data.getProjectsJira()
        },
        getProjectByIdJira: function (id) {
            return data.getProjectByIdJira(id)
        },
        getProjectsSquash: function () {
            return data.getProjectsSquash()
        },
        getProjectCampaignsSquash: function (id) {
            return data.getProjectCampaignsSquash(id)
        },
        getProjectTestsSquash: function (id) {
            return data.getProjectTestsSquash(id)
        },
        getSquashCampaignById: function (projectId, campaignId) {
            return data.getSquashCampaignById(projectId,campaignId)
        },
        getSquashTestById: function (projectId, testId) {
            return data.getSquashTestById(projectId,testId)
        },
        getAzureProjects: function () {
            return data.getAzureProjects()
        },
        getAzureTeams: function (id) {
            return data.getAzureTeams(id)
        },
        postIssues: function () {
            return db.postIssues()
        },
        postProjects: function () {
            return db.postProjects()
        },
        getAllSprintsJira: function () {
            return data.getAllSprintsJira()
        },
        getSprintIssues: function (sprintId){
            return data.getSprintIssues(sprintId)
        },
        getSquashTestsSuites: function (){
            return data.getSquashTestsSuites()
        }
    };
    return theServices;
}

module.exports = services;
