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
  buttonPrevious.classList.add('hidden');

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

GameView.prototype.createPopUpBox = function () {
  // const popUpBox = document.querySelector('#pop-up-box');
  // popUpBox.textContent = "Try Again! Remember you can always check the hint!"
  // popUpBox.classList.add('hidden');
  // const button= document.createElement('button');
  // button.textContent = "OK";
  // popUpBox.appendChild(button);
  //
  // button.addEventListener('click', (evt) => {
  //    popUpBox.classList.add('hidden');
  // })
};

module.exports = GameView;
