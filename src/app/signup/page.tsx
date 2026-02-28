import { SignupForm } from '@/components/auth/SignupForm';
import { HERO_BACKGROUND_IMAGE } from '@/constants';

export default function SignupPage() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(${HERO_BACKGROUND_IMAGE})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <nav className="absolute top-0 left-0 right-0 px-8 py-4">
        <span className="text-netflix-red font-black text-3xl tracking-tight">NETFLIX</span>
      </nav>
      <SignupForm />
    </div>
  );
}
