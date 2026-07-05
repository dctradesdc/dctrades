// app/dashboard/loading.tsx  OR  app/analysis/loading.tsx
export default function Loading() {
  return (
    <div className="mx-auto w-full max-w-[120rem] space-y-8 p-4 sm:p-6 lg:p-8 2xl:p-12 animate-pulse">
      
      {/* Header Skeleton */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
        <div className="space-y-2 flex-1">
          <div className="h-8 w-48 rounded-lg bg-muted/60" />
          <div className="h-4 w-64 rounded-md bg-muted/40" />
        </div>
        <div className="h-10 w-36 rounded-xl bg-muted/60 shrink-0" />
      </div>

      {/* Progress Card Banner Skeleton */}
      <div className="h-24 w-full rounded-2xl bg-muted/40" />

      {/* Grid Track Skeletons */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6 2xl:gap-8">
        {[...Array(4)].map((_, i) => (
          <div 
            key={i} 
            className="h-28 rounded-2xl border bg-card/50 p-4 sm:p-6 flex flex-col justify-between"
          >
            <div className="h-4 w-16 rounded bg-muted/50" />
            <div className="h-8 w-24 rounded-md bg-muted/70 mt-2" />
          </div>
        ))}
      </div>

      {/* Big Chart Skeletons */}
      <div className="grid gap-6 xl:grid-cols-2">
        <div className="h-96 rounded-2xl border bg-card/30 p-6 space-y-4">
          <div className="h-5 w-32 rounded bg-muted/60" />
          <div className="h-full w-full bg-muted/20 rounded-xl" />
        </div>
        <div className="h-96 rounded-2xl border bg-card/30 p-6 space-y-4">
          <div className="h-5 w-32 rounded bg-muted/60" />
          <div className="h-full w-full bg-muted/20 rounded-xl" />
        </div>
      </div>

    </div>
  );
}