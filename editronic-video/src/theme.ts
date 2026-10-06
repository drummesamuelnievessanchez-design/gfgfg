import { Easing, interpolate } from "remotion";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;
export const DURATION = 750; // 25 s

// Identidad EDITRONIC
export const C = {
  red: "#E3141B",
  redBright: "#FF2D35",
  redDeep: "#8E0710",
  blue: "#1F7BFF",
  blueBright: "#3EC6FF",
  purple: "#7B2CFF",
  purpleBright: "#A66BFF",
  white: "#FFFFFF",
  ink: "#05060B",
  graphite: "#11131B",
  steel: "#1C1F2A",
  text2: "rgba(255,255,255,0.72)",
};

export const FONT = "Montserrat";

// Cortes de escena (en frames). Cada transición está centrada en el corte.
export const CUTS = [90, 210, 300, 420, 540] as const; // 3 s, 7 s, 10 s, 14 s, 18 s
export const HALF = 9; // medio ancho de cada transición

export const SCENES = [
  { id: "Intro", from: 0, to: CUTS[0] },
  { id: "Laptops", from: CUTS[0], to: CUTS[1] },
  { id: "PlayStation", from: CUTS[1], to: CUTS[2] },
  { id: "Componentes", from: CUTS[2], to: CUTS[3] },
  { id: "Accesorios", from: CUTS[3], to: CUTS[4] },
  { id: "Cierre", from: CUTS[4], to: DURATION },
] as const;

// Locución (inicio en segundos) — guía para grabación y para el ducking de la música
export const VO_LINES = [
  { id: "vo-1", at: 0.35, end: 2.15, text: "¿Tu tecnología necesita atención?" },
  { id: "vo-2", at: 2.25, end: 4.2, text: "En EDITRONIC tenemos la solución." },
  { id: "vo-3", at: 4.6, end: 8.4, text: "Reparamos laptops, PlayStation y controles." },
  { id: "vo-4", at: 9.6, end: 16.6, text: "También encontrarás RAM, SSD, M.2, tintas, toner y accesorios tecnológicos." },
  { id: "vo-5", at: 18.45, end: 19.5, text: "EDITRONIC." },
  { id: "vo-6", at: 19.75, end: 22.0, text: "Tu tecnología en manos expertas." },
] as const;

export const easeOut = Easing.bezier(0.16, 1, 0.3, 1);
export const easeInOut = Easing.bezier(0.65, 0, 0.35, 1);
export const easeIn = Easing.bezier(0.7, 0, 0.84, 0);

/** interpolate con clamp en ambos extremos */
export const ip = (
  frame: number,
  input: number[],
  output: number[],
  easing: (t: number) => number = easeOut,
) =>
  interpolate(frame, input, output, {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing,
  });
