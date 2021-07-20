const widgetMap = new Map()

module.exports = {
    configMap : function (services) {
        widgetMap.set("postSquashTestPerIterationDataTable",
            function (id, widgetId, credentials) {
                services.postSquashTestPerIterationDataTable(id, widgetId, credentials)
            })
        widgetMap.set("postJiraSprintIssuesBarChart",
            function (widgetId, credentials) {
                services.postJiraSprintIssuesBarChart(widgetId, credentials)
            })
        widgetMap.set("postSquashTestsPieChart",
            function (id, widgetId, credentials) {
                services.postSquashTestsPieChart(id, widgetId, credentials)
            })
        widgetMap.set("postJiraSprintDateGaugeChart",
            function (widgetId, credentials) {
                services.postJiraSprintDateGaugeChart(widgetId, credentials)
            })
        widgetMap.set("postJiraIssuesDataTable",
            function (widgetId, credentials) {
                services.postJiraIssuesDataTable(widgetId, credentials)
            }),
        widgetMap.set("postAzureWorkItemByStateBarGraph",
            function (teamName, iterationName, widgetId, credentials) {
                services.postAzureWorkItemByStateBarGraph(teamName, iterationName, widgetId, credentials)
            })

        return widgetMap
    }
}