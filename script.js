const startDiv = document.getElementById("start");
const gameSpaceDiv = document.getElementById("gameSpace");
const finalDiv = document.getElementById("final");
const scoreboardDiv = document.getElementById("scoreboard");
const timerDiv = document.getElementById("timer");
const feedbackDiv = document.getElementById("feedback");
const questionDiv = document.getElementById("question");
const scoreDiv = document.getElementById("finalScore");
const buttons = document.querySelectorAll(".answer"); // these are only the answer buttons in the gameSpace
const initialsBox = document.getElementById("initials");
const boardDiV = document.getElementById("board");
const submitBtn = document.getElementById("submit");
let scoreTime = 60;
let questionNumber = 0;
let myInterval;
if(localStorage.getItem("scoreBoard") == null){
    localStorage.setItem("scoreBoard", '[]');
}
let scoreArr = JSON.parse(localStorage.getItem("scoreBoard"))

const questions = [
    {
        question: "Q1: What is not a file type?",
        answer: [".coffee", ".css", ".html", ".js"],
        correctAnswer: 0
    },
    
    {
        question: "Q2: What is a good example of a JavaScript file?",
        answer: ["script.js", "pretty much same as Java file", "coffee", "somthing you can drink"],
        correctAnswer: 0
    },

    {
        question: "Q3: War, HUA, what is it good for?",
        answer: ["Money ", "Plunder", "Absolutely Nothing", "Fame"],
        correctAnswer: 2
    },
    
    {
        question: "Q4: HULK: ",
        answer: ["CLOBBER TIME", "SMASH", "CRUSH", "Rip and Tear"],
        correctAnswer: 1
    },
    
    {
        question: "Q5: What is the meaning of life?",
        answer: ["What meaning", "Work to death", "Consumption", "42"],
        correctAnswer: 3
    }
];

function startTimer(){
    // console.log("Start Timer Function Begin")
    myInterval = setInterval(function() {
        timerDiv.innerHTML = 'Time left: '+scoreTime;
        if(scoreTime < 10){
            timerDiv.innerHTML = 'Time left: 0'+scoreTime;
        }
        if(scoreTime == 0){
            quizEnd();
        }
        scoreTime--;
        }, 1000)
}

function onStart(){
    // console.log("On Start Function Begin")
    startDiv.style.display = "none";
    gameSpaceDiv.style.display = "block";
    getQuestion(questions[questionNumber]); // grabs a question then desplayes it
    startTimer(); // make a function that starts the timer
}

function getQuestion(q){
    // console.log("Get Question Function Begin q: "+ q)
    questionDiv.textContent = q.question; // adds text to the question
    buttons.forEach(function(button, index){
        button.textContent = q.answer[index]; //adds text to the buttons
    })
}

function check(a){ // a will be 0-3, depending on answer givin
    // console.log("Check Function Begin a: "+ a)
    console.log(questions[questionNumber])
    let q = questions[questionNumber]
    if(q.correctAnswer == a){
        feedbackDiv.innerHTML = "Correct";
    }
    else{
        console.log("Incorrect Answer")
        scoreTime -= 10;
        feedbackDiv.innerHTML = "Incorrect";
    }

    questionNumber++;

    if(questionNumber >= questions.length){ // ends quiz if there aren't any more questions
        quizEnd();
    }
    else{
        getQuestion(questions[questionNumber]);
    }
}

function quizEnd(){
    // console.log("Quiz End Function Begin")
    clearInterval(myInterval);
    gameSpaceDiv.style.display = "none";
    finalDiv.style.display = "block"
    scoreDiv.innerHTML = ("Your final score is: " + scoreTime);
    timerDiv.innerHTML = 'Time left: '+scoreTime;
    if(scoreTime < 10){
        timerDiv.innerHTML = 'Time left: 0'+scoreTime;
    }
    boardDiV.innerHTML = scoreArr;
}

function fastEnd(){
    scoreTime = 0;
    startDiv.style.display = "none";
    submitBtn.disabled = true;
    quizEnd();
}

function submit(event){
    event.preventDefault();
    submitBtn.disabled = true;
    let initials = document.getElementById("initials").value;
    console.log(initials)
    scoreArr.push(initials);
    boardDiV.innerHTML = scoreArr;
    localStorage.setItem("scoreBoard", JSON.stringify(scoreArr))
}

function clear1(){
    localStorage.clear()
    console.log("Clear Clicked")
    scoreArr = [];
    boardDiV.innerHTML = scoreArr;
}