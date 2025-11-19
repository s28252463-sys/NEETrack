import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { FirebaseClientProvider } from '@/firebase';
import Script from 'next/script';

export const metadata: Metadata = {
  title: 'NEETrack',
  description: 'Track your progress, ace the exam.',
  manifest: '/manifest.json',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body>
        <FirebaseClientProvider>
          {children}
        </FirebaseClientProvider>
        <Toaster />
        <Script async={true} data-cfasync="false" src="//pl28085801.effectivegatecpm.com/48a2c7d50ab69852baf22279c014a0b5/invoke.js"></Script>
        <Script type='text/javascript' src='//pl28085855.effectivegatecpm.com/71/1d/0d/711d0d3b9e4895cfcb484ddd3d32318d.js'></Script>
      </body>
    </html>
  );
}
