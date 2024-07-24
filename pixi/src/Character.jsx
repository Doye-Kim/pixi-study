import CharacterImages from "./CharacterImages";
import { useState, useEffect, useCallback } from "react";
import collisions from "./assets/home-collisions";
import { Sprite, Container } from "@pixi/react";

import {
  initializeCollisionMap,
  initializeBoundaries,
} from "./utils/collisionUtils";
import throttle from "./utils/throttle";
import Nickname from "./Nickname";

const Direction = {
  DOWN: 0,
  UP: 1,
  RIGHT: 2,
  LEFT: 3,
};

const MAP_X = 488;
const MAP_Y = 384;
const SIZE = 32;

const BoundaryWidth = 8;
const BoundaryHeight = 8;

const Character = () => {
  const [collisionMap, setCollisionMap] = useState([]);
  const [boundaries, setBoundaries] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [charImage, setCharImage] = useState(CharacterImages.char_1d1);
  const [charX, setCharX] = useState(217);
  const [charY, setCharY] = useState(300);
  const [animationTimer, setAnimationTimer] = useState(null);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const collisionMap = initializeCollisionMap(collisions);
    setCollisionMap(collisionMap);

    const boundaries = initializeBoundaries(
      collisionMap,
      BoundaryWidth,
      BoundaryHeight
    );
    setBoundaries(boundaries);
  }, []);

  const boundaryCollision = useCallback(
    (x, y) => {
      return boundaries.some((col) => {
        return (
          col.position.x + BoundaryWidth >= x + 16 &&
          col.position.y + BoundaryHeight >= y + 35 &&
          x + 48 >= col.position.x &&
          y + 40 >= col.position.y
        );
      });
    },
    [boundaries]
  );

  const handleArrowKeyDown = useCallback(
    (e) => {
      console.log("keydown");
      setIsAnimating(true);
      const distance = 9;
      const ArrowKeys = [
        {
          code: "KeyW",
          movement: { x: 0, y: -distance },
          dir: Direction.UP,
          isMoveable: () => charY - 16 > 0,
        },
        {
          code: "KeyS",
          movement: { x: 0, y: distance },
          dir: Direction.DOWN,
          isMoveable: () => charY + 24 < MAP_Y - SIZE,
        },
        {
          code: "KeyD",
          movement: { x: distance, y: 0 },
          dir: Direction.RIGHT,
          isMoveable: () => charX + 16 < MAP_X - SIZE,
        },
        {
          code: "KeyA",
          movement: { x: -distance, y: 0 },
          dir: Direction.LEFT,
          isMoveable: () => charX + 16 > 0,
        },
        {
          code: "Space",
          movement: { x: 0, y: 0 },
          dir: direction,
          isMoveable: () => false,
        },
      ];

      let handled = false;

      for (let i = 0; i < ArrowKeys.length; i++) {
        const { code, movement, dir, isMoveable } = ArrowKeys[i];

        if (e.code === code) {
          if (direction !== dir) {
            setDirection(dir);
            setStepIndex(0);
            setCharImage(directionImages[dir][0]);
          } else if (!isAnimating && isMoveable()) {
            // 한 번 누른 거 처리
            setCharImage(getImageByDirection(dir));
          } else if (isMoveable()) {
            setCharImage(getImageByDirection(dir));
            handled = true;
            break;
          }
        }
      }

      if (handled) {
        e.preventDefault();
      }
    },
    [charX, charY, boundaryCollision, direction, isAnimating]
  );
  const handleArrowKeyUp = useCallback(() => {
    setIsAnimating(false);
    setStepIndex(0);
    if (animationTimer) {
      clearTimeout(animationTimer);
    }
  }, [animationTimer]);

  useEffect(() => {
    document.addEventListener("keydown", handleArrowKeyDown);
    document.addEventListener("keyup", handleArrowKeyUp);
    return () => {
      document.removeEventListener("keydown", handleArrowKeyDown);
      document.removeEventListener("keyup", handleArrowKeyUp);
    };
  }, [handleArrowKeyDown, handleArrowKeyUp]);

  const getImageByDirection = (dir) => {
    if (animationTimer) {
      clearTimeout(animationTimer);
    }

    const animate = throttle((frame = stepIndex) => {
      // console.log("animate", frame, stepIndex);
      setStepIndex(frame);
      setCharImage(directionImages[dir][frame]);

      // 좌표 변경 로직 추가
      const moveDistance = 7;
      switch (dir) {
        case Direction.UP:
          if (!boundaryCollision(charX, charY - moveDistance))
            setCharY((prev) => prev - moveDistance);
          break;
        case Direction.DOWN:
          if (!boundaryCollision(charX, charY + moveDistance))
            setCharY((prev) => prev + moveDistance);
          break;
        case Direction.LEFT:
          if (!boundaryCollision(charX - moveDistance, charY))
            setCharX((prev) => prev - moveDistance);
          break;
        case Direction.RIGHT:
          if (!boundaryCollision(charX + moveDistance, charY))
            setCharX((prev) => prev + moveDistance);
          break;
        default:
          break;
      }

      if (frame === 2) {
        setStepIndex(0);
      } else {
        setAnimationTimer(setTimeout(() => animate(frame + 1), 100));
        setStepIndex(frame + 1);
      }
    }, 1000);

    animate();
    return directionImages[dir][stepIndex];
  };

  return (
    <>
      <Container x={charX} y={charY}>
        <Sprite
          image={directionImages[direction][stepIndex]}
          x={0}
          y={0}
          width={60}
          height={60}
        />
        <Nickname width={60} height={60} text="브로콜리맨" />
      </Container>
    </>
  );
};

const directionImages = {
  [Direction.UP]: [
    CharacterImages.char_1u1,
    CharacterImages.char_1u2,
    CharacterImages.char_1u4,
  ],
  [Direction.DOWN]: [
    CharacterImages.char_1d1,
    CharacterImages.char_1d2,
    CharacterImages.char_1d4,
  ],
  [Direction.RIGHT]: [
    CharacterImages.char_1r1,
    CharacterImages.char_1r2,
    CharacterImages.char_1r4,
  ],
  [Direction.LEFT]: [
    CharacterImages.char_1l1,
    CharacterImages.char_1l2,
    CharacterImages.char_1l4,
  ],
};

export default Character;
