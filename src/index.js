'use strict'
import './main.scss'
const musik = require('./music.ogg')
const DateTime = require('luxon').DateTime
const Interval = require('luxon').Interval

// var endtime = DateTime.local().plus({ minutes: 1, seconds: 5 })
function getData() {
    let localtime = DateTime.local()
    let endtime = DateTime.local(2024, 3, 10, 0, 0)
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

function draw(e) {
    // console.clear()
    let o = getData()
    for (let i in o) {
        if (document.getElementById(i).innerText != Math.round(o[i])) {
            document.getElementById(i).innerText = Math.round(o[i])
            document.getElementById(i + 'Title').innerText = types[i][num2str(o[i])]
        }
    }
}


draw(NaN)
window.addEventListener('resize', e => {


})



window.addEventListener('load', e => {
    var audio = new Audio(musik)
    document.body.appendChild(audio)
    audio.controls = true
    audio.loop = true
    audio.pause()
    audio.play()
    // document.getElementById('ai').src = musik
    // document.getElementById('ai').setAttribute('src', musik)
    // setTimeout(t => document.getElementById('ai').play().catch(e => console.log(document.getElementById('ai')))
    //     , 2000)        
    // var prom = audio.play().then()
    // if (prom !== null) {
    //     prom.catch(() => {
    //         document.getElementsByTagName('audio')[0].pause().then(r => setTimeout(e => document.getElementsByTagName('audio')[0].play(), 5000))
    //     })
    // }
})
setInterval(e => draw(e), 1000, 200)
