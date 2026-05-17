type TorogozProps = {
  size?: number;
  mono?: boolean;
  monoColor?: string;
};

export default function Torogoz({ size = 100, mono = false, monoColor = "currentColor" }: TorogozProps) {
  const turquoise = mono ? monoColor : "#3FB0C9";
  const blueCrown = mono ? monoColor : "#1B6FA8";
  const oliveGreen = mono ? monoColor : "#6B8E4E";
  const chestGreen = mono ? monoColor : "#8AA865";
  const chestTint = mono ? monoColor : "#C4B87A";
  const rufous = mono ? monoColor : "#B86A3F";
  const black = mono ? monoColor : "#1C1613";
  const eyeWhite = "#F6F1E7";

  return (
    <svg viewBox="0 0 200 280" width={size} style={{ display: "block", overflow: "visible" }}>
      {/* Cola */}
      <path d="M 92 125 Q 88 165, 84 210 Q 82 235, 80 255" stroke={mono ? monoColor : "#1B6FA8"} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx="78" cy="262" rx="6" ry="11" fill={mono ? monoColor : "#1B6FA8"} />
      <ellipse cx="78" cy="262" rx="3" ry="7" fill={mono ? monoColor : "#3FB0C9"} opacity="0.7" />
      <path d="M 104 125 Q 108 165, 112 210 Q 114 235, 116 255" stroke={mono ? monoColor : "#1B6FA8"} strokeWidth="2.2" fill="none" strokeLinecap="round" />
      <ellipse cx="118" cy="262" rx="6" ry="11" fill={mono ? monoColor : "#1B6FA8"} />
      <ellipse cx="118" cy="262" rx="3" ry="7" fill={mono ? monoColor : "#3FB0C9"} opacity="0.7" />
      {/* Cuerpo */}
      <path d="M 65 90 Q 55 110, 60 140 Q 70 155, 100 155 Q 130 155, 140 140 Q 145 110, 135 90 Q 125 75, 100 75 Q 75 75, 65 90 Z" fill={oliveGreen} />
      <path d="M 75 115 Q 70 135, 80 150 Q 95 158, 115 155 Q 128 150, 125 125 Q 120 115, 100 118 Q 85 118, 75 115 Z" fill={chestGreen} />
      <ellipse cx="100" cy="135" rx="14" ry="10" fill={chestTint} opacity="0.85" />
      <path d="M 68 92 Q 55 108, 62 135 Q 70 142, 78 138 Q 80 120, 75 100 Z" fill={blueCrown} opacity="0.55" />
      {/* Cabeza */}
      <ellipse cx="100" cy="62" rx="32" ry="30" fill={oliveGreen} />
      <path d="M 72 55 Q 75 38, 100 32 Q 125 38, 128 55 Q 125 48, 100 45 Q 75 48, 72 55 Z" fill={blueCrown} />
      <path d="M 78 56 Q 90 52, 105 55 Q 110 56, 115 58" stroke={turquoise} strokeWidth="3.5" fill="none" strokeLinecap="round" />
      <path d="M 77 60 Q 88 57, 103 59" stroke={turquoise} strokeWidth="2" fill="none" strokeLinecap="round" opacity="0.7" />
      <path d="M 78 66 Q 85 63, 100 63 Q 115 63, 122 68 Q 120 75, 110 77 Q 95 78, 82 75 Q 76 72, 78 66 Z" fill={black} />
      <path d="M 90 82 Q 95 88, 105 87 Q 110 85, 108 80 Q 100 78, 90 82 Z" fill={rufous} />
      <circle cx="105" cy="68" r="3.5" fill={black} />
      <circle cx="106" cy="67" r="1.2" fill={eyeWhite} />
      <path d="M 128 72 Q 144 74, 150 78 Q 144 80, 128 78 Z" fill={black} />
    </svg>
  );
}