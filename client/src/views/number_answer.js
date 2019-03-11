const NumberView = function () {

};


NumberView.prototype.createInputForm = function () {

  const guessForm = document.createElement('form');
  guessForm.name = 'answer-form';

  const guessInput = document.createElement('input');
  guessInput.type = 'number';
  guessInput.id = 'answer-input';

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Guess';

  guessForm.appendChild(guessInput);
  guessForm.appendChild(submitButton);

  return guessForm;
};

module.exports = NumberView;
