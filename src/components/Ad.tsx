'use client';

import { useEffect } from 'react';

declare global {
    interface Window {
        adsbygoogle: any;
    }
}

const Ad = ({ adSlot, adClient }: { adSlot: string; adClient: string }) => {
  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (err) {
      // It's common for this to throw an error when an ad is already loaded
      // or blocked, so we can safely ignore it in many cases.
      // console.error('AdSense error:', err);
    }
  }, [adSlot]); // Re-run effect if adSlot changes

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
