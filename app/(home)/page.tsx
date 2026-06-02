import { GitFork, Globe, Mail } from 'lucide-react';

import type { NavLink } from './_components/types';
import { Divider } from './_components/divider';
import { Hero } from './_components/hero';
import { NavLinks } from './_components/nav-links';
import { RecentPosts } from './_components/recent-posts';
import { TechStack } from './_components/tech-stack';
import { source } from '@/lib/source';
import { docsRoute } from '@/lib/shared';

const techStack = ['Godot', 'Java', 'C#', 'Shader', 'React'];

const links: NavLink[] = [
  { icon: GitFork, href: 'https://github.com/flyono', label: 'GitHub' },
  { icon: Globe, href: 'https://flyono.github.io', label: 'Website' },
  { icon: Mail, href: 'mailto:hi@1508948470@qq.com', label: 'Email' },
];

function getRecentPosts() {
  const pages = source.getPages();

  return pages
    .map((page) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const data = page.data as any;
      return {
        title: data.title as string,
        created: data.created as string | undefined,
        url: page.url,
      };
    })
    .filter((p) => p.created)
    .sort((a, b) => new Date(b.created!).getTime() - new Date(a.created!).getTime())
    .slice(0, 3)
    .map((p) => ({
      title: p.title,
      date: new Date(p.created!).toLocaleDateString('zh-CN', { month: '2-digit', day: '2-digit' }),
      href: p.url,
    }));
}

export default function HomePage() {
  const recentPosts = getRecentPosts();

  return (
    <div className="flex-1 flex flex-col items-center px-6 py-20 md:py-28">
      <div className="w-full max-w-xl space-y-20">
        <Hero />
        <Divider />
        <RecentPosts posts={recentPosts} viewAllHref={docsRoute} />
        <TechStack items={techStack} />
        <Divider />
        <NavLinks links={links} />
      </div>
    </div>
  );
}
