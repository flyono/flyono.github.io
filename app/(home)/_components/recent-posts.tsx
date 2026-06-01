import { ArrowRight } from 'lucide-react';
import type { Post } from './types';

interface Props {
  posts: Post[];
  viewAllHref?: string;
}

export function RecentPosts({ posts, viewAllHref }: Props) {
  return (
    <section className="space-y-4 animate-fade-in-up delay-250">
      <h2 className="font-serif text-lg text-stone-800 dark:text-stone-200 text-center">
        近期的文章
      </h2>
      <ul className="space-y-0.5">
        {posts.map((post) => (
          <PostItem key={post.title} post={post} />
        ))}
      </ul>
      {viewAllHref && (
        <div className="flex justify-center pt-2">
          <a
            href={viewAllHref}
            className="group inline-flex items-center gap-1.5 text-xs text-stone-400 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 transition-colors duration-200"
          >
            查看全部文档
            <ArrowRight className="w-3 h-3 transition-transform duration-200 group-hover:translate-x-0.5" />
          </a>
        </div>
      )}
    </section>
  );
}

function PostItem({ post }: { post: Post }) {
  return (
    <li>
      <a
        href={post.href}
        className="group flex items-baseline justify-between gap-4 py-2.5 px-3 -mx-3 rounded-lg hover:bg-stone-100 dark:hover:bg-stone-900/50 transition-colors duration-200"
      >
        <span className="text-sm text-stone-600 dark:text-stone-400 group-hover:text-stone-900 dark:group-hover:text-stone-200 transition-colors">
          {post.title}
        </span>
        <span className="text-xs text-stone-400 dark:text-stone-500 font-mono shrink-0">
          {post.date}
        </span>
      </a>
    </li>
  );
}
