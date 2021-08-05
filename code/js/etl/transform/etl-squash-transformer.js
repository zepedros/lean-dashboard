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
    },

    squashProjectTestsPieChart: async function(id,data, credentials) {
        let widget = {
            name: "Squash test results pie chart",
            data: []
        }
        const allCampaignsTests = (await data.getSquashTestsPlans(id, credentials))
        let counts = new Map()
        let total = 0
        for (const tests of allCampaignsTests) {
            tests["test-items"].forEach(t => {
                if (counts.has(t.execution_status)) {
                    counts.set(t.execution_status, counts.get(t.execution_status) + 1)
                } else {
                    counts.set(t.execution_status, 1)
                }
                total++
            });
        }
        let mapJson = Array.from(counts.entries())
        let result = []
        for (const map of mapJson) {
            result.push({
                "status": map[0],
                "percentage": ((map[1] / total) * 100).toFixed(2)
            })
        }
        widget.data.push({
            total: total,
            counts: result
        })
        return widget
    },

    squashTestPerIterationDataTable: async function(id, data, credentials) {
        const allCampaignsTests = (await data.getSquashTestsPlans(id, credentials))
        let iterations = new Map()
        for (const tests of allCampaignsTests) {
            tests["test-items"].forEach(t => {
                if (iterations.has(t.iteration_name)) {
                    let counts = iterations.get(t.iteration_name)
                    if (counts.test_counts.has(t.execution_status)) {
                        counts.test_counts.set(t.execution_status, counts.test_counts.get(t.execution_status) + 1)
                        counts.planned_tests++
                    } else {
                        counts.test_counts.set(t.execution_status, 1)
                    }
                    counts.planned_tests++
                    iterations.set(t.iteration_name, counts)
                } else {
                    iterations.set(t.iteration_name, {
                        "campaign": tests.campaign,
                        "planned_tests": 1,
                        "test_counts": new Map().set(t.execution_status, 1)
                    })
                }
            });
        }
        let mapJson = Array.from(iterations.entries())
        let result = []
        for (const map of mapJson) {
            let mapTestCounts = Array.from(map[1].test_counts)
            let data = []
            for (const counts of mapTestCounts) {
                data.push({
                    "status": counts[0],
                    "counts": counts[1]
                })
            }
            result.push({
                "campaign": map[1].campaign,
                "iteration": map[0],
                "counts": data
            })
        }
        let widget = {
            name: "Squash test per iteration data table",
            data: result
        }
        return widget
    },
    squashProjectTestsBarChart: async function(id,data, credentials) {
        let widget = {
            name: "Squash test results bar chart",
            data: []
        }
        const allCampaignsTests = (await data.getSquashTestsPlans(id, credentials))

        let counts = {}
        allCampaignsTests.forEach(
            function (x) {
                x["test-items"].forEach( testItem => {
                    counts[testItem.execution_status] = (counts[testItem.execution_status] || 0) + 1;
                })
            });

        let alisa = []
        for (const prop in counts) {
            alisa.push({
                [prop]: counts[prop]
            })
        }
        widget.data.push({
            name : "Squash Tests Bar Chart",
            counts: alisa
        })
        return widget
    }
}