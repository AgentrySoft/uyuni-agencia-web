import type { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  children: ReactNode;
};

export function FeatureCard({ icon, children }: Props) {
  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-8 border-primary-dark bg-secondary">
        <div className="text-primary [&_svg]:h-14 [&_svg]:w-14 [&_svg]:shrink-0">
          {icon}
        </div>
      </div>
      <p className="font-rem text-base font-medium text-primary-dark md:text-lg max-w-40">
        {children}
      </p>
    </div>
  );
}
