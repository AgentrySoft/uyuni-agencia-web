"use client";

import { useCallback, useState, useRef, useEffect } from "react";
import { motion } from "motion/react";
import { viewportEarlier } from "@/app/common/lib/motion-variants";
import styles from "./BoliviaRoutesMap.module.css";

/** Vista predefinida al seleccionar una ruta (pan en px, zoom 1 = 100%) */
const ROUTE_VIEW_PRESETS: Record<string, { panX: number; panY: number; zoom: number }> = {
  "Circuito Salar": { panX: -34.6484375, panY: 108.5234375, zoom: 1.75 },
  "Ruta Potosí": { panX: -113.87890625, panY: 205.45703125, zoom: 1.75 },
  "Ruta Lagunas (Sur)": { panX: 115.96875, panY: 50.8515625, zoom: 1.75 },
};

const ROUTE_OPTIONS: { label: string; ids: string[] }[] = [
  { label: "Circuito Salar", ids: ["r-salar-1", "r-salar-2", "r-salar-3", "r-salar-4"] },
  { label: "Ruta Potosí", ids: ["r-potosi"] },
  { label: "Ruta Lagunas (Sur)", ids: ["r-sur-1", "r-sur-2"] },
];

/** Puntos de parada: (cx, cy) del mapa + label según referencia por color (Untitled-4) */
const STOP_POINTS: { id: string; x: number; y: number; label: string }[] = [
  { id: "isla-del-pescado", x: 235, y: 229, label: "Isla del Pescado" },
  { id: "hotel-de-sal", x: 371, y: 251, label: "Hotel de Sal" },
  { id: "colchani", x: 447, y: 270, label: "Colchani" },
  { id: "uyuni", x: 482, y: 332, label: "Uyuni" },
  { id: "potosi", x: 684, y: 70, label: "Potosí" },
  { id: "cementerio-trenes", x: 509, y: 393, label: "Cementerio de Trenes" },
  { id: "atocha", x: 593, y: 417, label: "Atocha" },
  { id: "galaxias", x: 249, y: 371, label: "Galaxias" },
  { id: "volcan-tomasamil", x: 219, y: 490, label: "Volcán Tomasamil" },
  { id: "volcan-choquella", x: 238, y: 542, label: "Volcán Choquella" },
  { id: "arbol-de-piedra", x: 238, y: 631, label: "Árbol de Piedra" },
  { id: "laguna-colorada", x: 241, y: 693, label: "Laguna Colorada" },
];

/** Pin de ubicación (Untitled-6): viewBox 0 0 24 30, punta abajo en (12, 30) */
function MapPinIcon({ className }: { className?: string }) {
  return (
    <path
      className={className}
      d="M11.667 1C14.4931 1.00008 16.9692 1.98064 19.1367 3.97949C21.2467 5.92549 22.3329 8.54773 22.333 11.958C22.333 14.1213 21.4718 16.5712 19.6064 19.3281C17.8486 21.9261 15.2116 24.7655 11.666 27.8467C8.1207 24.7657 5.48431 21.926 3.72656 19.3281C1.86122 16.5712 1 14.1213 1 11.958C1.00007 8.54773 2.0863 5.92549 4.19629 3.97949C6.36389 1.98046 8.84072 1 11.667 1ZM11.667 7.75C10.5976 7.75 9.65663 8.14219 8.89941 8.89941C8.14219 9.65663 7.75 10.5976 7.75 11.667C7.75008 12.7362 8.14238 13.6765 8.89941 14.4336C9.65664 15.1908 10.5976 15.583 11.667 15.583C12.7363 15.5829 13.6764 15.1907 14.4336 14.4336C15.1907 13.6764 15.5829 12.7363 15.583 11.667C15.583 10.5976 15.1908 9.65664 14.4336 8.89941C13.6765 8.14238 12.7362 7.75008 11.667 7.75Z"
      fill="#EDDFBB"
      stroke="#4C0415"
      strokeWidth={2}
    />
  );
}

const ZOOM_MIN = 1;
const ZOOM_MAX = 2.5;
const ZOOM_STEP = 0.25;

const easeOut = [0.22, 1, 0.36, 1] as const;
const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeOut },
  },
};

export function BoliviaRoutesMap() {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef<{ x: number; y: number; panX: number; panY: number } | null>(null);
  const zoomRef = useRef(zoom);

  useEffect(() => {
    zoomRef.current = zoom;
  }, [zoom]);

  const zoomIn = useCallback(() => {
    setZoom((z) => Math.min(ZOOM_MAX, z + ZOOM_STEP));
  }, []);
  const zoomOut = useCallback(() => {
    setZoom((z) => Math.max(ZOOM_MIN, z - ZOOM_STEP));
  }, []);
  const resetZoom = useCallback(() => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  }, []);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    const current = zoomRef.current;
    const delta = e.deltaY > 0 ? -ZOOM_STEP : ZOOM_STEP;
    let next = current + delta;
    if (next < ZOOM_MIN) next = ZOOM_MIN;
    if (next > ZOOM_MAX) next = ZOOM_MAX;
    setZoom(next);
  }, []);

  const viewportRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [handleWheel]);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    setIsDragging(true);
    viewportRef.current?.setPointerCapture(e.pointerId);
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      panX: pan.x,
      panY: pan.y,
    };
  }, [pan.x, pan.y]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (dragStart.current == null) return;
    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    setPan({
      x: dragStart.current.panX + dx,
      y: dragStart.current.panY + dy,
    });
  }, []);

  const handlePointerUp = useCallback((e: React.PointerEvent) => {
    if (e.button !== 0) return;
    dragStart.current = null;
    setIsDragging(false);
    viewportRef.current?.releasePointerCapture(e.pointerId);
  }, []);

  const activarRuta = useCallback((listaIds: string[], label: string) => {
    return (e?: React.MouseEvent) => {
      const pathElements = document.querySelectorAll(`[data-ruta-id]`);
      pathElements.forEach((el) => {
        const id = el.getAttribute("data-ruta-id");
        const isActive = id != null && listaIds.includes(id);
        el.classList.remove(styles.rutaActiva);
        if (isActive) el.classList.add(styles.rutaActiva);
      });

      document.querySelectorAll(`[data-map-btn]`).forEach((b) => b.classList.remove(styles.active));
      const target = e?.currentTarget;
      if (target && listaIds.length > 0 && target instanceof HTMLElement) {
        target.classList.add(styles.active);
      }

      const view = ROUTE_VIEW_PRESETS[label];
      if (view) {
        setPan({ x: view.panX, y: view.panY });
        const zoomClamped = Math.max(ZOOM_MIN, Math.min(ZOOM_MAX, view.zoom));
        setZoom(zoomClamped);
      }
    };
  }, []);

  const pathClassName = () => styles.rutaEstatica;

  return (
    <motion.div
      className="w-full px-6 pb-16 md:px-12 lg:px-20"
      initial="hidden"
      whileInView="visible"
      viewport={viewportEarlier}
      variants={revealVariants}
    >
      <div className={styles.wrapper}>
        <div className={styles.sidebarPanel}>
          <h3 className={styles.sidebarTitle}>Rutas del Salar</h3>
          <div className={styles.sidebar}>
            {ROUTE_OPTIONS.map(({ label, ids }) => (
              <button
                key={label}
                type="button"
                className={styles.btn}
                data-map-btn
                onClick={activarRuta(ids, label)}
              >
                {label}
              </button>
            ))}
            <button
              type="button"
              className={`${styles.btn} ${styles.btnClear}`}
              data-map-btn
              onClick={activarRuta([], "")}
            >
              Limpiar
            </button>
          </div>
        </div>
        <div className={styles.mapPanel}>
          <div className={styles.mapContainer}>
            <div className={styles.zoomControls}>
              <div className={styles.zoomIndicator}>
                <div
                  className={styles.zoomIndicatorBar}
                  style={{
                    width: `${((zoom - ZOOM_MIN) / (ZOOM_MAX - ZOOM_MIN)) * 100}%`,
                  }}
                />
              </div>
              <span className={styles.zoomLevel} aria-live="polite">
                {Math.round(zoom * 100)}%
              </span>
              <span className={styles.zoomRange}>
                {Math.round(ZOOM_MIN * 100)}–{Math.round(ZOOM_MAX * 100)}%
              </span>
              <button
                type="button"
                className={styles.zoomBtn}
                onClick={zoomIn}
                disabled={zoom >= ZOOM_MAX}
                aria-label="Acercar"
              >
                +
              </button>
              <button
                type="button"
                className={styles.zoomBtn}
                onClick={zoomOut}
                disabled={zoom <= ZOOM_MIN}
                aria-label="Alejar"
              >
                −
              </button>
              <button
                type="button"
                className={styles.zoomBtnReset}
                onClick={resetZoom}
                aria-label="Restablecer zoom"
                title="Restablecer zoom"
              >
                ⟲
              </button>
            </div>
            <div
              ref={viewportRef}
              className={styles.mapViewport}
              role="application"
              aria-label="Mapa. Arrastre para mover, rueda del ratón o botones para zoom."
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerLeave={() => {
                if (dragStart.current != null) {
                  dragStart.current = null;
                  setIsDragging(false);
                }
              }}
            >
              <div
                className={`${styles.mapTransform} ${isDragging ? styles.mapTransformDragging : ""}`}
                style={{
                  transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
                }}
              >
                <svg
                  width="806"
                  height="821"
                  viewBox="0 0 806 821"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.mapSvg}
                >
              <mask id="mask0_2120_363" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="0" y="0" width="806" height="821">
                <rect width="806" height="821" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_2120_363)">
                <rect width="806" height="821" fill="#D9D9D9" />

                <path d="M105.5 100.5C104.7 78.5 60.1667 44.6667 38 30.5L12 0H674.5H806V132.5V683C796.167 691.667 771.6 710.2 752 715C727.5 721 658.5 656.5 644 646.5C629.5 636.5 620.5 648 611.5 683C602.5 718 522.5 753 502.5 759C482.5 765 480.5 804.5 464.5 821H248.5C240 795 248.5 760 248.5 745.5C248.5 733.9 223.167 699 210.5 683C192 616.833 154.1 480.7 150.5 465.5C146 446.5 117 437.5 105.5 423C94 408.5 105.5 395.5 105.5 376.5C105.5 357.5 54 359 54 343C54 327 63 319.5 71.5 308C80 296.5 47 274 54 262.5C61 251 105.5 252.5 105.5 239C105.5 225.5 76 195.5 71.5 176.5C67 157.5 106.5 128 105.5 100.5Z" fill="#B8B4B4" />

                <path d="M241.5 689.5C241.5 692.7 235.833 693.167 233 693C232.333 693 231 693.6 231 696C231 699 233 699 238.5 701.5C244 704 243.5 704 247.5 704C251.5 704 259.5 706.5 264.5 709.5C269.5 712.5 277.5 711.5 282.5 712.5C287.5 713.5 292.5 711.5 296 709.5C299.5 707.5 305.5 706.5 309.5 704C313.5 701.5 323.5 703 325.5 701.5C327.5 700 327.5 693 325.5 691.5C323.5 690 318 689.5 315.5 686C313 682.5 317 678.5 315.5 676.5C314 674.5 314 675 309.5 676.5C305 678 303.5 676.5 301 676.5C298.5 676.5 294.5 676.5 292.5 675C290.5 673.5 288.5 673.5 284.5 673.5H284.5C280.5 673.5 279.5 676.5 277.5 676.5C275.5 676.5 273.5 673.5 272.5 673.5C271.5 673.5 264.5 670.5 259.5 670C254.5 669.5 251 673.5 247.5 673.5H240C238.8 673.5 238.5 676.833 238.5 678.5C239.5 680.833 241.5 686.3 241.5 689.5Z" fill="#E8CED5" />

                <path d="M155 143.5C152.6 146.7 144 149.167 140 150C138.667 151.333 135.9 154.7 135.5 157.5C135 161 137.5 163 137 165.5C136.5 168 135.5 170 132 171C128.5 172 124.5 176.5 123.5 179C122.5 181.5 123.5 185.5 120 187.5C116.5 189.5 115 192 119 194C123 196 125.5 197 126 199C126.5 201 120 204 117 205.5C114 207 121 214.5 122 217C123 219.5 119 217 117 219C115 221 119 222 120 224C121 226 118 228.5 120 232C122 235.5 129 236 129.5 238C130 240 126 243 123.5 244.5C121 246 117.5 243.5 115 244.5C112.5 245.5 114 250.5 115 252.5C116 254.5 114.5 256.5 111.5 260.5C108.5 264.5 110 270 109.5 273C109 276 106.5 278.5 103 280.5C99.5 282.5 102 288 101.5 292.5C101 297 99.5 298.5 99.5 303C99.5 307.5 102 307.5 105 308.5C108 309.5 106.5 311 106.5 315C106.5 319 107.5 337.5 110.5 341C113.5 344.5 117 344 120.5 344C124 344 124 340 128.5 340C133 340 137.5 343 143 344C148.5 345 155 344 158.5 338.5C162 333 157 326.5 155 325C153 323.5 145 325 141.5 323C138 321 141.5 316.5 145 316C148.5 315.5 150.5 315.5 153 312.5C155.5 309.5 162 310.5 164.5 310C167 309.5 164.5 301.5 164.5 300C164.5 298.5 163.5 291.5 166 290.5C168.5 289.5 165.5 281 166 278.5C166.5 276 170.5 275.5 172 275.5C173.5 275.5 172 270.5 172 268C172 265.5 174.5 263 176.5 264C178.5 265 180.5 267 182.5 266C184.5 265 183 260 185 260.5C187 261 188.5 269 190.5 272C192.5 275 189.5 278.5 188.5 283C187.5 287.5 194.5 292.5 196 293.5C197.2 294.3 198.833 303.167 199.5 307.5C200 311.5 200.7 320 199.5 322C198 324.5 193.5 324 192 325C190.5 326 193 335.5 194.5 336.5C196 337.5 199.5 339.5 206 340C212.5 340.5 209 344 208.5 346.5C208 349 203.5 351.5 199.5 351C195.5 350.5 188 346.5 188.5 344C189 341.5 185.5 330.5 185 328.5C184.5 326.5 179.5 324 178 325C176.5 326 178 327 179.5 328.5C181 330 181 340 180.5 342C180 344 176.5 345 174.5 346.5C172.5 348 174.5 360.5 174.5 364C174.5 367.5 178 372.5 178 374.5C178 376.5 173.5 376.5 167.5 377C161.5 377.5 168.5 381.5 169 383.5C169.5 385.5 169.5 389 165.5 391C161.5 393 156 388.5 154.5 389C153 389.5 153 391 153 396.5C153 402 157.5 402.5 159.5 404.5C161.5 406.5 159 407 158.5 409C158 411 164.5 417 167.5 420C170.5 423 175 422.5 176.5 421C178 419.5 175.5 417 173.5 414.5C171.5 412 173.5 406.5 172.5 404.5C171.5 402.5 172.5 397 173.5 395C174.5 393 180.5 391.5 183.5 391C186.5 390.5 189.5 383.5 192 380C194.5 376.5 199 371 202 368.5C205 366 205.5 359 206 356C206.5 353 211 350.5 213 349.5C215 348.5 221 343.5 220 342C219 340.5 216.5 339 217.5 336.5C218.5 334 223 334.5 226 333C229 331.5 227 328.5 227.5 324C228 319.5 232 318.5 236.5 318C241 317.5 247.5 327 249.5 330.5C251.5 334 270.5 359 273 360.5C275.5 362 286 372.5 287 375.5C288 378.5 293.5 381 297.5 381.5C301.5 382 309.5 382.5 310.5 384.5C311.5 386.5 321.5 389 324.5 389.5C327.5 390 329.5 386.5 331 386C332.5 385.5 336 379.5 338 378C340 376.5 341 375.5 343.5 372.5C346 369.5 343.5 366.5 344.5 364.5C345.5 362.5 350 363 353 361.5C356 360 355 354.5 356.5 352.5C358 350.5 362.5 352.5 363.5 350.5C364.5 348.5 371 347 372 348C373 349 377.5 353 380 352.5C382.5 352 381 348 384 347C387 346 388 346.5 388.5 348C389 349.5 391 354 393.5 354.5C396 355 395 346.5 395 345.5C395 344.5 391.5 341.5 393.5 338C395.5 334.5 401 339.5 403 338C405 336.5 406.5 337.5 410.5 334.5C414.5 331.5 408.5 324 406.5 322.5C404.5 321 406 313.5 408.5 315.5C411 317.5 418 317.5 418 315.5C418 313.5 418 309 423 309C428 309 431.5 316.5 436 315.5C440.5 314.5 436 312.5 436 309C436 305.5 439.5 299.5 440 294C440.5 288.5 437 289.5 433.5 290.5C430 291.5 422 285.5 418 282.5C414 279.5 410.5 265 408.5 261.5C406.5 258 399.5 260.5 389.5 259.5C379.5 258.5 374 234.5 374 230.5C374 226.5 381 225.5 385 223.5C389 221.5 390.5 199 389.5 194.5C388.5 190 383.5 193 379 191C374.5 189 374 176.5 371.5 173C369 169.5 374 168.5 374 166C374 163.5 371.5 164 369.5 163C367.5 162 373 157.5 374 154C375 150.5 367 148 368 143.5C369 139 366.5 135.5 364.5 131.5C362.5 127.5 364 118 364 115.5C364 113 363 107 360 107C357 107 355.5 115.5 353.5 118C351.5 120.5 338.5 118 335.5 115.5C332.5 113 326.5 118 322 118C317.5 118 318.5 114.5 317.5 111C316.5 107.5 313.5 107 310.5 103.5C307.5 100 306.5 92.5001 304 86C301.5 79.5 295.5 84 296 86C296.5 88 296.5 94.5001 293 92.5001C289.5 90.5001 289 91.5001 285.5 92.5001C282 93.5001 285.5 100.5 286.5 103.5C287.5 106.5 276 104 272.5 105C269 106 271.5 110 268.5 112.5C265.5 115 258.5 112.5 253 112.5C247.5 112.5 250 116 247.5 121C245 126 250 127.5 253 130C256 132.5 250 139 247.5 139C245.5 139 248.333 145 250 148C251.833 148 256.6 148.4 261 150C265.4 151.6 262.833 155.667 261 157.5L264 161C264.167 159.833 265.3 156.8 268.5 154C272.5 150.5 279 157.5 283.5 157.5C288 157.5 286 174.5 285.5 176.5C285 178.5 279 179 276 176.5C273 174 264.5 176.5 258.5 181C252.5 185.5 244.5 176.5 241.5 176.5C238.5 176.5 236 181.5 230 181C224 180.5 229 165 227 161C225 157 220 157.5 212.5 161C205 164.5 201.5 150 197 148C192.5 146 188.5 147 188 150C187.5 153 181.5 159.5 179 161C176.5 162.5 174 158.5 172 157.5C170 156.5 171.5 151.5 170 150C168.5 148.5 167 143.5 166.5 143.5C166 143.5 166 138.5 161.5 135.5C157 132.5 158 139.5 155 143.5Z" fill="#D6D6D6" />

                <path id="r-salar-1" data-ruta-id="r-salar-1" className={pathClassName()} stroke="#EDDFBB" d="M483 334.5C480.833 336 477.8 344.8 483 360C489.5 379 502.5 392 509.5 394C516.5 396 553.5 385 561 389.5C568.5 394 584.5 392.5 589 400.5C592.6 406.9 597.833 415.167 600 418.5" />
                <path id="r-salar-2" data-ruta-id="r-salar-2" className={pathClassName()} stroke="#EDDFBB" d="M447 270C444.167 273 439 281.2 441 290C443 298.8 456.833 317.333 463.5 325.5L478.5 338.5" />
                <path id="r-salar-3" data-ruta-id="r-salar-3" className={pathClassName()} stroke="#EDDFBB" d="M445 272C442.5 269 436 266.3 422 267.5C408 268.7 392.5 264.333 386.5 262L372 251" />
                <path id="r-salar-4" data-ruta-id="r-salar-4" className={pathClassName()} stroke="#EDDFBB" d="M370.5 249.5C368 246.167 359.1 238.5 351.5 234.5C342 229.5 330.5 221.5 321.5 222C312.5 222.5 298 222 289.5 222C281 222 241 226.5 237 229" />
                <path id="r-potosi" data-ruta-id="r-potosi" className={pathClassName()} stroke="#EDDFBB" d="M484 334C489.667 331.5 507.1 323.7 525.5 314.5C543.9 305.3 555.5 294.667 559 290.5C565.833 282.833 581.4 265.4 589 257C598.5 246.5 606 248 608 240C610 232 609 210.5 617.5 204.5C626 198.5 649.5 174.5 656 168C662.5 161.5 665.5 135 665.5 128.5C665.5 122 669.5 93 676 86.5C681.2 81.3 683.167 71.6667 683.5 67.5" />
                <path id="r-sur-1" data-ruta-id="r-sur-1" className={pathClassName()} stroke="#EDDFBB" d="M237 229C237.333 233.667 238.5 244.3 240.5 251.5C243 260.5 241.5 272.5 251.5 277C261.5 281.5 272 272.5 272.5 280C273 287.5 264 299.5 259.5 302.5C255 305.5 247.5 314.5 248 322C248.5 329.5 259.5 340.5 259.5 343C259.5 345.5 271 351 269 356C267 361 255 365.5 251.5 366.5" />
                <path id="r-sur-2" data-ruta-id="r-sur-2" className={pathClassName()} stroke="#EDDFBB" d="M251 367C250 374.167 249.1 396 257.5 402C268 409.5 282 410 279 423.5C276 437 259.5 459 247 459C234.5 459 218.5 460 215.5 470C213.1 478 216.833 488 219 492C224.333 501.5 236.1 520.4 236.5 526C236.9 531.6 238.333 540.667 239 544.5C236.5 561 232 596.3 234 605.5C236 614.7 238.167 626.667 239 631.5C239 643 238.5 667.5 236.5 673.5C234.5 679.5 237.333 692.333 239 698" />

                {STOP_POINTS.map(({ id, x, y, label }) => (
                  <g
                    key={id}
                    id={id}
                    className={styles.stopPoint}
                    transform={`translate(${x}, ${y})`}
                  >
                    <g transform="scale(0.7)">
                      <MapPinIcon className={styles.stopPin} />
                    </g>
                    <text className={styles.stopLabel} x="10" y="-8" textAnchor="start">
                      {label}
                    </text>
                  </g>
                ))}
              </g>
            </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
