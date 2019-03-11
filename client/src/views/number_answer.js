const NumberView = function () {

};

// NumberView.prototype.publishAnswer = function (item) {
//   const form = this.createInputForm();
//   form.addEventListener('submit', (evt) => {
//     evt.preventDefault();
//     const answerObject = {
//       answerType: item.answer_type,
//       genre: item.genre,
//       question: item.question,
//       answer: item.answer,
//       hint: item.hint,
//       userAnswer: evt.target["answer-input"].value,
//     }
//     PubSub.publish("QuestionView:click-guess", answerObject); //getting the value from the input box
//     evt.target.reset();
//   })
// };

NumberView.prototype.createInputForm = function () {

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

module.exports = NumberView;
