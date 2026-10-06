import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { ProductArt, RevealLine, headlineStyle } from "../components/common";
import { Charger, Headphones, InkCartridges, Keyboard, Mouse, Toner } from "../products/Accessories";
import { C, FONT, HALF, ip } from "../theme";
import { ProductKey } from "../assets";

const CARDS: { key: ProductKey; label: string; art: React.ReactNode; w: number; h: number }[] = [
  { key: "ink", label: "TINTAS", art: <InkCartridges width={290} />, w: 300, h: 230 },
  { key: "toner", label: "TONER", art: <Toner width={330} />, w: 340, h: 200 },
  { key: "keyboard", label: "TECLADOS", art: <Keyboard width={370} />, w: 380, h: 200 },
  { key: "mouse", label: "MOUSE", art: <Mouse width={130} />, w: 300, h: 200 },
  { key: "headphones", label: "AUDÍFONOS", art: <Headphones width={210} />, w: 300, h: 214 },
  { key: "charger", label: "CARGADORES Y CABLES", art: <Charger width={260} />, w: 300, h: 210 },
];

const CARD_W = 450;
const CARD_H = 300;

/** ESCENA 5 – Impresión y accesorios (14–18 s) */
export const S5Accessories: React.FC = () => {
  const f = useCurrentFrame() - HALF;
  const drift = ip(f, [0, 130], [30, -30], (t) => t);

  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <AbsoluteFill style={{ background: "radial-gradient(800px 700px at 540px 800px, rgba(123,44,255,0.18), transparent 70%)" }} />
      <div
        style={{
          position: "absolute",
          left: (1080 - CARD_W * 2 - 36) / 2,
          top: 270,
          width: CARD_W * 2 + 36,
          display: "grid",
          gridTemplateColumns: `${CARD_W}px ${CARD_W}px`,
          gap: 36,
          translate: `${drift}px 0px`,
        }}
      >
        {CARDS.map((c, i) => {
          const start = 2 + i * 5;
          const p = ip(f, [start, start + 20], [0, 1]);
          const float = Math.sin((f + i * 11) / 18) * 6;
          return (
            <div
              key={c.key}
              style={{
                width: CARD_W,
                height: CARD_H,
                borderRadius: 30,
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(160deg, rgba(255,255,255,0.09), rgba(255,255,255,0.02) 55%, rgba(31,123,255,0.06))",
                border: "1.5px solid rgba(255,255,255,0.12)",
                boxShadow: "0 30px 60px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.15)",
                opacity: p,
                translate: `${(1 - p) * 520}px 0px`,
                filter: `blur(${(1 - p) * 10}px)`,
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(260px 160px at 50% 45%, ${i % 2 ? "rgba(123,44,255,0.25)" : "rgba(31,123,255,0.25)"}, transparent 70%)`,
                }}
              />
              <div style={{ position: "absolute", left: 0, right: 0, top: 14, height: 222, display: "flex", justifyContent: "center", alignItems: "center", translate: `0px ${float}px` }}>
                <ProductArt k={c.key} width={c.w} height={c.h}>
                  {c.art}
                </ProductArt>
              </div>
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 22,
                  textAlign: "center",
                  fontFamily: FONT,
                  fontWeight: 800,
                  fontSize: 26,
                  letterSpacing: "0.16em",
                  color: C.white,
                }}
              >
                {c.label}
              </div>
              {/* reflejo de vidrio */}
              <div
                style={{
                  position: "absolute",
                  top: -200,
                  left: -300 + ip(f, [start + 10, start + 50], [0, 1]) * 1100,
                  width: 120,
                  height: 800,
                  rotate: "20deg",
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.14), transparent)",
                }}
              />
            </div>
          );
        })}
      </div>

      <div style={{ position: "absolute", left: 60, right: 60, top: 1390, display: "flex", flexDirection: "column", alignItems: "center" }}>
        <RevealLine start={HALF + 6}>
          <div style={{ ...headlineStyle, fontSize: 92, display: "flex", gap: 22, alignItems: "center" }}>
            TINTAS <span style={{ color: C.red, fontSize: 64 }}>•</span> TONER
          </div>
        </RevealLine>
        <RevealLine start={HALF + 12}>
          <div style={{ ...headlineStyle, fontSize: 92, display: "flex", gap: 22, alignItems: "center" }}>
            <span style={{ color: C.red, fontSize: 64 }}>•</span>
            <span
              style={{
                background: `linear-gradient(90deg, ${C.blueBright}, ${C.purpleBright})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                filter: "drop-shadow(0 0 22px rgba(123,44,255,0.5))",
              }}
            >
              ACCESORIOS
            </span>
          </div>
        </RevealLine>
      </div>
    </AbsoluteFill>
  );
};
