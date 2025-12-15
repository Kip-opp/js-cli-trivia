const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "Paris"
    },
    {
        question: "Which method adds an element to the end of an array?",
        options: [".pop()", ".push()", ".map()", ".shift()"],
        answer: ".push()"
    },
    {
        question: "What does 'DOM' stand for?",
        options: ["Document Object Model", "Data Object Mode", "Digital Ordinance Model"],
        answer: "Document Object Model"
    },
    {
        question: "Which keyword is used to declare a constant variable?",
        options: ["var", "let", "const", "static"],
        answer: "const"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 120; // 2 Minutes
let timerInterval;

function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    
    // Start Timer
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time-display').innerText = timeLeft;
        if (timeLeft <= 0) endGame();
    }, 1000);

    showQuestion();
}

function showQuestion() {
    let q = questions[currentQuestionIndex];
    document.getElementById('question-text').innerText = q.question;
    
    let container = document.getElementById('options-container');
    container.innerHTML = ''; // Clear old buttons

    // Create buttons dynamically
    q.options.forEach(opt => {
        let btn = document.createElement('button');
        btn.innerText = opt;
        btn.classList.add('option-btn');
        btn.onclick = () => checkAnswer(opt, q.answer);
        container.appendChild(btn);
    });
}

function checkAnswer(selected, correct) {
    let feedback = document.getElementById('feedback');
    if (selected === correct) {
        score++;
        feedback.innerText = "✅ Correct!";
        feedback.style.color = "green";
    } else {
        feedback.innerText = "❌ Wrong!";
        feedback.style.color = "red";
    }

    // Wait 1 second then go to next question
    setTimeout(() => {
        feedback.innerText = "";
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            endGame();
        }
    }, 1000);
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('end-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = `${score} / ${questions.length}`;
}
