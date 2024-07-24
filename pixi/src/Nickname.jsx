import React from "react";
import { useCallback } from "react";
import { Text, Graphics } from "@pixi/react";
import * as PIXI from "pixi.js";
import "./App.css";
import CharacterImages from "./CharacterImages";

const Nickname = ({ width, height, text }) => {
  return (
    <>
      <Graphics
        draw={(g) => {
          g.beginFill(0xffffff);
          g.drawRoundedRect(-3, height + 2, width + 5, 15, 15);
          g.endFill();
        }}
      />
      <Text
        text={text}
        x={width / 2}
        y={height + 10}
        anchor={0.5}
        style={
          new PIXI.TextStyle({
            fill: "#000000",
            fontSize: 9,
            fontFamily: "DungGeunMo",
          })
        }
      />
    </>
  );
};

export default Nickname;
