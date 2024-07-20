import char_1d1 from "./assets/char_1/char_1 (0_0).png";
import char_1d2 from "./assets/char_1/char_1 (0_1).png";
import char_1d3 from "./assets/char_1/char_1 (0_2).png";
import char_1d4 from "./assets/char_1/char_1 (0_3).png";

import char_1u1 from "./assets/char_1/char_1 (1_0).png";
import char_1u2 from "./assets/char_1/char_1 (1_1).png";
import char_1u3 from "./assets/char_1/char_1 (1_2).png";
import char_1u4 from "./assets/char_1/char_1 (1_3).png";

import char_1r1 from "./assets/char_1/char_1 (2_0).png";
import char_1r2 from "./assets/char_1/char_1 (2_1).png";
import char_1r3 from "./assets/char_1/char_1 (2_2).png";
import char_1r4 from "./assets/char_1/char_1 (2_3).png";

import char_1l1 from "./assets/char_1/char_1 (3_0).png";
import char_1l2 from "./assets/char_1/char_1 (3_1).png";
import char_1l3 from "./assets/char_1/char_1 (3_2).png";
import char_1l4 from "./assets/char_1/char_1 (3_3).png";

const init = {};
const imageSrc = {
  char_1d1,
  char_1d2,
  char_1d3,
  char_1d4,

  char_1u1,
  char_1u2,
  char_1u3,
  char_1u4,

  char_1r1,
  char_1r2,
  char_1r3,
  char_1r4,

  char_1l1,
  char_1l2,
  char_1l3,
  char_1l4,
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
