const ImageView = function () {

};

ImageView.prototype.createImageQuestion = function (url1, url2) {
  const imageContainer = document.createElement('div');
  imageContainer.id = "image-container";

  const imageLeft = document.createElement('img');
  imageLeft.src = url1;
  imageLeft.id = "image-left";

  const imageRight = document.createElement('img');
  imageRight.src = url2;
  imageRight.id = "image-right";

  imageContainer.appendChild(imageLeft);
  imageContainer.appendChild(imageRight);

  return imageContainer;
};

module.exports = ImageView;
