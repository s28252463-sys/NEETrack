'use client';
import { useUser } from '@/firebase/auth/use-user';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/firebase';
import { LogIn } from 'lucide-react';
import Link from 'next/link';

export function Header() {
  const { user } = useUser();
  const auth = useAuth();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <div className="flex items-center justify-between py-2 w-full">
      <div className="flex items-center">
        <svg
          className="h-12"
          viewBox="0 0 200 60"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{stopColor: 'hsl(var(--primary))', stopOpacity:1}} />
              <stop offset="100%" style={{stopColor: 'hsl(var(--accent))', stopOpacity:1}} />
            </linearGradient>
          </defs>
          <path 
            d="M 10 30 a 20 20 0 1 0 40 0 a 20 20 0 1 0 -40 0" 
            fill="url(#grad1)" 
          />
          <circle cx="30" cy="30" r="8" fill="hsl(var(--background))" />
          <path 
            d="M 30 22 a 8 8 0 0 1 0 16"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
        </svg>
        <span className="text-2xl font-headline font-bold text-gray-800 dark:text-gray-200 ml-2 group-data-[state=collapsed]/sidebar-wrapper:hidden group-data-[mobile=true]/sidebar:inline">
          NEETrack
        </span>
      </div>

      <div className="group-data-[state=collapsed]/sidebar-wrapper:hidden group-data-[mobile=true]/sidebar:inline">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.photoURL || ''} alt={user.displayName || 'User'} />
                  <AvatarFallback>{getInitials(user.displayName)}</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user.displayName}</p>
                  <p className="text-xs leading-none text-muted-foreground">
                    {user.email}
                  </p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => signOut(auth)}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Button asChild variant="ghost" size="sm">
            <Link href="/login">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
