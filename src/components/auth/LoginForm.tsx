'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/constants';

interface LoginFormData {
  email: string;
  password: string;
}

export function LoginForm() {
  const { signIn, isLoading } = useAuthStore();
  const router = useRouter();
  const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    try {
      await signIn(data.email, data.password);
      toast.success('Welcome back!');
      router.push(ROUTES.PROFILES);
    } catch {
      toast.error('Sign in failed. Please try again.');
    }
  };

  return (
    <div className="bg-black/75 rounded-md p-8 md:p-14 w-full max-w-md">
      <h1 className="text-white text-3xl font-bold mb-8">Sign In</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          type="email"
          placeholder="Email or phone number"
          error={errors.email?.message}
          {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })}
        />
        <Input
          type="password"
          placeholder="Password"
          error={errors.password?.message}
          {...register('password', { required: 'Password is required', minLength: { value: 4, message: 'Min 4 characters' } })}
        />
        <Button type="submit" isLoading={isLoading} className="w-full mt-2" size="lg">
          Sign In
        </Button>
      </form>
      <p className="text-gray-500 mt-6 text-sm">
        New to Netflix?{' '}
        <Link href={ROUTES.SIGNUP} className="text-white hover:underline">
          Sign up now.
        </Link>
      </p>
    </div>
  );
}
