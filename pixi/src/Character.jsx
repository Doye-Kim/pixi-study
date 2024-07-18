import CharacterImages from "./CharacterImage";
import { useState, useEffect, useCallback } from "react";
import { Sprite } from "@pixi/react";
import { Loader, Texture, Rectangle } from "pixi.js";
import collisions from "./assets/home-collisions";

const Direction = {
  DOWN: 0,
  UP: 1,
  RIGHT: 2,
  LEFT: 3,
};

const MAP_X = 512;
const MAP_Y = 384;
const SIZE = 32;

const charUrl = "http://localhost:5173/src/assets/char_1.png";

class Boundary {
  static width = 8;
  static height = 8;
  constructor({ position }) {
    this.position = position;
    this.width = 8;
    this.height = 8;
  }
}

const Character = () => {
  const [collisionMap, setCollisionMap] = useState([]);
  const [boundaries, setBoundaries] = useState([]);

  const [textures, setTextures] = useState([]);

  useEffect(() => {
    const loader = Loader.shared;

    loader.add("character", charUrl).load((loader, resources) => {
      // 리소스 로드 완료 후 처리
      const characterTexture = resources.character.texture;
      // 여기서부터 리소스 사용 가능

      const baseTexture = resources.character.texture.baseTexture;

      // 텍스처를 담을 배열
      const texturesArray = [];

      for (let y = 0; y < 128; y += 32) {
        for (let x = 0; x < 256; x += 32) {
          // PIXI.Rectangle을 사용하여 프레임의 위치와 크기 정의
          const frame = new Rectangle(x, y, 32, 32);
          // PIXI.Texture.from을 사용하여 텍스처 생성 후 배열에 추가
          texturesArray.push(new Texture(baseTexture, frame));
        }
      }

      // 텍스처 배열 상태 업데이트
      setTextures(texturesArray);
    });
  }, []);

  useEffect(() => {
    const initializeCollisionMap = () => {
      let tempCollisionMap = [];
      for (let i = 0; i < collisions.length; i += 61) {
        tempCollisionMap.push(collisions.slice(i, i + 61));
      }
      return tempCollisionMap;
    };

    const initializeBoundaries = (collisionMap) => {
      let tempBoundaries = [];
      collisionMap.forEach((row, i) => {
        row.forEach((symbol, j) => {
          if (symbol === 15) {
            tempBoundaries.push({
              position: {
                x: j * Boundary.width,
                y: i * Boundary.height,
              },
              width: Boundary.width,
              height: Boundary.height,
            });
          }
        });
      });
      return tempBoundaries;
    };

    const collisionMap = initializeCollisionMap();
    setCollisionMap(collisionMap);

    const boundaries = initializeBoundaries(collisionMap);
    setBoundaries(boundaries);
  }, []);

  const [charImage, setCharImage] = useState(CharacterImages.char1F);
  const [charX, setCharX] = useState(217);
  const [charY, setCharY] = useState(320);

  const boundaryCollision = useCallback(
    (x, y) => {
      console.log(boundaries);
      return boundaries.some((col) => {
        console.log(col.width, col.position.x, x, col.position.y, y);
        return (
          col.position.x <= x + SIZE &&
          col.position.x + col.width >= x &&
          col.position.y <= y + SIZE &&
          col.position.y + col.height >= y
        );
      });
    },
    [boundaries]
  );

  const handleArrowKeyDown = useCallback(
    (e) => {
      console.log("handleArrowKeyDown");
      const distance = 12;
      const ArrowKeys = [
        {
          code: "KeyW",
          movement: { x: 0, y: -distance },
          dir: Direction.UP,
          isMoveable: () =>
            charY > 0 && !boundaryCollision(charX, charY - distance),
        },
        {
          code: "KeyS",
          movement: { x: 0, y: distance },
          dir: Direction.DOWN,
          isMoveable: () =>
            charY < MAP_Y - SIZE && !boundaryCollision(charX, charY + distance),
        },
        {
          code: "KeyD",
          movement: { x: distance, y: 0 },
          dir: Direction.RIGHT,
          isMoveable: () =>
            charX < MAP_X - SIZE && !boundaryCollision(charX + distance, charY),
        },
        {
          code: "KeyA",
          movement: { x: -distance, y: 0 },
          dir: Direction.LEFT,
          isMoveable: () =>
            charX > 0 && !boundaryCollision(charX - distance, charY),
        },
      ];

      let handled = false;

      for (let i = 0; i < ArrowKeys.length; i++) {
        const { code, movement, dir, isMoveable } = ArrowKeys[i];

        if (e.code === code && isMoveable()) {
          setCharX((prev) => prev + movement.x);
          setCharY((prev) => prev + movement.y);
          setCharImage(getImageByDirection(dir));
          handled = true;
          break;
        }
      }

      if (handled) {
        e.preventDefault(); // Prevent default scrolling behavior for arrow keys
      }
    },
    [charX, charY, boundaryCollision]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleArrowKeyDown);

    return () => {
      document.removeEventListener("keydown", handleArrowKeyDown);
    };
  }, [handleArrowKeyDown]);

  if (textures.length === 0) {
    return null;
  }

  return (
    <>
      {/* {boundaries.map((i, idx) => (
        <Sprite
          key={idx}
          image={charImage}
          x={i.position.x}
          y={i.position.y}
          width={8}
          height={8}
        />
      ))} */}
      <div>
        {textures.map((texture, index) => (
          <img
            key={index}
            src={texture.baseTexture.resource.source.src}
            alt={`Texture ${index}`}
            width={32}
            height={32}
          />
        ))}
      </div>
      {/* <Sprite image={charImage} x={charX} y={charY} width={60} height={60} /> */}
    </>
  );
};

const getImageByDirection = (dir) => {
  if (dir === Direction.LEFT) return CharacterImages.char1L;
  else if (dir === Direction.DOWN) return CharacterImages.char1F;
  else if (dir === Direction.UP) return CharacterImages.char1B;
  else return CharacterImages.char1R;
};

export default Character;
