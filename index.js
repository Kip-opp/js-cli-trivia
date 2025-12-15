/**
 * CLI Trivia Game
 * 
 * Satisfies requirements:
 * - User Interaction: Readline for input/output
 * - JS Features: Functions, Arrays, Loops, Timers
 * - Array Iteration: .map() used for display, .filter() used for scoring
 * - Async: setTimeout used for the game timer
 */

const readline = require('readline');

// 1. DATA STRUCTURES (Array requirement)
const questions = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Lisbon"],
        answer: "3" // User selects by number
    },
    {
        question: "Which JavaScript method adds an element to the end of an array?",
        options: [".pop()", ".push()", ".map()", ".shift()"],
        answer: "2"
    },
    {
        question: "What does 'DOM' stand for?",
        options: ["Document Object Model", "Data Object Mode", "Digital Ordinance Model"],
        answer: "1"
    },
    {
        question: "Which keyword is used to declare a constant variable?",
        options: ["var", "let", "const", "static"],
        answer: "3"
    }
];

// 2. STATE MANAGEMENT
let currentQuestionIndex = 0;
let userAnswers = []; // Store answers to calculate score later
let isGameOver = false;
const GAME_TIME_LIMIT_MS = 120000; // 2 Minutes

// 3. INITIALIZE CLI
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

/**
 * Starts the game, sets the timer, and triggers the first question.
 */
function startGame() {
    console.log(`\n=== WELCOME TO THE JS TRIVIA CLI ===`);
    console.log(`You have ${GAME_TIME_LIMIT_MS / 1000} seconds to answer ${questions.length} questions.\n`);

    // ASYNC FEATURE: Timer (setTimeout)
    // "Display a timer that limits the time" - effectively limits session
    const gameTimer = setTimeout(() => {
        if (!isGameOver) {
            console.log("\n\n!!! TIME'S UP !!!");
            endGame();
        }
    }, GAME_TIME_LIMIT_MS);

    askQuestion();
}

/**
 * Displays the current question and handles recursive flow.
 */
function askQuestion() {
    // Base case: If we've gone through all questions, end game.
    if (currentQuestionIndex === questions.length) {
        endGame();
        return;
    }

    const currentQ = questions[currentQuestionIndex];

    // ARRAY ITERATION METHOD 1: .map()
    // Used to format options dynamically for display
    const optionsDisplay = currentQ.options
        .map((opt, index) => `[${index + 1}] ${opt}`)
        .join("  ");

    // DISPLAY QUESTION
    rl.question(`\nQ${currentQuestionIndex + 1}: ${currentQ.question}\nOptions: ${optionsDisplay}\nYour Answer (number): `, (userInput) => {
        
        // Handle User Input & Feedback
        handleAnswer(userInput.trim(), currentQ);
        
        // Move to next question
        currentQuestionIndex++;
        askQuestion();
    });
}

/**
 * Validates answer and provides immediate feedback.
 */
function handleAnswer(input, questionObj) {
    const isCorrect = input === questionObj.answer;
    
    // Store result for final score
    userAnswers.push(isCorrect);

    // FEEDBACK
    if (isCorrect) {
        console.log("✅ Correct!");
    } else {
        console.log(`❌ Wrong. The correct answer was option ${questionObj.answer}.`);
    }
}

/**
 * Calculates final score and exits the application.
 */
function endGame() {
    // Prevent double execution (from timer vs natural finish)
    if (isGameOver) return; 
    isGameOver = true;

    // ARRAY ITERATION METHOD 2: .filter()
    // Calculates score by filtering only true values
    const score = userAnswers.filter(ans => ans === true).length;

    console.log(`\n================================`);
    console.log(`GAME OVER`);
    console.log(`Your Score: ${score} / ${questions.length}`);
    
    if (score === questions.length) console.log("Perfect Score! 🏆");
    else if (score > 0) console.log("Good effort! 👍");
    else console.log("Better luck next time! 🍀");
    console.log(`================================`);

    // Stop the CLI process
    rl.close();
    process.exit(0);
}

// Start the application
startGame();
