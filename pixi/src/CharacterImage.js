import catLeft from "./assets/catLeft.png";
import catRigth from "./assets/catRight.png";

const init = {};
const imageSrc = {
  catLeft,
  catRigth,
};

const CharacterImages = Object.entries(imageSrc).reduce(
  (images, [key, src]) => {
    const image = new Image();
    image.src = src;
    images[key] = image;
    return images;
  },
  init
);

export default CharacterImages;
