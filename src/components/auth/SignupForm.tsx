'use client';

import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/stores/authStore';
import { ROUTES } from '@/constants';

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export function SignupForm() {
  const { signUp, isLoading } = useAuthStore();
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>();

  const onSubmit = async (data: SignupFormData) => {
    try {
      await signUp(data.email, data.password, data.name);
      toast.success('Account created!');
      router.push(ROUTES.PROFILES);
    } catch {
      toast.error('Sign up failed. Please try again.');
    }
  };

  return (
    <div className="bg-black/75 rounded-md p-8 md:p-14 w-full max-w-md">
      <h1 className="text-white text-3xl font-bold mb-8">Sign Up</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <Input
          type="text"
          placeholder="Your name"
          error={errors.name?.message}
          {...register('name', { required: 'Name is required' })}
        />
        <Input
          type="email"
          placeholder="Email"
          error={errors.email?.message}
          {...register('email', { required: 'Email is required', pattern: { value: /\S+@\S+\.\S+/, message: 'Invalid email' } })}
        />
        <Input
          type="password"
          placeholder="Password"
          error={errors.password?.message}
          {...register('password', { required: 'Password is required', minLength: { value: 4, message: 'Min 4 characters' } })}
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          error={errors.confirmPassword?.message}
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: (val) => val === watch('password') || 'Passwords do not match',
          })}
        />
        <Button type="submit" isLoading={isLoading} className="w-full mt-2" size="lg">
          Sign Up
        </Button>
      </form>
      <p className="text-gray-500 mt-6 text-sm">
        Already have an account?{' '}
        <Link href={ROUTES.LOGIN} className="text-white hover:underline">
          Sign in.
        </Link>
      </p>
    </div>
  );
}
