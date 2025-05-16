
let containerEl = document.querySelector(".container")
let playgroundEl = document.querySelector(".playground")
let botScoreEl = document.querySelector(".bot-score")
let humanScoreEl = document.querySelector(".human-score")
let messageEl = document.querySelector("#message-container")
let resetBtn = document.querySelector("#reset-btn")

let animationBotHand = document.querySelector("#playground-hand-bot");
let animationHumanHand = document.querySelector("#playground-hand-human");

let botHand = 0
let botScore = 0
let humanScore = 0
let bestOfRounds = 3

// rock - 0
// paper - 1
// scissor - 2


function setImagePath(hand, id="playground-hand-human"){
    const imagePath = `images/${["rock", "paper", "scissor"][hand]}.svg`;
    document.getElementById(id).src = imagePath
}

function setAnimationEffectHuman(humanHand){

    animationHumanHand.classList.add("active")
    animationHumanHand.addEventListener("animationstart", () => {
    });
    
    animationHumanHand.addEventListener("animationend", () => {
        animationHumanHand.classList.remove("active");
        setImagePath(humanHand, "playground-hand-human")
    });  
}

function setBotHand(){
    setImagePath(botHand, "playground-hand-bot")
}

function setAnimationEffectBot(){
    animationBotHand.classList.add("active")
    animationBotHand.addEventListener("animationstart", () => {
    });
    
    animationBotHand.addEventListener("animationend", () => {
        setBotHand()
        animationBotHand.classList.remove("active");
    }); 
}


function calculateScore(humanHand){

    console.log("Bot choice: " + botHand)
    console.log("Your choice: " + humanHand)

    switch (true) {
        case (humanHand === 0 && botHand === 2) || (humanHand === 1 && botHand === 0) || (humanHand === 2 && botHand === 1):
            humanScore++;
            break;
        case (humanHand === 0 && botHand === 1) || (humanHand === 1 && botHand === 2) || (humanHand === 2 && botHand === 0):
            botScore++;
            break;
    }

    setScore()
}

function resetHands(){
    containerEl.style.display = "flex"
    document.getElementById("playground-hand-human").src = "images/rock.svg"
    document.getElementById("playground-hand-bot").src = "images/rock.svg"
}


function setScore(){

    botScoreEl.textContent = botScore
    humanScoreEl.textContent = humanScore

    if(botScore === bestOfRounds){
        let message = "What a noob🤓! You should be ashamed!! You just LOST to a BOT😂!!!"
        setReusltMessage(message)
    }else if(humanScore === bestOfRounds){
        let message = "Congratulations, You won🎉🥳!!!"
        setReusltMessage(message)
    }
    else{
        setTimeout(() => {
            resetHands()
        }, 3000)
    }

}

function setReusltMessage(message){
    setTimeout(() => {
        messageEl.textContent = message
        animationBotHand.style.display = "none"
        animationHumanHand.style.display = "none"

        messageEl.classList.add("show-message")
        messageEl.classList.remove("hide")
        resetBtn.style.display = "inline"
    }, 3000)
}

function startRound(humanHand){
    containerEl.style.display = "none"

    botHand = Math.floor(Math.random() * 3)
    console.log("BotHand: " + botHand)
    console.log("HumanHand: " + humanHand)
    
    setAnimationEffectBot(botHand)

    setTimeout(() => {
        calculateScore(humanHand)
    }, 2000)
    
    setAnimationEffectHuman(humanHand)
}


function resetGame(){
    resetHands()
    messageEl.classList.add("hide")
    messageEl.classList.remove("show-message")
    resetBtn.style.display = "none"

    animationBotHand.style.display = "flex"
    animationHumanHand.style.display = "flex"

    botScore = 0
    humanScore = 0
    botHand = 0
    botScoreEl.textContent = botScore
    humanScoreEl.textContent = humanScore
}


