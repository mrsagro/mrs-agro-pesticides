export default function FieldRowDivider() {
  return (
    <div className="w-full overflow-hidden" role="presentation" aria-hidden="true">
      <svg
        width="100%"
        height="48"
        viewBox="0 0 100 48"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="field-row-pattern"
            x="0"
            y="0"
            width="24"
            height="24"
            patternUnits="userSpaceOnUse"
            patternTransform="rotate(45)"
          >
            <rect x="0" y="0" width="12" height="24" fill="#7CB342" />
            <rect x="12" y="0" width="12" height="24" fill="#F5A623" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#field-row-pattern)" />
      </svg>
    </div>
  );
}
