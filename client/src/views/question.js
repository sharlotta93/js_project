const PubSub = require("../helpers/pub_sub");
const NumberView = require("./number_answer.js");
const MultipleChoiceView = require("./multiple_choice_answer.js");

const QuestionView = function (container) {
  this.container = container;
}

QuestionView.prototype.render = function (question) {
  const questionContainer = document.createElement("div");
  questionContainer.id = 'question';


  const genre = this.createElement("h3", question.genre);
  const text = this.createElement("p", question.question);
  const answer = this.createAnswerInput(question);

  questionContainer.appendChild(genre);
  questionContainer.appendChild(text);
  questionContainer.appendChild(answer);

  this.publishAnswer(answer, question);

  this.container.appendChild(questionContainer);

  this.createHintBox(question);
};

QuestionView.prototype.publishAnswer = function (answer, item) {
  answer.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const answerObject = {
      answerType: item.answer_type,
      genre: item.genre,
      question: item.question,
      answer: item.answer,
      hint: item.hint,
      userAnswer: evt.target["answer-input"].value,
    }
    PubSub.publish("QuestionView:click-guess", answerObject); //getting the value from the input box
    evt.target.reset();
  });
};

QuestionView.prototype.createElement = function (element, text) {
  const newElement = document.createElement(element)
  newElement.textContent = text;
  return newElement;
};

QuestionView.prototype.createHintBox = function (item) {
  const hintContainer = document.createElement("div");
  hintContainer.id = 'hint';

  const hintText = this.createElement("p", item.hint);
  hintText.classList.add('hidden');
  const hintButton = this.createElement("button", "HINT");

  this.hintButton(hintButton, item);

  hintContainer.appendChild(hintButton);
  hintContainer.appendChild(hintText);

  this.container.appendChild(hintContainer);
};

QuestionView.prototype.hintButton = function (button, item) {
  button.value = item._id;
  button.addEventListener('click', (evt) => {
    PubSub.publish("QuestionView:click-hint", evt.target.value)
  })
  return button
};

QuestionView.prototype.createAnswerInput = function (question) {
  if (question.answerType === "number") {
    const numberQuestion = new NumberView();
    return numberQuestion.createInputForm(question);
  }
  else if (question.answerType === "picture") {
    console.log("I am a picture question!");
  }
  else if (question.answerType === "multipleChoice") {
    const multipleChoiceQuestion = new MultipleChoiceView();
    return multipleChoiceQuestion.createInputForm(question.choice1, question.answer, question.choice2, question.choice3);
    console.log("I am a multipleChoice question!");
  }
};


module.exports = QuestionView;
