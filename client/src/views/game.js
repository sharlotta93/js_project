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

  const buttonPrevious = this.createElement("button", "GO BACK");
  buttonPrevious.id = 'button-previous';
  const buttonNext = this.createElement("button", "NEXT QUESTION");
  buttonNext.id = 'button-next';

  const buttonFinish = document.createElement('button');
  buttonFinish.textContent = "FINISH GAME";
  buttonFinish.value = item._id;
  buttonFinish.addEventListener('click', (evt) => {
    location.reload(); //finish button refreshes the page
  })

  this.createButton(buttonPrevious, item, "GameView:previous-question");
  this.createButton(buttonNext, item, "GameView:next-question");

  gameContainer.appendChild(buttonFinish);
  gameContainer.appendChild(buttonPrevious);
  gameContainer.appendChild(buttonNext);

  this.container.appendChild(gameContainer);
};

GameView.prototype.createButton = function (button, item, channel) {
  button.value = button.id;
  console.log(button.id);
  button.addEventListener('click', (evt) => {
    PubSub.publish(channel, evt.target.value)
    console.log(evt.target.value);

  })
  return button
};

GameView.prototype.createElement = function (element, text) {
  const newElement = document.createElement(element)
  newElement.textContent = text;
  return newElement
};

module.exports = GameView;
