import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { BookIcon } from 'lucide-react';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout 
      {...baseOptions()}
      links={[
        {
          icon: <BookIcon />,
          text: 'Blog',
          url: '/blogs',
          secondary: false,
        },
        {
          icon: <BookIcon />,
          text: 'Docs',
          url: '/docs',
          secondary: false,
        }
      ]}
    >
      {children}
    </HomeLayout>
  );
}
