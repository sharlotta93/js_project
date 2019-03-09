const PubSub = require("../helpers/pub_sub");

const GameView = function (container) {
  this.container = container;
}

GameView.prototype.render = function (item) {
  const gameContainer = document.createElement("div");
  gameContainer.id = 'question';

  const location = this.createElement("h3", item.location);
  const activity = this.createElement("p", item.activity);
  const cost = this.createElement("p", item.cost);
  const button = this.createElement("button", "delete");
  const status = this.createElement("p", `visited: ${item.status}`);

  this.statusSet(status, item)
  this.deleteButton(button, item);

  bucketContainer.appendChild(location);
  bucketContainer.appendChild(activity);
  bucketContainer.appendChild(cost);
  bucketContainer.appendChild(status);
  bucketContainer.appendChild(button);

  this.container.appendChild(bucketContainer);

};

BucketlistItemView.prototype.createElement = function (element, text) {
  const newElement = document.createElement(element)
  newElement.textContent = text;
  return newElement
};

BucketlistItemView.prototype.hintButton = function (button, item) {
  button.value = item._id;
  button.addEventListener('click', (evt) => {
    PubSub.publish("GameView:click-hint", evt.target.value)
  })
  return button
};

// BucketlistItemView.prototype.statusSet = function (status, item) {
//   status.addEventListener("click", (evt) => {
//     item.status = "Done";
//     PubSub.publish("BucketlistItemView:status-update", item)
//   })
// }

module.exports = GameView;
