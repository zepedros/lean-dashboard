const widgetMap = new Map()

module.exports = {
    configMap : function (services) {
        widgetMap.set("postSquashTestPerIterationDataTable",
            function (id,widgetId) {
                services.postSquashTestPerIterationDataTable(id,widgetId)
            })
        widgetMap.set("postJiraSprintIssuesBarChart",
            function (widgetId) {
                services.postJiraSprintIssuesBarChart(widgetId)
            })
        widgetMap.set("postSquashTestsPieChart",
            function (id,widgetId) {
                services.postSquashTestsPieChart(id,widgetId)
            })
        widgetMap.set("postJiraSprintDateGaugeChart",
            function (widgetId) {
                services.postJiraSprintDateGaugeChart(widgetId)
            })
        return widgetMap
    }
}