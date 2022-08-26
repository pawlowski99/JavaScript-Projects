let message = ""
let hasBlackJack = false
let isAlive = false
let isDoubledDown = false
let endedTurn = false
let playerSum = 0
let dealerSum = 0
let playerCards = []
let dealerCards = []
let prize = 15
let bet = 10

let messageEl = document.getElementById("message-el")
let playerSumEl = document.getElementById("player-sum-el")
let dealerSumEl = document.getElementById("dealer-sum-el")
let prizeEl = document.getElementById("prize-el")
let betEl = document.getElementById("bet-el")
let chipsEl = document.getElementById("chips-el")
let playerCardsEl = document.getElementById("player-cards-el")
let dealerCardsEl = document.getElementById("dealer-cards-el")

let playerEl = document.getElementById("player-el")
let dealerEl = document.getElementById("dealer-el")

let newHandBtn = document.getElementById("new-hand-btn")
let doubleDownBtn = document.getElementById("double-down-btn")
let newCardBtn = document.getElementById("new-card-btn")
let endRoundBtn = document.getElementById("end-round-btn")

let player = {
    name: "Player",
    chips: 0
}

newHandBtn.style.display = "none"
doubleDownBtn.style.display = "none"
newCardBtn.style.display = "none"
endRoundBtn.style.display = "none"

function getRandomCard(){
    let card = Math.floor( Math.random() * 13 ) + 1
    if (card === 1){
        return 11
    }
    else if (card > 10){
        return 10
    }
    return card
}

function newGame(){
    newHandBtn.style.display = "inline-block"
    doubleDownBtn.style.display = "inline-block"
    newCardBtn.style.display = "inline-block"
    endRoundBtn.style.display = "inline-block"
    player.chips = 200
    newHand()
}

function newHand(){
    if(player.chips>=10){
        isAlive = true
        hasBlackJack = false
        isDoubledDown = false
        endedTurn = false
        message = "Draw a new card ?"
        prize = 15
        player.chips -= 10    
        playerCards = [getRandomCard(), getRandomCard()]
        if(playerCards[0] === 11 && playerCards[1] === 11){
            playerCards[0] = 1
        }
        playerSum = playerCards[0] + playerCards[1]

        dealerCards = [getRandomCard(), getRandomCard()]
        if(dealerCards[0] === 11 && dealerCards[1] === 11){
            dealerCards[0] = 1
        }
        dealerSum = dealerCards[0] + dealerCards[1]

        renderGame()
    }
    else{
        messageEl.textContent = "No chips!"
    }
}

function renderGame(){
    betEl.textContent = "Current bet: $" + bet
    prizeEl.textContent = "Current prize pool: $" + prize
    playerEl.textContent = player.name + ": $" + player.chips
    dealerEl.textContent = "Dealer"
    if(endedTurn === false){
        dealerSumEl.textContent = "Sum: ?"
    }
    else{
        dealerSumEl.textContent = "Sum: " + dealerSum
    }
    dealerCardsEl.textContent = ""
    for(let i=0;i<dealerCards.length;i++){
        let cardToPrint = document.createElement('div')
        if(endedTurn === false && i+1 === dealerCards.length){
            cardToPrint.textContent = "?"
        }
        else{
            if(dealerCards[i]!=11){
                cardToPrint.textContent = dealerCards[i]
            }
            else{
                cardToPrint.textContent = "A"
            }
            
        }
        dealerCardsEl.appendChild(cardToPrint)
    }
    playerCardsEl.textContent = ""
    for(let i=0;i<playerCards.length;i++){
        let cardToPrint = document.createElement('div')
        if(playerCards[i]!=11){
            cardToPrint.textContent = playerCards[i]
        }
        else{
            cardToPrint.textContent = "A"
        }
        playerCardsEl.appendChild(cardToPrint)
    }
    messageEl.textContent = message
    playerEl.textContent = "You"
    playerSumEl.textContent = "Sum: " + playerSum
    chipsEl.textContent = "Player: $" + player.chips
}

function checkGameState(){
    if(endedTurn === false){
        if (playerSum <= 20){
            message = "Draw a new card ?"
        }
        else if (playerSum === 21){
            message = "You Win!"
            hasBlackJack = true
            player.chips += prize
        }
        else{
            message = "You're out!"
            isAlive = false
        }
    }
    else{
        isAlive = false
        if(dealerSum > 21 || dealerSum < playerSum){
            message = "You Win!"
            player.chips += prize
        }
        else if(dealerSum === playerSum){
            message = "Draw!"
            player.chips += bet
        }
        else{
            message = "Dealer wins!"
        }
    }
}

function newCard(){
    if(isAlive === true && hasBlackJack === false && isDoubledDown === false){
        let card = getRandomCard()
        playerCards.push(card)
        if(card===11 && playerSum+11>21){
            playerSum += 1
        }
        else{
            playerSum += card
        }
        checkGameState()
        renderGame()
    }
    else{
        messageEl.textContent = "Can't get a new card!"
    }
}

function doubleDown(){
    if(isAlive === true && hasBlackJack === false && isDoubledDown === false && player.chips >= 10){
        isDoubledDown = true
        player.chips -= 10
        prize *= 2
        bet *= 2
        let card = getRandomCard()
        playerCards.push(card)
        if(card===11 && playerSum+11>21){
            playerSum += 1
        }
        else{
            playerSum += card
        }
        checkGameState()
        renderGame()
    }
    else{
        messageEl.textContent = "Can't double down!"
    }
}

function endRound(){
    if(isAlive === true && hasBlackJack === false){
        endedTurn = true
        while(dealerSum<17){
            let card = getRandomCard()
            dealerCards.push(card)
            if(card===11 && dealerSum+11>21){
                dealerSum += 1
            }
            else{
                dealerSum += card
            }
        }
        checkGameState()
        renderGame()
    }
    else{
        messageEl.textContent = "Round is already over!"
    }
}