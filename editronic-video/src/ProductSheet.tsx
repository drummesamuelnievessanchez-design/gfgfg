import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import "./fonts";
import { Background } from "./components/common";
import { CircuitBoard } from "./products/CircuitBoard";
import { Laptop3D } from "./products/Laptop";
import { RamStick, SsdSata, M2Nvme } from "./products/Storage";
import { Console, Controller } from "./products/Gaming";
import { InkCartridges, Toner, Keyboard, Mouse, Headphones, Charger } from "./products/Accessories";

/** Hoja de control de calidad de los productos (solo para revisión). */
export const ProductSheet: React.FC<{ xray: number }> = ({ xray }) => {
  const frame = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Background />
      <div style={{ position: "absolute", left: 20, top: 20 }}><CircuitBoard width={340} frame={frame} /></div>
      <div style={{ position: "absolute", left: 380, top: 20, scale: "0.62", transformOrigin: "0 0" }}>
        <Laptop3D frame={frame} rotY={-12} rotX={-28} xray={xray} explode={xray} />
      </div>
      <div style={{ position: "absolute", left: 20, top: 460, display: "flex", flexDirection: "column", gap: 30 }}>
        <RamStick width={520} shine={0.5} />
        <M2Nvme width={520} shine={0.3} />
      </div>
      <div style={{ position: "absolute", left: 600, top: 460 }}><SsdSata width={440} shine={0.4} /></div>
      <div style={{ position: "absolute", left: 40, top: 900 }}><Console height={500} /></div>
      <div style={{ position: "absolute", left: 340, top: 900 }}><Controller width={700} /></div>
      <div style={{ position: "absolute", left: 20, top: 1450 }}><InkCartridges width={300} /></div>
      <div style={{ position: "absolute", left: 340, top: 1460 }}><Toner width={300} /></div>
      <div style={{ position: "absolute", left: 680, top: 1440 }}><Keyboard width={380} /></div>
      <div style={{ position: "absolute", left: 360, top: 1660 }}><Mouse width={120} /></div>
      <div style={{ position: "absolute", left: 520, top: 1640 }}><Headphones width={220} /></div>
      <div style={{ position: "absolute", left: 800, top: 1660 }}><Charger width={240} /></div>
    </AbsoluteFill>
  );
};
