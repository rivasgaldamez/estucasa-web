---
workflow: general-video
flow: direct
---

# ES TU CASA — orbe

- 12 s, 1080x1920 (9:16), 30 fps. Sin audio.
- Texto "ES TU CASA" (CASA en Gold #F5A800) / "INMOBILIARIA". Bebas Neue local.
- Fondo Navy #0D2060 → negro, viñeta suave.
- E1 0–2 scramble · E2 2–4 INMOBILIARIA por curva en S + slide 3D + estela dorada ·
  E3 4–6.5 glow + barrido de luz x2 · E4 6.5–8.5 split/shatter suave ·
  E5 8.5–12 puntos → orbe respirando → carga → explosión controlada → recomposición en logo + estucasasv.com.
- Todo en función de t, mulberry32 con semilla fija.
- Motion blur de 2 subframes en 0–8.5 s y 10.1–10.6 s: render a 60 fps + promedio de pares en ffmpeg.
- Entregable único: /renders/es-tu-casa-orbe.mp4. QA en 1, 3, 5, 7.5 y 11 s.
