import React, { useState, useEffect, useCallback, useRef } from "react";
import CharacterImages from "./CharacterImages";
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

const Character = ({ backgroundX, backgroundY }) => {
  const [collisionMap, setCollisionMap] = useState([]);
  const [boundaries, setBoundaries] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [charX, setCharX] = useState(270);
  const [charY, setCharY] = useState(40);
  const [mx, setMx] = useState(backgroundX);
  const [my, setMy] = useState(backgroundY);
  const [isAnimating, setIsAnimating] = useState(false);

  const animationFrameRef = useRef(null);

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

  //   const boundaryCollision = useCallback(
  //     (x, y) => {
  //       return boundaries.some((col) => {
  //         return (
  //           col.position.x + BoundaryWidth >= x + 16 &&
  //           col.position.y + BoundaryHeight >= y + 35 &&
  //           x + 48 >= col.position.x &&
  //           y + 40 >= col.position.y
  //         );
  //       });
  //     },
  //     [boundaries]
  //   );

  const handleArrowKeyDown = useCallback(
    (e) => {
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
          } else if (!isAnimating && isMoveable()) {
            setStepIndex(0);
          } else if (isMoveable()) {
            handled = true;
            break;
          }
        }
      }

      if (handled) {
        e.preventDefault();
      }
    },
    [charX, charY, direction, isAnimating]
  );

  const handleArrowKeyUp = useCallback(() => {
    setIsAnimating(false);
    setStepIndex(0);
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleArrowKeyDown);
    document.addEventListener("keyup", handleArrowKeyUp);
    return () => {
      document.removeEventListener("keydown", handleArrowKeyDown);
      document.removeEventListener("keyup", handleArrowKeyUp);
    };
  }, [handleArrowKeyDown, handleArrowKeyUp]);

  useEffect(() => {
    if (isAnimating) {
      animationFrameRef.current = requestAnimationFrame(animate);
    } else {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isAnimating, stepIndex, direction, charX, charY]);

  const animate = () => {
    setStepIndex((prev) => (prev + 1) % 6);
    const moveDistance = 7;

    switch (direction) {
      case Direction.UP:
        setCharY((prev) => prev - moveDistance);
        backgroundX += moveDistance;
        break;
      case Direction.DOWN:
        setCharY((prev) => prev + moveDistance);
        setMy((prev) => prev - moveDistance);
        break;
      case Direction.LEFT:
        setCharX((prev) => prev - moveDistance);
        setMx((prev) => prev + moveDistance);
        break;
      case Direction.RIGHT:
        setCharX((prev) => prev + moveDistance);
        setMx((prev) => prev - moveDistance);
        break;
      default:
        break;
    }

    animationFrameRef.current = requestAnimationFrame(animate);
  };

  return (
    <Container x={charX} y={charY} style={{ width: "100%", height: "100%" }}>
      <Sprite
        image={directionImages[direction][stepIndex]}
        x={0}
        y={0}
        width={60}
        height={60}
      />
      <Nickname width={60} height={60} text="브로콜리맨" />
    </Container>
  );
};

const directionImages = {
  [Direction.UP]: [
    CharacterImages.char_1u1,
    CharacterImages.char_1u2,
    CharacterImages.char_1u4,
    CharacterImages.char_1u5,
    CharacterImages.char_1u6,
    CharacterImages.char_1u8,
  ],
  [Direction.DOWN]: [
    CharacterImages.char_1d1,
    CharacterImages.char_1d2,
    CharacterImages.char_1d4,
    CharacterImages.char_1d5,
    CharacterImages.char_1d6,
    CharacterImages.char_1d8,
  ],
  [Direction.RIGHT]: [
    CharacterImages.char_1r1,
    CharacterImages.char_1r2,
    CharacterImages.char_1r4,
    CharacterImages.char_1r5,
    CharacterImages.char_1r6,
    CharacterImages.char_1r8,
  ],
  [Direction.LEFT]: [
    CharacterImages.char_1l1,
    CharacterImages.char_1l2,
    CharacterImages.char_1l4,
    CharacterImages.char_1l5,
    CharacterImages.char_1l6,
    CharacterImages.char_1l8,
  ],
};

export default Character;
