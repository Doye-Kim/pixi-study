import "./App.css";
import Character from "./Character";
import { Stage, Sprite } from "@pixi/react";

const MAP_X = 488;
const MAP_Y = 384;

const homeUrl = "http://localhost:5173/src/assets/home.png";
const forwardHomeUrl = "http://localhost:5173/src/assets/forward_home.png";
const Home = () => {
  return (
    <Stage width={MAP_X} height={MAP_Y}>
      <Sprite image={homeUrl} x={0} y={0} />
      <Character />
      <Sprite image={forwardHomeUrl} x={0} y={0} />
    </Stage>
  );
};

export default Home;
