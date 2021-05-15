const scheduler = require('../etl/scheduler/etl-scheduler.js')

const project = ''// created a project

//a cada minuto faz scheduler
const timeSettings = {
    seconds : '*',
    minutes : '*/1',
    hours : '*',
    dayOfMonth : '*',
    month : '*',
    dayOfWeek : '*'
}

const widget = {
    id : 'id', //id do elastic
    name : 'Squash Test Pie Chart',
    code : `S_TIDT-5`,
    projectInfo : {
        azurePath : 'path',
        jiraPath : 'path',
        squashPath : 'path'
    },
    data : []
}

let widgets = ['VUlOcHkBaRIQUarFdaWF']
const timeSettings2 = {
    seconds : '',
    minutes : '*/2',
    hours : '*',
    dayOfMonth : '*',
    month : '*',
    dayOfWeek : '*'
}
let job = scheduler.scheduleWidget(widgets,'','',timeSettings)
console.log("executing scheduler")

scheduler.reSchedule(job,timeSettings2)

