'use client';

import { LoginForm } from '@/components/auth/LoginForm';
import { SocialButtons } from '@/components/auth/SocialButtons';
import { useUser } from '@/firebase/auth/use-user';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const Rays = () => (
  <svg
    id="rays"
    className="relative -bottom-6 z-0 animate-[rays_2s_ease-in-out_infinite]"
    width="100%"
    height="100%"
    viewBox="0 0 400 400"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="ray-gradient" x1="0.5" y1="0" x2="0.5" y2="1">
        <stop offset="0%" stopColor="rgba(168, 255, 250, 0.8)" />
        <stop offset="100%" stopColor="rgba(168, 255, 250, 0)" />
      </linearGradient>
    </defs>
    <g transform="translate(200, 200)">
      {[...Array(12)].map((_, i) => (
        <path
          key={i}
          d="M0 -150 L -20 -300 L 20 -300 Z"
          fill="url(#ray-gradient)"
          transform={`rotate(${i * 30})`}
        />
      ))}
    </g>
  </svg>
);


export default function LoginPage() {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && user) {
      router.push('/');
    }
  }, [user, loading, router]);


  return (
    <div className="flex flex-col min-h-screen items-center justify-center p-4 login-page-bg overflow-hidden">
      <div className="relative flex flex-col items-center justify-end w-full max-w-md h-96">
        <Rays />
        <div className="absolute top-[5em] w-full animate-[float_2s_ease-in-out_infinite]">
          <div className="login-form-container w-full">
            <h1 id="login-lable" className="text-center text-white text-3xl font-semibold tracking-[8px] [text-shadow:0px_0px_16px_rgb(243,243,243)]">
              LOGIN
            </h1>
            <LoginForm />
             <div className="relative my-2">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-white/50" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-[#00fff085] px-2 text-white/80">
                  Or continue with
                </span>
              </div>
            </div>
            <SocialButtons />
            <p className="mt-2 text-center text-sm text-white [text-shadow:0px_1px_4px_rgb(0_0_0)]">
              Don&apos;t have an account?{' '}
              <Link href="/signup" className="font-semibold text-white hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
