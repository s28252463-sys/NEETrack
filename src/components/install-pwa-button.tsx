'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download, X } from 'lucide-react';

// This is the event type from the spec
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallPwaButton = () => {
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (event: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      event.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPrompt(event as BeforeInstallPromptEvent);
      // Show the custom install button.
      setShowButton(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);

    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setShowButton(false);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt as EventListener);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!installPrompt) {
      return;
    }
    // Show the browser's install prompt.
    installPrompt.prompt();
    // Wait for the user to respond to the prompt.
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    // We can only use the prompt once, so clear it.
    setInstallPrompt(null);
    setShowButton(false);
  };
  
  const handleDismiss = () => {
    setShowButton(false);
    // You might want to store this preference in localStorage to not show it again for a while
  }

  if (!showButton || !installPrompt) {
    return null;
  }

  return (
     <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-card text-card-foreground rounded-lg shadow-lg p-4 flex items-center gap-4 border border-border">
          <Download className="h-6 w-6 text-primary" />
          <div className="flex-grow">
            <p className="font-semibold">Install the app now</p>
            <p className="text-sm text-muted-foreground">Get the full experience on your device.</p>
          </div>
          <Button onClick={handleInstallClick} size="sm">Install</Button>
          <Button onClick={handleDismiss} variant="ghost" size="icon" className="h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
  );
};

export default InstallPwaButton;
