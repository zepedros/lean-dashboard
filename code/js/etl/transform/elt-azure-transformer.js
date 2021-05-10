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
    }
}