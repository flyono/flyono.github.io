interface Props {
  items: string[];
}

export function TechStack({ items }: Props) {
  return (
    <section className="space-y-4 animate-fade-in-up delay-350">
      <h2 className="font-serif text-lg text-stone-800 dark:text-stone-200 text-center">
        工具箱
      </h2>
      <div className="flex flex-wrap justify-center gap-2">
        {items.map((tech) => (
          <TechBadge key={tech} label={tech} />
        ))}
      </div>
    </section>
  );
}

function TechBadge({ label }: { label: string }) {
  return (
    <span className="text-xs px-3 py-1.5 rounded-full border border-stone-200 dark:border-stone-800 text-stone-500 dark:text-stone-400 bg-stone-50 dark:bg-stone-900/50">
      {label}
    </span>
  );
}
