export default function SkeletonLoader() {
  return (
    <div className="pixel-panel mb-6 animate-pulse bg-surface p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 bg-border/80" />
          <div className="h-3 w-20 bg-border/80" />
        </div>
        <div className="h-3 w-16 bg-border/80" />
      </div>
      <div className="mb-3 h-5 w-3/4 bg-border/80" />
      <div className="mb-2 h-4 w-full bg-border/80" />
      <div className="mb-2 h-4 w-full bg-border/80" />
      <div className="h-4 w-2/3 bg-border/80" />
    </div>
  );
}
