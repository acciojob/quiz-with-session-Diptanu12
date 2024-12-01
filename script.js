const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitButton = document.getElementById("submit");

function renderQuestions() {
  const userAnswers = JSON.parse(sessionStorage.getItem("progress")) || [];
  questions.forEach((question, i) => {
    const questionElement = document.createElement("div");
    questionElement.textContent = question.question;
    question.choices.forEach((choice) => {
      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;
      choiceElement.checked = userAnswers[i] === choice; 

      choiceElement.addEventListener("change", () => saveProgress(i, choice));
      const label = document.createElement("label");
      label.appendChild(choiceElement);
      label.appendChild(document.createTextNode(choice));
      questionElement.appendChild(label);
    });
    questionsElement.appendChild(questionElement);
  });
}

function saveProgress(index, choice) {
  const progress = JSON.parse(sessionStorage.getItem("progress")) || [];
  progress[index] = choice;
  sessionStorage.setItem("progress", JSON.stringify(progress));
}

function calculateScore() {
  const progress = JSON.parse(sessionStorage.getItem("progress")) || [];
  let score = 0;
  questions.forEach((question, i) => {
    if (progress[i] === question.answer) score++;
  });
  localStorage.setItem("score", score);
  scoreElement.textContent = `Your score is ${score} out of ${questions.length}.`;
}

document.getElementById("submit").addEventListener("click", calculateScore);
renderQuestions();
