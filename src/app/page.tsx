'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase';
import './loader.css';

const LOADING_TIMEOUT = 5000; // 5 seconds

export default function HomePage() {
  const router = useRouter();
  const { user, isUserLoading } = useUser();
  const [didTimeout, setDidTimeout] = useState(false);

  useEffect(() => {
    if (!isUserLoading) {
      if (user) {
        router.replace('/dashboard');
      } else {
        router.replace('/login');
      }
    }
  }, [user, isUserLoading, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (isUserLoading) {
        setDidTimeout(true);
      }
    }, LOADING_TIMEOUT);

    return () => clearTimeout(timer);
  }, [isUserLoading]);

  useEffect(() => {
    if (didTimeout) {
      router.replace('/login');
    }
  }, [didTimeout, router]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-white">
      <div className="loader">
        <div className="truckWrapper">
          <div className="truckBody">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 130 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M104.24,59.37H14.78a4,4,0,0,1-4-4V16.89a4,4,0,0,1,4-4H91.56a13.7,13.7,0,0,1,12.68,8.22L116,47.45V55.37a4,4,0,0,1-4,4ZM18.78,51.37H99.19v-26.H18.78Z"
                fill="#282828"
              ></path>
              <path
                d="M91.56,12.89h-76.78a4,4,0,0,0-4,4V29.11H99.19V21.11A8.22,8.22,0,0,0,91.56,12.89Z"
                fill="#282828"
              ></path>
            </svg>
          </div>
          <div className="truckTires">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" fill="#282828"></circle>
              <circle cx="12" cy="12" r="4" fill="white"></circle>
            </svg>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="12" cy="12" r="10" fill="#282828"></circle>
              <circle cx="12" cy="12" r="4" fill="white"></circle>
            </svg>
          </div>
          <div className="road"></div>
          <svg
            className="lampPost"
            width="40"
            height="90"
            viewBox="0 0 40 90"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M5 90V10H35V0L25 10H5" stroke="#282828" strokeWidth="3" />
          </svg>
        </div>
      </div>
    </main>
  );
}
