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

GameLogic.prototype.prepareQuestions = function () {
  this.request.get() //get all questions from database
  .then((questions) => {
    this.questions = questions;
    this.displayFirstQuestion(questions, this.currentQuestionIndex); //assign data received to the array
  })
  .catch((err) => console.error(err));
};

GameLogic.prototype.displayFirstQuestion = (questions, index) => {
  // Only for displaying first question
  const startButton = document.querySelector('#start-game');
  startButton.addEventListener('click', () => {
    startButton.classList.add('hidden');
    const question = questions[index];
    question.number = index + 1; //create question.number so it can be accessed later  for displaying <h2>Question ${number}</h2> in views/question.js - QuestionView.render
    PubSub.publish('Game:data-ready', question);
  });
};

GameLogic.prototype.dealWithAnswers = function () {
  const game = new GameView('#game-container');

  PubSub.subscribe("QuestionView:click-guess", (evt) => {
    const answer = evt.detail;
    if (answer.userAnswer == answer.answer) {
      this.popUpBox("You are Correct! YAY!");
      this.nextQuestion();
    } else {
      this.popUpBox("Try Again! Remember you can always check the hint!");
    }
  })
};

GameLogic.prototype.popUpBox = function (text) {
  const popUpBox = document.querySelector('#pop-up-box');
    popUpBox.textContent = text;
  const button= document.createElement('button');
    button.textContent = "OK";
    popUpBox.appendChild(button);
    popUpBox.classList.remove('hidden');
    button.addEventListener('click', (evt) => {
       popUpBox.classList.add('hidden');
  })
};

GameLogic.prototype.previousQuestion = function () {
    this.currentQuestionIndex -= 1;
    const question = this.questions[this.currentQuestionIndex];
    question.number = this.currentQuestionIndex + 1;
    PubSub.publish('Game:data-ready', question);
    if (this.currentQuestionIndex > 0) {
      const previousButton = document.querySelector('#button-previous');
      previousButton.classList.remove('hidden');
    }
};

GameLogic.prototype.nextQuestion = function () {
  this.currentQuestionIndex += 1;
  const question = this.questions[this.currentQuestionIndex];
  question.number = this.currentQuestionIndex + 1;
  PubSub.publish('Game:data-ready', this.questions[this.currentQuestionIndex]);
  if (this.currentQuestionIndex === this.questions.length - 1) {
    const nextButton = document.querySelector('#button-next');
    nextButton.classList.add('hidden');
  }
  const previousButton = document.querySelector('#button-previous');
  previousButton.classList.remove('hidden');
};


module.exports = GameLogic;
