/**
 * CatSVG — the recurring cat mascot
 * Simple, cute, Animal-Crossing-ish style drawn in pure SVG.
 * Props:
 *   size    — px width/height (default 48)
 *   waving  — boolean, shows raised paw
 *   bubble  — string, speech bubble text
 */
export default function CatSVG({ size = 48, waving = false, bubble = null }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Body */}
      <ellipse cx="40" cy="54" rx="18" ry="15" fill="#FFCBA4" />

      {/* Head */}
      <circle cx="40" cy="34" r="20" fill="#FFCBA4" />

      {/* Ears */}
      <polygon points="22,20 18,8 30,16" fill="#FFCBA4" />
      <polygon points="58,20 62,8 50,16" fill="#FFCBA4" />
      {/* Inner ears */}
      <polygon points="23,19 20,11 29,17" fill="#F9B8AA" />
      <polygon points="57,19 60,11 51,17" fill="#F9B8AA" />

      {/* Eyes */}
      <ellipse cx="33" cy="33" rx="4" ry="4.5" fill="#3D2B1A" />
      <ellipse cx="47" cy="33" rx="4" ry="4.5" fill="#3D2B1A" />
      {/* Eye shine */}
      <circle cx="35" cy="31" r="1.5" fill="white" />
      <circle cx="49" cy="31" r="1.5" fill="white" />

      {/* Nose */}
      <ellipse cx="40" cy="39" rx="2.5" ry="1.8" fill="#F5A0A0" />

      {/* Mouth */}
      <path d="M37 41 Q40 44 43 41" stroke="#9C6A3C" strokeWidth="1.2" strokeLinecap="round" fill="none" />

      {/* Whiskers */}
      <line x1="20" y1="38" x2="34" y2="40" stroke="#9C6A3C" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="20" y1="41" x2="34" y2="41.5" stroke="#9C6A3C" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="46" y1="40" x2="60" y2="38" stroke="#9C6A3C" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
      <line x1="46" y1="41.5" x2="60" y2="41" stroke="#9C6A3C" strokeWidth="1" strokeLinecap="round" opacity="0.5" />

      {/* Tail */}
      <path d="M56 62 Q68 58 66 70 Q64 76 58 72" stroke="#FFAD7A" strokeWidth="4" strokeLinecap="round" fill="none" />

      {/* Left paw */}
      {waving ? (
        /* Waving arm raised */
        <path d="M26 52 Q14 38 18 30" stroke="#FFCBA4" strokeWidth="7" strokeLinecap="round" fill="none" />
      ) : (
        <ellipse cx="26" cy="62" rx="6" ry="4" fill="#FFCBA4" />
      )}

      {/* Right paw */}
      <ellipse cx="54" cy="62" rx="6" ry="4" fill="#FFCBA4" />

      {/* Speech bubble */}
      {bubble && (
        <>
          <rect x="48" y="4" width={Math.max(30, bubble.length * 7)} height="18" rx="8" fill="white" stroke="#FFAD7A" strokeWidth="1.5" />
          <polygon points="54,22 60,22 57,28" fill="white" />
          <polygon points="55,22 61,22 58,27" fill="#FFAD7A" />
          <text x="52" y="16.5" fontFamily="DM Sans, sans-serif" fontSize="9" fill="#3D2B1A" fontWeight="600">{bubble}</text>
        </>
      )}
    </svg>
  )
}
