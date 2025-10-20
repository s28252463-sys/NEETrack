'use client';

import React, { ReactNode, useEffect, useState } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  const [firebase, setFirebase] = useState<ReturnType<typeof initializeFirebase> | null>(null);

  useEffect(() => {
    // Initialize Firebase only on the client side
    setFirebase(initializeFirebase());
  }, []);

  if (!firebase?.firebaseApp) {
    // You can return a loader here if you want
    return null; 
  }

  return <FirebaseProvider value={firebase}>{children}</FirebaseProvider>;
}
