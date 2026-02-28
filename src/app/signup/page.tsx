import { SignupForm } from '@/components/auth/SignupForm';

export default function SignupPage() {
  return (
    <div
      className="relative min-h-screen flex items-center justify-center px-4"
      style={{
        backgroundImage: 'linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.65)), url(https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e5-f008e353e0eb/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240205-popsignuptwoweeks-perspective_alpha_website_large.jpg)',
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
