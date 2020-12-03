'use strict';


const timer = () => {
    let stopperTime = 0;
    setInterval(() => {
        stopperTime++;
        const seconds = zeroForTime(stopperTime % 60);
        const minutes = zeroForTime(Math.floor(stopperTime / 60) % 60);
        const time = `${[minutes, seconds].join(':')}`
        const showTime = document.querySelector('.timer');
        showTime.textContent = time;
    }, 1000);
}

const zeroForTime = (number) => {
    return number < 10 ? `0${number}` : `${number}`;
}

timer();