"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  CardPackage,
  CardPackageAction,
  CardPackageDestination,
  CardPackageImage,
  CardPackageTitle,
} from "@/app/common/components/CardPackage";
import { ButtonBase } from "@/app/common/components/ButtonBase";
import { Modal } from "@/app/common/components/Modal";
import { PackageTimeline } from "@/app/home/components/PackageTimeline";
import { OUR_PACKAGES } from "@/app/home/content/our-packages-content";
import {
  PACKAGE_CONTENT,
  type PackageModalContent,
} from "@/app/home/content/package-modal-content";
import { viewportEarlier } from "@/app/common/lib/motion-variants";

const PACKAGE_VIDEO_ID = "jXqzDf_D1xQ";

/** Carga el script de la YouTube IFrame API (misma forma que HeroBanner) */
function loadYouTubeAPI(): Promise<void> {
  return new Promise((resolve) => {
    if (typeof window === "undefined") {
      resolve();
      return;
    }
    const w = window as Window & { YT?: { Player: unknown }; onYouTubeIframeAPIReady?: () => void };
    if (w.YT?.Player) {
      resolve();
      return;
    }
    const prev = w.onYouTubeIframeAPIReady;
    w.onYouTubeIframeAPIReady = () => {
      prev?.();
      resolve();
    };
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const first = document.getElementsByTagName("script")[0];
    first?.parentNode?.insertBefore(tag, first);
  });
}

/** Mismo estilo cover que HeroBanner pero relativo al contenedor del card */
const CARD_VIDEO_COVER_STYLE = {
  width: "max(100cqw, 177.78cqh)",
  height: "max(100cqh, 56.25cqw)",
} as const;

const easeOut = [0.22, 1, 0.36, 1] as const;

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M8 5v14l11-7L8 5z" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

type PackageCardWithVideoProps = {
  image: string;
  imageAlt: string;
  icon?: React.ReactNode;
  title: string;
  destination: string;
  buttonLabel: string;
  isVideoExpanded: boolean;
  onExpand: () => void;
  onCollapse: () => void;
  onOpenModal: () => void;
};

/** Overlay de video: se monta al abrir y se desmonta al cerrar, así videoPlaying empieza en false cada vez (como HeroBanner). */
function PackageVideoOverlay({ title, onClose }: { title: string; onClose: () => void }) {
  const playerContainerRef = useRef<HTMLDivElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  const createPlayer = useCallback(() => {
    const w = window as Window & {
      YT?: { Player: new (el: HTMLElement, opts: unknown) => unknown };
    };
    const el = playerContainerRef.current;
    if (!el || !w.YT?.Player) return;

    new w.YT.Player(el, {
      videoId: PACKAGE_VIDEO_ID,
      width: "100%",
      height: "100%",
      playerVars: {
        autoplay: 1,
        mute: 1,
        loop: 1,
        playlist: PACKAGE_VIDEO_ID,
        controls: 0,
        rel: 0,
        modestbranding: 1,
        playsinline: 1,
      },
      events: {
        onStateChange: (event: { data: number }) => {
          if (event.data === 1) setVideoPlaying(true); // PLAYING
        },
      },
    });
  }, []);

  useEffect(() => {
    if (!playerContainerRef.current) return;
    let cancelled = false;
    loadYouTubeAPI().then(() => {
      if (!cancelled) createPlayer();
    });
    return () => {
      cancelled = true;
    };
  }, [createPlayer]);

  return (
    <div className="absolute inset-0 z-10 flex flex-col overflow-hidden rounded-2xl bg-black [container-type:size]">
      <div className="absolute right-3 top-3 z-20">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className="flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 shadow-lg ring-2 ring-primary/40 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Cerrar video"
        >
          <span className="font-rem text-sm font-bold text-primary">OK</span>
          <CheckIcon className="h-5 w-5 text-primary" />
        </button>
      </div>
      {/* Visible solo cuando el video ya está reproduciendo. pointer-events-none para que no se pueda pausar con click. */}
      <div
        className={`pointer-events-none absolute inset-0 overflow-hidden transition-opacity duration-500 ${videoPlaying ? "opacity-100" : "opacity-0"}`}
        aria-hidden
      >
        <div
          ref={playerContainerRef}
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
          style={CARD_VIDEO_COVER_STYLE}
        />
        <div className="absolute inset-0" aria-hidden />
      </div>
      <div
        className="relative z-10 mt-auto px-5 pb-6 pt-16"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.4) 50%, transparent 100%)" }}
      >
        <h3 className="line-clamp-1 font-rem text-xl font-extrabold text-white sm:text-2xl">
          {title}
        </h3>
      </div>
    </div>
  );
}

function PackageCardWithVideo({
  image,
  imageAlt,
  icon,
  title,
  destination,
  buttonLabel,
  isVideoExpanded,
  onExpand,
  onCollapse,
  onOpenModal,
}: PackageCardWithVideoProps) {
  return (
    <div className="relative h-full w-full max-w-[400px] select-none transition-transform duration-200 hover:-translate-y-1.5 active:scale-[0.98]">
      <CardPackage className="h-full w-full">
        <div className="relative shrink-0">
          <CardPackageImage src={image} alt={imageAlt} icon={icon} />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onExpand();
            }}
            className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-2 shadow-lg ring-2 ring-primary/40 transition-transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label="Ver video"
          >
            <span className="font-rem text-sm font-bold text-primary">Shot</span>
            <PlayIcon className="h-5 w-5 text-primary" />
          </button>
        </div>
        <CardPackageTitle>{title}</CardPackageTitle>
        <CardPackageDestination>{destination}</CardPackageDestination>
        <CardPackageAction>
          <ButtonBase
            size="small"
            className="font-rem font-medium !bg-primary !text-cream shadow-black !text-xl"
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              onOpenModal();
            }}
          >
            {buttonLabel}
          </ButtonBase>
        </CardPackageAction>
      </CardPackage>

      {isVideoExpanded && <PackageVideoOverlay title={title} onClose={onCollapse} />}
    </div>
  );
}

const titleReveal = {
  hidden: { opacity: 0, y: 48 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: easeOut },
  },
};

/**
 * Sección "Our Packages" con fondo fijo vía Motion.
 */
function PackageModalBody({ content }: { content: PackageModalContent }) {
  return (
    <div className="space-y-5">
      {content.imageUrl != null && (
        <div className="relative -mx-6 -mt-1 aspect-[16/9] w-[calc(100%+3rem)] overflow-hidden rounded-xl">
          <Image
            src={content.imageUrl}
            alt={content.imageAlt ?? content.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 896px"
          />
        </div>
      )}
      <p className="font-inter text-sm leading-relaxed text-primary-dark/90 md:text-base">
        {content.description}
      </p>
      <div className="rounded-xl bg-primary/5 p-4">
        <p className="mb-3 font-rem text-sm font-bold text-primary-dark">
          Duración: {content.duration} · Destino: {content.destination}
        </p>
        <PackageTimeline key={content.title} days={content.days} />
      </div>
    </div>
  );
}

export function OurPackagesSection() {
  const [packageModalSlug, setPackageModalSlug] = useState<string | null>(null);
  const [videoExpandedKey, setVideoExpandedKey] = useState<string | null>(null);
  const packageContent =
    packageModalSlug != null ? PACKAGE_CONTENT[packageModalSlug as keyof typeof PACKAGE_CONTENT] : null;

  return (
    <section id="packages" className="relative z-10 w-full overflow-hidden">
      <div className="relative z-10 min-h-[50svh] px-6 py-16 md:py-32 md:px-12 lg:px-20">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewportEarlier}
          variants={titleReveal}
          className="mb-16 md:mb-32"
        >
          <h2 className="text-center font-inter text-3xl font-extrabold text-white sm:text-4xl md:text-5xl lg:text-[64px]">
            Nuestros paquetes
          </h2>
        </motion.div>

        {/* Carrusel de paquetes: 1 en mobile, 2 en tablet+ */}
        <motion.div
          className="mx-auto max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={viewportEarlier}
          variants={titleReveal}
        >
          <div className="packages-swiper-wrapper relative px-2">
            <Swiper
              modules={[Pagination]}
              loop
              spaceBetween={40}
              slidesPerView={1}
              centeredSlides={false}
              breakpoints={{
                640: { slidesPerView: 2, centeredSlides: false },
                1024: { slidesPerView: 3, centeredSlides: true },
              }}
              pagination={{
                clickable: true,
                bulletClass: "packages-pagination-bullet",
                bulletActiveClass: "packages-pagination-bullet-active",
              }}
              className="packages-swiper !overflow-visible"
            >
              {OUR_PACKAGES.map(
                ({
                  image,
                  imageAlt,
                  icon,
                  title,
                  destination,
                  buttonLabel,
                  modalSlug,
                }) => (
                  <SwiperSlide key={title}>
                    <div className="flex justify-center pb-14 select-none">
                      <PackageCardWithVideo
                        image={image}
                        imageAlt={imageAlt}
                        icon={icon}
                        title={title}
                        destination={destination}
                        buttonLabel={buttonLabel}
                        isVideoExpanded={videoExpandedKey === title}
                        onExpand={() => setVideoExpandedKey(title)}
                        onCollapse={() => setVideoExpandedKey(null)}
                        onOpenModal={() => {
                          setPackageModalSlug(modalSlug);
                          setVideoExpandedKey(null);
                        }}
                      />
                    </div>
                  </SwiperSlide>
                )
              )}
            </Swiper>
          </div>
        </motion.div>
      </div>

      {packageContent != null && (
        <Modal
          open={packageModalSlug != null}
          onClose={() => setPackageModalSlug(null)}
          title={packageContent.title}
          size="xl"
        >
          <PackageModalBody content={packageContent} />
        </Modal>
      )}
    </section>
  );
}
