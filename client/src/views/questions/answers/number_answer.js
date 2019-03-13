const NumberView = function () {

};


NumberView.prototype.createInputForm = function () {

  const guessForm = document.createElement('form');
  guessForm.name = 'answer-form';

  const guessInput = document.createElement('input');
  guessInput.type = 'number';
  guessInput.id = 'answer-input';

  const submitButton = document.createElement('button');
  submitButton.classList.add('styled-button');
  const span = document.createElement('span');
  span.textContent = "Guess";
  submitButton.appendChild(span);
  submitButton.type = 'submit';

  guessForm.appendChild(guessInput);
  guessForm.appendChild(submitButton);

  return guessForm;
};

module.exports = NumberView;
