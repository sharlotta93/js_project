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

module.exports = GameView;
