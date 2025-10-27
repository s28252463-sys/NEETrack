'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

declare global {
    interface Window {
        adsbygoogle: any;
    }
}

const Ad = () => {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;
  const adSlot = process.env.NEXT_PUBLIC_ADSENSE_AD_SLOT;
  const pathname = usePathname();
  const [isAdLoaded, setIsAdLoaded] = useState(false);

  useEffect(() => {
    // When the path changes, reset the ad loaded state to force a re-render
    setIsAdLoaded(false);
    // After a short delay, set it to true to render the ad
    const timer = setTimeout(() => {
        setIsAdLoaded(true);
    }, 50);

    return () => clearTimeout(timer);
  }, [pathname]);

  useEffect(() => {
    // Only push the ad when the component has re-rendered for the new page
    if (isAdLoaded) {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.error("AdSense error:", err);
        }
    }
  }, [isAdLoaded]);

  if (!adClient || !adSlot) {
    return (
      <div className="w-full text-center p-4 bg-muted/50 rounded-lg">
        <p className="text-sm text-muted-foreground">Ad Placeholder</p>
      </div>
    );
  }
  
  if (!isAdLoaded) {
      return (
        <div className="w-full text-center p-4 h-[90px] flex items-center justify-center">
            {/* Placeholder to prevent layout shift */}
        </div>
      );
  }

  return (
    <div className="w-full text-center">
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
