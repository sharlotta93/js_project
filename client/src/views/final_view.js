const PubSub = require("../helpers/pub_sub");

const FinalView = function () {

}

FinalView.prototype.bindEvents = function () {
  PubSub.subscribe("FinalView:display", (evt) =>
  console.log("Received event from pop_up_box"))
};

FinalView.prototype.createFinalView = function () 

FinalView.prototype.displayView = function () {

}
module.exports = FinalView;
