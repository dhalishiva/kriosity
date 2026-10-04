export default function Prose({ children }: { children: React.ReactNode }) {
  return (
    <div className="wrap pb-24">
      <div className="measure space-y-5 text-lg leading-relaxed text-slate [&_h2]:mt-12 [&_h2]:text-3xl [&_h2]:text-ink [&_a]:text-ink [&_a]:underline [&_strong]:text-ink">
        {children}
      </div>
    </div>
  );
}
