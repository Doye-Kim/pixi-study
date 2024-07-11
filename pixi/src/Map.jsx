import "./App.css";
import CharacterImages from "./CharacterImage";
import { useState, useRef, useEffect } from "react";
import { Stage, Container, Sprite } from "@pixi/react";

const Direction = {
  DOWN: 0,
  UP: 1,
  LEFT: 2,
  RIGHT: 3,
};
const SIZE = 12;
const Map = () => {
  // const blurFilter = useMemo(() => new BlurFilter(2), []);
  const catUrl = "http://localhost:5173/src/assets/catLeft.png";
  const mapUrl = "http://localhost:5173/src/assets/map.png";

  const catRef = useRef(catUrl);
  const catXRef = useRef(500);
  const catYRef = useRef(150);
  const handleArrowKeyDown = () => {
    console.log("handleArrowKeyDown");
    const distance = 32;
    const ArrowKeys = [
      {
        code: "38",
        string: "ArrowUp",
        movement: {
          x: 0,
          y: -distance,
        },
        isMoveable: () => this.position.y > 0,
      },
      {
        code: "40",
        string: "ArrowDown",
        movement: { x: 0, y: distance },
        isMoveable: () => this.position.y < this.canvas.height - SIZE,
      },
      {
        code: "39",
        string: "ArrowRight",
        movement: { x: distance, y: 0 },
        isMoveable: () => this.position.x < this.canvas.width - SIZE,
      },
      {
        code: "37",
        string: "ArrowLeft",
        movement: {
          x: -distance,
          y: 0,
        },
        isMoveable: () => this.position.x > 0,
      },
    ];

    const handler = (e) => {
      let handled = false;
      console.log(e.code);
      for (let i = 0; i < ArrowKeys.length; i++) {
        const { code, string, movement, isMoveable } = ArrowKeys[i];

        if ([code.toString(), string].includes(e.code))
          if (isMoveable()) {
            this.position.x += movement.x;
            this.position.y += movement.y;
            handled = true;
          }
        if (handled) {
          break;
        }
      }
    };

    return (e) => handler(e);
  };

  document.addEventListener("keydown", handleArrowKeyDown);
  const getImageByDirection = (direction) => {
    const { catRigth, catLeft } = CharacterImages;

    switch (direction) {
      case Direction.LEFT:
        return catLeft;
      case Direction.RIGHT:
        return catRigth;
      default:
        return catRigth;
    }
  };
  useEffect(() => {}, [catXRef, catYRef]);
  return (
    <Stage x={800} y={600} options={{ background: 0x1099bb }}>
      <Sprite image={mapUrl} x={0} y={0} />
      <Sprite image={catRef.current} x={catXRef.current} y={catYRef.current} />
    </Stage>
  );
};
export default Map;
