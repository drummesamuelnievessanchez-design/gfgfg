import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { AccentBar, BrandName, LightSweep, LogoImage, Streak, useAd } from "../components/common";
import { CircuitBoard } from "../products/CircuitBoard";
import { C, FONT, easeInOut, ip } from "../theme";

/** ESCENA 1 – Impacto inicial (0–3 s) */
export const S1Intro: React.FC = () => {
  const f = useCurrentFrame();
  const { logo, showNameWithLogo } = useAd();

  // Placa electrónica: foco cinematográfico + desplazamiento de cámara
  const boardOpacity = ip(f, [3, 12], [0, 1]) * ip(f, [44, 58], [1, 0], easeInOut);
  const focus = ip(f, [3, 24], [16, 0]);
  const glide = ip(f, [0, 60], [0, 1], (t) => t);

  // Destello central que convierte la placa en el logo
  const flare = ip(f, [40, 52], [0, 1], easeInOut) * ip(f, [52, 68], [1, 0]);

  // Logo
  const logoIn = ip(f, [52, 72], [0, 1]);
  const shine = ip(f, [70, 96], [0, 1], easeInOut);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      {/* destellos de luz iniciales */}
      <Streak y={420} progress={ip(f, [0, 22], [0, 1], (t) => t)} color={C.blueBright} thickness={5} />
      <Streak y={1180} progress={ip(f, [4, 26], [0, 1], (t) => t)} color={C.purpleBright} thickness={4} reverse />
      <Streak y={1560} progress={ip(f, [9, 30], [0, 1], (t) => t)} color={C.blue} thickness={3} />

      {/* placa electrónica hiperdetallada */}
      <AbsoluteFill style={{ perspective: 1500, opacity: boardOpacity }}>
        <div
          style={{
            position: "absolute",
            left: "50%",
            top: "50%",
            width: 1700,
            height: 1700,
            marginLeft: -850,
            marginTop: -850,
            transform: `rotateX(48deg) rotateZ(${-30 + glide * 10}deg) translate(${-120 + glide * 220}px, ${80 - glide * 260}px) scale(${1.15 + glide * 0.25})`,
            filter: `blur(${focus}px)`,
          }}
        >
          <CircuitBoard width={1700} frame={f} />
        </div>
        {/* profundidad de campo: bordes desenfocados */}
        <AbsoluteFill
          style={{
            background:
              "linear-gradient(180deg, rgba(5,6,11,0.95) 0%, rgba(5,6,11,0) 28%, rgba(5,6,11,0) 62%, rgba(5,6,11,0.95) 100%)",
          }}
        />
      </AbsoluteFill>

      {/* destello de transición */}
      <AbsoluteFill style={{ mixBlendMode: "screen", pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            left: 540 - 900,
            top: 900 - 900,
            width: 1800,
            height: 1800,
            borderRadius: "50%",
            opacity: flare,
            scale: `${0.2 + flare * 1.1}`,
            background:
              "radial-gradient(circle, rgba(255,255,255,1) 0%, rgba(160,220,255,0.9) 12%, rgba(31,123,255,0.55) 30%, rgba(123,44,255,0.25) 50%, transparent 70%)",
          }}
        />
      </AbsoluteFill>
      <LightSweep progress={ip(f, [44, 70], [0, 1], (t) => t)} intensity={0.8} />

      {/* logo + nombre */}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", flexDirection: "column", gap: 34, paddingBottom: 60 }}>
        {logo ? (
          <div
            style={{
              opacity: logoIn,
              scale: `${0.9 + logoIn * 0.1}`,
              filter: `blur(${(1 - logoIn) * 18}px) drop-shadow(0 0 40px rgba(62,198,255,${0.35 * logoIn}))`,
            }}
          >
            <LogoImage maxWidth={760} maxHeight={showNameWithLogo ? 360 : 520} />
          </div>
        ) : null}
        {!logo || showNameWithLogo ? (
          <div
            style={{
              opacity: logoIn,
              scale: `${1.08 - logoIn * 0.08}`,
              letterSpacing: `${(1 - logoIn) * 0.3}em`,
              filter: `blur(${(1 - logoIn) * 14}px)`,
            }}
          >
            <BrandName size={logo ? 112 : 136} shine={shine} />
          </div>
        ) : null}
        <AccentBar start={60} width={240} />
        <div
          style={{
            fontFamily: FONT,
            fontWeight: 700,
            fontSize: 44,
            color: C.white,
            letterSpacing: `${0.4 - ip(f, [62, 84], [0, 0.26])}em`,
            paddingLeft: "0.14em",
            opacity: ip(f, [62, 78], [0, 1]),
            textAlign: "center",
            whiteSpace: "nowrap",
            textShadow: "0 4px 30px rgba(0,0,0,0.6)",
          }}
        >
          SERVICIO TÉCNICO <span style={{ color: C.redBright }}>ELECTRÓNICO</span>
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
