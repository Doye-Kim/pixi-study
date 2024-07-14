import "./App.css";
import CharacterImages from "./CharacterImage";
import { useState, useEffect, useCallback } from "react";
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

const mapUrl = "http://localhost:5173/src/assets/map.png";

const Map = () => {
  const [catImage, setCatImage] = useState(CharacterImages.catLeft);
  const [catX, setCatX] = useState(500);
  const [catY, setCatY] = useState(150);

  const handleArrowKeyDown = useCallback(
    (e) => {
      console.log("handleArrowKeyDown");
      const distance = 12;
      const ArrowKeys = [
        {
          code: "KeyW",
          movement: { x: 0, y: -distance },
          dir: Direction.UP,
          isMoveable: () => catY > 0,
        },
        {
          code: "KeyS",
          movement: { x: 0, y: distance },
          dir: Direction.DOWN,
          isMoveable: () => catY < MAP_Y - SIZE,
        },
        {
          code: "KeyD",
          movement: { x: distance, y: 0 },
          dir: Direction.RIGHT,
          isMoveable: () => catX < MAP_X - SIZE,
        },
        {
          code: "KeyA",
          movement: { x: -distance, y: 0 },
          dir: Direction.LEFT,
          isMoveable: () => catX > 0,
        },
      ];

      let handled = false;
      for (let i = 0; i < ArrowKeys.length; i++) {
        const { code, movement, dir, isMoveable } = ArrowKeys[i];

        if (e.code === code && isMoveable()) {
          setCatX((prev) => prev + movement.x);
          setCatY((prev) => prev + movement.y);
          setCatImage(
            dir === Direction.LEFT
              ? CharacterImages.catLeft
              : CharacterImages.catRight
          );
          handled = true;
          break;
        }
      }

      if (handled) {
        e.preventDefault(); // Prevent default scrolling behavior for arrow keys
      }
    },
    [catX, catY]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleArrowKeyDown);

    return () => {
      document.removeEventListener("keydown", handleArrowKeyDown);
    };
  }, [handleArrowKeyDown]);

  return (
    <Stage width={MAP_X} height={MAP_Y} options={{ background: 0x1099bb }}>
      <Sprite image={mapUrl} x={0} y={0} />
      <Sprite image={catImage} x={catX} y={catY} />
    </Stage>
  );
};

export default Map;
