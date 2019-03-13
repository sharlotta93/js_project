const PubSub = require("../helpers/pub_sub");

const FinalView = function () {
}

FinalView.prototype.bindEvents = function () {
  PubSub.subscribe("FinalView:display", (evt) => {
  this.clearContent();
  this.createFinalMessage();

});
}

FinalView.prototype.createFinalMessage = function () {
  const finalMessage = document.querySelector('#final-message');
  finalMessage.classList.remove('hidden');
  const paragraph = document.createElement('p');

  paragraph.textContent = "Congratulations! You are AWESOME!";

  const image = document.createElement('img');
  image.src = "https://media.giphy.com/media/l4q7TIW8nEZYOJUf6/giphy.gif";
  finalMessage.appendChild(image);
  finalMessage.appendChild(paragraph);

}
FinalView.prototype.clearContent = function () {
  const gameContainer = document.querySelector('#game-container');
  gameContainer.innerHTML = '';
};

module.exports = FinalView;
