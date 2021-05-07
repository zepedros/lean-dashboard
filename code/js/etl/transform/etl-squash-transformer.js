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
    },

    getSquashTestPlanObject : function (testPlanItem) {
        return {
            "test-item-id": testPlanItem.id,
            "iteration_id": testPlanItem.iteration.id,
            "iteration_name": testPlanItem.iteration.name,
            "execution_status": testPlanItem.execution_status,
            "referenced_test_case": testPlanItem.referenced_test_case == null ?
                testPlanItem.referenced_test_case : {
                    "test-case-id": testPlanItem.referenced_test_case.id,
                    "name": testPlanItem.referenced_test_case.name,
                    "reference": testPlanItem.referenced_test_case.reference
                },
            "last_executed_by": testPlanItem.last_executed_by,
            "last_executed_on": testPlanItem.last_executed_on,
            "assigned_to": testPlanItem.assigned_to
        }
    }
}