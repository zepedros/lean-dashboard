/*
* TODO add project name/id
*/

module.exports = {
    getIssuesObject : function(refObject) {
        refObject.issues = refObject.issues.flatMap(item => {
            return {
            "id": item.id,
            "key": item.key,
            "issuetype_name": item.fields.issuetype.name,
            "issuetype_icon": item.fields.issuetype.iconUrl,
            "summary": item.fields.summary,
            "priority_name": item.fields.priority.name,
            "priority_id": item.fields.priority.id,
            "assignee": item.fields.assignee,
            "reportes": item.fields.reporter.accountId,
            "state": item.fields.status.name,
            "created": item.fields.created,
            "idProject": item.fields.project.id,
            "projectName": item.fields.project.name
        }
    })
    return refObject
},

//missing stuff
//priority missing
 getIssueObject:function(refObject) {
     return {
        id: refObject.id,
        key: refObject.key,
        description: refObject.fields.description.content,
        created: refObject.fields.created,
        summary: refObject.fields.summary,
        updated: refObject.fields.updated,
        state: refObject.fields.status.name,
        creator: refObject.fields.creator.accountId,
        //creator : refObject.fields.subtasks,
        priorityName: refObject.fields.priority.name,
        priorityId: refObject.fields.priority.id,
        idProject: refObject.fields.project.id,
        nameProject: refObject.fields.project.name
        //creator : refObject.fields.comment
    }
}

}
