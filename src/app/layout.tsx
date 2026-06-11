import type { Metadata, Viewport } from 'next';
import { syne, inter, jetbrainsMono } from './fonts';
import { Providers } from '@/components/layout/Providers';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: 'X8 Eyewear — The Future Will Define Us',
  description: 'Meticulously crafted titanium eyewear. Aerodynamically engineered for style and comfort. FWA Site of the Day.',
  keywords: ['eyewear', 'titanium', 'luxury', 'sunglasses', 'optical', 'FWA'],
  authors: [{ name: 'X8 Eyewear' }],
  creator: 'X8 Eyewear',
  publisher: 'X8 Eyewear',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://x8.adencys.com',
    title: 'X8 Eyewear — The Future Will Define Us',
    description: 'Meticulously crafted titanium eyewear. Aerodynamically engineered for style and comfort.',
    siteName: 'X8 Eyewear',
    images: [
      {
        url: '/images/og-default.jpg',
        width: 1200,
        height: 630,
        alt: 'X8 Eyewear',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'X8 Eyewear',
    description: 'Meticulously crafted titanium eyewear.',
    images: ['/images/og-default.jpg'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const fontVariables = `${syne.variable} ${inter.variable} ${jetbrainsMono.variable}`;

  return (
    <html lang="en" className={fontVariables}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="font-body antialiased">
        <Providers>
          <Header />
          <main id="main-content" className="min-h-screen pt-header">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}