import char_1d1 from "./assets/char_1/char_1 (0_0).png";
import char_1d2 from "./assets/char_1/char_1 (0_1).png";
import char_1d3 from "./assets/char_1/char_1 (0_2).png";
import char_1d4 from "./assets/char_1/char_1 (0_3).png";
import char_1d5 from "./assets/char_1/char_1 (0_4).png";
import char_1d6 from "./assets/char_1/char_1 (0_5).png";
import char_1d7 from "./assets/char_1/char_1 (0_6).png";
import char_1d8 from "./assets/char_1/char_1 (0_7).png";

import char_1u1 from "./assets/char_1/char_1 (1_0).png";
import char_1u2 from "./assets/char_1/char_1 (1_1).png";
import char_1u3 from "./assets/char_1/char_1 (1_2).png";
import char_1u4 from "./assets/char_1/char_1 (1_3).png";
import char_1u5 from "./assets/char_1/char_1 (1_4).png";
import char_1u6 from "./assets/char_1/char_1 (1_5).png";
import char_1u7 from "./assets/char_1/char_1 (1_6).png";
import char_1u8 from "./assets/char_1/char_1 (1_7).png";

import char_1r1 from "./assets/char_1/char_1 (2_0).png";
import char_1r2 from "./assets/char_1/char_1 (2_1).png";
import char_1r3 from "./assets/char_1/char_1 (2_2).png";
import char_1r4 from "./assets/char_1/char_1 (2_3).png";
import char_1r5 from "./assets/char_1/char_1 (2_4).png";
import char_1r6 from "./assets/char_1/char_1 (2_5).png";
import char_1r7 from "./assets/char_1/char_1 (2_6).png";
import char_1r8 from "./assets/char_1/char_1 (2_7).png";

import char_1l1 from "./assets/char_1/char_1 (3_0).png";
import char_1l2 from "./assets/char_1/char_1 (3_1).png";
import char_1l3 from "./assets/char_1/char_1 (3_2).png";
import char_1l4 from "./assets/char_1/char_1 (3_3).png";
import char_1l5 from "./assets/char_1/char_1 (3_4).png";
import char_1l6 from "./assets/char_1/char_1 (3_5).png";
import char_1l7 from "./assets/char_1/char_1 (3_6).png";
import char_1l8 from "./assets/char_1/char_1 (3_7).png";

const init = {};
const imageSrc = {
  char_1d1,
  char_1d2,
  char_1d3,
  char_1d4,
  char_1d5,
  char_1d6,
  char_1d7,
  char_1d8,

  char_1u1,
  char_1u2,
  char_1u3,
  char_1u4,
  char_1u5,
  char_1u6,
  char_1u7,
  char_1u8,

  char_1r1,
  char_1r2,
  char_1r3,
  char_1r4,
  char_1r5,
  char_1r6,
  char_1r7,
  char_1r8,

  char_1l1,
  char_1l2,
  char_1l3,
  char_1l4,
  char_1l5,
  char_1l6,
  char_1l7,
  char_1l8,
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
