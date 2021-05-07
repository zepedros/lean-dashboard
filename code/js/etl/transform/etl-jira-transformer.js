module.exports = {
    getJiraIssueObject: function (refObject) {
        return {
            "id": refObject.id,
            "key": refObject.key,
            "issuetype_name": refObject.fields.issuetype.name,
            "issuetype_icon": refObject.fields.issuetype.iconUrl,
            "summary": refObject.fields.summary,
            "priority_name": refObject.fields.priority.name,
            "priority_id": refObject.fields.priority.id,
            "assignee": refObject.fields.assignee,
            "reportes": refObject.fields.reporter.accountId,
            "state": refObject.fields.status.name,
            "created": refObject.fields.created,
            "projectId": refObject.fields.project.id,
            "projectName": refObject.fields.project.name,
        }
    },

    getJiraProjectObject: function (refObject) {
        return {
            "key": refObject.key,
            "id": refObject.id,
            "name": refObject.name,
            "projectTypeKey": refObject.projectTypeKey,
            "projectCategory": refObject.projectCategory, //api documentation shows this but in ours projects doesnt show
            "insight": refObject.insight, //same here
            "source": "Jira"
        }
    },

    getJiraSprintObject: function (body) {
    return {
        "id" : body.id,
        "state" : body.state,
        "name" : body.name,
        "startDate" : body.startDate,
        "endDate" : body.endDate,
        "goal" : body.goal,
        "projectId" : body.projectId
    }
}
}