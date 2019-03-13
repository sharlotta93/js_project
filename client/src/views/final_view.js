const PubSub = require("../helpers/pub_sub");

const FinalView = function () {
  // this.container = container;
}

FinalView.prototype.bindEvents = function () {
  PubSub.subscribe("FinalView:display", (evt) => {
  this.clearContent();  
  this.createFinalMessage();

});
}

FinalView.prototype.createFinalMessage = function () {
  const finalMessage = document.querySelector('#final-message');
  const paragraph = document.createElement('p');
  paragraph.textContent = "Congratulations";
  finalMessage.appendChild(paragraph);

}
FinalView.prototype.clearContent = function () {
  const gameContainer = document.querySelector('#game-container');
  gameContainer.innerHTML = '';
};

module.exports = FinalView;
