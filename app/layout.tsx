import { RootProvider } from 'fumadocs-ui/provider/next';
import StaticSearchDialog from '@/components/search-dialog';
import './global.css';
import { Inter, DM_Serif_Display } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const dmSerifDisplay = DM_Serif_Display({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-serif-display',
});

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSerifDisplay.variable}`}
      suppressHydrationWarning
    >
      <body className="flex flex-col min-h-screen font-sans antialiased">
        <RootProvider
          search={{
            SearchDialog: StaticSearchDialog,
            options: { api: '/api/search' },
          }}
        >
          {children}
        </RootProvider>
      </body>
    </html>
  );
}
