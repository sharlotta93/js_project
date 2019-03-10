const PubSub = require("../helpers/pub_sub");
const QuestionView = require("./question.js");


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

  const buttonLeft = this.createElement("button", "GO BACK");
  buttonLeft.id = 'leftButton';
  const buttonRight = this.createElement("button", "NEXT QUESTION");
  buttonRight.id = 'rightButton';

  const deleteButton = document.createElement('button');
  deleteButton.textContent = "FINISH GAME";
  deleteButton.value = item._id;
  deleteButton.addEventListener('click', (evt) => {
    location.reload(); //finish button refreshed the page
  })

  this.createButton(buttonLeft, item, "GamenView:go-back-a-question");
  this.createButton(buttonRight, item, "GamenView:next-question");

  gameContainer.appendChild(deleteButton);
  gameContainer.appendChild(buttonLeft);
  gameContainer.appendChild(buttonRight);

  this.container.appendChild(gameContainer);
};

GameView.prototype.createButton = function (button, item, channel) {
  button.value = item._id;
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
