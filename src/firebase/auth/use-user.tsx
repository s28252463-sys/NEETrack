'use client';

import { useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, type User } from 'firebase/auth';
import { FirebaseContext, useAuth } from '../provider';

export function useUser() {
  const context = useContext(FirebaseContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a FirebaseProvider');
  }
  
  const auth = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  return { user, loading };
}
