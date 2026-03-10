// Questions organized by topics
const questionsByTopic = {
    "JavaScript Basics": [
        {
            question: "Which keyword is used to declare a constant variable?",
            options: ["var", "let", "const", "static"],
            answer: "const",
            explanation: "The 'const' keyword declares a block-scoped constant that cannot be reassigned."
        },
        {
            question: "What does 'DOM' stand for?",
            options: ["Document Object Model", "Data Object Mode", "Digital Ordinance Model", "Document Oriented Model"],
            answer: "Document Object Model",
            explanation: "DOM stands for Document Object Model, which represents the structure of HTML/XML documents."
        },
        {
            question: "Which method adds an element to the end of an array?",
            options: [".pop()", ".push()", ".map()", ".shift()"],
            answer: ".push()",
            explanation: "The .push() method adds one or more elements to the end of an array and returns the new length."
        },
        {
            question: "What is the result of typeof null in JavaScript?",
            options: ["null", "object", "undefined", "number"],
            answer: "object",
            explanation: "typeof null returns 'object' due to a historical bug in JavaScript that cannot be fixed for backward compatibility."
        }
    ],
    "Functions & Scope": [
        {
            question: "What is a closure in JavaScript?",
            options: ["A function that returns another function", "A function that has access to variables from its outer scope", "A function that can be called immediately", "A function that has no parameters"],
            answer: "A function that has access to variables from its outer scope",
            explanation: "A closure is a function that retains access to variables from its lexical scope, even when the function is executed outside that scope."
        },
        {
            question: "What does 'this' refer to in a regular function call?",
            options: ["The global object", "The object that owns the function", "undefined", "The calling context"],
            answer: "The global object",
            explanation: "In non-strict mode, 'this' in a regular function call refers to the global object (window in browsers)."
        },
        {
            question: "Which of these is NOT a way to create a function in JavaScript?",
            options: ["Function declaration", "Function expression", "Arrow function", "Class method"],
            answer: "Class method",
            explanation: "Class methods are part of ES6 classes, but they are still functions. All options are valid ways to create functions."
        },
        {
            question: "What is the difference between let and var?",
            options: ["let is block-scoped, var is function-scoped", "let is function-scoped, var is block-scoped", "let cannot be reassigned, var can", "There is no difference"],
            answer: "let is block-scoped, var is function-scoped",
            explanation: "let is block-scoped (limited to the block it's declared in), while var is function-scoped (limited to the function it's declared in)."
        }
    ],
    "Async & Promises": [
        {
            question: "What does Promise.all() do?",
            options: ["Returns the first resolved promise", "Returns all resolved promises", "Returns a promise that resolves when all promises resolve", "Returns a promise that rejects if any promise rejects"],
            answer: "Returns a promise that resolves when all promises resolve",
            explanation: "Promise.all() takes an array of promises and returns a single promise that resolves when all input promises resolve."
        },
        {
            question: "What is the purpose of async/await?",
            options: ["To make functions run faster", "To handle synchronous operations", "To write asynchronous code in a synchronous style", "To create new promises"],
            answer: "To write asynchronous code in a synchronous style",
            explanation: "async/await is syntactic sugar that allows writing asynchronous code that looks and behaves more like synchronous code."
        },
        {
            question: "What happens when you use await without async?",
            options: ["It works fine", "It throws a syntax error", "It returns undefined", "It creates a new promise"],
            answer: "It throws a syntax error",
            explanation: "await can only be used inside async functions. Using it outside will result in a syntax error."
        },
        {
            question: "What is the event loop in JavaScript?",
            options: ["A loop that processes synchronous code", "A mechanism that handles asynchronous operations", "A loop that runs forever", "A function that executes callbacks"],
            answer: "A mechanism that handles asynchronous operations",
            explanation: "The event loop is JavaScript's mechanism for handling asynchronous operations by processing the call stack and task queue."
        }
    ],
    "ES6+ Features": [
        {
            question: "What does the spread operator (...) do?",
            options: ["Spreads elements of an array or object", "Creates a new array", "Copies an object", "Joins arrays together"],
            answer: "Spreads elements of an array or object",
            explanation: "The spread operator (...) expands iterable objects into individual elements, useful for copying, merging, or passing arguments."
        },
        {
            question: "What is destructuring assignment?",
            options: ["Assigning values to variables", "Extracting values from arrays or objects", "Creating new objects", "Copying arrays"],
            answer: "Extracting values from arrays or objects",
            explanation: "Destructuring assignment allows you to extract values from arrays or properties from objects into distinct variables."
        },
        {
            question: "What is the purpose of template literals?",
            options: ["To create strings with embedded expressions", "To concatenate strings", "To create multi-line strings", "All of the above"],
            answer: "All of the above",
            explanation: "Template literals (backticks) allow multi-line strings, embedded expressions (${variable}), and string interpolation."
        },
        {
            question: "What does the 'new' keyword do?",
            options: ["Creates a new object", "Sets the prototype", "Calls the constructor", "All of the above"],
            answer: "All of the above",
            explanation: "The 'new' keyword creates a new object, sets its prototype to the constructor's prototype, and calls the constructor with 'this' bound to the new object."
        }
    ],
    "DOM & Browser APIs": [
        {
            question: "Which method adds an event listener to an element?",
            options: [".addEventListener()", ".attachEvent()", ".on()", ".bind()"],
            answer: ".addEventListener()",
            explanation: "addEventListener() is the standard method to attach event handlers to DOM elements."
        },
        {
            question: "What does localStorage.getItem() return if the key doesn't exist?",
            options: ["null", "undefined", "empty string", "false"],
            answer: "null",
            explanation: "localStorage.getItem() returns null when the specified key does not exist in storage."
        },
        {
            question: "Which method removes an element from the DOM?",
            options: [".remove()", ".delete()", ".removeChild()", "Both .remove() and .removeChild()"],
            answer: "Both .remove() and .removeChild()",
            explanation: "Modern browsers support .remove() on the element itself, while .removeChild() is called on the parent element."
        },
        {
            question: "What is the difference between sessionStorage and localStorage?",
            options: ["sessionStorage is temporary, localStorage is persistent", "localStorage is faster", "sessionStorage has more storage", "There is no difference"],
            answer: "sessionStorage is temporary, localStorage is persistent",
            explanation: "sessionStorage data is cleared when the browser tab is closed, while localStorage persists until explicitly cleared."
        }
    ]
};

// Game state
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 120; // 2 Minutes
let timerInterval;
let selectedTopic = null;
let currentQuestions = [];
let wrongAnswers = []; // Track wrong answers for review

// Theme management
function toggleTheme() {
    const body = document.documentElement;
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    body.setAttribute('data-theme', newTheme);
    
    // Update toggle button icon
    const toggleBtn = document.getElementById('theme-toggle');
    toggleBtn.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
    
    // Save preference
    localStorage.setItem('theme', newTheme);
}

function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update toggle button icon
    const toggleBtn = document.getElementById('theme-toggle');
    toggleBtn.innerHTML = savedTheme === 'dark' ? '☀️' : '🌙';
}

function startGame() {
    document.getElementById('start-screen').classList.add('hidden');
    document.getElementById('topic-screen').classList.remove('hidden');
}

function goBackToStart() {
    document.getElementById('topic-screen').classList.add('hidden');
    document.getElementById('end-screen').classList.add('hidden');
    document.getElementById('start-screen').classList.remove('hidden');
}

function selectTopic(topic) {
    selectedTopic = topic;
    currentQuestions = questionsByTopic[topic];
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 120;
    wrongAnswers = [];
    
    document.getElementById('topic-screen').classList.add('hidden');
    document.getElementById('game-screen').classList.remove('hidden');
    
    // Update UI elements
    document.getElementById('current-score').innerText = '0';
    document.getElementById('question-number').innerText = '1/4';
    document.getElementById('progress-bar-fill').style.width = '0%';
    
    // Start Timer
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('time-display').innerText = timeLeft;
        
        // Update progress bar
        const progressPercent = ((120 - timeLeft) / 120) * 100;
        document.getElementById('progress-bar-fill').style.width = progressPercent + '%';
        
        if (timeLeft <= 0) endGame();
    }, 1000);

    showQuestion();
}

function showQuestion() {
    let q = currentQuestions[currentQuestionIndex];
    document.getElementById('question-text').innerText = q.question;
    
    // Update question number
    document.getElementById('question-number').innerText = `${currentQuestionIndex + 1}/${currentQuestions.length}`;
    
    let container = document.getElementById('options-container');
    container.innerHTML = ''; // Clear old buttons

    // Create buttons dynamically
    q.options.forEach(opt => {
        let btn = document.createElement('button');
        btn.innerText = opt;
        btn.classList.add('option-btn');
        btn.onclick = () => checkAnswer(opt, q.answer, q.explanation);
        container.appendChild(btn);
    });
}

function checkAnswer(selected, correct, explanation) {
    let feedback = document.getElementById('feedback');
    let buttons = document.querySelectorAll('.option-btn');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    if (selected === correct) {
        score++;
        feedback.innerHTML = `✅ Correct! <span style="color: var(--muted-text); font-weight: normal;">${explanation}</span>`;
        feedback.style.color = "var(--success-color)";
    } else {
        feedback.innerHTML = `❌ Wrong! <span style="color: var(--muted-text); font-weight: normal;">${explanation}</span>`;
        feedback.style.color = "var(--danger-color)";
    }
    
    // Update score display
    document.getElementById('current-score').innerText = score;

    // Wait 2 seconds then go to next question
    setTimeout(() => {
        feedback.innerHTML = "";
        currentQuestionIndex++;
        if (currentQuestionIndex < currentQuestions.length) {
            showQuestion();
        } else {
            endGame();
        }
    }, 2000);
}

function endGame() {
    clearInterval(timerInterval);
    document.getElementById('game-screen').classList.add('hidden');
    document.getElementById('end-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = `${score} / ${currentQuestions.length}`;
    document.getElementById('final-questions').innerText = currentQuestions.length;
    document.getElementById('final-time').innerText = timeLeft;
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', loadTheme);
