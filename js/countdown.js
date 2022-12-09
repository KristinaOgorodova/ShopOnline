'use strict';

const deadline = document.querySelector('.main-content_time');
console.log(deadline)

const timer = deadline => {
    const timeDay = document.querySelector('.timer_day');
    const timeHour = document.querySelector('.timer_hour');
    const timeMin = document.querySelector('.timer_min');
    const timeSec = document.querySelector('.timer_sec');
    const textDays = document.querySelector('.days');
    const textHours = document.querySelector('.hours');
    const textMinutes = document.querySelector('.minutes');
    const textSec = document.querySelector('.sec');

    let decCache = [],
        decCases = [2, 0, 1, 1, 1, 2];
    function decOfNum(number, titles)
    {
        if(!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
        return titles[decCache[number]];
    }

    const getTimeRemaining = () => {
        const timeDeadLine = new Date(deadline).getTime();
        const dateNow = Date.now();
        const remaining = timeDeadLine - dateNow;

        const minutes = Math.floor(remaining /1000/60 % 60);
        const hours = Math.floor(remaining /1000/60 / 60)%24;
        const days = Math.floor(remaining /1000 / 60/ 60/ 24);
        const seconds = Math.floor(remaining /1000 % 60);
        return {remaining,days,minutes,hours,seconds};
    }

    const start = () => {
        const timer = getTimeRemaining();

        if (timer.days > 0) {
            timeDay.textContent = timer.days;
            textDays.textContent = decOfNum(timer.days, ['день','дня' ,'дней']);
        } else {
            textDays.style.display = 'none';
            textSec.style.display = 'flex';
            timeSec.textContent = timer.seconds;
            textSec.textContent = decOfNum(timer.seconds, ['секунда','секунд' ,'секунды']);
        }

        timeHour.textContent = timer.hours;
        textHours.textContent =decOfNum(timer.hours, ['час','часа','часов'])
        timeMin.textContent = timer.minutes;
        textMinutes.textContent = decOfNum(timer.minutes, ['минута','минуты','минут'])

        if (timer.days <= 0 && timer.hours <= 0 && timer.minutes <= 0) {
            clearInterval();
        }

    };

    start();
};

timer(deadline.dataset.deadline);