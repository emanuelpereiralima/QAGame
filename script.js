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
    // Reset to default color scheme
    document.body.style.backgroundColor = '#000';
    document.body.style.color = '#00ff00';
    document.querySelector('.timer').style.color = '#00ff00';
    document.querySelector('.timer').style.border = '1px solid #00ff00';
    Array.from(document.querySelectorAll('.answers button')).forEach(button => {
        button.style.backgroundColor = '#000';
        button.style.border = '1px solid #00ff00';
        button.style.color = '#00ff00';
    });
    currentQuestionIndex = 0;
    loadQuestion();
    startCountdown(countdownTime, true);
}

function generateRandomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}

function ensureReadableTextColor(bgColor) {
    const [r, g, b] = [0, 1, 2].map(i => parseInt(bgColor.slice(1).substr(i * 2, 2), 16));
    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return luminance > 128 ? '#000000' : '#FFFFFF';
}

function applyRandomRetroFuturisticTheme() {
    const backgroundColor = generateRandomColor();
    const textColor = ensureReadableTextColor(backgroundColor);
    const timerColor = generateRandomColor();
    const buttonBackgroundColor = generateRandomColor();
    const buttonBorderColor = generateRandomColor();
    const buttonTextColor = ensureReadableTextColor(buttonBackgroundColor);

    document.body.style.backgroundColor = backgroundColor;
    document.body.style.color = textColor;
    document.querySelector('.timer').style.color = timerColor;
    document.querySelector('.timer').style.border = `1px solid ${timerColor}`;
    Array.from(document.querySelectorAll('.answers button')).forEach(button => {
        button.style.backgroundColor = buttonBackgroundColor;
        button.style.border = `1px solid ${buttonBorderColor}`;
        button.style.color = buttonTextColor;
    });
}

function handleAnswerClick(index) {
    const correctAnswer = questions[currentQuestionIndex].correct;

    if (index + 1 === correctAnswer) {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            loadQuestion();
        } else {
            // Redirect to video page
            window.location.href = 'video.html';
        }
    } else {
        applyRandomRetroFuturisticTheme();

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
