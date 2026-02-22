import classNames from "classnames";

export function HeroSeparator({ className }: Props) {
  return (
    <div className={classNames("relative z-10 w-full", className)} aria-hidden>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="block h-14 md:h-24 w-full absolute -bottom-1"
      >
        <path
          d="M598.97 114.72L0 0 0 120 1200 120 1200 0 598.97 114.72z"
          className="shape-fill"
          fill="var(--color-cream)"
        />
      </svg>
    </div>
  );
}

type Props = {
  className?: string;
}
