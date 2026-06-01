import type { ComponentType } from 'react';

export interface Post {
  title: string;
  date: string;
  href: string;
}

export interface NavLink {
  icon: ComponentType<{ className?: string }>;
  href: string;
  label: string;
}
