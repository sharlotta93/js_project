const PubSub = require("../helpers/pub_sub");

const QuestionView = function (container) {
  this.container = container;
}

QuestionView.prototype.render = function (item) {
  const questionContainer = document.createElement("div");
  questionContainer.id = 'question';

  const genre = this.createElement("h3", item.genre);
  const question = this.createElement("p", item.question);
  //const form = this.createInputForm();

  questionContainer.appendChild(genre);
  questionContainer.appendChild(question);
  //questionContainer.appendChild(form);

  this.container.appendChild(questionContainer);

  this.createHintBox(item);
};

QuestionView.prototype.createElement = function (element, text) {
  const newElement = document.createElement(element)
  newElement.textContent = text;
  return newElement;
};

QuestionView.prototype.createHintBox = function (item) {
  const hintContainer = document.createElement("div");
  hintContainer.id = 'hint';

  const hintText = this.createElement("p", item.hint);
  const hintButton = this.createElement("button", "HINT");

  this.hintButton(hintButton, item);

  hintContainer.appendChild(hintButton);
  hintContainer.appendChild(hintText);

  this.container.appendChild(hintContainer);
};

QuestionView.prototype.hintButton = function (button, item) {
  button.value = item._id;
  button.addEventListener('click', (evt) => {
    PubSub.publish("QuestionView:click-hint", evt.target.value)
  })
  return button
};

QuestionView.prototype.createInputForm = function () {
  const form = document.createElement("form");
  form.setAttribute('method',"post");

  const input = document.createElement("input");
  input.setAttribute('type',"text");

  const submit = document.createElement("input");
  submit.setAttribute('type',"submit");

  form.appendChild(input);
  form.appendChild(submit);
};


module.exports = QuestionView;
