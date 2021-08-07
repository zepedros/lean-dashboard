module.exports = {
    getAzureProjectObject: function (refObject) {
        return {
            "id": refObject.id,
            "name": refObject.name,
            "description": typeof refObject.description == `undefined` ? `` : refObject.description,
            "state": refObject.state,
            "visibility": refObject.visibility,
            "source": "Azure"
        }
    },

    getAzureTeamObject: function (refObject) {
        return {
            "id": refObject.id,
            "name": refObject.name,
            "description": refObject.description,
            "members": refObject.identity.members,
            "source": "Azure"
        }
    },

    getAzureIterationObject: function (refObject) {
        return {
            "id": refObject.id,
            "name": refObject.name,
            "startDate": refObject.attributes.startDate,
            "finishDate": refObject.attributes.finishDate,
            "timeFrame": refObject.attributes.timeFrame
        }
    },

    getAzureWorkItemObject: function (refObject) {
        return {
            "id": refObject.id,
            "iteration": refObject.fields["System.IterationPath"],
            "workItemType": refObject.fields["System.WorkItemType"],
            "state": refObject.fields["System.State"],
            "reason": refObject.fields["System.Reason"],
            "assignedTo": refObject.fields["System.AssignedTo"]?.displayName,
            "createdDate": refObject.fields["System.CreatedDate"],
            "title": refObject.fields["System.Title"],
            "description": refObject.fields["System.Description"]
        }
    },

    azureWorkItemsByStateBarGraph: async function (data, credentials) {
        let widget = {
            name: "Azure Work Item by State Bar Graph",
            data: []
        }

        let counts = {}
        data.forEach(
            function (x) {
                counts[x.state] = (counts[x.state] || 0) + 1;
            });

        let alisa = []
        for (const prop in counts) {
            alisa.push({
                [prop]: counts[prop]
            })
        }
        widget.data.push({
            name : "",
            counts: alisa
        })
        return widget
    },

    azureIterationDataTableTransform: async function (data, credentials) {
        let iterations = data.map(iteration => {
            return {
                name : iteration.name,
                startDate : iteration.startDate,
                finishDate : iteration.finishDate,
                timeFrame: iteration.timeFrame
            }
        })

        let widget = {
            name : "Azure iterations data table",
            columns: [
                'Name',
                'Start Date',
                'Finish Date',
                'Time Frame'
            ],
            data : iterations
        }
        return widget
    },

    azureTestCaseByStatePieChart: async function(data, credentials) {
        let widget = {
            name: "Azure Tests by State pie chart",
            data: []
        }

        let counts = new Map()
        let total = 0
        for (const testCase of data.workItems) {
            if (counts.has(testCase.state)) {
                counts.set(testCase.state, counts.get(testCase.state) + 1)
            } else {
                counts.set(testCase.state, 1)
            }
            total++
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

    azureBugByStatePieChart: async function(data, credentials) {
        let widget = {
            name: "Azure Bugs by State pie chart",
            data: []
        }

        let counts = new Map()
        let total = 0
        for (const workItem of data) {
            if(workItem.workItemType === "Bug") {
                if (counts.has(workItem.state)) {
                    counts.set(workItem.state, counts.get(workItem.state) + 1)
                } else {
                    counts.set(workItem.state, 1)
                }
                total++
            }
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
    }
}
