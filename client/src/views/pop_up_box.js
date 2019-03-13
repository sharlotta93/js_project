const PubSub = require("../helpers/pub_sub.js");

const PopUpBox = function () {
}

PopUpBox.prototype.createPopUpBox = function () {
  const popUpBox = document.querySelector('#pop-up-box');
  PubSub.subscribe("PopUpBox:answer-calculated", (evt) => {
    const isCorrect = evt.detail.correct;
    const isLastQuestion = evt.detail.isLastQuestion;
    popUpBox.classList.remove('hidden');
    if (evt.detail.correct) {
      popUpBox.textContent = "You are Correct! YAY!";
    } else {
      popUpBox.textContent =  "Try Again! Remember you can always check the hint!";
    }
    this.createButton(isCorrect, isLastQuestion);
  });
};

PopUpBox.prototype.createButton = function (isCorrect, isLastQuestion) {
  const popUpBox = document.querySelector('#pop-up-box');
  const button = document.createElement('button');
  button.classList.add('ok-button');
  button.textContent = "OK";
  popUpBox.appendChild(button);
<<<<<<< HEAD
  if (isLastQuestion && isCorrect) {
    button.addEventListener('click', (evt) => {
      popUpBox.classList.add('hidden')
      PubSub.publish("FinalView:display", evt)
    });
  } else {
    button.addEventListener('click', (evt) => {
      popUpBox.classList.add('hidden');
    });
  }
=======
  button.focus();
  button.addEventListener('click', (evt) => {
    popUpBox.classList.add('hidden');
  });
  button.addEventListener('keydown', (evt) => {
      console.log(evt);
      if (evt.key == 'Enter') {
        if (popUpBox.classList.contains('hidden')) return
        popUpBox.classList.add('hidden');
      }
    });
>>>>>>> 168a4b66d93d582702f0d929ef74dbf9dee5de11
};


module.exports = PopUpBox;
