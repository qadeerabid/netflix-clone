import Link from 'next/link';
import { Accordion } from '@/components/ui/Accordion';
import { Footer } from '@/components/layout/Footer';
import { ROUTES } from '@/constants';

const FAQ_ITEMS = [
  {
    question: 'What is Netflix?',
    answer: 'Netflix is a streaming service that offers a wide variety of award-winning TV shows, movies, anime, documentaries, and more on thousands of internet-connected devices.',
  },
  {
    question: 'How much does Netflix cost?',
    answer: 'Watch Netflix on your smartphone, tablet, Smart TV, laptop, or streaming device, all for one fixed monthly fee. Plans range from $7 to $23 a month.',
  },
  {
    question: 'Where can I watch?',
    answer: 'Watch anywhere, anytime. Sign in with your Netflix account to watch instantly on the web at netflix.com from your personal computer or on any internet-connected device.',
  },
  {
    question: 'How do I cancel?',
    answer: 'Netflix is flexible. There are no pesky contracts and no commitments. You can easily cancel your account online in two clicks.',
  },
  {
    question: 'What can I watch on Netflix?',
    answer: 'Netflix has an extensive library of feature films, documentaries, TV shows, anime, award-winning Netflix originals, and more.',
  },
];

const FEATURES = [
  {
    title: 'Enjoy on your TV.',
    description: 'Watch on Smart TVs, PlayStation, Xbox, Chromecast, Apple TV, Blu-ray players, and more.',
    image: '📺',
    reverse: false,
  },
  {
    title: 'Download your shows to watch offline.',
    description: 'Save your favorites easily and always have something to watch.',
    image: '📱',
    reverse: true,
  },
  {
    title: 'Watch everywhere.',
    description: 'Stream unlimited movies and TV shows on your phone, tablet, laptop, and TV.',
    image: '💻',
    reverse: false,
  },
  {
    title: 'Create profiles for kids.',
    description: "Send kids on adventures with their favorite characters in a space made just for them—free with your membership.",
    image: '👨‍👩‍👧',
    reverse: true,
  },
];

export default function LandingPage() {
  return (
    <main className="bg-netflix-bg">
      <section
        className="relative min-h-screen flex flex-col items-center justify-center text-center px-4"
        style={{
          backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.7)), url(https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e5-f008e353e0eb/a3873901-5b7c-46eb-b9fa-12fea5197bd3/IN-en-20240205-popsignuptwoweeks-perspective_alpha_website_large.jpg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute top-0 left-0 right-0 bottom-0 border-b-8 border-gray-800" />
        <nav className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-4">
          <span className="text-netflix-red font-black text-3xl tracking-tight">NETFLIX</span>
          <Link href={ROUTES.LOGIN}>
            <button className="bg-netflix-red text-white px-4 py-1.5 rounded text-sm font-semibold hover:bg-red-700 transition">
              Sign In
            </button>
          </Link>
        </nav>

        <div className="relative z-10 max-w-3xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white mb-5">
            Unlimited movies, TV shows, and more
          </h1>
          <p className="text-xl sm:text-2xl text-white mb-3">Watch anywhere. Cancel anytime.</p>
          <p className="text-lg text-white mb-6">
            Ready to watch? Enter your email to create or restart your membership.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 px-4 py-4 bg-black/60 border border-gray-500 text-white placeholder-gray-400 rounded focus:outline-none text-base"
            />
            <Link href={ROUTES.SIGNUP}>
              <button className="bg-netflix-red hover:bg-red-700 text-white px-8 py-4 rounded font-semibold text-lg transition whitespace-nowrap">
                Get Started &gt;
              </button>
            </Link>
          </div>
        </div>
      </section>

      {FEATURES.map((feature, idx) => (
        <section key={idx} className="border-b-8 border-gray-800 py-16 px-8 md:px-16">
          <div className={`max-w-6xl mx-auto flex flex-col ${feature.reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-8`}>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-white text-3xl md:text-5xl font-bold mb-4">{feature.title}</h2>
              <p className="text-white text-lg md:text-2xl">{feature.description}</p>
            </div>
            <div className="flex-1 flex items-center justify-center text-9xl">
              {feature.image}
            </div>
          </div>
        </section>
      ))}

      <section className="border-b-8 border-gray-800 py-16 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-white text-3xl md:text-5xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          <Accordion items={FAQ_ITEMS} />
          <div className="text-center mt-8">
            <p className="text-white text-lg mb-4">Ready to watch? Enter your email to create or restart your membership.</p>
            <Link href={ROUTES.SIGNUP}>
              <button className="bg-netflix-red hover:bg-red-700 text-white px-8 py-4 rounded font-semibold text-xl transition">
                Get Started &gt;
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
