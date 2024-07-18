import "./App.css";
import Character from "./Character";
import { Stage, Sprite } from "@pixi/react";

const MAP_X = 488;
const MAP_Y = 384;

const mapUrl = "http://localhost:5173/src/assets/home.png";

const Map = () => {
  return (
    <Stage width={MAP_X} height={MAP_Y}>
      <Sprite image={mapUrl} x={0} y={0} />
      <Character />
    </Stage>
  );
};

export default Map;
