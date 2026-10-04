import type { Status } from "@/lib/products";

export default function StatusPill({ status, color }: { status: Status; color: string }) {
  const live = status === "Live";
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-paper px-2.5 py-1 text-xs font-semibold text-slate shadow-[0_0_0_1px_var(--color-rule)]">
      <span className="relative flex h-2 w-2">
        {live && <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ background: color }} />}
        <span
          className="relative inline-flex h-2 w-2 rounded-full"
          style={live ? { background: color } : { boxShadow: `inset 0 0 0 1.5px ${color}` }}
        />
      </span>
      {status}
    </span>
  );
}
