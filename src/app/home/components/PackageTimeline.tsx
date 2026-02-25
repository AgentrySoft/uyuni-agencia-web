"use client";

import { motion } from "motion/react";

export type TimelineDay = {
  day: number;
  title: string;
  steps: string[];
};

type PackageTimelineProps = {
  days: TimelineDay[];
  className?: string;
};

const DOT_DURATION = 0.35;
const LINE_DURATION = 0.5;
const STAGGER = 0.15;
const EASE = [0.22, 1, 0.36, 1] as const;

export function PackageTimeline({ days, className = "" }: PackageTimelineProps) {
  return (
    <div className={className}>
      {days.map(({ day, title, steps }, dayIndex) => (
        <motion.div
          key={day}
          className="relative flex gap-4 pb-8 last:pb-0"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: DOT_DURATION,
            delay: dayIndex * (DOT_DURATION + STAGGER),
            ease: EASE,
          }}
        >
          {/* Línea vertical dotted con animación de recorrido */}
          {dayIndex < days.length - 1 && (
            <motion.div
              className="absolute left-[11px] top-8 bottom-0 w-0.5 overflow-hidden"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "calc(100% - 0.5rem)", opacity: 1 }}
              transition={{
                height: { duration: LINE_DURATION, delay: dayIndex * (DOT_DURATION + STAGGER) + STAGGER, ease: EASE },
                opacity: { duration: 0.2 },
              }}
              aria-hidden
            >
              <div
                className="h-full w-full border-l-2 border-dashed border-primary/40"
                style={{ transformOrigin: "top" }}
              />
            </motion.div>
          )}
          {/* Punto del día */}
          <motion.div
            className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-cream shadow-md"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 22,
              delay: dayIndex * (DOT_DURATION + STAGGER),
            }}
          >
            {day}
          </motion.div>
          {/* Contenido del día */}
          <div className="min-w-0 flex-1 pt-0.5">
            <h4 className="font-rem text-lg font-bold text-primary-dark">
              Día {day}: {title}
            </h4>
            <ul className="mt-2 space-y-1.5">
              {steps.map((step, i) => (
                <motion.li
                  key={i}
                  className="flex items-start gap-2 font-inter text-sm text-primary-dark/90 md:text-base"
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.25,
                    delay: dayIndex * (DOT_DURATION + STAGGER) + 0.2 + i * 0.06,
                    ease: EASE,
                  }}
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                  <span>{step}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
