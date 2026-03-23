export default function SkeletonLoader() {
  return (
    <div className="bg-surface border border-border p-6 mb-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-border" />
          <div className="w-20 h-3 bg-border" />
        </div>
        <div className="w-16 h-3 bg-border" />
      </div>
      <div className="w-3/4 h-5 bg-border mb-3" />
      <div className="w-full h-4 bg-border mb-2" />
      <div className="w-full h-4 bg-border mb-2" />
      <div className="w-2/3 h-4 bg-border" />
    </div>
  );
}
