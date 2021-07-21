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
            "assignedTo": refObject.fields["System.AssignedTo"].displayName,
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
        /*let counts = {
            name:"",
            aux:[
                {
                    total: 0,
                    done: 0,
                    new: 0,
                    approved: 0,
                    committed: 0
                }
            ]
        }*/

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

        /*data.map(workItem => {
            switch(workItem.state) {
                case "Done" : counts.done++; break;
                case "New" : counts.new++; break;
                case "Approved" : counts.approved++; break;
                case "Committed" : counts.committed++; break;
            }
            counts.total++
        })
        widget.data.push(counts)*/
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
    }
}