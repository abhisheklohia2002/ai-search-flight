export function ThinkingIndicator() {
  return (
    <div className="flex items-center gap-3" aria-live="polite">
      <div className="rounded-3xl rounded-bl-lg border border-slate-200 bg-white px-5 py-4 shadow-sm">
        <div className="flex gap-1.5" aria-label="Flight360 is thinking">
          {[0, 1, 2].map((item) => (
            <span
              key={item}
              className="h-2 w-2 animate-bounce rounded-full bg-slate-400"
              style={{ animationDelay: `${item * 120}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
