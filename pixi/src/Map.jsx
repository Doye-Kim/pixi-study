import "./App.css";
import MapCharacter from "./MapCharacter";
import { useRef } from "react";
import { Stage, Sprite } from "@pixi/react";

const mapUrl = "http://localhost:5173/src/assets/map22.png";
const characterUrl = "http://localhost:5173/src/assets/char_1/char_1 (0_0).png";
const Map = () => {
  const appOptions = {
    resizeto: window,
    width: window.innerWidth,
    height: window.innerHeight,
    backgroundcolor: 0x1099bb,
  };

  const handleResize = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    return { width, height };
  };
  const backgroundX = useRef(-500);
  const backgroundY = useRef(-700);
  return (
    <Stage
      {...appOptions}
      onResize={handleResize}
      style={{ width: "100%", height: "100%" }}
    >
      <Sprite image={mapUrl} x={backgroundX} y={backgroundY} />
      <MapCharacter backgroundX={backgroundX} backgroundY={backgroundY} />
    </Stage>
  );
};

export default Map;
