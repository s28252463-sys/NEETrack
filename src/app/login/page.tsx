'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from '@/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  FirebaseError,
} from 'firebase/auth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { BookOpen } from 'lucide-react';
import './login.css';

const formSchema = z.object({
  email: z.string().email({ message: 'Invalid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

type FormValues = z.infer<typeof formSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const auth = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  const loginForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  const signupForm = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: '', password: '' },
  });

  const handleLogin = async (values: FormValues) => {
    setIsLoading(true);
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({ title: 'Signed in successfully!' });
      router.push('/dashboard');
    } catch (error) {
      const firebaseError = error as FirebaseError;
      toast({
        variant: 'destructive',
        title: 'Authentication failed',
        description: firebaseError.code.replace('auth/', '').replace(/-/g, ' '),
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUp = async (values: FormValues) => {
    setIsLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, values.email, values.password);
      toast({ title: 'Account created successfully!' });
      router.push('/dashboard');
    } catch (error) {
      const firebaseError = error as FirebaseError;
      toast({
        variant: 'destructive',
        title: 'Sign-up failed',
        description: firebaseError.code.replace('auth/', '').replace(/-/g, ' '),
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
        <div className="flex items-center gap-2 text-3xl font-semibold text-white mb-16">
            <BookOpen className="h-8 w-8" />
            <span className="">NEETrack</span>
        </div>
      <div className="wrapper">
        <div className="card-switch">
          <label className="switch">
            <input
              type="checkbox"
              className="toggle"
              checked={isFlipped}
              onChange={() => setIsFlipped(!isFlipped)}
            />
            <span className="slider"></span>
            <span className="card-side"></span>
          </label>
        </div>
        <div className="flip-card__inner">
          <div className="flip-card__front">
            <div className="title">Log in</div>
            <form
              onSubmit={loginForm.handleSubmit(handleLogin)}
              className="flip-card__form"
              noValidate
            >
              <input
                {...loginForm.register('email')}
                className="flip-card__input"
                placeholder="Email"
                type="email"
              />
              {loginForm.formState.errors.email && <p className="text-red-500 text-xs">{loginForm.formState.errors.email.message}</p>}
              <input
                {...loginForm.register('password')}
                className="flip-card__input"
                placeholder="Password"
                type="password"
              />
               {loginForm.formState.errors.password && <p className="text-red-500 text-xs">{loginForm.formState.errors.password.message}</p>}
              <button type="submit" className="flip-card__btn" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Let`s go!'}
              </button>
            </form>
          </div>
          <div className="flip-card__back">
            <div className="title">Sign up</div>
            <form
              onSubmit={signupForm.handleSubmit(handleSignUp)}
              className="flip-card__form"
              noValidate
            >
              <input
                {...signupForm.register('email')}
                className="flip-card__input"
                placeholder="Email"
                name="email"
                type="email"
              />
              {signupForm.formState.errors.email && <p className="text-red-500 text-xs">{signupForm.formState.errors.email.message}</p>}
              <input
                {...signupForm.register('password')}
                className="flip-card__input"
                placeholder="Password"
                name="password"
                type="password"
              />
              {signupForm.formState.errors.password && <p className="text-red-500 text-xs">{signupForm.formState.errors.password.message}</p>}
              <button type="submit" className="flip-card__btn" disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
