import type { Metadata, Viewport } from 'next';
import './globals.css';

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://matdataportal.vercel.app';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Chunav Ranniti (चुनाव रणनीति) | भारत का #1 चुनाव प्रबंधन व डिजिटल वॉर रूम सॉफ्टवेयर',
  description: 'भारत का अग्रणी इलेक्शन मैनेजमेंट व वोटर डेटाबेस प्लेटफॉर्म। 1-सेकंड मतदाता पर्ची, WhatsApp ऑटोमेशन, बूथ-वार लाइव टर्नआउट, जातिगत समीकरण व रियल-टाइम वॉर रूम इंटेलिजेंस।',
  keywords: [
    'Chunav Ranniti',
    'चुनाव रणनीति',
    'Chunav Ranniti App',
    'Election Management Software India',
    'Voter Slip Generator WhatsApp',
    'Chunav War Room Software',
    'Panna Pramukh Management App',
    'Booth Level Voter Analytics',
    'Voter List OCR Hindi PDF',
    'Political Campaign Management System',
    'WhatsApp Election Campaign',
    'Booth Adhyaksh App'
  ],
  authors: [{ name: 'Chunav Ranniti (चुनाव रणनीति)', url: siteUrl }],
  creator: 'Chunav Ranniti (चुनाव रणनीति)',
  publisher: 'Chunav Ranniti (चुनाव रणनीति)',
  formatDetection: {
    email: false,
    address: false,
    telephone: true,
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '48x48' },
      { url: '/icon.png', sizes: '512x512', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: [
      { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.webmanifest',
  openGraph: {
    title: 'Chunav Ranniti (चुनाव रणनीति) - चुनाव प्रबंधन का संपूर्ण डिजिटल वॉर रूम',
    description: 'बूथ से लेकर वॉर-रूम तक, हर वोट और कार्यकर्ता पर सटीक नियंत्रण। 1-सेकंड मतदाता पर्ची, WhatsApp ऑटोमेशन व लाइव टर्नआउट।',
    url: siteUrl,
    siteName: 'Chunav Ranniti (चुनाव रणनीति)',
    locale: 'hi_IN',
    type: 'website',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Chunav Ranniti (चुनाव रणनीति) - Bharat Ka #1 Election Management Software & Digital War Room',
        type: 'image/png',
      },
      {
        url: '/logo.png',
        width: 512,
        height: 512,
        alt: 'Chunav Ranniti Logo',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Chunav Ranniti (चुनाव रणनीति) | Election Management Software & War Room',
    description: 'बूथ से लेकर वॉर-रूम तक हर वोट पर सटीक नियंत्रण।',
    images: ['/og-image.png'],
    creator: '@ChunavRanniti',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  category: 'Political Technology / Election Management',
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${siteUrl}/#organization`,
      name: 'Chunav Ranniti (चुनाव रणनीति)',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
        width: 512,
        height: 512,
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+91-9876543210',
        contactType: 'sales & technical support',
        availableLanguage: ['Hindi', 'English'],
        areaServed: 'IN',
      },
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${siteUrl}/#software`,
      name: 'Chunav Ranniti (चुनाव रणनीति)',
      operatingSystem: 'Web, Android, iOS',
      applicationCategory: 'BusinessApplication',
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'INR',
        lowPrice: '15000',
        highPrice: '50000',
        offerCount: '3',
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '240',
        bestRating: '5',
      },
      description:
        'संपूर्ण चुनावी प्रबंधन सॉफ्टवेयर — AI वोटर OCR, 1-सेकंड डिजिटल मतदाता पर्ची, WhatsApp बल्क डिलीवरी, बूथ अध्यक्ष ऐप, पन्ना प्रमुख ट्रैकिंग और रियल-टाइम वॉर रूम।',
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Chunav Ranniti (चुनाव रणनीति)',
      publisher: {
        '@id': `${siteUrl}/#organization`,
      },
      inLanguage: 'hi-IN',
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="hi" className="light scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hind:wght@400;500;600;700&family=Inter:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-[#f8fafc] text-[#0f172a] antialiased selection:bg-emerald-600 selection:text-white">
        {children}
      </body>
    </html>
  );
}
