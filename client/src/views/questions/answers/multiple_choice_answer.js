const MultipleChoiceView = function () {

};

MultipleChoiceView.prototype.createInputForm = function (value1, value2, value3, value4) {

  const guessForm = document.createElement('form');
  guessForm.name = "radioDiv";
  guessForm.id = 'radioDiv';

  const radioItem1 = this.createRadioButton("rad1", value1);

  radioItem1.defaultChecked = true;
  radioItem1.checked = true;

  const radioItem2 = this.createRadioButton("rad2", value2)
  const radioItem3 = this.createRadioButton("rad3", value3)
  const radioItem4 = this.createRadioButton("rad4", value4)

  const objTextNode1 = document.createTextNode(value1);
  const objTextNode2 = document.createTextNode(value2);
  const objTextNode3 = document.createTextNode(value3);
  const objTextNode4 = document.createTextNode(value4);

  const radioLabel1 = this.createLabel(radioItem1, objTextNode1);
  const radioLabel2 = this.createLabel(radioItem2, objTextNode2);
  const radioLabel3 = this.createLabel(radioItem3, objTextNode3);
  const radioLabel4 = this.createLabel(radioItem4, objTextNode4);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Guess';

  guessForm.appendChild(radioLabel1);
  guessForm.appendChild(radioLabel2);
  guessForm.appendChild(radioLabel3);
  guessForm.appendChild(radioLabel4);
  guessForm.appendChild(submitButton);

  return guessForm;
};

MultipleChoiceView.prototype.createRadioButton = function (id, value) {
  const radioItem = document.createElement("input");
  radioItem.type = "radio";
  radioItem.name = "radioGrp";
  radioItem.id = id;
  radioItem.value = value;

  return radioItem;
};

MultipleChoiceView.prototype.createLabel = function (radioItem, objTextNode) {
  const objLabel = document.createElement("label");
  objLabel.htmlFor = radioItem.id;
  objLabel.appendChild(radioItem);
  objLabel.appendChild(objTextNode);

  return objLabel;
};

module.exports = MultipleChoiceView;
