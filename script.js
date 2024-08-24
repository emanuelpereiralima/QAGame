let currentQuestionIndex = 0;

// List of questions and answers
const questions = [
    {
        question: "What is the capital of France?",
        answers: ["Berlin", "Madrid", "Rome", "London", "Paris"],
        correct: 5
    },
    {
        question: "What is the largest planet in our Solar System?",
        answers: ["Earth", "Mars", "Jupiter", "Saturn", "Venus"],
        correct: 3
    },
    {
        question: "Which element has the chemical symbol 'O'?",
        answers: ["Gold", "Oxygen", "Hydrogen", "Carbon", "Nitrogen"],
        correct: 2
    }
];

// Timer variables
let countdownTime = 21 * 60; // 21 minutes in seconds
let secondCountdownTime = 7 * 60; // 7 minutes in seconds
let countdownTimer;

function startCountdown(duration, isFirstTimer) {
    let timer = duration, minutes, seconds;
    countdownTimer = setInterval(() => {
        minutes = Math.floor(timer / 60);
        seconds = timer % 60;

        minutes = minutes < 10 ? `0${minutes}` : minutes;
        seconds = seconds < 10 ? `0${seconds}` : seconds;

        document.getElementById('timer').textContent = `${minutes}:${seconds}`;

        if (--timer < 0) {
            clearInterval(countdownTimer);
            if (isFirstTimer) {
                showAlert("Time's up!", 2000, () => {
                    startCountdown(secondCountdownTime, false);
                });
            } else {
                resetGame();
            }
        }
    }, 1000);
}

function showAlert(message, duration, callback) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert';
    alertDiv.textContent = message;
    document.body.appendChild(alertDiv);

    setTimeout(() => {
        document.body.removeChild(alertDiv);
        if (callback) callback();
    }, duration);
}

function resetGame() {
    currentQuestionIndex = 0;
    loadQuestion();
    startCountdown(countdownTime, true);
}

function handleAnswerClick(index) {
    const correctAnswer = questions[currentQuestionIndex].correct;

    if (index + 1 === correctAnswer) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            alert("Congratulations! You've answered all questions correctly!");
        }
    } else {
        // Start blink effect
        const blinkOverlay = document.getElementById('blinkOverlay');
        const consoleContainer = document.getElementById('consoleContainer');

        blinkOverlay.style.display = 'block';
        blinkOverlay.style.opacity = '1';

        // Hide game content during the blink
        consoleContainer.style.display = 'none';

        setTimeout(() => {
            blinkOverlay.style.opacity = '0';
            setTimeout(() => {
                blinkOverlay.style.display = 'none';
                consoleContainer.style.display = 'block';
            }, 500);
        }, 500);
    }
}

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    document.getElementById('question').textContent = currentQuestion.question;
    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = currentQuestion.answers
        .map((answer, index) => `<button onclick="handleAnswerClick(${index})">${index + 1}. ${answer}</button>`)
        .join('');
}

// Initialize the first question and start the countdown
loadQuestion();
startCountdown(countdownTime, true);
