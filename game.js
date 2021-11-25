'use strict';

const cards = document.querySelectorAll('.card');
const cardsSpan = document.querySelectorAll('.span');
const flippedCards = document.querySelectorAll('.flipped');
const showTime = document.querySelector('.timer');

let stopperTime = 0;
let stopperRunning = false;

let spanArray = [];
let flipCounter = 0;
let pairs = 0;
let lookingForPairs = [];

cardsSpan.forEach(item => {
    spanArray.push(item.textContent);
});


const cardClickEvent = () => {
    cards.forEach(item => {
        item.addEventListener('click', cardClickHandler);
    });
};

const startStopperEvent = () => {
    cards.forEach(item => {
        item.addEventListener('click', stopperHandler);
    });
};

const removeCardClickEvent = () => {
    cards.forEach(item => {
        item.removeEventListener('click', cardClickHandler)
    })
};

const removeStopperEvent = () => {
    cards.forEach(item => {
        item.removeEventListener('click', stopperHandler)
    })
};


const cardClickHandler = (event) => {
    let symbol;

    if (event.target.className === 'span') {
        symbol = event.target;

        event.target.parentElement.style.transform = 'rotateY(180deg)';
        event.target.parentElement.className = 'flipped';
    }
    else {
        symbol = event.target.firstChild;

        event.target.style.transform = 'rotateY(180deg)';
        event.target.className = 'flipped';
    };

    flipCounter += 1;
    lookingForPairs.push(symbol.textContent);

    if (lookingForPairs[0] === lookingForPairs[1]) {
        symbol.id = 'pair';
        cards.forEach(item => {
            if (item.className === 'flipped' & item.firstChild.textContent === lookingForPairs[1]) {
                item.firstChild.id = 'pair';
            }
        });
    };

    const showSpan = () => {
        symbol.style.display = 'block';
    };

    const t1 = setTimeout(() => {
        clearTimeout(t1);
        showSpan();
    }, 500);

    const t2 = setTimeout(() => {
        clearTimeout(t2);
        if (flipCounter === 2) {
            pairsOrNot();
        };
        cardClickEvent();
    }, 3000);

};


const stopperHandler = () => {
    timer();
    removeStopperEvent();
};


const timer = () => {
    stopperRunning = true;

    const zeroForTime = (number) => {
        return number < 10 ? `0${number}` : `${number}`;
    };

    setInterval(() => {
        if (!stopperRunning) {
            return;
        }
        stopperTime++;
        const seconds = zeroForTime(stopperTime % 60);
        const minutes = zeroForTime(Math.floor(stopperTime / 60) % 60);
        const time = `${[minutes, seconds].join(':')}`
        showTime.textContent = time;
    }, 1000);
};



const randomizer = () => {
    let i, j, k;
    for (i = spanArray.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * i);
        k = spanArray[i];
        spanArray[i] = spanArray[j];
        spanArray[j] = k;
    }

    for (let x = 0; x < spanArray.length; x += 1) {
        cardsSpan[x].textContent = spanArray[x];
    }

    return spanArray;
};

////////
const pairsOrNot = () => {
    if (lookingForPairs[0] === lookingForPairs[1]) {
        pairs += 1;
    }
    else {
        cardsSpan.forEach(span => {
            if (span.id !== 'pair') {
                span.style.display = 'none'
            }
        });

        cards.forEach(card => {
            if (card.firstChild.id !== 'pair') {
                card.style.transform = '';
                card.className = 'card';
            }
        });
    }

    if (pairs === 5) {
        stopperRunning = false;
        removeCardClickEvent();
        endGame();
    };

    flipCounter = 0;
    lookingForPairs = [];
};



const startGame = () => {
    cardClickEvent();
    startStopperEvent();
    randomizer();
};

const endGame = () => {
    if (confirm('Gratulálok megtaláltad az össze párt! Új játék?')) {
        cardsSpan.forEach(item => {
            item.style.display = 'none';
            item.id = '';
        });
        cards.forEach(item => {
            item.style.transform = '';
            item.className = 'card';
        });
        showTime.textContent = '';
        stopperTime = 0;
        flipCounter = 0;
        pairs = 0;
        lookingForPairs = [];

        removeStopperEvent();
        startGame();
    };
};

startGame();
