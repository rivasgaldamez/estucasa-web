export default function Waves() {
  return (
    <svg
      viewBox="0 0 1200 40"
      preserveAspectRatio="none"
      style={{ width: "100%", height: "28px", display: "block" }}
    >
      <path
        d="M 0 20 Q 75 5, 150 20 T 300 20 T 450 20 T 600 20 T 750 20 T 900 20 T 1050 20 T 1200 20"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M 0 28 Q 75 13, 150 28 T 300 28 T 450 28 T 600 28 T 750 28 T 900 28 T 1050 28 T 1200 28"
        stroke="currentColor"
        strokeWidth="1"
        fill="none"
        opacity="0.3"
      />
    </svg>
  );
}