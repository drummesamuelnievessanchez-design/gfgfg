import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Kicker, RevealLine, ProductArt, headlineStyle, useAd } from "../components/common";
import { Laptop3D } from "../products/Laptop";
import { C, FONT, HALF, easeInOut, ip } from "../theme";

const Chip: React.FC<{ start: number; children: React.ReactNode; color: string }> = ({ start, children, color }) => {
  const f = useCurrentFrame() - HALF;
  const p = ip(f, [start, start + 14], [0, 1]);
  return (
    <div
      style={{
        fontFamily: FONT,
        fontWeight: 700,
        fontSize: 28,
        letterSpacing: "0.12em",
        color: C.white,
        padding: "14px 22px",
        borderRadius: 40,
        border: `2px solid ${color}`,
        background: "rgba(255,255,255,0.04)",
        boxShadow: `0 0 24px ${color}55, inset 0 0 18px ${color}33`,
        opacity: p,
        translate: `0px ${(1 - p) * 30}px`,
      }}
    >
      {children}
    </div>
  );
};

/** ESCENA 2 – Laptops y reparación (3–7 s) */
export const S2Laptops: React.FC = () => {
  const f = useCurrentFrame() - HALF; // 0 = corte de entrada
  const { photos } = useAd();

  const rotY = ip(f, [0, 130], [-18, 12], (t) => t);
  const rotX = ip(f, [24, 80], [-16, -38], easeInOut);
  const xray = ip(f, [34, 74], [0, 1], easeInOut);
  const explode = ip(f, [70, 96], [0, 1]);
  const push = ip(f, [0, 130], [0.92, 1.0], (t) => t);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* luz de estudio */}
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(700px 520px at 540px 760px, rgba(31,123,255,0.30), transparent 70%), radial-gradient(500px 400px at 760px 980px, rgba(123,44,255,0.25), transparent 70%)",
        }}
      />
      <div style={{ position: "absolute", left: 0, right: 0, top: 300, height: 980, display: "flex", justifyContent: "center", alignItems: "center" }}>
        {photos.laptop ? (
          <div style={{ scale: `${push}` }}>
            <ProductArt k="laptop" width={940} height={760}>
              {null}
            </ProductArt>
          </div>
        ) : (
          <div style={{ scale: `${push * 0.84}`, translate: "0px 120px" }}>
            <Laptop3D frame={f} rotY={rotY} rotX={rotX} lid={12} xray={xray} explode={explode} />
          </div>
        )}
      </div>

      <div style={{ position: "absolute", left: 80, right: 80, top: 1330, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Kicker start={HALF + 4}>Servicio técnico especializado</Kicker>
        <RevealLine start={HALF + 8}>
          <div style={{ ...headlineStyle, fontSize: 92 }}>LAPTOP Y</div>
        </RevealLine>
        <RevealLine start={HALF + 14}>
          <div
            style={{
              ...headlineStyle,
              fontSize: 116,
              letterSpacing: "0.005em",
              background: `linear-gradient(180deg, #ff5a60 0%, ${C.redBright} 40%, ${C.red} 70%, #b00c13 100%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "none",
              filter: "drop-shadow(0 0 26px rgba(227,20,27,0.65))",
            }}
          >
            REPARACIÓN
          </div>
        </RevealLine>
        <div style={{ display: "flex", gap: 16, marginTop: 34 }}>
          <Chip start={40} color={C.blueBright}>PLACA</Chip>
          <Chip start={52} color={C.purpleBright}>REFRIGERACIÓN</Chip>
          <Chip start={70} color={C.redBright}>MEMORIA RAM</Chip>
        </div>
      </div>
    </AbsoluteFill>
  );
};
