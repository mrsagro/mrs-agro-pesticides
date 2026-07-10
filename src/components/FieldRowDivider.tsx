export default function FieldRowDivider() {
  return (
    <div className="w-full overflow-hidden relative" role="presentation" aria-hidden="true">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark-green/5 via-transparent to-brand-dark-green/5 pointer-events-none" />
      <svg
        width="100%"
        height="56"
        viewBox="0 0 100 56"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        className="block"
      >
        <defs>
          <pattern
            id="field-row-pattern"
            x="0"
            y="0"
            width="28"
            height="28"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect x="0" y="0" width="14" height="28" fill="#7CB342" opacity="0.6" />
            <rect x="14" y="0" width="14" height="28" fill="#F5A623" opacity="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#field-row-pattern)" />
      </svg>
    </div>
  );
}
