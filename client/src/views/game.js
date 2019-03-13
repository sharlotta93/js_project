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

  const previousButton = this.createButton("button-previous", "GameView:previous-question");
  previousButton.classList.add('hidden');
  const icon1 = this.createIcon('far', 'fa-arrow-alt-circle-left');
  previousButton.appendChild(icon1);

  const nextButton = this.createButton("button-next", "GameView:next-question");
  const icon2 = this.createIcon('far', 'fa-arrow-alt-circle-right');
  nextButton.appendChild(icon2);

  const finishButton = document.createElement('button');
  finishButton.textContent = "FINISH GAME";
  finishButton.id = "finish-button";
  finishButton.addEventListener('click', (evt) => {
    location.reload(); //finish button refreshes the page
  })

  gameContainer.appendChild(finishButton);
  gameContainer.appendChild(previousButton);
  gameContainer.appendChild(nextButton);

  this.container.appendChild(gameContainer);
};

GameView.prototype.createButton = function (id, channel) {
  const newButton = document.createElement('button');
  newButton.id = id;
  newButton.addEventListener('click', (evt) => {
   PubSub.publish(channel, evt.target.value)
  })
  return newButton
};

GameView.prototype.createIcon = function (name1, name2) {
  const icon = document.createElement('i');
  icon.classList.add(name1);
  icon.classList.add(name2);

  return icon
};

GameView.prototype.createElement = function (element, text) {
  const newElement = document.createElement(element)
  newElement.textContent = text;
  return newElement
};

module.exports = GameView;
