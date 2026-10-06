import React from "react";
import { AbsoluteFill, random, useCurrentFrame } from "remotion";
import { ProductArt, RevealLine, headlineStyle } from "../components/common";
import { M2Nvme, RamStick, SsdSata } from "../products/Storage";
import { C, FONT, HALF, easeIn, easeInOut, ip } from "../theme";
import { ProductKey } from "../assets";

type Item = {
  key: ProductKey;
  label: string;
  sub: string;
  from: number;
  to: number;
  render: (shine: number) => React.ReactNode;
  w: number;
  h: number;
};

const ITEMS: Item[] = [
  { key: "ram", label: "MEMORIA RAM", sub: "DDR4 · DDR5", from: -6, to: 44, w: 900, h: 271, render: (s) => <RamStick width={900} shine={s} /> },
  { key: "ssd", label: "SSD SATA", sub: "2.5\" · SATA III", from: 38, to: 84, w: 700, h: 532, render: (s) => <SsdSata width={700} shine={s} /> },
  { key: "m2", label: "SSD M.2 NVMe", sub: "PCIe · Ultra rápido", from: 78, to: 140, w: 920, h: 230, render: (s) => <M2Nvme width={920} shine={s} /> },
];

const Bokeh: React.FC<{ f: number }> = ({ f }) => (
  <AbsoluteFill>
    {new Array(14).fill(0).map((_, i) => {
      const size = 80 + random(`bk${i}`) * 220;
      const x = random(`bx${i}`) * 1080 - f * (0.6 + random(`bv${i}`));
      const y = 200 + random(`by${i}`) * 1200;
      const col = i % 3 === 0 ? C.purple : i % 3 === 1 ? C.blue : C.red;
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            left: ((x % 1300) + 1300) % 1300 - 110,
            top: y,
            width: size,
            height: size,
            borderRadius: "50%",
            background: `radial-gradient(circle, ${col}55, ${col}00 70%)`,
            border: `2px solid ${col}22`,
            filter: "blur(6px)",
          }}
        />
      );
    })}
  </AbsoluteFill>
);

/** ESCENA 4 – Componentes (10–14 s) */
export const S4Components: React.FC = () => {
  const f = useCurrentFrame() - HALF;
  const active = f < ITEMS[1].from + 4 ? 0 : f < ITEMS[2].from + 4 ? 1 : 2;

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <Bokeh f={f} />
      <AbsoluteFill style={{ background: "radial-gradient(640px 420px at 540px 800px, rgba(31,123,255,0.22), transparent 70%)" }} />

      {ITEMS.map((it, i) => {
        if (f < it.from - 2 || f > it.to + 2) return null;
        const inP = ip(f, [it.from, it.from + 18], [0, 1]);
        const outP = i === ITEMS.length - 1 ? 0 : ip(f, [it.to - 12, it.to], [0, 1], easeIn);
        const life = ip(f, [it.from, it.to], [0, 1], (t) => t);
        return (
          <React.Fragment key={it.key}>
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 330,
                height: 900,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                perspective: 1600,
                opacity: inP * (1 - outP),
              }}
            >
              <div
                style={{
                  transform: `translateX(${-outP * 420}px) translateY(${(1 - inP) * 40}px) rotateX(${22 - life * 6}deg) rotateY(${-18 + life * 14}deg) rotateZ(${-6 + life * 3}deg) scale(${1.35 - inP * 0.35 + life * 0.06})`,
                  filter: `blur(${(1 - inP) * 16 + outP * 14}px) drop-shadow(0 40px 60px rgba(0,0,0,0.7))`,
                }}
              >
                <ProductArt k={it.key} width={it.w} height={it.h}>
                  {it.render(ip(f, [it.from + 10, it.to - 4], [0, 1], easeInOut))}
                </ProductArt>
              </div>
            </div>
            <div
              style={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 1150,
                textAlign: "center",
                opacity: ip(f, [it.from + 8, it.from + 18], [0, 1]) * (1 - outP),
                translate: `0px ${(1 - ip(f, [it.from + 8, it.from + 22], [0, 1])) * 20}px`,
              }}
            >
              <div style={{ fontFamily: FONT, fontWeight: 800, fontSize: 50, color: C.white, letterSpacing: "0.12em" }}>{it.label}</div>
              <div style={{ fontFamily: FONT, fontWeight: 600, fontSize: 28, color: C.blueBright, letterSpacing: "0.28em", marginTop: 8 }}>
                {it.sub.toUpperCase()}
              </div>
            </div>
          </React.Fragment>
        );
      })}

      <div style={{ position: "absolute", left: 60, right: 60, top: 1400, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <RevealLine start={HALF + 2}>
          <div style={{ ...headlineStyle, fontSize: 104, display: "flex", gap: 26, alignItems: "center" }}>
            {["RAM", "SSD", "M.2"].map((t, i) => (
              <React.Fragment key={t}>
                {i > 0 ? <span style={{ color: C.red, fontSize: 70 }}>•</span> : null}
                <span
                  style={{
                    color: active === i ? C.white : "rgba(255,255,255,0.55)",
                    textShadow: active === i ? `0 0 30px ${C.redBright}, 0 0 60px rgba(227,20,27,0.5)` : "none",
                  }}
                >
                  {t}
                </span>
              </React.Fragment>
            ))}
          </div>
        </RevealLine>
        <div
          style={{
            marginTop: 26,
            display: "flex",
            alignItems: "center",
            gap: 18,
            opacity: ip(f, [14, 30], [0, 1]),
          }}
        >
          <SpeedLines f={f} />
          <div style={{ fontFamily: FONT, fontWeight: 700, fontSize: 34, letterSpacing: "0.12em", color: C.text2 }}>
            MÁS VELOCIDAD PARA TU EQUIPO
          </div>
          <SpeedLines f={f} flip />
        </div>
      </div>
    </AbsoluteFill>
  );
};

const SpeedLines: React.FC<{ f: number; flip?: boolean }> = ({ f, flip }) => (
  <div style={{ width: 60, height: 30, position: "relative", rotate: flip ? "180deg" : undefined }}>
    {[0, 1, 2].map((i) => {
      const p = ((f * 2.2 + i * 12) % 36) / 36;
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            right: p * 40,
            top: 4 + i * 10,
            width: 30 - i * 6,
            height: 3,
            borderRadius: 3,
            background: i === 1 ? C.redBright : C.blueBright,
            opacity: 1 - p,
          }}
        />
      );
    })}
  </div>
);

