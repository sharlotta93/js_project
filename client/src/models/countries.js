const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Countries = function () {
};

Countries.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://restcountries.eu/rest/v2/region/europe');
  requestHelper.get().
                then((data) => {
  const questions = this.prepareQuestions(data);
  PubSub.publish('Countries:questions-ready', questions);
  })
};

Countries.prototype.prepareQuestions = function (countries) {
  const newCountries = countries.map(country => ({
    id: country.callingCodes,
    name: country.name,
    capital: country.capital,
    flag: country.flag,
    language: country.languages[0]['name']
  })
);
  const questions = this.getThreeQuestions(newCountries);
  return questions;
};

Countries.prototype.getThreeQuestions = function (countries) {
  const questions = []
  for (let i = 0; i < 3; i++) {
    let question = this.createQuestionObject(countries);
    questions.push(question);
  }
  return questions
};

Countries.prototype.createQuestionObject = function (countries) {
  const questionObject1 = this.random(countries);
  const questionObject2 = this.random(countries);

  const newQuestion = {
      _id: (questionObject1.id + questionObject2.id),
      answerType: "picture",
      genre: "Geography",
      question: `Which of these is the flag of ${questionObject1.name}?`,
      image1: questionObject1.flag,
      image2: questionObject2.flag,
      answer: "image-left",
      hint: `The language of that country is ${questionObject1.language} and the capital is ${questionObject1.capital}.`
  }
  return newQuestion;
};

Countries.prototype.random = function (array) {
  return array[Math.floor(Math.random() * array.length)]
};



module.exports = Countries;
