
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
            "id": body.id,
            "state": body.state,
            "name": body.name,
            "startDate": body.startDate,
            "endDate": body.endDate,
            "goal": body.goal,
            "projectId": body.projectId
        }
    },

    jiraIssuesDataTableTransform: async function (data, credentials) {
        let issues = (await data.getIssuesJira(credentials)).issues.map(issue => {
            return {
                id : issue.key,
                summary : issue.summary,
                issuetype_name : issue.issuetype_name,
                priority : issue.priority,
                state: issue.state
            }
        })

        let widget = {
            name : "Jira issues data table",
            columns: [
                'Key',
                'Summary',
                'Issue Type',
                'Priority',
                'State'
            ],
            data : issues
        }
        return widget
    },
    jiraSprintIssuesBarChart: async function(data, credentials) {
        let widget = {
            name: "Jira issues bar chart",
            data: []
        }

        const sprints = (await data.getAllSprintsJira(credentials)).filter(sprint => sprint.state == 'active')
        let a = this.jiraSprintDateGaugeChart(data, credentials)
        for (const sprint of sprints) {
            const issues = (await data.getSprintIssuesJira(sprint.id, credentials)).issues.map(issue => issue.state)

            let counts = {}
            issues.forEach(
                function (x) {
                    counts[x] = (counts[x] || 0) + 1;
                });

            let alisa = []
            for (const prop in counts) {
                alisa.push({
                    [prop]: counts[prop]
                })
            }
            widget.data.push({
                sprintName: sprint.name,
                counts: alisa
            })
        }
        return widget
    },
    jiraSprintDateGaugeChart : async function(data, credentials) {

        let widget = {
            name: "Jira sprint gauge chart",
            data: []
        }

        const sprints = (await data.getAllSprintsJira(credentials)).filter(sprint => sprint.state == 'active')

        sprints.map(sprint => {

            let today = new Date().toISOString().slice(0, 10)
            let remaining_days = (new Date(sprint.endDate.substring(0, 10)) - new Date(today)) / (1000 * 3600 * 24)
            let past_days = (new Date(today) - new Date(sprint.startDate.substring(0, 10))) / (1000 * 3600 * 24)
            let difference_in_days = (new Date(sprint.endDate.substring(0, 10)) - (new Date(sprint.startDate.substring(0, 10)))) / (1000 * 3600 * 24)
            let percentage = parseInt((past_days * 100) / difference_in_days)
            widget.data.push({
                sprintName: sprint.name,
                info: {
                    remaining_days: remaining_days,
                    past_days: past_days,
                    difference_in_days: difference_in_days,
                    percentage: percentage
                }
            })
        })
        return widget
    }
}