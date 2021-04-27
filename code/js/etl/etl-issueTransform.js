/*
* TODO add project name/id
*/

module.exports = {
    getIssuesObject : function(refObject) {

    var jsonData = {
        issue :  []
    };

    jsonData.total = refObject.total

    for(var i = 0; i < jsonData.total; i++){

        var item = refObject.issues[i]

        jsonData.issue.push({
            "id" : item.id,
            "key" : item.key,
            "issuetype_name" : item.fields.issuetype.name,
            "issuetype_icon" : item.fields.issuetype.iconUrl,
            "summary" : item.fields.summary,
            "priority_name" : item.fields.priority.name,
            "priority_id" : item.fields.priority.id,
            "assignee" : item.fields.assignee,
            "reportes" : item.fields.reporter.accountId,
            "state" : item.fields.status.name,
            "created" : item.fields.created,
            "idProject" : item.fields.project.id,
            "projectName" : item.fields.project.name
        })

    }
    return refObject
},

//missing stuff
//priority missing
 getIssueObject:function(refObject) {

    var jsonData = {

    }
    jsonData.id = refObject.id
    jsonData.key = refObject.key
    jsonData.description = refObject.fields.description.content
    jsonData.created = refObject.fields.created
    jsonData.summary = refObject.fields.summary
    jsonData.updated = refObject.fields.updated
    jsonData.state = refObject.fields.status.name
    jsonData.creator = refObject.fields.creator.accountId
    jsonData.creator = refObject.fields.subtasks
    jsonData.priorityName = refObject.fields.priority.name
    jsonData.priorityId = refObject.fields.priority.id
    jsonData.idProject = refObject.fields.project.id
    jsonData.nameProject = refObject.fields.project.name
    //jsonData.creator = refObject.fields.comment

    return jsonData
}

}
