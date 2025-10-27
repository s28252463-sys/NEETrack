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
    if (!adClient || !adSlot) {
        console.warn("AdSense environment variables not set. Ads will not be displayed.");
        return;
    }
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      // It's common for this to throw an error when an ad is already loaded
      // or blocked, so we can safely ignore it in many cases.
      // console.error('AdSense error:', err);
    }
  }, [adSlot, adClient]);

  if (!adClient || !adSlot) {
    return null;
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
