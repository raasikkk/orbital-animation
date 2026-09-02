/** Fixed film-grain plate. One repeating bitmap, transform-only jitter. */
export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-[-12%] z-50 opacity-[0.04] mix-blend-overlay"
    >
      <div className="grain-layer grain-anim h-full w-full" />
    </div>
  )
}
