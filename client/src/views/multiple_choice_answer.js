const MultipleChoiceView = function () {

};

MultipleChoiceView.prototype.createInputForm = function (value1, value2, value3, value4) {

  const guessForm = document.createElement('div');
  guessForm.id = 'radioDiv';

  const radioItem1 = document.createElement("input");
  radioItem1.type = "radio";
  radioItem1.name = "radioGrp";
  radioItem1.id = "rad1";
  radioItem1.value = value1;

  radioItem1.defaultChecked = true;
  radioItem1.checked = true;

  const radioItem2 = document.createElement("input");
  radioItem2.type = "radio";
  radioItem2.name = "radioGrp";
  radioItem2.id = "rad2";
  radioItem2.value = value2;

  const radioItem3 = document.createElement("input");
  radioItem3.type = "radio";
  radioItem3.name = "radioGrp";
  radioItem3.id = "rad4";
  radioItem3.value = value3;

  const radioItem4 = document.createElement("input");
  radioItem4.type = "radio";
  radioItem4.name = "radioGrp";
  radioItem4.id = "rad4";
  radioItem4.value = value4;

  const objTextNode1 = document.createTextNode(value1);
  const objTextNode2 = document.createTextNode(value2);
  const objTextNode3 = document.createTextNode(value3);
  const objTextNode4 = document.createTextNode(value4);

  const objLabel = document.createElement("label");
  objLabel.htmlFor = radioItem1.id;
  objLabel.appendChild(radioItem1);
  objLabel.appendChild(objTextNode1);

  const objLabel2 = document.createElement("label");
  objLabel2.htmlFor = radioItem2.id;
  objLabel2.appendChild(radioItem2);
  objLabel2.appendChild(objTextNode2);

  const objLabel3 = document.createElement("label");
  objLabel3.htmlFor = radioItem3.id;
  objLabel3.appendChild(radioItem3);
  objLabel3.appendChild(objTextNode3);

  const objLabel4 = document.createElement("label");
  objLabel4.htmlFor = radioItem4.id;
  objLabel4.appendChild(radioItem4);
  objLabel4.appendChild(objTextNode4);

  const submitButton = document.createElement('button');
  submitButton.type = 'submit';
  submitButton.textContent = 'Guess';

  guessForm.appendChild(objLabel);
  guessForm.appendChild(objLabel2);
  guessForm.appendChild(objLabel3);
  guessForm.appendChild(objLabel4);
  guessForm.appendChild(submitButton);

  return guessForm;
};

module.exports = MultipleChoiceView;
