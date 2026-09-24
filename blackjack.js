let dealerCount = 0;
let playerCount = 0;

let dealerAceCount = 0;
let playerAceCount = 0;

let hidden;

let canHit = true;

const buildDeck = () => {
    const deck = []
    const ranks = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    const suits = ["C", "S", "H", "D"];


    for (let i = 0; i < ranks.length; i++) {
        for (let j = 0; j < suits.length; j++) {
            deck.push(ranks[i] + '-' + suits[j])
        }
    }
    return deck
}


const shuffleDeck = (deck) => {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    
    return deck
}

const getValue = (card) => {
    let data = card.split("-");
    let value = data[0];

    if (isNaN(value)) {
        if (value == 'A'){
            return 11;
        }else{
            return 10;
        }
    }
    return parseInt(value);
}

const reduceAce = (sum, aceCount) => {
    while (sum > 21 && aceCount > 0) {
        sum -= 10;
        aceCount--;
    }
    return sum;
}

const hit = (deck) => {
    if (!canHit){
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    playerCount += getValue(card);
    playerAceCount += card[0] == 'A' ? 1 : 0;
    document.getElementById("player-cards").append(cardImg);


    if (reduceAce(playerCount, playerAceCount) > 21) {
        canHit = false;
    }
}


const stay = () => {
    dealerCount = reduceAce(dealerCount, dealerAceCount);
    playerCount = reduceAce(playerCount, playerAceCount);

    if (playerCount > 21) {
        canHit = false;
    }

    document.getElementById("hidden").src = "./cards/" + hidden + ".png" 

    let message = "";
    if (playerCount > 21) {
        message = "You Lose";
    }else if (dealerCount > 21){
        message = "You win";
    }else if (playerCount == dealerCount){
        message = "You tie!";
    }else if (playerCount > dealerCount){
        message = "You Win!";
    }else if (dealerCount > playerCount){
        message = "You lose";
    }

    document.getElementById("results").innerText = "Result: " + message;
    document.getElementById("dealer-sum").innerText = "Score: " + dealerCount;
    document.getElementById("player-sum").innerText = "Score: " + playerCount;
}

const startGame = (deck) => {
    hidden = deck.pop()
    dealerCount += getValue(hidden);
    dealerAceCount += hidden[0] == 'A' ? 1 : 0;

    while(dealerCount < 17){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerCount += getValue(card);
        dealerAceCount += card[0] == 'A' ? 1 : 0;
        document.getElementById("dealer-cards").append(cardImg);
    }

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        playerCount += getValue(card);
        playerAceCount += card[0] == 'A' ? 1 : 0;
        document.getElementById("player-cards").append(cardImg);
    }

    document.getElementById("hit").addEventListener("click",() => hit(deck));
    document.getElementById("stay").addEventListener("click", () => stay());
}

window.onload = () => {
    let deck = buildDeck();
    shuffleDeck(deck);
    
    startGame(deck);

}
