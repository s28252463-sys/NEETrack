'use client';

import { LoginForm } from '@/components/auth/LoginForm';
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
    <div className="flex flex-col min-h-screen items-center justify-center p-8 login-page-bg overflow-hidden relative">
      <div className="absolute top-4 right-4 z-20">
        <Link href="/signup">
          <span className="inline-block px-4 py-2 text-white font-bold tracking-wider rounded-md border-2 border-white hover:bg-white/20 transition-colors duration-300"
           style={{
              background: 'rgba(139, 189, 255, 0.59)',
              boxShadow: '0px 0px 1px 2px #9ee5e3',
              textShadow: '0 0 5px #fff',
           }}>
            Sign Up
          </span>
        </Link>
      </div>

      <div className="relative flex flex-col items-center justify-end w-full max-w-md h-[30rem]">
        <Rays />
        <div className="absolute top-[5em] w-full animate-[float_2s_ease-in-out_infinite]">
          <div className="login-form-container w-full">
            <h1 id="login-lable" className="text-center text-white text-3xl font-semibold tracking-[8px] [text-shadow:0px_0px_16px_rgb(243,243,243)]">
              LOGIN
            </h1>
            <LoginForm />
          </div>
        </div>
      </div>
    </div>
  );
}
