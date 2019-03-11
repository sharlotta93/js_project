const MultipleChoiceView = function () {

};

MultipleChoiceView.prototype.createInputForm = function () {

  const guessForm = document.createElement('form');
  guessForm.name = 'answer_form';

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

module.exports = MultipleChoiceView;
