import { LoaderCircle } from "lucide-react";

export function FlightSearchSkeleton() {
  return (
    <section className="space-y-4" aria-live="polite" aria-label="Searching for flights">
      <div className="flex items-center gap-3 rounded-2xl bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-600">
        <LoaderCircle className="h-4 w-4 animate-spin text-cyan-700" />
        Flight360 is searching live fares and matching the best options…
      </div>

      <div className="space-y-3">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="overflow-hidden rounded-[26px] border border-slate-200 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="animate-pulse">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-2xl bg-slate-200" />
                  <div className="space-y-2">
                    <div className="h-4 w-28 rounded bg-slate-200" />
                    <div className="h-3 w-16 rounded bg-slate-100" />
                  </div>
                </div>
                <div className="space-y-2 text-right">
                  <div className="ml-auto h-5 w-20 rounded bg-slate-200" />
                  <div className="ml-auto h-3 w-12 rounded bg-slate-100" />
                </div>
              </div>

              <div className="mt-7 grid grid-cols-[auto_1fr_auto] items-center gap-4">
                <div className="space-y-2">
                  <div className="h-7 w-16 rounded bg-slate-200" />
                  <div className="h-3 w-10 rounded bg-slate-100" />
                </div>
                <div className="space-y-3">
                  <div className="mx-auto h-3 w-14 rounded bg-slate-100" />
                  <div className="h-px w-full bg-slate-200" />
                  <div className="mx-auto h-3 w-12 rounded bg-slate-100" />
                </div>
                <div className="space-y-2 text-right">
                  <div className="ml-auto h-7 w-16 rounded bg-slate-200" />
                  <div className="ml-auto h-3 w-10 rounded bg-slate-100" />
                </div>
              </div>

              <div className="mt-6 flex gap-2 border-t border-slate-100 pt-4">
                <div className="h-8 w-24 rounded-full bg-slate-100" />
                <div className="h-8 w-28 rounded-full bg-slate-100" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
