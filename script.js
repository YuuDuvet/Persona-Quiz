
var questions = [
  {
    Op1: ['(A) Japan', '(B) United States', '(C) Europe', ' (D) China'],
    CA1: 'A'
  },
  {
    Op2: ['(A) Shadows that only appear during night', '(B) Clones of the user', ' (C) Manifested beings repsenting emotions', ' (D) Anger driven monsters'],
    CA2: 'C'
  },
  {
    Op3: ['(A) Kirito', '(B) Rudeus', '(C) Kaneki', '(D) Ren'],
    CA3: 'D'
  },
  {
    Op4: ['(A) Yu', '(B) Yusuke', '(C) Ann', '(D) Makoto'],
    CA4: 'A'
  },
  {
    Op5: ['(A) Makoto', '(B) Agis', '(C) Metis', '(D) Ren'],
    CA5: 'A'
  },
  {
    Op6: ['(A) Kaneki', '(B) Kirito', '(C) Morgana', '(D) Rudes'],
    CA6: 'C'
  },
  {
    Op7: ['(A) Persona 4', '(B) Persona 5', '(C) Persona 3'],
    CA7: 'C'
  },
  {
    Op8: ['(A) Persona 5', '(B) Persona 5 Royal', ' (C) Persona 3 Reloaded', '(D) Persona 5: The Phantom X'],
    CA8: 'A'
  },
  {
    Op9: ['(A) Persona 5 Royal', '(B) Persona 3 Reloaded', '(C) Persona Collection', '(D) Shin Megami Tensi V'],
    CA9: 'B'
  },
  {
    Op10: ['(A) Koji Kondo', '(B) Shoji Meguro', '(C) Kenji Miyazawa'],
    CA10: 'B'
  },
  {
    Op11: ['(A) To become the best persona', '(B) To steal from the rich and give to the poor', '(C) To become the most wealthy', '(D) To steal hearts'],
    CA11: 'D'
  },
  {
    Op12: ['(A) Persona 4', '(B) Persona 5', '(C) Persona 3', ' (D) Persona 2'],
    CA12: 'D'
  },
  {
    Op13: ['(A) The Phantom Thieves', '(B) The shadows and the nyx', '(C) The Cops', '(D) nyx'],
    CA13: 'B'
  },
  {
    Op14: ['(A) Relationships that improve personas', '(B) A system of "friends" that are linked to each other', '(C) A system of "enemies" that are linked to each other', ' (D) A system of "likes" that are linked to each other'],
    CA14: 'A'
  },
  {
    Op15: ['(A) Meeting new people', '(B) Your emotions', '(C) Fusing', '(D) Unlocking new meories'],
    CA15: 'C'
  },
  {
    Op16: ['(A) Free roam', '(B) Turn Based', '(C) Puzzle', '(D) TellTale'],
    CA16: 'B'
  },
  {
    Op17: ['(A) Persona 5', '(B) Persona 3', '(C) Persona 4',],
    CA17: 'C'
  },
];

var Question = [
  'Where are the Persona games typically set?',
  'What are Personas?',
  'What is the name of the main character in Persona 5?',
  'What is the name of the main character in Persona 4?',
  'What is the name of the main character in Persona 3? (Male Version)',
  'What is the iconic cat character who appears in multiple Persona games?',
  'Which Person was initially released for the PlayStation 2?',
  'Which Persona was released first?',
  'Which Persona game was released last?',
  'Who is the composer known for the Persona soundtrack?',
  'What is the Phantom Thieves goal in Persona 5?',
  'Which Persona introduced the velvet Room and its attendants?',
  'What are the main antagonists in Persona 3?',
  'What is the "social Link" system in Persona games?',
  'How are Personas acquired in Persona games?',
  'What is the main battle system used in Persona games? (Exculding dancing games)',
  'Which Persona game featured a dance battle system?',
];

let currentQuestionIndex = 0;
let score = 0;
let timeRemaining = 15;
let timerInterval;

function startTimer() {
  clearInterval(timerInterval);
  timeRemaining = 15; // Reset timer for each question
  document.getElementById('timer').textContent = `Time: ${timeRemaining}s`;
  timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeRemaining--;
  document.getElementById('timer').textContent = `Time: ${timeRemaining}s`;
  if (timeRemaining === 0) {
    clearInterval(timerInterval);
    endQuiz("Time's up!");
  }
}

function displayQuestion() {
  if (currentQuestionIndex < questions.length) {
    const question = Question[currentQuestionIndex];
    document.getElementById('question').textContent = question;

    const options = questions[currentQuestionIndex][`Op${currentQuestionIndex + 1}`];
    const optionsElement = document.getElementById('options');
    optionsElement.innerHTML = '';

    options.forEach((option, index) => {
      const optionButton = document.createElement('p');
      optionButton.textContent = option;
      optionsElement.appendChild(optionButton);

      // Add click event listener to each option
      optionButton.addEventListener('click', () => {
        const userAnswer = optionButton.textContent.trim()[1]; // Extract the letter
        checkAnswer(userAnswer);
      });
    });

    startTimer();
  } else {
    endQuiz("You've completed the quiz!");
  }
}

function checkAnswer(userAnswer) {
  const correctAnswer = questions[currentQuestionIndex][`CA${currentQuestionIndex + 1}`];
  const feedbackElement = document.getElementById('feedback');

  if (userAnswer == correctAnswer) {
    score++;
    feedbackElement.textContent = "Correct!";
  } else {
    feedbackElement.textContent = `Incorrect. The correct answer is ${correctAnswer}`;
  }

  currentQuestionIndex++;
  displayQuestion();
}

function endQuiz(message) {
  clearInterval(timerInterval); // Stop the timer
  const feedbackElement = document.getElementById('feedback');
  feedbackElement.textContent = message;
  feedbackElement.textContent += ` Your score is ${score} out of ${questions.length}.`;
  document.getElementById('submit-button').disabled = true; // Disable submit button
}

// Add a timer element to your HTML
document.body.innerHTML += '<p id="timer">Time: 15s</p>';
document.body.innerHTML += '<div id="feedback"></div>'; // Make sure to add feedback element
displayQuestion();