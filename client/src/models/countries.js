const RequestHelper = require('../helpers/request_helper.js');
const PubSub = require('../helpers/pub_sub.js');

const Countries = function () {
  this.countries = [];
};

Countries.prototype.getData = function () {
  const requestHelper = new RequestHelper('https://restcountries.eu/rest/v2/region/europe');
  requestHelper.get().
                then((data) => {
  const chosenCountries = this.getCountriesData(data);
  this.countries = chosenCountries;
})
    //PubSub.publish('Countries:countries-data-ready', this.countries);
};

Countries.prototype.getCountriesData = function (countries) {
  const newCountries = countries.map(country => ({
    name: country.name,
    capital: country.capital,
    flag: country.flag,
    language: country.languages[0]['name']
  })
);
  const my = this.createQuestionObject(newCountries);
  return my;
};

Countries.prototype.createQuestionObject = function (countries) {
  const questionObject1 = this.random(countries);
  const questionObject2 = this.random(countries);

  const newQuestion = {
      answerType: "picture",
      genre: "Geography",
      question: `Which of these is the flag of ${questionObject1.name}?`,
      image1: questionObject1.flag,
      image2: questionObject2.flag,
      answer: "image-right",
      hint: `The language of that country is ${questionObject1.language} and the capital is ${questionObject1.capital}.`
  }
  return newQuestion;
};
Countries.prototype.random = function (array) {
  return array[Math.floor(Math.random() * array.length)]
};



module.exports = Countries;
