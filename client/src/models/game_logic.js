const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');
const GameView = require('../views/game.js');

const GameLogic = function () {
  this.currentQuestionIndex = 0;
  this.questions = [];
  this.request = new RequestHelper('http://localhost:3000/api/game');
}

GameLogic.prototype.bindEvents = function () {
  PubSub.subscribe("QuestionView:click-hint", (evt) => {
    const id = evt.detail;
    this.questions.forEach((question) => {
      if (id === question._id) {  //getting the correct hint from the db
        const hint = question.hint;
      }
    })
    hint.lastElementChild.classList.toggle('hidden'); //allows you to switch the hint on and off
  })
  PubSub.subscribe("GameView:next-question", (evt) => {
    this.nextQuestion();
  })
  PubSub.subscribe("GameView:previous-question", (evt) => {
    this.previousQuestion();
  })
}

GameLogic.prototype.getFlagQuestions = function () {
  PubSub.subscribe("Countries:questions-ready", (evt) => {
    const flagQuestions = evt.detail;
    flagQuestions.forEach(flagQuestion => this.questions.push(flagQuestion));
  });
  return this.questions;
};
GameLogic.prototype.prepareQuestions = function () {
  this.request.get() //get all questions from database
  .then((questions) => {
    questions.forEach(question => this.questions.push(question)); //assign data received to the array
    this.setupStartButtonListener();
  })
  .catch((err) => console.error(err));
  this.getFlagQuestions();
};

GameLogic.prototype.setupStartButtonListener = function () {
  const startButton = document.querySelector('#start-game');
  startButton.addEventListener('click', () => {
    startButton.classList.add('hidden');
    this.publishCurrentQuestion();
  });
};
GameLogic.prototype.publishCurrentQuestion = function () {
  const question = this.questions[this.currentQuestionIndex]
  question.number = this.currentQuestionIndex + 1;
  PubSub.publish('Game:data-ready', question);
}

GameLogic.prototype.previousQuestion = function () {
  this.currentQuestionIndex -= 1;
  this.publishCurrentQuestion();

  if (this.currentQuestionIndex > 0) {
    const previousButton = document.querySelector('#button-previous');
    previousButton.classList.remove('hidden');
  }
};

GameLogic.prototype.nextQuestion = function () {
  this.currentQuestionIndex += 1;
  this.publishCurrentQuestion();

  if (this.currentQuestionIndex === this.questions.length - 1) {
    const nextButton = document.querySelector('#button-next');
    nextButton.classList.add('hidden');
  }
  const previousButton = document.querySelector('#button-previous');
  previousButton.classList.remove('hidden');
};

GameLogic.prototype.dealWithAnswers = function () {
  const game = new GameView('#game-container');

  PubSub.subscribe("QuestionView:click-guess", (evt) => {
    const answer = evt.detail;
    console.log(evt.detail);
    if (answer.userAnswer == answer.answer) {
      PubSub.publish("PopUpBox:answer-calculated", true);
      this.nextQuestion();
    } else {
      PubSub.publish("PopUpBox:answer-calculated", false);
    }
  });
};



module.exports = GameLogic;
