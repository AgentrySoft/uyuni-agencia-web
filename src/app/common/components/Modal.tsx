"use client";

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import type { ReactNode } from "react";
import classNames from "classnames";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  /** Tamaño del panel: default, lg, xl, full */
  size?: "default" | "lg" | "xl" | "full";
  className?: string;
};

const sizeClasses = {
  default: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-4xl",
  full: "max-w-[90vw] max-h-[90vh]",
};

export function Modal({
  open,
  onClose,
  title,
  children,
  size = "default",
  className,
}: ModalProps) {
  return (
    <Dialog open={open} onClose={onClose} className="relative z-50">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/50 transition duration-200 data-closed:opacity-0"
      />
      <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
        <DialogPanel
          transition
          className={classNames(
            "w-full overflow-hidden rounded-2xl bg-cream shadow-xl transition duration-200 data-closed:opacity-0 data-closed:scale-95",
            sizeClasses[size],
            className
          )}
        >
          <div className="flex max-h-[85vh] flex-col">
            <div className="flex shrink-0 items-center justify-between border-b border-primary-dark/10 px-6 py-4">
              <DialogTitle className="font-rem text-xl font-extrabold text-primary-dark md:text-2xl">
                {title}
              </DialogTitle>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-primary-dark/70 transition hover:bg-primary/10 hover:text-primary-dark"
                aria-label="Cerrar"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="overflow-y-auto px-6 py-5">{children}</div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
}
