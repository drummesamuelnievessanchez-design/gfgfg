import React from "react";
import { Audio } from "@remotion/media";
import { AbsoluteFill, Sequence, interpolate, staticFile, useCurrentFrame } from "remotion";
import "./fonts";
import { AdProps } from "./assets";
import { AdContext, Background, BrandBug, LightSweep, Particles, Streak } from "./components/common";
import { S1Intro } from "./scenes/S1Intro";
import { S2Laptops } from "./scenes/S2Laptops";
import { S3PlayStation } from "./scenes/S3PlayStation";
import { S4Components } from "./scenes/S4Components";
import { S5Accessories } from "./scenes/S5Accessories";
import { S6Outro } from "./scenes/S6Outro";
import { C, CUTS, DURATION, FPS, HALF, SCENES, VO_LINES, easeInOut, ip } from "./theme";

type TransitionKind = "whip" | "slit" | "zoom" | "pan" | "flash";
// Transición usada en cada corte: 3 s, 7 s, 10 s, 14 s, 18 s
const TRANSITIONS: TransitionKind[] = ["whip", "slit", "zoom", "pan", "flash"];

const SCENE_COMPONENTS = [S1Intro, S2Laptops, S3PlayStation, S4Components, S5Accessories, S6Outro];

const exitStyle = (kind: TransitionKind, p: number): React.CSSProperties => {
  switch (kind) {
    case "whip":
      return { translate: `${-p * 1150}px 0px`, filter: `blur(${p * 26}px)`, opacity: 1 - p * 0.4 };
    case "slit":
      return { opacity: 1 - p, scale: `${1 + p * 0.06}`, filter: `blur(${p * 8}px)` };
    case "zoom":
      return { scale: `${1 + p * 1.6}`, filter: `blur(${p * 18}px)`, opacity: 1 - p };
    case "pan":
      return { translate: `${-p * 1080}px 0px`, filter: `blur(${Math.sin(p * Math.PI) * 10}px)` };
    case "flash":
      return { opacity: 1 - p, filter: `blur(${p * 20}px) brightness(${1 + p * 1.5})`, scale: `${1 + p * 0.08}` };
  }
};

const enterStyle = (kind: TransitionKind, p: number): React.CSSProperties => {
  switch (kind) {
    case "whip":
      return { translate: `${(1 - p) * 1150}px 0px`, filter: `blur(${(1 - p) * 26}px)` };
    case "slit":
      return { clipPath: `inset(${(1 - p) * 50}% 0% ${(1 - p) * 50}% 0%)` };
    case "zoom":
      return { scale: `${1.5 - p * 0.5}`, filter: `blur(${(1 - p) * 18}px)`, opacity: p };
    case "pan":
      return { translate: `${(1 - p) * 1080}px 0px`, filter: `blur(${Math.sin(p * Math.PI) * 10}px)` };
    case "flash":
      return { opacity: p, scale: `${1.06 - p * 0.06}` };
  }
};

const SceneShell: React.FC<{ index: number; length: number; children: React.ReactNode }> = ({ index, length, children }) => {
  const lf = useCurrentFrame();
  const w = HALF * 2;
  let style: React.CSSProperties = {};
  if (index > 0 && lf < w) {
    style = enterStyle(TRANSITIONS[index - 1], ip(lf, [0, w], [0, 1], easeInOut));
  }
  if (index < SCENE_COMPONENTS.length - 1 && lf > length - w) {
    style = exitStyle(TRANSITIONS[index], ip(lf, [length - w, length], [0, 1], easeInOut));
  }
  return <AbsoluteFill style={style}>{children}</AbsoluteFill>;
};

/** Efectos de luz superpuestos en cada corte */
const CutOverlays: React.FC = () => {
  const f = useCurrentFrame();
  const [c1, c2, c3, c4, c5] = CUTS;

  // corte 2: línea de luz azul/morada
  const lineGrow = ip(f, [c2 - 10, c2 - 2], [0, 1], easeInOut);
  const lineOpen = ip(f, [c2 - 2, c2 + 10], [0, 1]);
  const lineVisible = f > c2 - 11 && f < c2 + 12;

  // corte 5: destello + partículas
  const flash = ip(f, [c5 - 8, c5], [0, 1], easeInOut) * ip(f, [c5, c5 + 14], [1, 0]);

  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      {/* 1 · whip pan tecnológico + light sweep */}
      <LightSweep progress={ip(f, [c1 - 12, c1 + 12], [0, 1], (t) => t)} />
      <Streak y={760} progress={ip(f, [c1 - 10, c1 + 8], [0, 1], (t) => t)} reverse thickness={4} />
      <Streak y={1240} progress={ip(f, [c1 - 6, c1 + 12], [0, 1], (t) => t)} reverse color={C.purpleBright} thickness={3} />

      {/* 2 · línea de luz */}
      {lineVisible ? (
        <div
          style={{
            position: "absolute",
            left: 540 - 540 * lineGrow,
            width: 1080 * lineGrow,
            top: 960 - 3 - lineOpen * 500,
            height: 6 + lineOpen * 1000,
            opacity: 1 - lineOpen,
            background: `linear-gradient(90deg, transparent, ${C.purpleBright}, #ffffff, ${C.blueBright}, transparent)`,
            boxShadow: `0 0 40px 12px ${C.blue}, 0 0 90px 30px ${C.purple}`,
            mixBlendMode: "screen",
          }}
        />
      ) : null}

      {/* 3 · macro: destello radial suave */}
      <AbsoluteFill
        style={{
          opacity: ip(f, [c3 - 6, c3], [0, 0.55]) * ip(f, [c3, c3 + 10], [1, 0]),
          background: "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.8), rgba(62,198,255,0.35) 25%, transparent 60%)",
          mixBlendMode: "screen",
        }}
      />

      {/* 4 · desplazamiento lateral: líneas de velocidad */}
      {[300, 640, 980, 1320, 1600].map((y, i) => (
        <Streak key={y} y={y} progress={ip(f, [c4 - 12 + i, c4 + 10 + i], [0, 1], (t) => t)} reverse color={i % 2 ? C.blueBright : C.purpleBright} thickness={i % 2 ? 3 : 5} />
      ))}

      {/* 5 · destello de luz + partículas */}
      <AbsoluteFill
        style={{
          opacity: flash,
          background: "radial-gradient(circle at 50% 40%, #ffffff 0%, rgba(190,230,255,0.95) 30%, rgba(123,44,255,0.6) 70%, rgba(227,20,27,0.4) 100%)",
        }}
      />
      {f > c5 - 10 && f < c5 + 30
        ? new Array(36).fill(0).map((_, i) => {
            const a = (i / 36) * Math.PI * 2;
            const p = ip(f, [c5 - 6, c5 + 28], [0, 1]);
            const r = 80 + p * (700 + (i % 5) * 90);
            return (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 540 + Math.cos(a) * r,
                  top: 780 + Math.sin(a) * r,
                  width: 8,
                  height: 8,
                  borderRadius: 8,
                  background: i % 3 === 0 ? C.redBright : i % 3 === 1 ? C.blueBright : "#ffffff",
                  boxShadow: `0 0 18px 4px ${i % 3 === 0 ? C.red : C.blue}`,
                  opacity: 1 - p,
                }}
              />
            );
          })
        : null}
    </AbsoluteFill>
  );
};

export const EditronicAd: React.FC<AdProps> = (props) => {
  const f = useCurrentFrame();

  // Ducking: la música baja durante la locución (solo si hay locución)
  const hasVo = Boolean(props.voiceover) || Object.keys(props.voLines).length > 0;
  const musicVolume = (frame: number) => {
    let v = props.musicVolume;
    if (hasVo) {
      const t = frame / FPS;
      const inVo = VO_LINES.some((l) => t > l.at - 0.15 && t < l.end + 0.15);
      v *= inVo ? 0.42 : 1;
    }
    return v * interpolate(frame, [DURATION - 30, DURATION], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
  };

  const bugOpacity = ip(f, [CUTS[0] + 6, CUTS[0] + 20], [0, 0.9]) * ip(f, [CUTS[4] - 14, CUTS[4] - 2], [1, 0]);

  return (
    <AdContext.Provider value={props}>
      <AbsoluteFill style={{ backgroundColor: C.ink }}>
        <Background tint={ip(f, [CUTS[4] - 10, CUTS[4] + 20], [0, 1])} />
        <Particles opacity={0.8} />

        {SCENES.map((s, i) => {
          const Comp = SCENE_COMPONENTS[i];
          const from = i === 0 ? 0 : s.from - HALF;
          const to = i === SCENES.length - 1 ? DURATION : s.to + HALF;
          return (
            <Sequence key={s.id} name={s.id} from={from} durationInFrames={to - from}>
              <SceneShell index={i} length={to - from}>
                <Comp />
              </SceneShell>
            </Sequence>
          );
        })}

        <BrandBug opacity={bugOpacity} />
        <CutOverlays />

        <Audio src={staticFile("audio/music.wav")} volume={musicVolume} />
        {props.voiceover ? <Audio src={staticFile(props.voiceover)} /> : null}
        {!props.voiceover
          ? VO_LINES.map((l) =>
              props.voLines[l.id] ? (
                <Sequence key={l.id} from={Math.round(l.at * FPS)} layout="none">
                  <Audio src={staticFile(props.voLines[l.id])} />
                </Sequence>
              ) : null,
            )
          : null}
      </AbsoluteFill>
    </AdContext.Provider>
  );
};
