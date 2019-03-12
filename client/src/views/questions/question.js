const PubSub = require("../../helpers/pub_sub");
const NumberView = require("./answers/number_answer.js");
const ImageView = require("./answers/image_answer.js");
const MultipleChoiceView = require("./answers/multiple_choice_answer.js");

const QuestionView = function (container) {
  this.container = container;
}

QuestionView.prototype.render = function (question) {
  const questionContainer = document.createElement("div");
  questionContainer.id = 'question';

  const questionNumber = this.createElement("h2", `Question ${question.number}`);
  const genre = this.createElement("h3", question.genre);
  const text = this.createElement("p", question.question);
  const answer = this.createAnswerInput(question);

  questionContainer.appendChild(questionNumber);
  questionContainer.appendChild(genre);
  questionContainer.appendChild(text);
  questionContainer.appendChild(answer);

  this.publishAnswer(answer, question);

  this.container.appendChild(questionContainer);

  this.createHintBox(question);
};

QuestionView.prototype.publishAnswer = function (answer, item) {
  if (answer.name === "answer-form") {
    this.publishNumberAnswer(answer, item);
  }
  else if (answer.name === "radioDiv")
  {
    this.publishRadioAnswer(answer, item);
  }
  else if (answer.id === "image-container")
  {
    this.publishImageAnswer(answer, item);
  }
};

QuestionView.prototype.publishNumberAnswer = function (answer, item) {
  answer.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const answerObject = {
      answerType: item.answer_type,
      answer: item.answer,
      userAnswer: evt.target["answer-input"].value,
    }
    PubSub.publish("QuestionView:click-guess", answerObject); //getting the value from the input box
    evt.target.reset();
  })
};

QuestionView.prototype.publishRadioAnswer = function (answer, item) {
  answer.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const answerObject = {
      answerType: item.answer_type,
      answer: item.answer,
      userAnswer: evt.target.radioGrp.value
    }
    PubSub.publish("QuestionView:click-guess", answerObject);
  })
};

QuestionView.prototype.publishImageAnswer = function (answer, item ) {
  answer.addEventListener('click', (evt) => {
    const answerObject = {
      answerType: item.answer_type,
      answer: item.answer,
      userAnswer: evt.target.id
    }
    PubSub.publish("QuestionView:click-guess", answerObject);
  })
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
    const imageQuestion = new ImageView();
    return imageQuestion.createImageQuestion(question.image1, question.image2);
  }
  else if (question.answerType === "multipleChoice") {
    const multipleChoiceQuestion = new MultipleChoiceView();
    return multipleChoiceQuestion.createInputForm(question.choice1, question.answer, question.choice2, question.choice3);
  }
};

module.exports = QuestionView;
