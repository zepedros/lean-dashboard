var CronJob = require('cron').CronJob;
var CronTime = require('cron').CronTime;
const servicesCreator = require('../etl-services.js');
const widgetMapCreator = require('./etl-widgetMap.js')
const db = require('../etl-db');
const azureData = require('../data/etl-azure-data')
const jiraData = require('../data/etl-jira-data.js')
const squashData = require('../data/etl-squash-data.js')
const auth = ''
const services = servicesCreator(azureData,jiraData,squashData, db, auth);
const widgetMap = widgetMapCreator.configMap(services)

module.exports = {
    scheduleWidget: async function(widgetId) {
        const widget = await db.getWidget(widgetId)
        const seconds = widget.timeSettings.seconds
        const minutes = widget.timeSettings.minutes
        const hours = widget.timeSettings.hours
        const dayOfMonth = widget.timeSettings.dayOfMonth
        const month = widget.timeSettings.month
        const dayOfWeek = widget.timeSettings.dayOfWeek
        widget.params = ["5"] //TODO hardcoded to test
        let job = new CronJob(`${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`, async function () {
            const func = widgetMap.get(widget.function)
            const params = widget.params
            switch (params.length) {
                case 0 : func(widgetId); break
                case 1 : func(params[0],widgetId); break
                case 2 : func(params[0], params[1], widgetId); break
                case 3 : func(params[0], params[1], params[2], widgetId); break
            }
        })
        job.start()
        return job
    },
    reSchedule : function (job, timeSettings) {
        const seconds = timeSettings.seconds
        const minutes = timeSettings.minutes
        const hours = timeSettings.hours
        const dayOfMonth = timeSettings.dayOfMonth
        const month = timeSettings.month
        const dayOfWeek = timeSettings.dayOfWeek
        job.setTime(new CronTime(`${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`))
    }
}