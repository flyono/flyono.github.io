import { GitFork, Globe, Mail } from 'lucide-react';

import type { NavLink, Post } from './_components/types';
import { Divider } from './_components/divider';
import { Hero } from './_components/hero';
import { NavLinks } from './_components/nav-links';
import { RecentPosts } from './_components/recent-posts';
import { TechStack } from './_components/tech-stack';

const recentPosts: Post[] = [
  { title: '使用 Next.js 构建现代博客', date: '05-20', href: '/blogs' },
  { title: 'Fumadocs 入门指南', date: '05-18', href: '/blogs' },
  { title: 'Tailwind CSS 最佳实践', date: '05-15', href: '/blogs' },
];

const techStack = ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Godot'];

const links: NavLink[] = [
  { icon: GitFork, href: 'https://github.com/flyono', label: 'GitHub' },
  { icon: Globe, href: 'https://flyono.dev', label: 'Website' },
  { icon: Mail, href: 'mailto:hi@flyono.dev', label: 'Email' },
];

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col items-center px-6 py-20 md:py-28">
      <div className="w-full max-w-xl space-y-20">
        <Hero />
        <Divider />
        <RecentPosts posts={recentPosts} />
        <TechStack items={techStack} />
        <Divider />
        <NavLinks links={links} />
      </div>
    </div>
  );
}
