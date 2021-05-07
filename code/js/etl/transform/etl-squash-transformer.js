module.exports = {
    getSquashProjectsObject: function (item) {
        return {
            "id": item.id,
            "name": item.name,
            "source" : "Squash"
        }
    },

    getSquashCampaignObject: function (expandedCampaign){
        return {
            "id": expandedCampaign.id,
            "name": expandedCampaign.name,
            "reference": expandedCampaign.reference,
            "description": expandedCampaign.description,
            "status": expandedCampaign.status,
            "creation_date": expandedCampaign.created_on,
            "start_date": expandedCampaign.actual_start_date,
            "end_date": expandedCampaign.actual_end_date,
            "iterations" : expandedCampaign.iterations,
            "test_plan": expandedCampaign.test_plan,
            "project-id": expandedCampaign.project.id,
            "project-name": expandedCampaign.project.name
        }
    },

    getSquashTestObject : function (expandedTest) {
        return {
            "id": expandedTest.id,
            "name": expandedTest.name,
            "reference": expandedTest.reference,
            "status": expandedTest.status,
            "importance": expandedTest.importance,
            "creation_date": expandedTest.created_on,
            "project-id": expandedTest.project.id,
            "project-name": expandedTest.project.name
        }
    }
}