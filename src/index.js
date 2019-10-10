'use strict'
import './main.scss'
const DateTime = require('luxon').DateTime
const Interval = require('luxon').Interval

// var endtime = DateTime.local().plus({ minutes: 1, seconds: 5 })
function getData(year, month, day) {
    let localtime = DateTime.local()
    // let endtime = DateTime.local(2024, 3, 10, 0, 0)
    let endtime = DateTime.local(year, month, day, 0, 0)
    return Interval.fromDateTimes(localtime, endtime).toDuration(['days', 'hours', 'minutes', 'seconds']).toObject()
}

function num2str(n) {
    n = Math.round(n)
    if (n == 0) return 2
    n = Math.abs(n) % 100; var n1 = n % 10;
    if (n > 10 && n < 20) { return 2 }
    if (n1 > 1 && n1 < 5) { return 1 }
    if (n1 == 1) { return 0; }
    return 2;
}

const types = {
    minutes: ['минута', 'минуты', 'минут'],
    seconds: ['секунда', 'секунды', 'секунд'],
    hours: ['час', 'часа', 'часов'],
    days: ['день', 'дня', 'дней']
}

function draw(year, month, day) {
    let o = getData(year, month, day)
    for (let i in o) {
        if (document.getElementById(i).innerText != Math.round(o[i])) {
            document.getElementById(i).innerText = Math.round(o[i])
            document.getElementById(i + 'Title').innerText = types[i][num2str(o[i])]
        }
    }
}

window.addEventListener('resize', e => {

})

window.addEventListener('load', e => {
    draw(...document.time_from)
})
setInterval(e => draw(...document.time_from), 1000, 200)
