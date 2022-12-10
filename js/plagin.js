'use strict';

const timer = deadline => {
  const timeDay = document.querySelector('.timer_day');
  const timeHour = document.querySelector('.timer_hour');
  const timeMin = document.querySelector('.timer_min');
  const timeSec = document.querySelector('.timer_sec');
  const textDays = document.querySelector('.days');
  const textHours = document.querySelector('.hours');
  const textMinutes = document.querySelector('.minutes');
  const textSec = document.querySelector('.sec');

  const decCache = [];
  const decCases = [2, 0, 1, 1, 1, 2];
  function decOfNum(number, titles) {
    if (!decCache[number]) decCache[number] = number % 100 > 4 && number % 100 < 20 ? 2 : decCases[Math.min(number % 10, 5)];
    return titles[decCache[number]];
  }

  const getTimeRemaining = () => {
    const timeDeadLine = new Date(deadline).getTime();
    const dateNow = new Date();
    dateNow.setMinutes(180);

    const remaining = timeDeadLine - dateNow;

    const minutes = Math.floor(remaining / 1000 / 60 % 60);
    const hours = Math.floor(remaining / 1000 / 60 / 60) % 24;
    const days = Math.floor(remaining / 1000 / 60 / 60 / 24);
    const seconds = Math.floor(remaining / 1000) % 60;
    return {remaining, days, minutes, hours, seconds};
  };

  const start = () => {
    const timer = getTimeRemaining();

    if (timer.days > 0) {
      timeDay.textContent = timer.days;
      textDays.textContent = decOfNum(timer.days, ['день', 'дня', 'дней']);
    } else {
      textDays.style.display = 'none';
      textSec.style.display = 'flex';
      timeSec.textContent = timer.seconds;
      textSec.textContent = decOfNum(timer.seconds, ['секунда', 'секунды', 'секунд']);
    }

    timeHour.textContent = timer.hours;
    textHours.textContent = decOfNum(timer.hours, ['час', 'часа', 'часов']);
    timeMin.textContent = timer.minutes;
    textMinutes.textContent = decOfNum(timer.minutes, ['минута', 'минуты', 'минут']);

    const intervalId = setTimeout(start, 1000);

    if (timer.remaining <= 0) {
      timeDay.textContent = '';
      timeHour.textContent = '';
      timeMin.textContent = '';
      timeSec.textContent = '';
    }
  };

  start();
};

const createCountdown = (item) => {
  const countdown = document.querySelector('.main-content_time');

  countdown.insertAdjacentHTML('beforeend',
      ` <div class="main-content_time_time-line">
                    <span class="big__number timer_day"></span>
                    <span class="days">дня</span></div>
                <div class="main-content_time_time-line">
                    <span class="big__number timer_hour"> </span>
                    <span class="hours">часов</span> </div>
                <div class="main-content_time_time-line">
                    <span class="big__number timer_min"> </span>
                    <span class="minutes">минуты</span> </div>
                <div class="main-content_time_time-line">
                    <span class="big__number timer_sec"> </span>
                    <span class="sec">секунды</span> </div>`);
  item.after(countdown);
};

const searchTimer = () => {
  const dataTimer = document.querySelectorAll('[data-timer-deadline]');
  console.log(dataTimer);

  dataTimer.forEach((item) => {
    createCountdown(item);
    const deadline = item.dataset.timerDeadline;
    timer(deadline);
  });
};

searchTimer();
