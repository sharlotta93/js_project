const PubSub = require("../helpers/pub_sub.js");

const PopUpBox = function () {
}

PopUpBox.prototype.createPopUpBox = function () {
  const popUpBox = document.querySelector('#pop-up-box');
  const image = this.createImage("https://media1.giphy.com/media/3o7WIJufZnyG3LE2Ws/source.gif");
  const image2 = this.createImage("https://i.kym-cdn.com/photos/images/original/000/698/198/cc0.gif");
  //"https://i.kym-cdn.com/photos/images/original/001/173/316/86f.gif"

  PubSub.subscribe("PopUpBox:answer-calculated", (evt) => {
    const isCorrect = evt.detail.correct;
    const isLastQuestion = evt.detail.isLastQuestion;
    popUpBox.classList.remove('hidden');
    if (evt.detail.correct) {
      popUpBox.textContent = "You are Correct! YAY!";
      popUpBox.appendChild(image);
    } else {
      popUpBox.textContent =  "";
      popUpBox.appendChild(image2);
    }
    this.createButton(isCorrect, isLastQuestion);
  });
};

PopUpBox.prototype.createImage = function (url) {
  const image = document.createElement('img');
  image.src = url;
  return image
};

PopUpBox.prototype.createButton = function (isCorrect, isLastQuestion) {
  const popUpBox = document.querySelector('#pop-up-box');
  const button = document.createElement('button');
  button.classList.add('styled-button');
  button.classList.add('ok-button');
  const span = document.createElement('span');
  span.textContent = "OK";
  button.appendChild(span);
  popUpBox.appendChild(button);
  button.focus();
  if (isLastQuestion && isCorrect) {
    button.addEventListener('click', (evt) => {
      popUpBox.classList.add('hidden')
      PubSub.publish("FinalView:display", evt)
    });
    this.accessibilityEnterKey();
  } else {
    button.addEventListener('click', (evt) => {
      popUpBox.classList.add('hidden');
    });
    this.accessibilityEnterKey();
  }
};

PopUpBox.prototype.accessibilityEnterKey = function () {
  const button = document.createElement('button');
  button.addEventListener('keydown', (evt) => {
      if (evt.key == 'Enter') {
        if (popUpBox.classList.contains('hidden')) return
        popUpBox.classList.add('hidden');
      }
    });
};

module.exports = PopUpBox;
