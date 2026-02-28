'use client';

import { useRouter } from 'next/navigation';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useAuthStore } from '@/stores/authStore';
import { useMyListStore } from '@/stores/myListStore';
import { ROUTES } from '@/constants';

export default function AccountPage() {
  const { user, signOut } = useAuthStore();
  const { clearList } = useMyListStore();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    clearList();
    router.push(ROUTES.HOME);
  };

  return (
    <div className="bg-netflix-bg min-h-screen">
      <Navbar />
      <div className="pt-24 pb-8 px-4 md:px-12 max-w-4xl mx-auto">
        <h1 className="text-white text-3xl font-bold border-b border-gray-700 pb-4 mb-6">Account</h1>
        
        <div className="grid gap-6">
          <div className="bg-gray-900 rounded p-6">
            <h2 className="text-white font-semibold mb-4 text-lg">Membership & Billing</h2>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Email</span>
                <span className="text-white">{user?.email || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Name</span>
                <span className="text-white">{user?.name || 'N/A'}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-700">
                <span className="text-gray-400">Member since</span>
                <span className="text-white">{user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</span>
              </div>
            </div>
          </div>

          <div className="bg-gray-900 rounded p-6">
            <h2 className="text-white font-semibold mb-4 text-lg">Plan Details</h2>
            <div className="flex justify-between py-2">
              <span className="text-gray-400">Current Plan</span>
              <span className="text-white font-medium">Standard with ads</span>
            </div>
          </div>

          <div className="bg-gray-900 rounded p-6">
            <h2 className="text-white font-semibold mb-4 text-lg">Settings</h2>
            <button
              onClick={handleSignOut}
              className="text-blue-400 hover:underline text-sm"
            >
              Sign out of all devices
            </button>
          </div>

          <button
            onClick={handleSignOut}
            className="bg-netflix-red text-white py-3 px-6 rounded font-semibold hover:bg-red-700 transition w-full sm:w-auto"
          >
            Sign Out
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}
