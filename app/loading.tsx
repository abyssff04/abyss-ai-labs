/**
 * app/loading.tsx
 *
 * Next.js App Router automatically shows this component while a page or
 * layout is loading (e.g., during navigation or data-fetching suspense).
 * Matches the Abyss AI Labs aesthetic.
 */
export default function Loading() {
  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center gap-6"
      style={{ background: 'var(--background)' }}
      aria-label="Loading page"
      role="status"
    >
      {/* Animated logo mark */}
      <div className="relative">
        {/* Outer rotating ring */}
        <div
          className="w-14 h-14 rounded-full border-2 border-t-transparent animate-spin"
          style={{ borderColor: 'var(--border-strong)', borderTopColor: 'var(--neon)' }}
          aria-hidden="true"
        />
        {/* Inner pulsing dot */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden="true"
        >
          <div
            className="w-4 h-4 rounded-full animate-pulse"
            style={{
              background: 'var(--neon)',
              boxShadow: '0 0 12px var(--neon-glow)',
            }}
          />
        </div>
      </div>

      {/* Label */}
      <div className="flex flex-col items-center gap-1">
        <span
          className="font-display text-xs font-bold tracking-[0.3em] uppercase"
          style={{ color: 'var(--neon)' }}
        >
          ABYSS AI LABS
        </span>
        <span
          className="font-mono text-xs"
          style={{ color: 'var(--text-muted)' }}
        >
          Initializing...
        </span>
      </div>

      {/* Skeleton shimmer bars — represent content loading */}
      <div className="w-64 space-y-2 mt-2" aria-hidden="true">
        {[100, 80, 90].map((w, i) => (
          <div
            key={i}
            className="h-1.5 rounded-full overflow-hidden"
            style={{ background: 'var(--surface)', width: `${w}%` }}
          >
            <div
              className="h-full rounded-full"
              style={{
                background: `linear-gradient(90deg, transparent 0%, var(--neon-glow) 50%, transparent 100%)`,
                backgroundSize: '200% 100%',
                animation: `shimmer 1.5s linear infinite ${i * 0.2}s`,
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
