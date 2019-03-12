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
  return newCountries;
};

Countries.prototype.createQuestionObject = function (countries) {

};

module.exports = Countries;
