const scheduler = require('../etl/scheduler/etl-scheduler.js')
const db = require('../etl/etl-db')
const project = ''// created a project

//a cada minuto faz scheduler
const timeSettings = {
    seconds : '',
    minutes : '*/1',
    hours : '*',
    dayOfMonth : '*',
    month : '*',
    dayOfWeek : '*'
}

const widgetEx = {
    id : 'VUlOcHkBaRIQUarFdaWF', //id do elastic
    name : 'Squash Test Pie Chart',
    code : `S_TIDT-5`,
    credentials: {
        squash: {
            email: '',
            token: '',
            path: ''
        }
    },
    timeSettings: {
        seconds : '',
        minutes : '*/1',
        hours : '*',
        dayOfMonth : '*',
        month : '*',
        dayOfWeek : '*'
    },
    /*projectInfo : {
        azurePath : 'path',
        jiraPath : 'path',
        squashPath : 'path'
    },*/
    data : []
}

async function test() {
    let widget = await db.getWidget('yNAzj3kB6Z_VsvHymNJI')
    widget.timeSettings = timeSettings
    let job = scheduler.scheduleWidget(widget,'yNAzj3kB6Z_VsvHymNJI')
    console.log("executing scheduler")
}
const timeSettings2 = {
    seconds : '',
    minutes : '*/2',
    hours : '*',
    dayOfMonth : '*',
    month : '*',
    dayOfWeek : '*'
}
test()
//scheduler.reSchedule(job,timeSettings2)

