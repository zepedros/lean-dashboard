var CronJob = require('cron').CronJob;
var CronTime = require('cron').CronTime;
const servicesCreator = require('../etl-services.js');
const db = require('../etl-db');
const azureData = require('../data/etl-azure-data')
const jiraData = require('../data/etl-jira-data.js')
const squashData = require('../data/etl-squash-data.js')
const auth = ''
const services = servicesCreator(azureData,jiraData,squashData, db, auth);
const widgetMap = new Map()

widgetMap.set("S_TIDT",func = function (id,widgetId) { services.postSquashTestPerIterationDataTable(id,widgetId)})

module.exports = {
    /**
     * @param widgets - array of ids
     * @param credentials - the credentials needed for the api access
     * @param paths - the paths for the apis
     * @param timeSettings - the timers for the refresh
     */
    scheduleWidget : function (widgets, credentials, paths, timeSettings) {
        const seconds = timeSettings.seconds
        const minutes = timeSettings.minutes
        const hours = timeSettings.hours
        const dayOfMonth = timeSettings.dayOfMonth
        const month = timeSettings.month
        const dayOfWeek = timeSettings.dayOfWeek
        var job = new CronJob(`${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`, async function () {
            for(const id of widgets) {
                const widget = await db.getWidget(id)
                const split = widget.code.split('-')
                var func = widgetMap.get(split[0])
                func(widget.code.split('-')[1],id)
            }
        })
        job.start()
        return job;
    },

    reSchedule : function (job, timeSettings) {
        const seconds = timeSettings.seconds
        const minutes = timeSettings.minutes
        const hours = timeSettings.hours
        const dayOfMonth = timeSettings.dayOfMonth
        const month = timeSettings.month
        const dayOfWeek = timeSettings.dayOfWeek
        job.setTime(new CronTime(`${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`))
        job.start()
    }

}