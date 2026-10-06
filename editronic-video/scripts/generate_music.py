"""
EDITRONIC – banda sonora del anuncio (25 s, 120 BPM, La menor).

Música electrónica corporativa sintetizada desde cero (sin samples de terceros):
impacto inicial, groove que crece por secciones, whooshes sincronizados con
cada transición (3 s, 7 s, 10 s, 14 s, 18 s) y cierre fuerte con brillo final.

Uso:
    python scripts/generate_music.py            # escribe public/audio/music.wav
Requiere: numpy, scipy
"""

from __future__ import annotations

import os
import wave

import numpy as np
from scipy import signal

SR = 44100
BPM = 120
BEAT = 60 / BPM  # 0.5 s  -> 15 frames @ 30 fps
DUR = 25.0
N = int(SR * DUR)
CUTS = [3.0, 7.0, 10.0, 14.0, 18.0]
FINAL_HIT = 22.0
rng = np.random.default_rng(7)


def note(n: str) -> float:
    names = {"C": 0, "C#": 1, "D": 2, "D#": 3, "E": 4, "F": 5, "F#": 6, "G": 7, "G#": 8, "A": 9, "A#": 10, "B": 11}
    name, octave = n[:-1], int(n[-1])
    midi = 12 * (octave + 1) + names[name]
    return 440.0 * 2 ** ((midi - 69) / 12)


# Am – F – C – G (un compás = 2 s)
CHORDS = [
    ["A3", "C4", "E4", "A4"],
    ["F3", "A3", "C4", "F4"],
    ["C4", "E4", "G4", "C5"],
    ["G3", "B3", "D4", "G4"],
]
BASS = ["A1", "F1", "C2", "G1"]


def chord_at(t: float) -> int:
    return int(t // (4 * BEAT)) % 4


# ---------------------------------------------------------------- osciladores
def polyblep(phase: np.ndarray, dt: np.ndarray) -> np.ndarray:
    out = np.zeros_like(phase)
    m = phase < dt
    x = phase[m] / dt[m]
    out[m] = x + x - x * x - 1.0
    m = phase > 1.0 - dt
    x = (phase[m] - 1.0) / dt[m]
    out[m] = x * x + x + x + 1.0
    return out


def saw(freq, length: int, phase0: float = 0.0) -> np.ndarray:
    f = np.broadcast_to(np.asarray(freq, dtype=float), (length,))
    dt = f / SR
    phase = (phase0 + np.cumsum(dt)) % 1.0
    return (2.0 * phase - 1.0) - polyblep(phase, dt)


def sine(freq, length: int) -> np.ndarray:
    f = np.broadcast_to(np.asarray(freq, dtype=float), (length,))
    return np.sin(2 * np.pi * np.cumsum(f) / SR)


def env_adsr(length: int, a: float, d: float, s: float, r: float) -> np.ndarray:
    a_n, d_n, r_n = int(a * SR), int(d * SR), int(r * SR)
    sus_n = max(length - a_n - d_n - r_n, 0)
    e = np.concatenate([
        np.linspace(0, 1, max(a_n, 1)),
        np.linspace(1, s, max(d_n, 1)),
        np.full(sus_n, s),
        np.linspace(s, 0, max(r_n, 1)),
    ])
    return e[:length] if len(e) >= length else np.pad(e, (0, length - len(e)))


def lp(x: np.ndarray, cutoff: float, order: int = 2) -> np.ndarray:
    sos = signal.butter(order, min(cutoff, SR / 2 - 100), "low", fs=SR, output="sos")
    return signal.sosfilt(sos, x)


def hp(x: np.ndarray, cutoff: float, order: int = 2) -> np.ndarray:
    sos = signal.butter(order, cutoff, "high", fs=SR, output="sos")
    return signal.sosfilt(sos, x)


def bp(x: np.ndarray, lo: float, hi: float) -> np.ndarray:
    sos = signal.butter(2, [lo, hi], "band", fs=SR, output="sos")
    return signal.sosfilt(sos, x)


def sweep_lp(x: np.ndarray, cutoffs: np.ndarray, block: int = 256) -> np.ndarray:
    """Filtro paso bajo variable en el tiempo (procesado por bloques)."""
    out = np.zeros_like(x)
    zi = np.zeros((1, 2))
    for i in range(0, len(x), block):
        c = float(np.clip(cutoffs[min(i, len(cutoffs) - 1)], 40, SR / 2 - 200))
        sos = signal.butter(2, c, "low", fs=SR, output="sos")
        out[i:i + block], zi = signal.sosfilt(sos, x[i:i + block], zi=zi)
    return out


def reverb(x: np.ndarray, seconds: float = 2.2, wet: float = 0.25, bright: float = 6000) -> np.ndarray:
    n = int(seconds * SR)
    t = np.arange(n) / SR
    ir_l = rng.standard_normal(n) * np.exp(-t * 6.9 / seconds)
    ir_r = rng.standard_normal(n) * np.exp(-t * 6.9 / seconds)
    ir_l, ir_r = lp(ir_l, bright), lp(ir_r, bright)
    ir_l /= np.sqrt(np.sum(ir_l ** 2))
    ir_r /= np.sqrt(np.sum(ir_r ** 2))
    mono = x if x.ndim == 1 else x.mean(axis=0)
    wl = signal.fftconvolve(mono, ir_l)[: len(mono)]
    wr = signal.fftconvolve(mono, ir_r)[: len(mono)]
    dry = np.vstack([mono, mono]) if x.ndim == 1 else x
    return dry * (1 - wet) + np.vstack([wl, wr]) * wet


def stereo(x: np.ndarray, pan: float = 0.0) -> np.ndarray:
    l = np.cos((pan + 1) * np.pi / 4)
    r = np.sin((pan + 1) * np.pi / 4)
    return np.vstack([x * l, x * r]) * np.sqrt(2)


def place(buf: np.ndarray, x: np.ndarray, t: float, gain: float = 1.0) -> None:
    i = int(t * SR)
    if i >= buf.shape[-1]:
        return
    if x.ndim == 1:
        x = np.vstack([x, x])
    end = min(i + x.shape[-1], buf.shape[-1])
    buf[:, i:end] += x[:, : end - i] * gain


# --------------------------------------------------------------- instrumentos
def kick() -> np.ndarray:
    n = int(0.45 * SR)
    t = np.arange(n) / SR
    f = 48 + 110 * np.exp(-t * 32)
    body = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 7.5)
    click = hp(rng.standard_normal(n), 3000) * np.exp(-t * 300) * 0.25
    return np.tanh((body + click) * 1.6) * 0.9


def clap() -> np.ndarray:
    n = int(0.35 * SR)
    t = np.arange(n) / SR
    noise = bp(rng.standard_normal(n), 900, 5000)
    e = np.zeros(n)
    for off in (0.0, 0.011, 0.022):
        tt = np.clip(t - off, 0, None)
        e += (t >= off) * np.exp(-tt * 90) * 0.6
    e += np.exp(-t * 14) * 0.35
    return noise * e


def hat(open_: bool = False) -> np.ndarray:
    n = int((0.28 if open_ else 0.06) * SR)
    t = np.arange(n) / SR
    noise = hp(rng.standard_normal(n), 8000, 4)
    return noise * np.exp(-t * (14 if open_ else 70))


def pluck(freq: float, length: float, cutoff: float) -> np.ndarray:
    n = int(length * SR)
    t = np.arange(n) / SR
    x = saw(freq, n) * 0.5 + saw(freq * 1.005, n, 0.3) * 0.5
    c = cutoff * (0.25 + 0.75 * np.exp(-t * 18))
    x = sweep_lp(x, c, 128)
    return x * env_adsr(n, 0.002, 0.12, 0.25, 0.05)


def bass_note(freq: float, length: float) -> np.ndarray:
    n = int(length * SR)
    t = np.arange(n) / SR
    x = saw(freq, n) * 0.6 + sine(freq, n) * 0.8
    x = sweep_lp(x, 300 + 900 * np.exp(-t * 20), 128)
    return np.tanh(x * 1.4) * env_adsr(n, 0.004, 0.08, 0.7, 0.04)


def pad_chord(notes: list[str], length: float) -> np.ndarray:
    n = int(length * SR)
    out = np.zeros(n)
    for nn in notes:
        f = note(nn)
        for det in (-0.12, -0.04, 0.05, 0.11):
            out += saw(f * 2 ** (det / 12), n, rng.random()) * 0.12
    return out * env_adsr(n, 0.25, 0.4, 0.8, 0.5)


def noise_riser(length: float, lo: float = 400, hi: float = 9000) -> np.ndarray:
    n = int(length * SR)
    t = np.linspace(0, 1, n)
    x = rng.standard_normal(n)
    x = sweep_lp(hp(x, 200), lo * (hi / lo) ** (t ** 1.6), 128)
    return x * (t ** 2.2) * 0.9


def whoosh(length: float = 0.55) -> np.ndarray:
    n = int(length * SR)
    t = np.linspace(0, 1, n)
    x = rng.standard_normal(n)
    cut = 600 + 7000 * np.sin(np.pi * np.clip(t * 1.05, 0, 1)) ** 2
    x = sweep_lp(hp(x, 300), cut, 128)
    e = np.sin(np.pi * t) ** 1.5 * (t < 1)
    return x * e


def impact(length: float = 2.6, strength: float = 1.0) -> np.ndarray:
    n = int(length * SR)
    t = np.arange(n) / SR
    f = 34 + 70 * np.exp(-t * 9)
    sub = np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 2.1)
    crack = lp(rng.standard_normal(n), 5000) * np.exp(-t * 22) * 0.5
    return np.tanh((sub * 1.2 + crack) * strength)


def shimmer(length: float = 2.4) -> np.ndarray:
    """Brillo cristalino para el destello final del logo."""
    n = int(length * SR)
    t = np.arange(n) / SR
    out = np.zeros(n)
    for k, nn in enumerate(["A5", "E6", "A6", "C7", "E7"]):
        f = note(nn)
        start = int(k * 0.045 * SR)
        tt = t[: n - start]
        tone = (np.sin(2 * np.pi * f * tt) + 0.3 * np.sin(2 * np.pi * f * 2.01 * tt)) * np.exp(-tt * 2.6)
        out[start:] += tone * 0.16
    return out


# --------------------------------------------------------------------- mezcla
def build() -> np.ndarray:
    drums = np.zeros((2, N))
    music = np.zeros((2, N))
    fx = np.zeros((2, N))

    total_beats = int(DUR / BEAT)

    # sidechain (bombeo suave con el bombo)
    duck = np.ones(N)

    # --- batería
    K, C, HC, HO = kick(), clap(), hat(), hat(True)
    for b in range(total_beats):
        t = b * BEAT
        in_groove = 3.0 <= t < 17.5 or 18.0 <= t < FINAL_HIT
        if in_groove:
            place(drums, K, t, 0.95)
            i = int(t * SR)
            L = int(0.32 * SR)
            seg = duck[i:i + L]
            seg[:] = np.minimum(seg, 1 - 0.55 * np.exp(-np.arange(len(seg)) / SR * 9))
        if (10.0 <= t < 17.5 or 18.0 <= t < FINAL_HIT) and b % 2 == 1:
            place(drums, stereo(C, 0.0), t, 0.55)
        if (7.0 <= t < 17.5 or 18.0 <= t < FINAL_HIT):
            place(drums, stereo(HO, 0.25), t + BEAT / 2, 0.22)
        if 3.0 <= t < 17.5 or 18.0 <= t < FINAL_HIT:
            for s in range(4):
                vel = 0.10 if s % 2 == 0 else 0.16
                place(drums, stereo(HC, -0.3), t + s * BEAT / 4, vel)

    # --- bajo: corcheas en contratiempo
    for b in range(total_beats * 2):
        t = b * BEAT / 2
        if t < 3.0 or 17.5 <= t < 18.0 or t >= FINAL_HIT:
            continue
        if b % 2 == 1 or t >= 10.0:
            f = note(BASS[chord_at(t)])
            place(music, bass_note(f, BEAT / 2 * 0.95), t, 0.5 if b % 2 == 1 else 0.32)

    # --- pad (toda la pieza; se abre progresivamente)
    pad = np.zeros(N)
    for bar in range(int(np.ceil(DUR / (4 * BEAT)))):
        t = bar * 4 * BEAT
        if t >= FINAL_HIT:
            break
        ch = pad_chord(CHORDS[bar % 4], 4 * BEAT + 0.4)
        i = int(t * SR)
        end = min(i + len(ch), N)
        pad[i:end] += ch[: end - i]
    tt = np.arange(N) / SR
    pad_cut = np.interp(tt, [0, 3, 10, 17.5, 18, 22, 25], [500, 1200, 2600, 4200, 1800, 4500, 1500])
    pad = sweep_lp(pad, pad_cut)
    music += stereo(pad, 0.0) * 0.32

    # --- arpegio en semicorcheas
    arp = np.zeros((2, N))
    pattern = [0, 1, 2, 3, 2, 1, 3, 2]
    for s in range(int(DUR / (BEAT / 4))):
        t = s * BEAT / 4
        if t < 3.0 or 17.5 <= t < 18.0 or t >= FINAL_HIT:
            continue
        ch = CHORDS[chord_at(t)]
        f = note(ch[pattern[s % 8]]) * 2
        cutoff = float(np.interp(t, [3, 10, 18, 22], [1500, 3200, 4500, 5500]))
        vel = 0.18 if s % 4 == 0 else 0.12
        place(arp, stereo(pluck(f, 0.2, cutoff), 0.35 if s % 2 else -0.35), t, vel)
    # eco (corchea con puntillo)
    d = int(BEAT * 0.75 * SR)
    echo = np.zeros_like(arp)
    echo[:, d:] = arp[:, :-d] * 0.35
    echo = echo[::-1]  # ping-pong
    music += arp + echo

    # --- efectos de transición
    place(fx, impact(2.8, 1.1), 0.0, 0.9)
    place(fx, reverb(lp(rng.standard_normal(int(0.4 * SR)), 3500) * np.exp(-np.arange(int(0.4 * SR)) / SR * 10), 2.5, 0.6), 0.0, 0.35)
    place(fx, stereo(noise_riser(1.4), 0.0), 3.0 - 1.4, 0.32)
    for c in CUTS[1:4]:
        w = whoosh(0.6)
        place(fx, np.vstack([w, np.roll(w, 400)]), c - 0.38, 0.38)
    place(fx, stereo(noise_riser(2.0, 300, 11000), 0.0), 18.0 - 2.0, 0.42)
    place(fx, impact(2.2, 1.0), 3.0, 0.45)
    place(fx, impact(3.0, 1.2), 18.0, 0.85)
    place(fx, impact(3.0, 1.3), FINAL_HIT, 0.9)
    final_stab = pad_chord(["A2", "A3", "C4", "E4", "A4", "E5"], 2.8)
    place(music, stereo(lp(final_stab, 3500), 0.0), FINAL_HIT, 0.55)
    place(fx, reverb(shimmer(2.6), 2.8, 0.45, 9000), FINAL_HIT + 0.35, 0.8)
    place(fx, reverb(shimmer(1.8), 2.0, 0.4, 9000), 1.05, 0.35)

    music = reverb(music, 1.6, 0.18) * duck
    mix = drums + music + fx

    # master: HPF, saturación suave, fade final
    mix = np.vstack([hp(mix[0], 28), hp(mix[1], 28)])
    mix = np.tanh(mix * 1.15) / np.tanh(1.15)
    fade = np.ones(N)
    fl = int(1.2 * SR)
    fade[-fl:] = np.linspace(1, 0, fl) ** 2
    mix *= fade
    mix /= np.max(np.abs(mix)) / 0.89
    return mix


def main() -> None:
    root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    out = os.path.join(root, "public", "audio", "music.wav")
    os.makedirs(os.path.dirname(out), exist_ok=True)
    mix = build()
    pcm = (np.clip(mix.T, -1, 1) * 32767).astype("<i2")
    with wave.open(out, "wb") as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print("escrito", out)


if __name__ == "__main__":
    main()
