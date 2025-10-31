import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster"
import { FirebaseClientProvider } from '@/firebase/client-provider';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'NEETrack',
  description: 'Track your NEET UG syllabus completion and get personalized study plans.',
};

const adSensePublisherId = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
        {adSensePublisherId && (
           <Script
            async
            id="adsbygoogle-script"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adSensePublisherId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </head>
      <body className="font-body antialiased">
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
        <Toaster />
      </body>
    </html>
  );
}
