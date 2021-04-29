module.exports = {
    getJiraProjects: function (refObject) {
        let jsonData = {
            projects: []
        };
        jsonData.total = refObject.total

        jsonData.projects = refObject.values.map(item => {
            return this.getJiraProjectObject(item)
        })
        return jsonData
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


    getSquashProjectsObject: function (refObject) {
        return refObject.projects = refObject.projects.flatMap(item => {
            return {
                "idProject": item.id,
                "nameProject": item.name,
                "source" : "Squash"
            }
        })
    }

}
