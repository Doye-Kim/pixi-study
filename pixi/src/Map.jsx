import "./App.css";
import Character from "./Character";
import { Stage, Sprite } from "@pixi/react";

const MAP_X = 800;
const MAP_Y = 600;

const mapUrl = "http://localhost:5173/src/assets/map.png";

const Map = () => {
  return (
    <Stage width={MAP_X} height={MAP_Y} options={{ background: 0x1099bb }}>
      <Sprite image={mapUrl} x={0} y={0} />
      <Character />
    </Stage>
  );
};

export default Map;
