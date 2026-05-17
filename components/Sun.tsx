"use client";

type SunProps = {
  size?: number;
};

export default function Sun({ size = 140 }: SunProps) {
  // Generamos los rayos del sol con valores fijos (no calculados dinamicamente)
  // para evitar diferencias de decimales entre servidor y cliente
  const rays = [
    { x1: 50, y1: 8, x2: 50, y2: 22 },
    { x1: 71, y1: 16.71, x2: 65.05, y2: 25.39 },
    { x1: 84, y1: 35.06, x2: 75.51, y2: 40.36 },
    { x1: 89.43, y1: 56.25, x2: 78.32, y2: 53.07 },
    { x1: 84, y1: 76.94, x2: 75.51, y2: 71.64 },
    { x1: 71, y1: 91.29, x2: 65.05, y2: 82.61 },
    { x1: 50, y1: 92, x2: 50, y2: 78 },
    { x1: 29, y1: 91.29, x2: 34.95, y2: 82.61 },
    { x1: 16, y1: 76.94, x2: 24.49, y2: 71.64 },
    { x1: 10.57, y1: 56.25, x2: 21.68, y2: 53.07 },
    { x1: 16, y1: 35.06, x2: 24.49, y2: 40.36 },
    { x1: 29, y1: 16.71, x2: 34.95, y2: 25.39 },
  ];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="sun-gradient" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD93D" />
          <stop offset="60%" stopColor="#F5A800" />
          <stop offset="100%" stopColor="#E89500" />
        </radialGradient>
      </defs>

      {/* Circulo central del sol */}
      <circle cx="50" cy="50" r="22" fill="url(#sun-gradient)" />

      {/* Rayos del sol */}
      {rays.map((ray, i) => (
        <line
          key={i}
          x1={ray.x1}
          y1={ray.y1}
          x2={ray.x2}
          y2={ray.y2}
          stroke="#F5A800"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      ))}
    </svg>
  );
}