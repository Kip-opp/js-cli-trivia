# CLI Trivia Game

A command-line trivia application built with vanilla JavaScript, demonstrating core programming concepts and interactive terminal interfaces.

## Overview

This project implements a timed trivia quiz game that showcases fundamental JavaScript programming patterns including asynchronous operations, array manipulation, user input handling, and state management. The application provides an engaging CLI experience with immediate feedback and score tracking.

## Key Features

- **Interactive Command-Line Interface**: Built with Node.js `readline` module for seamless terminal interaction
- **Time-Limited Gameplay**: 2-minute timer implemented using `setTimeout` for competitive play
- **Real-Time Feedback**: Instant validation of answers with clear success/failure indicators
- **Dynamic Question Display**: Questions and options rendered using array iteration methods
- **Score Calculation**: Final results computed using array filtering techniques
- **Graceful Exit Handling**: Proper cleanup and process termination

## Technical Implementation

### Core JavaScript Concepts Demonstrated

- **Functions**: Modular design with separate functions for game flow, input handling, and scoring
- **Arrays**: Question storage, option management, and answer tracking
- **Loops**: Recursive question iteration and array processing
- **Timers**: Asynchronous game timing with `setTimeout`
- **Array Methods**: 
  - `.map()` for dynamic option display formatting
  - `.filter()` for score calculation
- **State Management**: Global variables tracking game progress and user responses

### Architecture

The application follows a simple state-driven architecture:
1. **Initialization**: Setup readline interface and game constants
2. **Game Loop**: Recursive question prompting until completion or timeout
3. **Input Processing**: Real-time answer validation and feedback
4. **Termination**: Score calculation and graceful exit

## Installation

### Prerequisites

- Node.js (version 12 or higher recommended)
- npm (included with Node.js)

### Setup Instructions

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/js-cli-trivia.git
   ```

2. Navigate to project directory:
   ```bash
   cd js-cli-trivia
   ```

3. Install dependencies (optional for this vanilla JS project):
   ```bash
   npm install
   ```

## Usage

### Starting the Game

Execute the application directly with Node.js:

```bash
node index.js
```

### Game Flow

1. **Welcome Screen**: Game introduction with time limit information
2. **Question Rounds**: Each question displays with numbered options
3. **Input Processing**: Enter the number corresponding to your chosen answer
4. **Immediate Feedback**: Instant validation of your response
5. **Score Summary**: Final results displayed upon completion or timeout

### Example Session

```
=== WELCOME TO THE JS TRIVIA CLI ===
You have 120 seconds to answer 4 questions.

Q1: What is the capital of France?
Options: [1] Berlin  [2] Madrid  [3] Paris  [4] Lisbon
Your Answer (number): 3
✅ Correct!

Q2: Which JavaScript method adds an element to the end of an array?
Options: [1] .pop()  [2] .push()  [3] .map()  [4] .shift()
Your Answer (number): 2
✅ Correct!

...

GAME OVER
Your Score: 3 / 4
Good effort! 👍
```

## Project Structure

```
js-cli-trivia/
├── index.js      # Main application logic
├── README.md     # This documentation file
└── package.json  # Project metadata
```

## Development Notes

### Code Organization

The codebase is organized into logical sections:
- **Data Structures**: Question array with options and answers
- **State Management**: Global variables for game tracking
- **CLI Initialization**: Readline interface setup
- **Game Functions**: Modular functions for each game phase
- **Input Handling**: User response processing and validation

### Extensibility

The application is designed for easy extension:
- Add new questions by extending the `questions` array
- Modify time limits by adjusting `GAME_TIME_LIMIT_MS`
- Customize feedback messages in the `handleAnswer` function
- Implement additional scoring logic in `endGame`

## Dependencies

This project uses only Node.js built-in modules:
- `readline`: For terminal input/output handling

No external dependencies are required, making this a lightweight, standalone application.

## Contributing

Contributions are welcome! Consider:
- Adding new question categories
- Implementing difficulty levels
- Adding persistent high-score storage
- Enhancing the user interface with colors or animations

## License

This project is open source and available under the [MIT License](LICENSE).

## Support

For issues or questions:
1. Check the code comments for implementation details
2. Review the technical documentation above
3. Submit an issue with reproduction steps if needed

