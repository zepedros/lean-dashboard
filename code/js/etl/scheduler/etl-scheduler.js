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
const widgetJobs = new Map()

module.exports = {
    scheduleWidget: async function(widgetId, postInDb) {
        const widget = await db.getWidget(widgetId)
        const seconds = widget.updateTime.seconds
        const minutes = widget.updateTime.minutes
        const hours = widget.updateTime.hours
        const dayOfMonth = widget.updateTime.dayOfMonth
        const month = widget.updateTime.month
        const dayOfWeek = widget.updateTime.dayOfWeek
        //widget.params = ["5"] //TODO hardcoded to test
        let job = new CronJob(`${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`, async function () {
            const func = widgetMap.get(widget.function)
            const params = widget.params
            const credentials = widget.credentials
            switch (params.length) {
                case 0 :
                    func(widgetId, credentials);
                    break
                case 1 :
                    func(params[0], widgetId, credentials);
                    break
                case 2 :
                    func(params[0], params[1], widgetId, credentials);
                    break
                case 3 :
                    func(params[0], params[1], params[2], widgetId, credentials);
                    break
            }
        })
        job.start()
        if(postInDb) {
            await db.addIdToSchedule(widgetId)
        }
        widgetJobs.set(widgetId, job)
    },

    widgetMapBuilder: async function(){
        const data = await db.getAllScheduledIds()
        if(data.found) {
            const ids = data._source.ids
            if(ids.length > 0) {
                ids.forEach(id => {
                    this.scheduleWidget(id, false)
                })
            }
        } else {
            await db.createScheduleArray()
        }
    },

    reSchedule : function (widgetId) {
        const job = widgetJobs.get(widgetId)
        widgetJobs.delete(widgetId)
        job.stop()
        this.scheduleWidget(widgetId,false)
    },

    deleteJob : async function (widgetId) {
        const job = widgetJobs.get(widgetId)
        widgetJobs.delete(widgetId)
        await db.deleteIdFromSchedule(widgetId)
        job.stop()
    }
}