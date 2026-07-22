/**
 * PopArtDivider - SVG wave dividers with pop-art style
 * Used between sections for smooth, colorful transitions
 */

interface PopArtDividerProps {
  position: "top" | "bottom";
  color: string;
  className?: string;
}

export default function PopArtDivider({ position, color, className = "" }: PopArtDividerProps) {
  const flip = position === "bottom";

  return (
    <div
      className={`w-full overflow-hidden ${flip ? "rotate-180" : ""} ${className}`}
      style={{ lineHeight: 0 }}
    >
      <svg
        viewBox="0 0 1440 80"
        className="w-full h-auto"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern id="halftone" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="4" cy="4" r="2" fill="white" opacity="0.15" />
          </pattern>
        </defs>
        <path
          d="M0,32L48,37.3C96,43,192,53,288,53.3C384,53,480,43,576,42.7C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z"
          fill={color}
        />
        <path
          d="M0,32L48,37.3C96,43,192,53,288,53.3C384,53,480,43,576,42.7C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z"
          fill="url(#halftone)"
        />
      </svg>
    </div>
  );
}
