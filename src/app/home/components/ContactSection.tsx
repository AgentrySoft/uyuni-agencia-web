"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { ButtonBase } from "@/app/common/components/ButtonBase";
import { ContactFormIcon } from "./icons";
import { HeroSeparator } from "./HeroSeparator";
import { viewportOnce } from "@/app/common/lib/motion-variants";

const WHATSAPP_NUMBER = "59179413052";

function buildWhatsAppMessage(name: string, description: string): string {
  const threeWords = description.trim().split(/\s+/).slice(0, 3).join(" ");
  return `Hola soy ${name} ${threeWords}..., quiero mi sitio web de turismo!`;
}

const easeOut = [0.22, 1, 0.36, 1] as const;
const titleReveal = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

const formReveal = {
  hidden: { opacity: 0, y: 48, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, delay: 0.1, ease: easeOut },
  },
};

export function ContactSection() {
  const nameRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const name = nameRef.current?.value?.trim() ?? "";
    const description = messageRef.current?.value?.trim() ?? "";
    if (!name) return;
    const text = encodeURIComponent(buildWhatsAppMessage(name, description));
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  return (
    <section
      id="contact"
      className="relative flex min-h-[80vh] w-full flex-col items-center justify-start overflow-hidden bg-cover bg-no-repeat px-6 py-16 md:py-32"
      style={{
        backgroundImage: "url(/images/contact.jpg)",
        backgroundPosition: "right center",
      }}
    >
      <motion.h2
        className="relative z-10 mb-32 text-center font-inter text-3xl font-extrabold text-white sm:text-4xl md:text-5xl lg:text-[64px]"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={titleReveal}
      >
        Contáctanos
      </motion.h2>

      <motion.div
        className="relative z-10 flex w-full max-w-lg justify-center"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={formReveal}
      >
        <form
          onSubmit={handleSubmit}
          className="w-full rounded-2xl bg-card-bg p-6 shadow-lg md:p-8"
        >
          {/* Título + descripción + icono */}
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <h3 className="font-inter text-xl font-extrabold text-[#7E502E] sm:text-2xl md:text-[32px]">
                Deja tus datos
              </h3>
              <p className="mt-1 font-inter text-lg font-extrabold text-[#937A5E] sm:text-xl md:text-2xl">
                y te responderemos lo antes posible.
              </p>
            </div>
            <div
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary text-cream"
              aria-hidden
            >
              <ContactFormIcon className="h-6 w-6 text-cream" />
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <input
              ref={nameRef}
              type="text"
              name="name"
              placeholder="Tu nombre"
              required
              className="rounded-xl border-2 border-[#7E502E] bg-white px-4 py-3 font-inter text-primary-dark placeholder:text-description/70 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <textarea
              ref={messageRef}
              name="message"
              placeholder="Mensaje (ej. tres palabras que te describan)"
              rows={3}
              className="resize-none rounded-xl border-2 border-[#7E502E] bg-white px-4 py-3 font-inter text-primary-dark placeholder:text-description/70 focus:outline-none focus:ring-2 focus:ring-primary/20"
            />
            <div className="mt-2">
              <ButtonBase
                type="submit"
                size="small"
                className="font-rem font-medium !bg-primary !text-cream shadow-black !text-xl"
              >
                Enviar mensaje
              </ButtonBase>
            </div>
          </div>
        </form>
      </motion.div>
      <HeroSeparator className="!absolute bottom-0 w-full" />
    </section>
  );
}
