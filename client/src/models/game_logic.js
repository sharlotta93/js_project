const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const GameLogic = function () {
  this.questions = [];
  this.request = new RequestHelper('http://localhost:3000/api/game');
}

GameLogic.prototype.bindEvents = function () {
  PubSub.subscribe("QuestionView:click-hint", (evt) => {
    const id = evt.detail;
    this.questions.forEach((question) => {
      if (id === question._id) {
        const hint = question.hint;
      }
    })
    hint.lastElementChild.classList.toggle('hidden');
  })
}

GameLogic.prototype.prepareQuestions = function () {
  this.request.get() //get all questions from database
      .then((questions) => {
        this.questions = questions;
        this.initialLoad(questions); //assign data received to the array
    })
      .catch((err) => console.error(err));
};

GameLogic.prototype.initialLoad = (questions) => {
  const startButton = document.querySelector('#start-game');
  startButton.addEventListener('click', () => {
    startButton.classList.add('hidden');
    PubSub.publish('Game:data-ready', questions[1]);
  });
};

GameLogic.prototype.dealWithAnswerQ1 = function () {
  PubSub.subscribe("QuestionView:click-guess", (evt) => {
    const answer = evt.detail;
    if (evt.detail == this.questions[1].answer) {
      window.alert("You're correct!" + " press next question!");
    } else {
      window.alert("try again!");
    }
  })
};


module.exports = GameLogic;
