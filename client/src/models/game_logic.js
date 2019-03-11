const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

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

GameLogic.prototype.prepareQuestion = function () {
  this.request.get() //get all questions from database
  .then((questions) => {
    this.questions = questions;
    this.displayQuestion(questions, this.currentQuestionIndex); //assign data received to the array
  })
  .catch((err) => console.error(err));
};

GameLogic.prototype.displayQuestion = (questions, index) => {
  const startButton = document.querySelector('#start-game');
  startButton.addEventListener('click', () => {
    startButton.classList.add('hidden');
    PubSub.publish('Game:data-ready', questions[index]);
  });
};

GameLogic.prototype.dealWithAnswers = function () {
  PubSub.subscribe("QuestionView:click-guess", (evt) => {
    const answer = evt.detail;
    if (answer.userAnswer == answer.answer) {
      window.alert("You're correct!");
      this.nextQuestion();
    } else {
      //hint.lastElementChild.classList.toggle('hidden');
      window.alert("try again!");
      window.alert("check the hint if you like!");
    }
  })
};

GameLogic.prototype.previousQuestion = function () {
    this.currentQuestionIndex -= 1;
    PubSub.publish('Game:question-index', this.currentQuestionIndex);
    PubSub.publish('Game:data-ready', this.questions[this.currentQuestionIndex]);
    if (this.currentQuestionIndex > 0) {
      const previousButton = document.querySelector('#button-previous');
      previousButton.classList.remove('hidden');
    }
};

GameLogic.prototype.nextQuestion = function () {
  this.currentQuestionIndex += 1;
  PubSub.publish('Game:question-index', this.currentQuestionIndex);
  PubSub.publish('Game:data-ready', this.questions[this.currentQuestionIndex]);
  if (this.currentQuestionIndex === this.questions.length - 1) {
    const nextButton = document.querySelector('#button-next');
    nextButton.classList.add('hidden');
  }
  const previousButton = document.querySelector('#button-previous');
  previousButton.classList.remove('hidden');
};


module.exports = GameLogic;
