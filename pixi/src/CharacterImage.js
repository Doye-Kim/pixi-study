import char1F from "./assets/char_1/char_1 (0_0).png";
import char1B from "./assets/char_1/char_1 (1_0).png";
import char1R from "./assets/char_1/char_1 (2_0).png";
import char1L from "./assets/char_1/char_1 (3_0).png";
import char1 from "./assets/char_1.png";
const init = {};
const imageSrc = {
  char1F,
  char1B,
  char1R,
  char1L,
  char1,
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
