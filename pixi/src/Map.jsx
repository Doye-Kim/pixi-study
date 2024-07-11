import "./App.css";
import CharacterImages from "./CharacterImage";
import { useState, useEffect } from "react";
import { Stage, Sprite } from "@pixi/react";

const Direction = {
  DOWN: 0,
  UP: 1,
  LEFT: 2,
  RIGHT: 3,
};
const MAP_X = 800;
const MAP_Y = 600;
const SIZE = 12;
const Map = () => {
  const catUrl = "http://localhost:5173/src/assets/catLeft.png";
  const mapUrl = "http://localhost:5173/src/assets/map.png";

  const [catImage, setCatImage] = useState(catUrl);
  const [catX, setCatX] = useState(500);
  const [catY, setCatY] = useState(150);

  useEffect(() => {
    const handleArrowKeyDown = (e) => {
      console.log("handleArrowKeyDown");
      const distance = 12;
      const ArrowKeys = [
        {
          code: "ArrowUp",
          movement: { x: 0, y: -distance },
          dir: 1,
          isMoveable: () => catY > 0,
        },
        {
          code: "ArrowDown",
          movement: { x: 0, y: distance },
          dir: 0,
          isMoveable: () => catY < MAP_Y - SIZE,
        },
        {
          code: "ArrowRight",
          movement: { x: distance, y: 0 },
          dir: 3,
          isMoveable: () => catX < MAP_X - SIZE,
        },
        {
          code: "ArrowLeft",
          movement: { x: -distance, y: 0 },
          dir: 2,
          isMoveable: () => catX > 0,
        },
      ];

      let handled = false;
      for (let i = 0; i < ArrowKeys.length; i++) {
        const { code, movement, dir, isMoveable } = ArrowKeys[i];

        if (e.code === code && isMoveable()) {
          setCatX((prev) => prev + movement.x);
          setCatY((prev) => prev + movement.y);
          setCatImage(getImageByDirection(dir));
          handled = true;
          break;
        }
      }

      if (handled) {
        e.preventDefault(); // Prevent default scrolling behavior for arrow keys
      }
    };

    document.addEventListener("keydown", handleArrowKeyDown);

    return () => {
      document.removeEventListener("keydown", handleArrowKeyDown);
    };
  }, [catX, catY]); // Dependencies for useEffect

  const getImageByDirection = (direction) => {
    const { catRight, catLeft } = CharacterImages;

    switch (direction) {
      case Direction.LEFT:
        return catLeft;
      case Direction.RIGHT:
        return catRight;
      default:
        return catLeft;
    }
  };

  return (
    <Stage x={MAP_X} y={MAP_Y} options={{ background: 0x1099bb }}>
      <Sprite image={mapUrl} x={0} y={0} />
      <Sprite image={catImage} x={catX} y={catY} />
    </Stage>
  );
};

export default Map;
