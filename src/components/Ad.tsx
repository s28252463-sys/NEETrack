'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        adsbygoogle: any;
    }
}

const Ad = () => {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;
  const adSlot = process.env.NEXT_PUBLIC_ADSENSE_AD_SLOT;

  useEffect(() => {
    try {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (err) {
        console.error("AdSense error:", err);
    }
  }, []);

  if (!adClient || !adSlot) {
    return (
      <div className="w-full text-center p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">Ad Placeholder</p>
      </div>
    );
  }

  return (
    <div className="w-full text-center" key={adSlot}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={adClient}
        data-ad-slot={adSlot}
        data-ad-format="auto"
        data-full-width-responsive="true"
      ></ins>
    </div>
  );
};

export default Ad;
