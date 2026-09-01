/** Fixed film-grain plate. Cheap: one repeating bitmap, transform-only jitter. */
export function Grain() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-[-12%] z-[95] opacity-[0.055] mix-blend-overlay"
    >
      <div className="grain-layer grain-anim h-full w-full" />
    </div>
  )
}
