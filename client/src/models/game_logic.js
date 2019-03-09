const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const GameLogic = function () {
  this.questions = [];
  this.request = new RequestHelper('/api/game');
}

GameLogic.prototype.prepareQuestions = function () {
  this.request
    .get()
    //get all questions from database
    .then((questions) => {
      console.log(questions);
      //assign data received to the array
      this.questions = questions;
    })

    .catch((err) => console.error(err));
};
GameLogic.prototype.initialLoad = () => {
  const startButton = document.querySelector('#start-game');
  startButton.addEventListener('click', onStartButtonClick)
};

GameLogic.prototype.onStartButtonClick = () => {
    startButton.classList.add('hidden');
    PubSub.publish('Game:initial-question', this.questions[0])
    console.log(this.questions[0]);
};



GameLogic.prototype.onStartButtonClick = function () {

};
