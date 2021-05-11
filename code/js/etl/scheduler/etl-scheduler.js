var CronJob = require('cron').CronJob;
const servicesCreator = require('../etl-services.js');
const db = require('../etl-db');
const data = require('../etl-data.js');
const auth = ''
const services = servicesCreator(data, db, auth);

module.exports = {
    scheduleMessage : function (seconds,minutes,hours,dayOfMonth,month,dayOfWeek) {
        var job = new CronJob(`${seconds} ${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`, function() {
            console.log('Doing something!')
        });
        job.start();
    },

    /**
     *
     * @param widgets - array of widgets needed
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
        var job = new CronJob(`${timeSettings.seconds} ${minutes} ${hours} ${dayOfMonth} ${month} ${dayOfWeek}`, function () {
            if(widgets.includes("Squash Pie Chart")) {
                services.postSquashTestsPieChart(5)
            }
            if(widgets.includes("Squash Data Table Chart")) {
                services.postSquashTestPerIterationDataTable(5)
            }
        })
        job.start();
    }
}