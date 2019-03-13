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
  const paragraph = document.createElement('p');
  paragraph.textContent = "Congratulations! You are awesome!";

  const image = document.createElement('img');
  image.src = 'http://stmarymagdalenpri8403301.wp-sch.durham.gov.uk/wp-content/uploads/sites/19/2017/05/Screen-Shot-2017-05-11-at-20.21.33.png';
  finalMessage.appendChild(image);
  finalMessage.appendChild(paragraph);

}
FinalView.prototype.clearContent = function () {
  const gameContainer = document.querySelector('#game-container');
  gameContainer.innerHTML = '';
};

module.exports = FinalView;
