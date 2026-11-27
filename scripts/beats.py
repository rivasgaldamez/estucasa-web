"""Beats de una pista de audio con beat_this (CPJKU) → beats.json para sincronizar reels.

Uso:
    python scripts/beats.py <audio> [-o beats.json] [--dbn]

<audio> puede ser cualquier formato que lea ffmpeg (wav, mp3, m4a, flac, o el audio de un video): se decodifica con
ffmpeg a mono float32 22.05 kHz y se pasa a beat_this.Audio2Beats (así no depende de torchaudio ni de soundfile).
El checkpoint 'final0' se descarga una sola vez en la primera ejecución (caché de torch); el render no hace red.

beats.json:
    {
      "source": ruta del audio, "duration": s,
      "bpm": tempo (pendiente de la recta que ajusta los beats por mínimos cuadrados),
      "beats": [s, ...]        todos los beats (incluye los downbeats),
      "downbeats": [s, ...]    primer tiempo de cada compás,
      "meter": tiempos por compás más frecuente,
      "model": "beat_this final0" (+ dbn si se pidió)
    }
"""
import argparse, json, os, subprocess, sys
import numpy as np

SR = 22050


def decode(path):
    raw = subprocess.run(["ffmpeg", "-v", "error", "-i", path, "-vn", "-ac", "1", "-ar", str(SR), "-f", "f32le", "-"],
                         capture_output=True, check=True).stdout
    return np.frombuffer(raw, "<f4").astype(np.float64)


def main():
    ap = argparse.ArgumentParser(description="beats.json con beat_this")
    ap.add_argument("audio")
    ap.add_argument("-o", "--out", default="beats.json")
    ap.add_argument("--dbn", action="store_true", help="post-proceso DBN de madmom (requiere madmom)")
    a = ap.parse_args()
    from beat_this.inference import Audio2Beats
    sig = decode(a.audio)
    beats, downbeats = Audio2Beats(checkpoint_path="final0", device="cpu", dbn=a.dbn)(sig, SR)
    beats = [round(float(b), 4) for b in beats]; downbeats = [round(float(b), 4) for b in downbeats]
    # tempo: pendiente de la recta beat ~ índice (la mediana de los intervalos queda cuantizada a la resolución de 20 ms del modelo)
    bpm = round(60.0 / float(np.polyfit(np.arange(len(beats)), beats, 1)[0]), 2) if len(beats) > 2 else None
    # métrica: beats entre downbeats consecutivos (moda)
    counts = [sum(1 for b in beats if d0 <= b < d1) for d0, d1 in zip(downbeats, downbeats[1:])]
    meter = int(np.bincount(counts).argmax()) if counts else None
    out = {"source": os.path.abspath(a.audio).replace("\\", "/"), "duration": round(len(sig) / SR, 4), "bpm": bpm, "meter": meter,
           "beats": beats, "downbeats": downbeats, "model": "beat_this final0" + (" + dbn" if a.dbn else "")}
    with open(a.out, "w", encoding="utf-8") as f: json.dump(out, f, indent=1)
    print(f"{a.out}: {len(beats)} beats, {len(downbeats)} downbeats, {bpm} BPM, {meter}/4, {out['duration']} s")


if __name__ == "__main__":
    sys.stdout.reconfigure(encoding="utf-8")
    main()
