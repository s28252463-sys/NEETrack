'use client';

import React, { ReactNode } from 'react';
import { initializeFirebase } from './index';
import { FirebaseProvider } from './provider';

// Initialize Firebase immediately on the client
const firebaseInstance = initializeFirebase();

export function FirebaseClientProvider({ children }: { children: ReactNode }) {
  if (!firebaseInstance.firebaseApp) {
    // This can be a loading spinner or null
    return null;
  }

  return <FirebaseProvider value={firebaseInstance}>{children}</FirebaseProvider>;
}
