'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

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
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    // Check if the app is already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsAppInstalled(true);
    }

    const handleBeforeInstallPrompt = (event: Event) => {
      // Prevent the mini-infobar from appearing on mobile
      event.preventDefault();
      // Stash the event so it can be triggered later.
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
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
  };
  
  const getTooltipContent = () => {
    if (isAppInstalled) return 'App is already installed';
    if (installPrompt) return 'Install App';
    return 'Installation not available on this browser';
  }

  return (
    <Tooltip>
        <TooltipTrigger asChild>
            {/* The button is wrapped in a span to allow the tooltip to work even when the button is disabled */}
            <span>
              <Button 
                onClick={handleInstallClick} 
                variant="ghost" 
                size="icon"
                disabled={!installPrompt || isAppInstalled}
                aria-label="Install App"
              >
                  <Download className="h-5 w-5" />
              </Button>
            </span>
        </TooltipTrigger>
        <TooltipContent>
            <p>{getTooltipContent()}</p>
        </TooltipContent>
    </Tooltip>
  );
};

export default InstallPwaButton;
