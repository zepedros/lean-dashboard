const scheduler = require('../etl/scheduler/etl-scheduler.js')

const project = ''// created a project

//a cada minuto faz scheduler
const timeSettings = {
    seconds : '',
    minutes : '*/2',
    hours : '*',
    dayOfMonth : '*',
    month : '*',
    dayOfWeek : '*'
}

const widgets = ['Squash Pie Chart','Another Widget']

const widget = {
    id : 'id',
    type : '?',
    projectInfo : {
        azurePath : 'path',
        jiraPath : 'path',
        squashPath : 'path'
    }
}

scheduler.scheduleWidget(widgets,'','',timeSettings)
console.log("executing scheduler")

