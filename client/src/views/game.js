const PubSub = require("../helpers/pub_sub");
const QuestionView = require("./question.js");


const GameView = function (container) {
  this.container = container;
}

GameView.prototype.bindEvents = function () {
  PubSub.subscribe("GameView:data-ready", (evt) => {
    this.renderQuestion(evt.detail);
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

  const buttonLeft = document.createElement("button", "GO BACK");
  const buttonRight = document.createElement("button", "NEXT QUESTION");
  const deleteButton = this.createElement("button", "FINISH GAME");

  this.createButton(deleteButton, item);

  gameContainer.appendChild(deleteButton);

  this.container.appendChild(gameContainer);
};

GameView.prototype.createButton = function (button, item, channel) {
  button.value = item._id;
  button.addEventListener('click', (evt) => {
    PubSub.publish("GamenView:finish-game", evt.target.value)
  })
  return button
};

QuestionView.prototype.createElement = function (element, text) {
  const newElement = document.createElement(element)
  newElement.textContent = text;
  return newElement
};

module.exports = GameView;
