'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Info } from 'lucide-react';

export function AboutUs() {
  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Info className="h-6 w-6 text-primary" />
          <CardTitle className="font-headline text-2xl">About Us</CardTitle>
        </div>
        <CardDescription>Information about the NEETrack application.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 text-base leading-relaxed">
        <p>
          Hello future doctors, we are glad to have you here. This app is made to provide you a completely free and forever free to use NEET companion.
        </p>
        <p>
          If you want to contact us, reach out through{' '}
          <a href="mailto:barmansoumyaranjan@gmail.com" className="font-medium text-primary hover:underline">
            barmansoumyaranjan@gmail.com
          </a>.
        </p>
        <p>
          In case you want to donate us with some money, then{' '}
          <span className="font-mono bg-muted/50 px-2 py-1 rounded-md">8117080724@fam</span> is our UPI ID.
        </p>
      </CardContent>
    </Card>
  );
}
