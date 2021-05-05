'use strict';

function services(data, db) {

    const theServices = {

        getIssuesJira: async function () {
            return data.getIssuesJira()
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

        getTeamJira: function () {
            return data.getTeamJira()
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
        postIssues: function () {
            return db.postIssues()
        },
        postProjects: function () {
            return db.postProjects()
        },
        postSprint: function () {
            return data.getSprintJira()
        },
        getSprintIssues: function (){
            return data.getSprintIssues()
        }
    };
    return theServices;
}

module.exports = services;
