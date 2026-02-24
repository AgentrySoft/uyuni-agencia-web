"use client";

type SplitTextProps = {
  /** Texto a dividir en caracteres y animar (ej. "UYUNI") */
  children: string;
  /** Clases del contenedor (ej. font-rem text-5xl font-extrabold) */
  className?: string;
  /** Delay base por letra en ms (default 60) */
  delayPerChar?: number;
};

/**
 * Animación split-text: cada letra aparece con un pequeño retraso (estilo React Bits).
 * Requiere la clase .split-char y @keyframes split-text-in en globals.css.
 */
export function SplitText({
  children,
  className = "",
  delayPerChar = 60,
}: SplitTextProps) {
  const chars = children.split("");

  return (
    <span className={`inline-block ${className}`} aria-label={children}>
      {chars.map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="split-char"
          style={{ animationDelay: `${i * delayPerChar}ms` }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
}
