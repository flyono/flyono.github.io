import type { NavLink } from './types';

interface Props {
  links: NavLink[];
}

export function NavLinks({ links }: Props) {
  return (
    <section className="flex justify-center gap-3 animate-fade-in-up delay-550">
      {links.map(({ icon: Icon, href, label }) => (
        <LinkIcon key={label} href={href} label={label} icon={Icon} />
      ))}
    </section>
  );
}

function LinkIcon({ href, label, icon: Icon }: NavLink) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="w-9 h-9 flex items-center justify-center rounded-full border border-stone-200 dark:border-stone-800 text-stone-400 dark:text-stone-500 hover:text-stone-900 hover:border-stone-400 dark:hover:text-stone-100 dark:hover:border-stone-600 transition-all duration-200"
      aria-label={label}
    >
      <Icon className="w-4 h-4" />
    </a>
  );
}
