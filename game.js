'use strict';

// 1. Kártyákra kattintásra...
// 2. ...elindul a stopper
// 3. Elemre kattintva...
// 4. ...leáll a stopper és nulláz/töröl, amit kell


// 1. Kártya esemény

const stopperEventListener = () => {
    document.querySelectorAll('.cards').forEach(item => {
        item.addEventListener('click', handleStopperClick)
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

const handleStopperClick = (event) => {
    timer();
    removeStopperListener();
}

// 2A Kártya kattintós esemény eltávolítása

const removeStopperListener = () => {
    document.querySelectorAll('.cards').forEach(item => {
        item.removeEventListener('click', handleStopperClick)
    })
};


// 3. Próba - elemre kattintási esemény

const stopperEventStopper = () => {
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



// A. Kártyák kiválasztása
// B. Tömbelemek összekeverése
// C. Random elemek beállítása a kártyákra


// A. Kártyák kiválasztása és tömbbe tétele

let spanArray = [];
const cardsSpan = document.querySelectorAll('.cards span');
cardsSpan.forEach(item => {
    spanArray.push(item.textContent);
});


// B. Jelek összekeverése - arr = spanArray

const randomizer = (arr) => {
    let i, j, k;
    for (i = arr.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * i);
        k = arr[i];
        arr[i] = arr[j];
        arr[j] = k;
    }
    return arr;
};


// C. A megkevert jelek kártyára tétele - arr = spanArray

const cardsItem = (arr) => {
    for (let i = 0; i < arr.length; i += 1) {
        cardsSpan[i].textContent = arr[i];
    }
};



// 1. Kártyára kattintásra...
// 2. ...a kártya felfordul és megjelenik a jele


// 1. Kártya kattintás esemény

const cardsEventListener = () => {
    document.querySelectorAll('.cards').forEach(item => {
        item.addEventListener('click', handleCardsClick)
    })
};


// 2. A kártya fordítás és a jel megmutatásának indítása

const handleCardsClick = (event) => {
    event.target.style.transform='rotateY(180deg)';
    event.target.style.backgroundImage='linear-gradient(rgb(135,206,250), rgb(115,226,230))';
    event.target.style.padding='1px';


    cardsEventListener();
//    showSpan();
}


// 3. A kártya fordítása

//const rotateCard = () => {
//    document.querySelectorAll('.cards').forEach(item => {
//        item.style.transform='rotateY(180deg)'
//    })
//}
//





// ---------------------------------------------

stopperEventListener();
stopperEventStopper();
cardsEventListener();

const endGame = () => {
    removeListener();
};

