import { baseOptions } from '@/lib/layout.shared';
import { source } from '@/lib/source';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import type { LayoutTab } from 'fumadocs-ui/layouts/shared';
import { Component } from 'lucide-react';
import { GodotIcon } from '@/components/icons';

const docsTabs: LayoutTab[] = [
  {
    title: 'Godot 笔记',
    description: 'Godot\'s Docs',
    url: '/docs/godot',
    icon: <GodotIcon strokeWidth={1} />,
  },
  {
    title: 'Unity',
    description: 'Unity 学习相关文档',
    url: '/docs/unity',
    icon: <Component />,
  }
];

export default function Layout({ children }: LayoutProps<'/docs'>) {
  return (
    <DocsLayout tree={source.getPageTree()} tabs={docsTabs} tabMode="auto" {...baseOptions()}>
      {children}
    </DocsLayout>
  );
}
