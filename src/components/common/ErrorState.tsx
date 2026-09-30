import { AlertCircle, RotateCcw } from "lucide-react";

export function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-rose-200 bg-rose-50 p-5 text-rose-900 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-3">
        <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="font-extrabold">We couldn't complete that search.</p>
          <p className="mt-1 text-sm text-rose-800">{message}</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onRetry}
        className="inline-flex h-11 items-center justify-center gap-2 rounded-2xl bg-rose-900 px-4 text-sm font-bold text-white"
      >
        <RotateCcw className="h-4 w-4" />
        Retry
      </button>
    </div>
  );
}
