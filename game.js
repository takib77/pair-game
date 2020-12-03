'use strict';

// 1. Kártyákra kattintásra...
// 2. ...elindul a stopper
// 3. Elemre kattintva...
// 4. ...leáll a stopper és nulláz/töröl, amit kell


// 1. Kártya esemény

const addListener = () => {
    document.querySelectorAll('.cards').forEach(item => {
        item.addEventListener('click', handleClick)
    })
};


// 1A Stopper beállítása

let stopperTime = 0;
let stopperRunning = false;

const timer = () => {
    stopperRunning = true;
    setInterval(() => {
        if (!stopperRunning) {
            return;
        }
        console.log(stopperRunning);
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


// 2. A stopper elindítása

const handleClick = (event) => {
    timer();
    removeListener();
}

// 2A Kártya kattintós esemény eltávolítása

const removeListener = () => {
    document.querySelectorAll('.cards').forEach(item => {
        item.removeEventListener('click', handleClick)
    })
};


// 3. Próba - elemre kattintási esemény

const timerEventStopper = () => {
    document.querySelector('.c').addEventListener('click', stopperClick)
};


// 4. Stopper leállítása

const stopperClick = (event) => {
    if (stopperRunning) {
        stopperRunning = false;
        stopperTime = 0;
        document.querySelector('.timer').textContent = '';
    } else {
        stopperRunning = true;
    }
};
















addListener();
timerEventStopper();

const endGame = () => {
    removeListener();
};

