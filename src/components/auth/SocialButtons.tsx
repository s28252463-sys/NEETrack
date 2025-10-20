'use client';

import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

const GoogleIcon = () => (
    <svg className="mr-2 h-4 w-4" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
        <path fill="currentColor" d="M488 261.8C488 403.3 381.5 512 244 512 109.8 512 0 402.2 0 261.8 0 122.4 109.8 13.6 244 13.6c70.3 0 129.8 27.8 174.3 71.9l-67.8 67.8C314.6 114.5 282.8 97.2 244 97.2c-73.8 0-134.3 59.9-134.3 134.3s60.5 134.3 134.3 134.3c81.5 0 112.2-61.7 115.5-93.5H244v-83.9h239.9c2.3 12.7 3.6 26.1 3.6 40.5z"></path>
    </svg>
);


export function SocialButtons() {
    const { toast } = useToast();
    const [isGooglePending, setIsGooglePending] = useState(false);

    const handleGoogleSignIn = () => {
        // This is where Firebase logic will go.
        setIsGooglePending(true);
        // For now, just show a toast.
        setTimeout(() => {
            toast({
                title: "Coming Soon!",
                description: "Google Sign-In will be implemented soon.",
            });
            setIsGooglePending(false);
        }, 1000);
    }

    return (
        <div className="grid grid-cols-1 gap-2">
          <Button variant="outline" type="button" disabled={isGooglePending} onClick={handleGoogleSignIn}>
            {isGooglePending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <GoogleIcon />}
            Google
          </Button>
        </div>
    );
}
