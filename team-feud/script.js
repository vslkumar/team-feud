
const questions = [
    {
        question: "What is not a good reason to miss work?",
        answers: [
            "Being hungover from the party (30)",
            "Traffic jam (20)",
            "Overslept (15)",
            "Scared of the feedback session (10)",
            "Broke up with their partner last night (25)"
        ],
        points: [30, 20, 15, 10, 25] // Total = 100
    },
    {
        question: "What helps you to get through a workday?",
        answers: [
            "Coffee (25)",
            "Great work buddies (20)",
            "Setting goals (20)",
            "Music (15)",
            "Breaks (10)",
            "Good food (10)"
        ],
        points: [25, 20, 20, 15, 10, 10] // Total = 100
    },
    {
        question: "Name something you are likely to say during a video call?",
        answers: [
            "You’re on mute (25)",
            "Can you see my screen? (20)",
            "I’m having an issue sharing my screen (15)",
            "We/I can’t hear you (15)",
            "Sorry, I need to jump to the next meeting (15)",
            "Is this your cat/dog? Or: Aaaw, a cat/dog! (10)"
        ],
        points: [25, 20, 15, 15, 15, 10] // Total = 100
    },
    {
        question: "Name something people often forget when leaving the house.",
        answers: [
            "Keys (40)",
            "Wallet (30)",
            "Phone (20)",
            "Sunglasses (5)",
            "Umbrella (5)"
        ],
        points: [40, 30, 20, 5, 5] // Total = 100
    },
    {
        question: "Name something people do to relax.",
        answers: [
            "Watch TV (30)",
            "Read a Book (25)",
            "Take a Bath (20)",
            "Go for a Walk (15)",
            "Listen to Music (10)"
        ],
        points: [30, 25, 20, 15, 10] // Total = 100
    }
];

let currentQuestionIndex = 0;
let strikes = 0;
let teamAScore = 0;
let teamBScore = 0;
let currentScore = 0;

// Load the static sound for clicking the answer and strike sound
let answerClickSound = new Audio('answer_click_sound.mp3'); // Uploaded sound for clicking the answer
answerClickSound.preload = 'auto';
let strikeSound = new Audio('strike_sound.mp3'); // Uploaded sound for strikes
strikeSound.preload = 'auto';

function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    const questionData = questions[currentQuestionIndex];
    let questionHTML = `
        <div class="question">
            <h2>${questionData.question} <span class="strikes">Strikes: <span id="strikes">0</span>/3 <button class="strike-button" onclick="addStrike()">X</button></span></h2>
            <div class="score">Score: <span id="currentScore">0</span></div>
            <div id="answerContainer" class="answer">
    `;

    questionData.answers.forEach((answer, index) => {
        questionHTML += `<p onclick="revealAnswer(this, ${index})">${index + 1}</p>`;
    });

    questionHTML += `</div></div>`;
    questionContainer.innerHTML = questionHTML;
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        strikes = 0;
        currentScore = 0;
        loadQuestion();
        resetTimer();
    } else {
        alert("Game Over! Thanks for playing!");
    }
}

function previousQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        strikes = 0;
        currentScore = 0;
        loadQuestion();
        resetTimer();
    }
}

function revealAnswer(element, answerIndex) {
    playAnswerClickSound();
    if (element.textContent.length === 1) {
        const questionData = questions[currentQuestionIndex];
        element.textContent = questionData.answers[answerIndex];
        element.classList.add("revealed");
        const points = questionData.points[answerIndex];
        currentScore += points;
        document.getElementById('currentScore').textContent = currentScore;
    } else {
        addStrike();
    }
}

function addStrike() {
    playStrikeSound();
    if (strikes < 3) {
        strikes++;
        document.getElementById('strikes').textContent = strikes;
    }
    if (strikes === 3) {
        alert("3 strikes! You lost this round.");
    }
}

function addTeamScore(team) {
    if (team === 'A') {
        teamAScore += currentScore;
        document.getElementById('teamAScore').textContent = teamAScore;
    } else if (team === 'B') {
        teamBScore += currentScore;
        document.getElementById('teamBScore').textContent = teamBScore;
    }
    currentScore = 0;
    document.getElementById('currentScore').textContent = currentScore;
}

function playAnswerClickSound() {
    if (answerClickSound) {
        answerClickSound.currentTime = 0; // Restart the sound from the beginning
        answerClickSound.play().catch(error => {
            console.error("Error playing sound:", error);
        });
    }
}

function playStrikeSound() {
    if (strikeSound) {
        strikeSound.currentTime = 0; // Restart the sound from the beginning
        strikeSound.play().catch(error => {
            console.error("Error playing sound:", error);
        });
    }
}

let timer;
let timeLeft = 10;

function startTimer() {
    clearInterval(timer);
    timer = setInterval(function() {
        if (timeLeft <= 0) {
            clearInterval(timer);
        } else {
            document.getElementById("timer").textContent = --timeLeft;
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 10;
    document.getElementById("timer").textContent = timeLeft;
}

// Load the first question on page load
window.onload = function() {
    loadQuestion();
};
