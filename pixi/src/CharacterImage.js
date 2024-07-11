import catLeft from "./assets/catLeft.png";
import catRight from "./assets/catRight.png";

const init = {};
const imageSrc = {
  catLeft,
  catRight,
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
