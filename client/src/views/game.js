const PubSub = require("../helpers/pub_sub");
const QuestionView = require("./questions/question.js");

const GameView = function (container) {
  this.container = container;
}

GameView.prototype.bindEvents = function () {
  PubSub.subscribe("Game:data-ready", (evt) => {
    this.renderQuestion(evt.detail);
    this.createFeatures(evt.detail);
  })
};

GameView.prototype.renderQuestion = function (question) {
  this.container.innerHTML = "";
  const newQuestion = new QuestionView(this.container);
  newQuestion.render(question);
}

GameView.prototype.createFeatures = function (item) {
  const gameContainer = document.createElement("div");
  gameContainer.id = 'game';

  const previousButton = this.createElement("button", "GO BACK");
  previousButton.id = 'button-previous';
  previousButton.classList.add('hidden');

  const nextButton = this.createElement("button", "NEXT QUESTION");
  nextButton.id = 'button-next';

  const finishButton = document.createElement('button');
  finishButton.textContent = "FINISH GAME";
  finishButton.id = "finish-button";
  finishButton.addEventListener('click', (evt) => {
    location.reload(); //finish button refreshes the page
  })

  this.createButton(previousButton, item, "GameView:previous-question");
  this.createButton(nextButton, item, "GameView:next-question");

  gameContainer.appendChild(finishButton);
  gameContainer.appendChild(previousButton);
  gameContainer.appendChild(nextButton);

  this.container.appendChild(gameContainer);
};

GameView.prototype.createButton = function (button, item, channel) {
  button.addEventListener('click', (evt) => {
    PubSub.publish(channel, evt.target.value)
  })
  return button
};

GameView.prototype.createElement = function (element, text) {
  const newElement = document.createElement(element)
  newElement.textContent = text;
  return newElement
};

module.exports = GameView;
