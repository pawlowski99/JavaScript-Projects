let count = 0
let countEl = document.getElementById("count-el")
let historyEl = document.getElementById("history-el")


function increment(){
    count += 1
    countEl.textContent = count
}

function save(){
    historyEl.textContent += count + ", "
    count = 0
    countEl.textContent = 0
}