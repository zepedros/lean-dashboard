/*
* TODO add project name/id
*/

module.exports = {
    getLeanIssues: function (refObject) {
        refObject.issues = refObject.issues.flatMap(item => {
            return this.getLeanIssueObject(item)
        })
        return refObject
    },

    getLeanIssueObject: function (refObject) {
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
    }

}
