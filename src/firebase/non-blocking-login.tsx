'use client';
import {
  Auth, // Import Auth type for type hinting
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FirebaseError,
} from 'firebase/auth';
import { toast } from '@/hooks/use-toast';

const handleAuthError = (error: unknown) => {
  const firebaseError = error as FirebaseError;
  let description = firebaseError.message; // Default message

  // Provide more user-friendly messages for common errors
  if (firebaseError.code === 'auth/invalid-credential') {
    description = 'Incorrect email or password. Please try again.';
  } else if (firebaseError.code === 'auth/email-already-in-use') {
    description = 'An account with this email already exists.';
  } else if (firebaseError.code === 'auth/weak-password') {
    description = 'The password is too weak. Please use at least 6 characters.';
  } else {
    // Generic message for other errors
    description = firebaseError.code.replace('auth/', '').replace(/-/g, ' ');
  }

  toast({
    variant: 'destructive',
    title: 'Authentication Failed',
    description: description,
  });
};

/** Initiate anonymous sign-in (non-blocking). */
export function initiateAnonymousSignIn(authInstance: Auth): Promise<void> {
  return signInAnonymously(authInstance).catch(handleAuthError);
}

/** Initiate email/password sign-up (non-blocking). */
export function initiateEmailSignUp(authInstance: Auth, email: string, password: string): Promise<void> {
  return createUserWithEmailAndPassword(authInstance, email, password).catch(handleAuthError);
}

/** Initiate email/password sign-in (non-blocking). */
export function initiateEmailSignIn(authInstance: Auth, email: string, password: string): Promise<void> {
  return signInWithEmailAndPassword(authInstance, email, password).catch(handleAuthError);
}
