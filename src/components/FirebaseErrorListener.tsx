'use client';

import { useEffect } from 'react';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '@/hooks/use-toast';

// This component is a hack to surface permission errors to the Next.js overlay
function Throw({ error }: { error: Error }) {
  useEffect(() => {
    throw error;
  }, [error]);
  return null;
}

export function FirebaseErrorListener() {
  const { toast } = useToast();

  useEffect(() => {
    const handlePermissionError = (error: FirestorePermissionError) => {
      console.error('Caught Firestore Permission Error:', error.toString());

      // In a production environment, you might want to show a toast.
      // In development, we throw it to get the Next.js overlay.
      if (process.env.NODE_ENV === 'development') {
        // Using a component to throw the error to leverage React's error boundary
        // and get the Next.js error overlay.
        const ErrorBoundaryThrower = () => <Throw error={error} />;
        toast({
          variant: 'destructive',
          title: 'Firestore Permission Error',
          description: <ErrorBoundaryThrower />,
          duration: Infinity,
        });
      } else {
         toast({
            variant: "destructive",
            title: "Permission Denied",
            description: "You don't have permission to perform this action.",
        });
      }
    };

    errorEmitter.on('permission-error', handlePermissionError);

    return () => {
      errorEmitter.off('permission-error', handlePermissionError);
    };
  }, [toast]);

  return null;
}
