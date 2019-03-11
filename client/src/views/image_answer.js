const ImageView = function () {

};


ImageView.prototype.createImageQuestion = function () {
  const imageContainer = document.createElement('div');
  imageContainer.id = "image-container";

  const imageLeft = document.createElement('img');
  imageLeft.src = "https://www.ancient.eu/img/r/p/500x600/8297.jpg?v=1520937625";
  imageLeft.id = "image-left";

  const imageRight = document.createElement('img');
  imageRight.src = "https://livitaly-666b.kxcdn.com/wp-content/uploads/2017/07/rome-colosseum-1-750x510.jpg";
  imageRight.id = "image-right";

  imageContainer.appendChild(imageLeft);
  imageContainer.appendChild(imageRight);

  return imageContainer;
};

module.exports = ImageView;
