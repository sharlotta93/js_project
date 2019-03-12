const PubSub = require("../helpers/pub_sub.js");

const PopUpBox = function () {

}

PopUpBox.prototype.createPopUpBox = function () {
  const popUpBox = document.querySelector('#pop-up-box');
  PubSub.subscribe("PopUpBox:answer-calculated", (evt) => {
    popUpBox.classList.remove('hidden');
    if (evt.detail) {
      popUpBox.textContent = "You are Correct! YAY!";
      this.createButton();
    } else {
      popUpBox.textContent =  "Try Again! Remember you can always check the hint!";
      this.createButton();
    }
  });
};

PopUpBox.prototype.createButton = function () {
  const popUpBox = document.querySelector('#pop-up-box');
  const button = document.createElement('button');
  button.textContent = "OK";
  popUpBox.appendChild(button);
  button.addEventListener('click', (evt) => {
    popUpBox.classList.add('hidden');
  });
};

module.exports = PopUpBox;
