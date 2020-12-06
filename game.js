'use strict';

// 1. Kártyákra kattintásra...
// 2. ...elindul a stopper
// 3. Elemre kattintva...
// 4. ...leáll a stopper és nulláz/töröl, amit kell


// 1. Kártya események - MEGHÍVVA

const cardsEventListener = () => {
    document.querySelectorAll('.cards').forEach(item => {
        item.addEventListener('click', handleCardsClick);
    })
    pairsOrNot();
};

const cardsEventListener2 = () => {
    document.querySelectorAll('.cards').forEach(item => {
        item.addEventListener('click', handleStopperClick);
    })
};


// 1A Stopper beállítása - MEGHÍVVA

let stopperTime = 0;
let stopperRunning = false;

const timer = () => {
    stopperRunning = true;
    setInterval(() => {
        if (!stopperRunning) {
            return;
        }
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


// 2. A stopper elindítása - MEGHÍVVA

const handleStopperClick = (event) => {
    timer();
    removeCardsEventListener2();
}

// 2A Kártya kattintós események eltávolítása - MEGHÍVVA

const removeCardsEventListener = () => {
    document.querySelectorAll('.cards').forEach(item => {
        item.removeEventListener('click', handleCardsClick)
    })
};

const removeCardsEventListener2 = () => {
    document.querySelectorAll('.cards').forEach(item => {
        item.removeEventListener('click', handleStopperClick)
    })
};


// 3. Próba - elemre kattintási esemény - MEGHÍVVA

const stopperEventStopper = () => {
    document.querySelector('.c').addEventListener('click', stopperClick)
};


// 4. Stopper leállítása - MEGHÍVVA

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


// A. Kártyák kiválasztása és tömbbe tétele - AUTOMATIKUS

let spanArray = [];
const cards = document.querySelectorAll('.cards');
const cardsSpan = document.querySelectorAll('.cards span');
cardsSpan.forEach(item => {
    spanArray.push(item.textContent);
});


// B. Jelek összekeverése - arr = spanArray - MEGHÍVVA

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


// C. A megkevert jelek kártyára tétele - arr = spanArray - MEGHÍVVA

const cardsItem = (arr) => {
    for (let i = 0; i < arr.length; i += 1) {
        cardsSpan[i].textContent = arr[i];
    }
};



// 1. Kártyára kattintásra...
// 2. ...a kártya felfordul és megjelenik a jele
// 3. A felfordított kártyák vizsgálata


// 1. Kártya kattintás esemény - fent már meg van


// 2. A kártya fordítás és a jel megmutatása - MEGHÍVVA

let flipCounter = 0;
let pairs = 0;
let lookingForPairs = [];
const handleCardsClick = (event) => {
    flipCounter += 1;
    event.target.style.transform = 'rotateY(180deg)';
    event.target.style.backgroundImage = 'linear-gradient(rgb(135,206,250), rgb(115,226,230))';
    event.target.dataset.value = 1;

    let spanItem = event.target.children;
    const showSpan = () => {
        spanItem[0].style.display = 'block';
        lookingForPairs.push(spanItem[0].textContent);
    }
    setTimeout(showSpan, 500)
    cardsEventListener();
}


// 3. Párok vizsgálata - MEGHÍVVA

const pairsOrNot = () => {
    if (flipCounter === 2) {
        for (let i = 0; i < cardsSpan.length; i += 1) {
            if (lookingForPairs[0] === lookingForPairs[1]) {
                pairs += 1;
//                removeCardsEventListener();
            } else {
                cardsSpan[i].style.display = 'none';
                cardsSpan[i+1].style.display = 'none';
                cards[i].style.transform = '';
                cards[i+1].style.transform = '';
                cards[i].style.backgroundImage = 'linear-gradient(rgba(135,206,250,.5), rgba(115,226,230,.5)), url(./backpicture.jpg)';
                cards[i+1].style.backgroundImage = 'linear-gradient(rgba(135,206,250,.5), rgba(115,226,230,.5)), url(./backpicture.jpg)';
            }
        }
    }
    flipCounter > 1 ? flipCounter = 0 : flipCounter = flipCounter;
    lookingForPairs.length > 1 ? lookingForPairs = [] : lookingForPairs = lookingForPairs;
    console.log('Counter:', flipCounter);
    console.log('Pairs:', pairs);
    console.log('Pairs Array:', lookingForPairs);
};





// ---------------------------------------------

const startGame = () => {
    cardsEventListener();
    cardsEventListener2();
    stopperEventStopper();
    randomizer(spanArray);
    cardsItem(spanArray);
}

const endGame = () => {
    removeCardsEventListener();
    removeCardsEventListener2();
    startGame();
};

startGame();
