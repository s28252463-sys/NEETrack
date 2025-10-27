'use client';

const Ad = () => {
  const adClient = process.env.NEXT_PUBLIC_ADSENSE_PUB_ID;
  const adSlot = process.env.NEXT_PUBLIC_ADSENSE_AD_SLOT;

  if (!adClient || !adSlot) {
    // Return a placeholder or null if ad config is not set.
    // This helps in development environments where ads aren't needed.
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
