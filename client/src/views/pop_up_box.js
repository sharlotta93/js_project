const PubSub = require("../helpers/pub_sub.js");

const PopUpBox = function () {

}

PopUpBox.prototype.createPopUpBox = function (boolean) {
  const popUpBox = document.querySelector('#pop-up-box');
  if (boolean) {
    popUpBox.textContent = "You are Correct! YAY!";
  } else {
    popUpBox.textContent =  "Try Again! Remember you can always check the hint!";
  }
  popUpBox.classList.remove('hidden');

  const button = document.createElement('button');
  button.textContent = "OK";
  popUpBox.appendChild(button);
  button.addEventListener('click', (evt) => {
    popUpBox.classList.add('hidden');
  });
};

module.exports = PopUpBox;
