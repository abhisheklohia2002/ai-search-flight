import { SearchX } from "lucide-react";

export function EmptyState({ message = "No results found for this search." }: { message?: string }) {
  return (
    <div className="grid min-h-40 place-items-center rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-center">
      <div>
        <SearchX className="mx-auto h-6 w-6 text-slate-400" />
        <p className="mt-3 text-sm font-semibold text-slate-500">{message}</p>
      </div>
    </div>
  );
}
