import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { Kicker, ProductArt, ProductStage, RevealLine, headlineStyle } from "../components/common";
import { Console, Controller } from "../products/Gaming";
import { C, HALF, ip } from "../theme";

/** ESCENA 3 – PlayStation y controles (7–10 s) */
export const S3PlayStation: React.FC = () => {
  const lf = useCurrentFrame();
  const f = lf - HALF;

  const consoleIn = ip(f, [-6, 20], [0, 1]);
  const padIn = ip(f, [6, 30], [0, 1]);
  const bob = Math.sin(f / 14) * 10;
  const orbit = ip(f, [0, 100], [0, 1], (t) => t);
  const ledPulse = 0.75 + 0.25 * Math.sin(f / 6);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* haz de luz de estudio */}
      <AbsoluteFill
        style={{
          background:
            "conic-gradient(from 180deg at 50% -6%, transparent 160deg, rgba(62,198,255,0.20) 175deg, rgba(166,107,255,0.22) 185deg, transparent 200deg)",
          opacity: ip(f, [-6, 16], [0, 1]),
        }}
      />
      <AbsoluteFill style={{ background: "radial-gradient(600px 300px at 50% 1240px, rgba(31,123,255,0.28), transparent 70%)" }} />

      {/* consola */}
      <div
        style={{
          position: "absolute",
          left: 150,
          top: 300,
          perspective: 1800,
          opacity: consoleIn,
          translate: `${(1 - consoleIn) * -60}px ${(1 - consoleIn) * 40}px`,
          filter: `blur(${(1 - consoleIn) * 14}px)`,
        }}
      >
        <div style={{ transform: `rotateY(${16 - orbit * 10}deg)` }}>
          <ProductStage shadowWidth={460}>
            <ProductArt k="console" width={460} height={880}>
              <Console height={880} glow={ledPulse} shine={ip(f, [10, 60], [0, 1])} />
            </ProductArt>
          </ProductStage>
        </div>
      </div>

      {/* control */}
      <div
        style={{
          position: "absolute",
          left: 330,
          top: 820,
          perspective: 1600,
          opacity: padIn,
          translate: `${(1 - padIn) * 260}px ${bob + (1 - padIn) * 80}px`,
          filter: `blur(${(1 - padIn) * 12}px) drop-shadow(0 40px 50px rgba(0,0,0,0.6))`,
        }}
      >
        <div style={{ transform: `rotateX(${30 - padIn * 6}deg) rotateZ(${-14 + (1 - padIn) * 20 + orbit * 4}deg)` }}>
          <ProductArt k="controller" width={680} height={462}>
            <Controller width={680} glow={ledPulse} />
          </ProductArt>
        </div>
      </div>

      <div style={{ position: "absolute", left: 80, right: 80, top: 1430, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <Kicker start={HALF + 2} color={C.purpleBright}>
          Diagnóstico y reparación
        </Kicker>
        <RevealLine start={HALF + 4}>
          <div style={{ ...headlineStyle, fontSize: 104 }}>PLAYSTATION</div>
        </RevealLine>
        <RevealLine start={HALF + 10}>
          <div
            style={{
              ...headlineStyle,
              fontSize: 88,
              background: `linear-gradient(90deg, ${C.blueBright}, ${C.purpleBright})`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              textShadow: "none",
              filter: "drop-shadow(0 0 22px rgba(62,198,255,0.45))",
            }}
          >
            Y CONTROLES
          </div>
        </RevealLine>
      </div>
    </AbsoluteFill>
  );
};
