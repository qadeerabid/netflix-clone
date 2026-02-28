import type { Metadata } from 'next';
import './globals.css';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'Netflix Clone',
  description: 'Watch movies and TV shows online',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-netflix-bg text-white min-h-screen font-sans">
        {children}
        <Toaster position="top-center" toastOptions={{ style: { background: '#333', color: '#fff' } }} />
      </body>
    </html>
  );
}
